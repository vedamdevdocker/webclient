import React, { useState } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { COMPANY_CONFIG } from "../../config/CompanyConfigs"; // Import the grouped configuration
import * as Sales_config from "../../../sales/config/config"; // Import everything from sales config

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function AutoCreateInvoiceFromSOForm() {
  const [formData, setFormData] = useState({
    sales_order_numbers: "",
  });

  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const salesOrderNumbersArray = formData.sales_order_numbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => parseInt(num, 10));
  
    console.log("Entered Sales orders", salesOrderNumbersArray);
  
    if (salesOrderNumbersArray.length === 0) {
      const userConfirmed = window.confirm(
        "Are you sure you want to create invoices for all sales orders?"
      );
      if (!userConfirmed) {
        return;
      }
    }
  
    try {
      // Fetch sales order headers
      const response = await axios.get(`${API_URL}/get_sales_order_headers`, {
        headers: generateHeaders(),
      });
      const salesOrders = response.data;
  
      // Get the list of statuses that have autoinvoice set to true
      const autoinvoiceStatuses = Sales_config.SO_ORDER_STATUS.filter(
        (status) => status.autoinvoice
      ).map((status) => status.short_name);
  
      // Filter sales orders based on validation
      const filteredSalesOrders = salesOrders.filter((order) => {
        const { so_num, status } = order;
  
        // Check if status is in the so_order_status_filter and has autoinvoice true
        if (!autoinvoiceStatuses.includes(status)) {
          return false; // Exclude if status doesn't have autoinvoice true
        }
  
        return salesOrderNumbersArray.includes(so_num); // Include if it passes all checks
      });
  
      console.log(
        "Filtered orders",
        filteredSalesOrders
      );
  
      // Group the filtered sales orders by company_id
      const salesOrdersGroupedByCompanyId = filteredSalesOrders.reduce(
        (acc, order) => {
          const { company_id, so_num } = order;
          if (!acc[company_id]) {
            acc[company_id] = [];
          }
          acc[company_id].push(so_num);
          return acc;
        },
        {}
      );
  
      console.log(
        "Filtered orders Group by company",
        salesOrdersGroupedByCompanyId
      );

      const results = [];
      // Make the POST API calls for each company_id
      for (const companyId in salesOrdersGroupedByCompanyId) {
        // Check if the config exists for the company_id
        const companyConfig =
          COMPANY_CONFIG[companyId]?.AUTO_SALES_INVOICE_CONFIG;
        if (!companyConfig) {
          console.log(
            "There is no AUTO_SALES_INVOICE_CONFIG setup for the company so sales orders will not be processed",
            companyId
          );
          continue; // Skip this iteration if config is not present
        }
        // Calculate the sum of Debit and Credit for Normal category
        const debitSum = companyConfig.account_types.Debit.filter(
          (account) => account.category === "Normal"
        ).reduce((sum, account) => sum + account.distribution_percentage, 0);
  
        const creditSum = companyConfig.account_types.Credit.filter(
          (account) => account.category === "Normal"
        ).reduce((sum, account) => sum + account.distribution_percentage, 0);
  
        // Validate if Debit sum equals Credit sum for Normal category
        if (debitSum !== creditSum) {
          console.log(
            "AUTO_SALES_INVOICE_CONFIG Debit distribution % is not the same as Credit's for the company setup ",
            companyId
          );
          continue; // Skip this iteration if the sums don't match
        }
  
        const requestData = {
          sales_order_numbers: salesOrdersGroupedByCompanyId[companyId],
          created_by: localStorage.getItem("userid"),
          ...companyConfig,
        };
  
        try {
          const postResponse = await axios.post(
            `${API_URL}/auto_create_so_si`,
            requestData,
            {
              headers: generateHeaders(),
            }
          );

          results.push(postResponse.data);

          console.log("Respose from API call Group by Company", companyId, postResponse.data);       
  
          setSuccessMessage(successMessage);
          setErrorMessage(null);
        } catch (postError) {
          console.error("Error creating sales invoice:", postError);
          setErrorMessage(
            postError.response && postError.response.data
              ? postError.response.data.message
              : "An error occurred while creating the sales invoice."
          );
          setSuccessMessage(null);
        }
      }
      // Process collected results
      if (results.length > 0) {
        // Flatten results and process
          const allInvoices = results.flatMap(result => result.invoices || []);
          const uniqueHeaderIds = new Set(allInvoices.map(inv => inv.header_response.header_id));
          const numberOfSalesOrderNumbers = salesOrderNumbersArray.length;
  
          let message = "";

          if (uniqueHeaderIds.size === 1 && numberOfSalesOrderNumbers === 1) {
            message = `Single Invoice successfully created for the single order inputed. Orders: ${numberOfSalesOrderNumbers}, Invoices: ${uniqueHeaderIds.size}`;
          } else if (uniqueHeaderIds.size === numberOfSalesOrderNumbers) {
            message = `Invoices are created for all the sales orders. Orders: ${numberOfSalesOrderNumbers}, Invoices: ${uniqueHeaderIds.size}`;
          } else if (uniqueHeaderIds.size < numberOfSalesOrderNumbers) {
            message = `Invoices are not created for all the sales orders. Orders: ${numberOfSalesOrderNumbers}, Invoices: ${uniqueHeaderIds.size}`;
          } else if (uniqueHeaderIds.size > numberOfSalesOrderNumbers) {
            message = `There are more invoices created than sales orders. Orders: ${numberOfSalesOrderNumbers}, Invoices: ${uniqueHeaderIds.size}`;
          } else if (uniqueHeaderIds.size === 0) {
            message = `No Invoice got created.`;         }
        

        setSuccessMessage(message);
      } else {
        setSuccessMessage("No Invoices got created , No response from API.");
      }

    } catch (error) {
      console.error("Error fetching sales order headers:", error);
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while fetching the sales orders."
      );
      setSuccessMessage(null);
    }
  };
  

  return (
    <div className="child-container menu-container">
      <h2 className="title">Auto Create Sales Order Invoice</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="sales_order_numbers">
                    Sales Order Numbers:
                  </label>
                </div>
                <input
                  type="text"
                  id="sales_order_numbers"
                  name="sales_order_numbers"
                  value={formData.sales_order_numbers}
                  onChange={handleChange}
                  className="form-control input-field"
                  placeholder="Enter sales order numbers separated by commas"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          {successMessage && (
            <div className="success-message">
              <p>{successMessage}</p>
            </div>
          )}
          {errorMessage && (
            <div className="error-message">
              <p>{errorMessage}</p>
            </div>
          )}
        </div>
      ) : (
        <div>You do not have permission to create a sales order invoice.</div>
      )}
    </div>
  );
}
