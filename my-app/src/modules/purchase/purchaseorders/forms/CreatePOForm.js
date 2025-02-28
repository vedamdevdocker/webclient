import React, { useState, useEffect } from "react";
import axios from "axios";
//import { useNavigate } from "react-router-dom";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_PURCHASE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { PO_ORDER_STATUS, PO_SEQUENCE_PREFIX } from "../../config/config";
import CreatePOLinesModal from "./CreatePOLinesModal";

import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function CreatePOForm() {
  const [formData, setFormData] = useState({
    po_num: "",
    company_id: "",
    department_id: "",
    rfq_header_id: "",
    po_date: "",
    supplier_id: "",
    currency_id: "",
    tax_id: "",
    status: "",
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

  const handleCreatePOLinesSuccess = (response) => {
    setSuccessMessage({
      po_num: response.data.po_num,
      message: response.data.message,
      header_id: response.data.header_id,
      status: response.data.success,
    });

    // Clear the success message after 15 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);

    setFormData({
      po_num: "",
      company_id: "",
      department_id: "",
      rfq_header_id: "",
      po_date: "",
      supplier_id: "",
      currency_id: "",
      tax_id: "",
      status: "",
    });
    setIsFormSubmitted(false); 
  };

  const handleCreatePOLines = () => {
    //console.log("handleCreatePOLines function is called");
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormSubmitted) {
      handleCreatePOLines();
      return;
    }

    const generatedPONumber = generatePONumber();
    console.log(generatedPONumber);

    try {
      const response = await axios.post(
        `${API_URL}/create_purchase_order_header`,
        { ...formData, po_num: generatedPONumber, total_amount: 0 },
        {
          headers: generateHeaders(),
        }
      );
      console.log("Response:", response.data);

      setSuccessMessage({
        po_num: response.data.po_num,
        message: response.data.message,
        header_id: response.data.header_id,
        status: response.data.success,
      });

      if (response.data.success === true) {
        setIsFormSubmitted(true); // Update form submission status
        handleCreatePOLines();
      }

     
    } catch (error) {
      console.error("Error creating purchase order header:", error);
    }
  };

  const generatePONumber = () => {
    const timestamp = new Date().getTime() % 1000; // Extract the last 3 digits of the timestamp
    const randomSuffix = Math.floor(Math.random() * 1000); // Generates a random number with a maximum of 5 digits
    const formattedRandomSuffix = String(randomSuffix).padStart(3, "0"); // Ensures the random number has exactly 5 digits
    const ponumber = `${PO_SEQUENCE_PREFIX}${timestamp}${formattedRandomSuffix}`;

    // Type-cast the generated PONumber to an integer
    return parseInt(ponumber);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Purchase Order Header</h2>

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
                  <label htmlFor="rfq_header_id">RFQ Header:</label>
                </div>
                <input
                  type="text"
                  id="rfq_header_id"
                  name="rfq_header_id"
                  value={formData.rfq_header_id}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="po_date">PO Date:</label>
                </div>
                <input
                  type="date"
                  id="po_date"
                  name="po_date"
                  value={formData.po_date}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="supplier_id">Supplier:</label>
                </div>
                <select
                  id="supplier_id"
                  name="supplier_id"
                  value={formData.supplier_id}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Supplier</option>
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
                  {PO_ORDER_STATUS.map((status) => (
                    <option key={status.short_name} value={status.short_name}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create PO Lines
                </button>
              </div>
            </div>
          </form>
          {successMessage && (
            <div className="success-message">
              <p>
                {`The PO: ${successMessage.po_num}`} {`Created Successfully`}{" "}
              </p>
              <p></p>
            </div>
          )}
          {showModalwindow && (
            <div>
              <CreatePOLinesModal
                showModalwindow={showModalwindow}
                headerId={successMessage.header_id}
                poNumber={successMessage.po_num}
                currencyId={formData.currency_id}
                taxId={formData.tax_id}
                hdr_status={formData.status}
                onClose={handleSuccessModalClose}
                onSuccess={(response) => handleCreatePOLinesSuccess(response)}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          You do not have permission to create a purchase order.
          {logger.warn(
            `[${new Date().toLocaleTimeString()}] Permission denied: User does not have access to create a purchase order. (hasRequiredAccess: ${hasRequiredAccess})`
          )}
        </div>
      )}
    </div>
  );
}
