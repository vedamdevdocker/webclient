import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_PURCHASE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { SO_ORDER_STATUS, SO_SEQUENCE_PREFIX } from "../../config/config";
import CreateSOLinesModal from "./CreateSOLinesModal";

import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function CreateSOForm() {
  const [formData, setFormData] = useState({
    so_num: "",
    company_id: "",
    department_id: "",
    opportunity_id: "",
    so_date: "",
    customer_id: "",
    currency_id: "",
    tax_id: "",
    status: "",
    payment_terms: "",
    shipping_method: "",
    billing_address: "",
    shipping_address: "",
    rep_id: "",
    total_amount: 0,
    comments: "",
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [taxCodes, setTaxCodes] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false); 
  const [showModalwindow, setShowModal] = useState(false);

  const handleSuccessModalClose = () => {
    setShowModal(false);
    //setSuccessMessage(null);
  };

  //const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_PURCHASE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleCreateSOLinesSuccess = (response) => {
    setSuccessMessage({
      so_num: response.data.so_num,
      message: response.data.message,
      header_id: response.data.header_id,
      status: response.data.success,
    });

    // Clear the success message after 15 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);

    setFormData({
      so_num: "",
      company_id: "",
      department_id: "",
      opportunity_id: "",
      so_date: "",
      customer_id: "",
      currency_id: "",
      tax_id: "",
      status: "",
      payment_terms: "",
      shipping_method: "",
      billing_address: "",
      shipping_address: "",
      rep_id: "",
      total_amount: 0,
      comments: "",
    });
    setIsFormSubmitted(false); 
  };

  const handleCreateSOLines = () => {
    //console.log("handleCreateSOLines function is called");
    setShowModal(true);
  };

  useEffect(() => {
    async function fetchData() {
      try {
        const companiesResponse = await axios.get(`${API_URL}/get_companies`, {
          headers: generateHeaders(),
        });
        setCompanies(companiesResponse.data.company_list);

        const currenciesResponse = await axios.get(
          `${API_URL}/list_currencies`,
          {
            headers: generateHeaders(),
          }
        );
        setCurrencies(currenciesResponse.data.currencies);

        // Fetch suppliers
        const suppliersResponse = await axios.get(
          `${API_URL}/get_partner_data`,
          {
            headers: generateHeaders(),
          }
        );
        setSuppliers(suppliersResponse.data || []);

        // Fetch tax codes
        const taxCodesResponse = await axios.get(`${API_URL}/list_tax_codes`, {
          headers: generateHeaders(),
        });
        setTaxCodes(taxCodesResponse.data.taxes);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleCompanyChange = async (companyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_departments?company_id=${companyId}`,
        {
          headers: generateHeaders(),
        }
      );
      setDepartments(response.data.department_list);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  /*const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isFormSubmitted) {
      handleCreateSOLines();
      return;
    }
  
    const generatedSONumber = generateSONumber();
    console.log(generatedSONumber);
  
    // Update the formData state with the generated SONumber
    setFormData((prevFormData) => ({
      ...prevFormData,
      so_num: generatedSONumber,
      total_amount: 1500.00,
    }));
  
    // Wait for the state to update before proceeding
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    try {
      // Use the updated formData state
      const updatedFormData = { ...formData, so_num: generatedSONumber, total_amount: 1500.00 };

      for (const key in updatedFormData) {
        if (key.endsWith("_id") && updatedFormData[key] !== "") {
          updatedFormData[key] = parseInt(updatedFormData[key], 10);
        }
      }
  
      console.log("Form Data:", updatedFormData);
      console.log("SO Num:", generatedSONumber);
  
      const response = await axios.post(
        `${API_URL}/create_sales_order_header`,
        updatedFormData,
        {
          headers: generateHeaders(),
        }
      );
      console.log("Response:", response.data);
  
      setSuccessMessage({
        so_num: response.data.so_num,
        message: response.data.message,
        header_id: response.data.header_id,
        status: response.data.success,
      });
  
      if (response.data.success === true) {
        setIsFormSubmitted(true); // Update form submission status
        handleCreateSOLines();
      }
  
    } catch (error) {
      console.error("Error creating sales order header:", error);
    }
  };*/

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (isFormSubmitted) {
      handleCreateSOLines();
      return;
    }
  
    const generatedSONumber = generateSONumber();
    console.log(generatedSONumber);
  
    // Update the formData state with the generated SONumber
    setFormData((prevFormData) => ({
      ...prevFormData,
      so_num: generatedSONumber
    }));
  
    // Wait for the state to update before proceeding
    await new Promise((resolve) => setTimeout(resolve, 0));
  
    try {
      // Create the updated form data object with the generated SONumber
      const updatedFormData = {
        ...formData,
        so_num: generatedSONumber
      };
  
      // Typecast fields ending with _id to integers and pass fields with no value as null
      const updatedFormDataWithTypes = Object.keys(updatedFormData).reduce((acc, key) => {
        const value = updatedFormData[key];
        if (key.endsWith("_id")) {
          acc[key] = value !== "" ? parseInt(value) : null;
        } else {
          acc[key] = value === "" ? null : value;
        }
        return acc;
      }, {});
  
      console.log("Form Data:", updatedFormDataWithTypes);
      console.log("SO Num:", generatedSONumber);
  
      const response = await axios.post(
        `${API_URL}/create_sales_order_header`,
        updatedFormDataWithTypes,
        {
          headers: generateHeaders(),
        }
      );
      console.log("Response:", response.data);
  
      setSuccessMessage({
        so_num: response.data.so_num,
        message: response.data.message,
        header_id: response.data.header_id,
        status: response.data.success,
      });
  
      if (response.data.success === true) {
        setIsFormSubmitted(true); // Update form submission status
        handleCreateSOLines();
      }
  
    } catch (error) {
      console.error("Error creating sales order header:", error);
    }
  };
  
  
  


  const generateSONumber = () => {
    const timestamp = new Date().getTime() % 1000; // Extract the last 3 digits of the timestamp
    const randomSuffix = Math.floor(Math.random() * 1000); // Generates a random number with a maximum of 5 digits
    const formattedRandomSuffix = String(randomSuffix).padStart(3, "0"); // Ensures the random number has exactly 5 digits
    const ponumber = `${SO_SEQUENCE_PREFIX}${timestamp}${formattedRandomSuffix}`;

    // Type-cast the generated SONumber to an integer
    return parseInt(ponumber);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Sales Order Header</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="company_id">Company:</label>
                </div>
                <select
                  id="company_id"
                  name="company_id"
                  value={formData.company_id}
                  onChange={(e) => {
                    handleChange(e);
                    handleCompanyChange(e.target.value);
                  }}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Company</option>
                  {companies.map((company) => (
                    <option key={company.company_id} value={company.company_id}>
                      {company.company_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="department_id">Department:</label>
                </div>
                <select
                  id="department_id"
                  name="department_id"
                  value={formData.department_id}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Department</option>
                  {departments.map((department) => (
                    <option key={department.id} value={department.id}>
                      {department.department_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="opportunity_id">RFQ Header:</label>
                </div>
                <input
                  type="text"
                  id="opportunity_id"
                  name="opportunity_id"
                  value={formData.opportunity_id}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="so_date">SO Date:</label>
                </div>
                <input
                  type="date"
                  id="so_date"
                  name="so_date"
                  value={formData.so_date}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="customer_id">Customer:</label>
                </div>
                <select
                  id="customer_id"
                  name="customer_id"
                  value={formData.customer_id}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Customer</option>
                  {suppliers.map((supplier) => (
                    <option key={supplier.partnerid} value={supplier.partnerid}>
                      {supplier.partnername}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="currency_id">Currency:</label>
                </div>
                <select
                  id="currency_id"
                  name="currency_id"
                  value={formData.currency_id}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Currency</option>
                  {currencies.map((currency) => (
                    <option
                      key={currency.currency_id}
                      value={currency.currency_id}
                    >
                      {`${currency.currencycode} (${currency.currencysymbol})`}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="tax_id">Tax Code:</label>
                </div>
                <select
                  id="tax_id"
                  name="tax_id"
                  value={formData.tax_id}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Tax Code</option>
                  {taxCodes.map((tax) => (
                    <option key={tax.tax_id} value={tax.tax_id}>
                      {tax.tax_code} ({tax.tax_rate} %)
                    </option>
                  ))}
                </select>
              </div>
            </div>

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
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Status</option>
                  {SO_ORDER_STATUS.map((status) => (
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
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
          {successMessage && (
            <div className="success-message">
              <p>
                {`The SO: ${successMessage.so_num}`} {`Created Successfully`}{" "}
              </p>
              <p></p>
            </div>
          )}
          {showModalwindow && (
            <div>
              <CreateSOLinesModal
                showModalwindow={showModalwindow}
                headerId={successMessage.header_id}
                poNumber={successMessage.so_num}
                currencyId={formData.currency_id}
                taxId={formData.tax_id}
                hdr_status={formData.status}
                onClose={handleSuccessModalClose}
                onSuccess={(response) => handleCreateSOLinesSuccess(response)}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          You do not have permission to create a sales order.
          {logger.warn(
            `[${new Date().toLocaleTimeString()}] Permission denied: User does not have access to create a sales order. (hasRequiredAccess: ${hasRequiredAccess})`
          )}
        </div>
      )}
    </div>
  );
}
