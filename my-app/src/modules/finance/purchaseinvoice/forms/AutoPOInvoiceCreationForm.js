import React, { useState } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { COMPANY_CONFIG } from "../../config/CompanyConfigs"; // Import the grouped configuration
import * as PurchaseConfig from "../../../purchase/config/config"; // Import everything from purchase config

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function AutoCreateInvoiceFromPOForm() {
  const [formData, setFormData] = useState({
    purchase_order_numbers: "",
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
  
    const purchaseOrderNumbersArray = formData.purchase_order_numbers
      .split(",")
      .map((num) => num.trim())
      .filter((num) => num !== "")
      .map((num) => parseInt(num, 10));
  
    console.log("Entered Purchase orders", purchaseOrderNumbersArray);
  
    if (purchaseOrderNumbersArray.length === 0) {
      const userConfirmed = window.confirm(
        "Are you sure you want to create invoices for all purchase orders?"
      );
      if (!userConfirmed) {
        return;
      }
    }
  
    try {
      // Fetch purchase order headers
      const response = await axios.get(`${API_URL}/get_purchase_order_headers`, {
        headers: generateHeaders(),
      });
      const purchaseOrders = response.data;
  
      // Get the list of statuses that have autoinvoice set to true
      const autoinvoiceStatuses = PurchaseConfig.PO_ORDER_STATUS.filter(
        (status) => status.autoinvoice
      ).map((status) => status.short_name);
  
      // Filter purchase orders based on validation
      const filteredPurchaseOrders = purchaseOrders.filter((order) => {
        const { po_num, status } = order;
  
        // Check if status is in the po_order_status_filter and has autoinvoice true
        if (!autoinvoiceStatuses.includes(status)) {
          return false; // Exclude if status doesn't have autoinvoice true
        }
  
        return purchaseOrderNumbersArray.includes(po_num); // Include if it passes all checks
      });
  
      console.log(
        "Filtered final orders to be sent to POST API",
        filteredPurchaseOrders
      );
  
      // Group the filtered purchase orders by company_id
      const purchaseOrdersGroupedByCompanyId = filteredPurchaseOrders.reduce(
        (acc, order) => {
          const { company_id, po_num } = order;
          if (!acc[company_id]) {
            acc[company_id] = [];
          }
          acc[company_id].push(po_num);
          return acc;
        },
        {}
      );
  
      console.log(
        "Grouped Purchase orders by company",
        purchaseOrdersGroupedByCompanyId
      );
  
      // Initialize an array to collect results
      const results = [];
  
      // Make the POST API calls for each company_id
      for (const companyId in purchaseOrdersGroupedByCompanyId) {
        // Check if the config exists for the company_id
        const companyConfig =
          COMPANY_CONFIG[companyId]?.AUTO_PURCHASE_INVOICE_CONFIG;
        if (!companyConfig) {
          console.log(
            "There is no AUTO_PURCHASE_INVOICE_CONFIG setup for the company ",
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
            "AUTO_PURCHASE_INVOICE_CONFIG Debit distribution % is not the same as Credit's for the company setup",
            companyId
          );
          continue; // Skip this iteration if the sums don't match
        }
  
        const requestData = {
          purchase_order_numbers: purchaseOrdersGroupedByCompanyId[companyId],
          created_by: localStorage.getItem("userid"),
          ...companyConfig,
        };
  
        try {
          const postResponse = await axios.post(
            `${API_URL}/auto_create_po_pi`,
            requestData,
            {
              headers: generateHeaders(),
            }
          );
  
          // Log the entire response
          console.log("Respose from API call Group by Company", companyId, postResponse.data);
  
          // Collect the response for processing later
          results.push(postResponse.data);
        } catch (postError) {
          console.error("Error creating purchase invoice:", postError);
          setErrorMessage(
            postError.response && postError.response.data
              ? postError.response.data.message
              : "An error occurred while creating the purchase invoice."
          );
          setSuccessMessage(null);
          return; // Exit the function if there's an error
        }
      }
  
      // Process collected results
      if (results.length > 0) {
        // Flatten results and process
        const allInvoices = results.flatMap(result => result.invoices || []);
        const uniqueHeaderIds = new Set(allInvoices.map(inv => inv.header_response.header_id));
        const uniqueHeaderCount = uniqueHeaderIds.size;
        const purchaseOrderCount = purchaseOrderNumbersArray.length;
  
        let message = "";
        if (uniqueHeaderCount === 1 && purchaseOrderCount === 1) {
          message = `Invoice is created for the single purchase order. POs: ${purchaseOrderCount}, Invoices: ${uniqueHeaderCount}`;
        } else if (uniqueHeaderCount === purchaseOrderCount) {
          message = `Invoices are created for all the purchase orders. POs: ${purchaseOrderCount}, Invoices: ${uniqueHeaderCount}`;
        } else if (uniqueHeaderCount < purchaseOrderCount) {
          message = `Invoices are not created for all the purchase orders. POs: ${purchaseOrderCount}, Invoices: ${uniqueHeaderCount}`;
        } else if (uniqueHeaderCount > purchaseOrderCount) {
          message = `There are more invoices created than purchase orders. POs: ${purchaseOrderCount}, Invoices: ${uniqueHeaderCount}`;
        } else if (uniqueHeaderCount === 0) {
          message = `No invoice got created.`;
        }
        
  
        setSuccessMessage(message);
      } else {
        setSuccessMessage("No Invoices got created , No response from API.");
      }
    } catch (error) {
      console.error("Error fetching purchase order headers:", error);
      setErrorMessage(
        error.response && error.response.data
          ? error.response.data.message
          : "An error occurred while fetching the purchase orders."
      );
      setSuccessMessage(null);
    }
  };    

  return (
    <div className="child-container menu-container">
      <h2 className="title">Auto Create Purchase Order Invoice</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="purchase_order_numbers">
                    Purchase Order Numbers:
                  </label>
                </div>
                <input
                  type="text"
                  id="purchase_order_numbers"
                  name="purchase_order_numbers"
                  value={formData.purchase_order_numbers}
                  onChange={handleChange}
                  className="form-control input-field"
                  placeholder="Enter purchase order numbers separated by commas"
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
        <div>
          You do not have permission to create a purchase order invoice.
        </div>
      )}
    </div>
  );
}
