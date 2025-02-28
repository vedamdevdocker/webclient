import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_SALES_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { UPDATABLE_SO_ORDER_STATUS } from "../../config/config";
import logger from "../../../utilities/Logs/logger";
import UpdateSOLineModalForm from "./UpdateSOLineModalForm";

export default function UpdateSOHeaderForm() {
  const { SOParameters } = useParams();

  const [formData, setFormData] = useState({
    so_num: "",
    company_id: "",
    department_id: "",
    currency_id: "",
    status: "",
    tax_id: "",
    total_amount: "",
    customer_id: "",
    so_date: "",
    payment_duedate: "",
    payment_terms: "",
    shipping_method: "", // New field
    billing_address: "", // New field
    shipping_address: "", // New field
    rep_id: "", // New field
    comments: "", // New field
  });

  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [partners, setPartners] = useState([]);
  const [taxes, setTaxes] = useState([]);
  const [selectedSONumber, setSalesOrderNumber] = useState(null);
  const [salesHeader, setSalesOrderHeader] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showLinesModalWindow, setShowLinesModalWindow] = useState(false);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState("");
  const [selectedTaxId, setSelectedTaxId] = useState("");
  const [totalSum, setTotalSum] = useState(0);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [soTotal, setSOTotal] = useState(0);

  const [selectedCurrencyCode, setSelectedCurrencyCode] = useState("");
  const [selectedCurrencySymbol, setSelectedCurrencySymbol] = useState("");
  const [selectedTaxCode, setSelectedTaxCode] = useState("");
  const [selectedTaxRate, setSelectedTaxRate] = useState("");

  const [selectedShippingMethod, setSelectedShippingMethod] = useState("");
  const [selectedShippingAddress, setSelectedShippingAddress] = useState("");
  const [selectedBillingAddress, setSelectedBillingAddress] = useState("");
  const [selectedRepId, setSelectedRepId] = useState("");
  const [selectedComments, setSelectedComments] = useState("");


  const [selectedStatus, setSelectedStatus] = useState("");

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_SALES_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_URL}/get_sales_order_headers`;
        if (SOParameters) {
          const queryParams = new URLSearchParams(SOParameters);
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        const salesOrderHeaders = response.data;
        if (salesOrderHeaders.length > 0) {
          const firstSalesOrder = salesOrderHeaders[0];
          setSalesOrderHeader(firstSalesOrder.header_id);
          setSelectedCompany(firstSalesOrder.company_id);
          setSelectedCurrencyId(firstSalesOrder.currency_id);
          setSalesOrderNumber(firstSalesOrder.so_num);
          setSelectedTaxId(firstSalesOrder.tax_id);
          setTotalSum(firstSalesOrder.total_amount);
          setSelectedDepartment(firstSalesOrder.department_id);
          setSelectedStatus(firstSalesOrder.status);
          setSelectedCurrencyCode(firstSalesOrder.currencyCode);
          setSelectedCurrencySymbol(firstSalesOrder.currencySymbol);
          setSelectedTaxCode(firstSalesOrder.tax_code);
          setSelectedTaxRate(firstSalesOrder.tax_rate);

          setSelectedShippingMethod(firstSalesOrder.shipping_method);
          setSelectedBillingAddress(firstSalesOrder.billing_address);
          setSelectedShippingAddress(firstSalesOrder.shipping_address);
          setSelectedRepId(firstSalesOrder.rep_id);
          setSelectedComments(firstSalesOrder.comments);

          console.log(firstSalesOrder);
          await Promise.all([
            getDepartments(firstSalesOrder.company_id),
            getCurrencies(),
            getTaxCodes(),
            getBusinessPartners(),
            getCompanies(),
          ]);

          setFormData({
            so_num: firstSalesOrder.so_num,
            company_id: firstSalesOrder.company_id,
            department_id: firstSalesOrder.department_id,
            currency_id: firstSalesOrder.currency_id,
            status: firstSalesOrder.status,
            tax_id: firstSalesOrder.tax_id,
            total_amount: firstSalesOrder.total_amount,
            customer_id: firstSalesOrder.customer_id,
            so_date: new Date(firstSalesOrder.so_date)
              .toISOString()
              .split("T")[0],
            payment_duedate: firstSalesOrder.payment_duedate || "", // Added fields with default empty string
            payment_terms: firstSalesOrder.payment_terms || "", // Added fields with default empty string
            shipping_method: firstSalesOrder.shipping_method || "", // New field
            billing_address: firstSalesOrder.billing_address || "", // New field
            shipping_address: firstSalesOrder.shipping_address || "", // New field
            rep_id: firstSalesOrder.rep_id || "", // New field
            comments: firstSalesOrder.comments || "", // New field
          });

          logger.info(
            `[${new Date().toLocaleTimeString()}] Fetched Sales data successfully`
          );
        } else {
          console.log("No updatable saless found in the database");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching Sales data`,
          error
        );
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const getDepartments = async (companyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_departments?company_id=${companyId}`,
        {
          headers: generateHeaders(),
        }
      );

      setDepartments(response.data.department_list);
    } catch (error) {
      logger.error(`Error fetching departments:`, error);
    }
  };

  const getCurrencies = async () => {
    try {
      const currenciesResponse = await axios.get(`${API_URL}/list_currencies`, {
        headers: generateHeaders(),
      });
      setCurrencies(currenciesResponse.data.currencies);
    } catch (error) {
      logger.error(`Error fetching Currencies:`, error);
    }
  };

  const getTaxCodes = async () => {
    try {
      const taxesResponse = await axios.get(`${API_URL}/list_tax_codes`, {
        headers: generateHeaders(),
      });
      setTaxes(taxesResponse.data.taxes);
    } catch (error) {
      logger.error(`Error fetching Tax codes:`, error);
    }
  };

  const getBusinessPartners = async () => {
    try {
      const partnersResponse = await axios.get(`${API_URL}/get_partner_data`, {
        headers: generateHeaders(),
      });
      setPartners(partnersResponse.data);
    } catch (error) {
      logger.error(`Error fetching Business partners:`, error);
    }
  };

  const getCompanies = async () => {
    try {
      const companiesResponse = await axios.get(`${API_URL}/get_companies`, {
        headers: generateHeaders(),
      });
      setCompanies(companiesResponse.data.company_list);
    } catch (error) {
      logger.error(`Error fetching companies:`, error);
    }
  };

  const handleCompanyChange = async (companyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_departments?company_id=${companyId}`,
        { headers: generateHeaders() }
      );
      setDepartments(response.data.department_list);
      setSelectedCompany(companyId);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormDirty(true);

    if (name === "currency_id") {
      setSelectedCurrencyId(value);
    }

    if (name === "tax_id") {
      setSelectedTaxId(value);
    }

    if (name === "company_id") {
      setSelectedCompany(value);
    }

    if (name === "department_id") {
      setSelectedDepartment(value);
    }

    if (name === "status") {
      setSelectedStatus(value);
    }
  };

  const handleSuccessLinesModalClose = () => {
    setShowLinesModalWindow(false);
  };

  const handleUpdateSOLinesSuccess = (response) => {
    const { message } = response.data;

    setSuccessMessage(
      `Header Id: ${salesHeader}, Message: ${message} , SO Total: ${soTotal}`
    );

    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);

    setIsFormSubmitted(true);
  };

  const handleUpdateLines = async (e) => {
    setShowLinesModalWindow(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      so_date: formData.so_date,
      company_id: formData.company_id
        ? parseInt(formData.company_id, 10)
        : null,
      department_id: formData.department_id
        ? parseInt(formData.department_id, 10)
        : null,
      customer_id: formData.customer_id
        ? parseInt(formData.customer_id, 10)
        : null,
      currency_id: formData.currency_id
        ? parseInt(formData.currency_id, 10)
        : null,
      tax_id: formData.tax_id ? parseInt(formData.tax_id, 10) : null,
      status: formData.status,
      payment_terms: formData.payment_terms, // Added fields with default empty string
      shipping_method: formData.shipping_method, // New field
      billing_address: formData.billing_address, // New field
      shipping_address: formData.shipping_address, // New field
      rep_id: formData.rep_id, // New field
      comments: formData.comments, // New field
      //total_amount: formData.total_amount,
    };

    console.log("Data send to back end ", updatedFormData);
    try {
      console.log("Form data to update,", updatedFormData);
      const response = await axios.put(
        `${API_URL}/update_sales_order_header?so_num=${selectedSONumber}`,
        updatedFormData,
        {
          "Content-Type": "application/json", // Ensure the Content-Type is set to JSON
          headers: generateHeaders(),
        }
      );

      if (response.data.status) {
        setSuccessMessage(response.data.message);
        // Handle success scenario, reset form, show success message, etc.
      } else {
        setError(response.data.error);
        // Handle error scenario
      }
      setIsFormSubmitted(true);
      setIsFormDirty(false); // Reset form dirty state after submission
    } catch (error) {
      console.error("Error updating data:", error);
      setError("An error occurred while updating data.");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2>Update Sales Order Headers</h2>
      {hasRequiredAccess ? (
        <>
          {successMessage && (
            <div className="success-message">{successMessage}</div>
          )}
          {error && <div className="error-message">{error}</div>}
          <div className="child-container form-container">
            <form onSubmit={handleFormSubmit}>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="so_num">SO Number:</label>
                  </div>
                  <div className="input-container input-field">
                    <input
                      type="text"
                      id="so_num"
                      name="so_num"
                      className="form-control"
                      value={formData.so_num}
                      onChange={handleChange}
                      readOnly
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="company_id">Company Name:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="company_id"
                      name="company_id"
                      className="form-control"
                      value={selectedCompany}
                      onChange={(e) => {
                        handleChange(e);
                        handleCompanyChange(e.target.value);
                      }}
                      required
                    >
                      <option value="">Select a Company</option>
                      {companies.map((company) => (
                        <option
                          key={company.company_id}
                          value={company.company_id}
                        >
                          {company.company_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="department_id">Department:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="department_id"
                      name="department_id"
                      className="form-control"
                      value={selectedDepartment}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Department</option>
                      {departments.map((department) => (
                        <option key={department.id} value={department.id}>
                          {department.department_name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="so_date">Order Date:</label>
                  </div>
                  <div className="input-container">
                    <input
                      type="date"
                      id="so_date"
                      name="so_date"
                      className="form-control"
                      value={formData.so_date}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="customer_id">Customer:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="customer_id"
                      name="customer_id"
                      className="form-control"
                      value={formData.customer_id}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Customer</option>
                      {partners.map((partner) => (
                        <option
                          key={partner.partnerid}
                          value={partner.partnerid}
                        >
                          {partner.partnername}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="currency_id">Currency:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="currency_id"
                      name="currency_id"
                      className="form-control"
                      value={selectedCurrencyId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Currency</option>
                      {currencies.map((currency) => (
                        <option
                          key={currency.currency_id}
                          value={currency.currency_id}
                        >
                          {currency.currencycode} ( {currency.currencysymbol})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="tax_id">Tax Code:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="tax_id"
                      name="tax_id"
                      className="form-control"
                      value={selectedTaxId}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select a Tax Code</option>
                      {taxes.map((tax) => (
                        <option key={tax.tax_id} value={tax.tax_id}>
                          {tax.tax_code}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="total_amount">Total Amount:</label>
                  </div>
                  <div className="input-container">
                    <input
                      type="number"
                      id="total_amount"
                      name="total_amount"
                      className="form-control"
                      value={totalSum}
                      readOnly
                    />
                  </div>
                </div>
              </div>

              {/* Status Select */}
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="status">Status:</label>
                  </div>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    className="form-control"
                    required
                    disabled={isFormSubmitted} // Disable if form is submitted
                  >
                    <option value="">Select Status</option>
                    {UPDATABLE_SO_ORDER_STATUS.filter(
                      (status) => status.short_name
                    ).map((status) => (
                      <option key={status.short_name} value={status.short_name}>
                        {status.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="payment_terms">Payment Terms:</label>
                  </div>
                  <input
                    type="text"
                    id="payment_terms"
                    name="payment_terms"
                    value={formData.payment_terms}
                    onChange={handleChange}
                    className="form-control input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="shipping_method">Shipping Method:</label>
                  </div>
                  <input
                    type="text"
                    id="shipping_method"
                    name="shipping_method"
                    value={formData.shipping_method}
                    onChange={handleChange}
                    className="form-control input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="billing_address">Billing Address:</label>
                  </div>
                  <input
                    type="text"
                    id="billing_address"
                    name="billing_address"
                    value={formData.billing_address}
                    onChange={handleChange}
                    className="form-control input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="shipping_address">Shipping Address:</label>
                  </div>
                  <input
                    type="text"
                    id="shipping_address"
                    name="shipping_address"
                    value={formData.shipping_address}
                    onChange={handleChange}
                    className="form-control input-field"
                    required
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="rep_id">Rep ID:</label>
                  </div>
                  <input
                    type="text"
                    id="rep_id"
                    name="rep_id"
                    value={formData.rep_id}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="comments">Comments:</label>
                  </div>
                  <input
                    type="text"
                    id="comments"
                    name="comments"
                    value={formData.comments}
                    onChange={handleChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={!isFormDirty || isFormSubmitted} // Disable if form is not dirty or already submitted
                  >
                    Submit
                  </button>
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <button
                    type="button"
                    disabled={!isFormSubmitted && isFormDirty} // Enable if form is submitted or if any change is made to form fields
                    onClick={() => handleUpdateLines()}
                  >
                    Lines
                  </button>
                </div>
              </div>
            </form>
          </div>

          {showLinesModalWindow && (
            <UpdateSOLineModalForm
              showLinesModalWindow={showLinesModalWindow}
              headerId={salesHeader}
              currencyId={selectedCurrencyId}
              sonumber={selectedSONumber}
              currencyCode={selectedCurrencyCode}
              currencySymbol={selectedCurrencySymbol}
              tax_id={selectedTaxId}
              tax_code={selectedTaxCode}
              tax_rate={selectedTaxRate}
              setTotalSum={totalSum}
              headerStatus={selectedStatus}
              setSOTotal={setSOTotal}
              onClose={handleSuccessLinesModalClose} // Close modal window function
              onSuccess={(response) => handleUpdateSOLinesSuccess(response)}
            />
          )}
        </>
      ) : (
        <p>You do not have access to this module.</p>
      )}
    </div>
  );
}
