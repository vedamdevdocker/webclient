import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { ACCOUNT_TYPES, ACCOUNT_CATEGORY } from "../../config/config";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button } from "react-bootstrap";
import withAccessControl from "../../../security/modulepermissions/AccessControlWrapper";
export default withAccessControl("FINANCE", "CREATE")(CreateAccountForm);

function CreateAccountForm() {
  const [formData, setFormData] = useState({
    account_number: "",
    account_name: "",
    account_category: "",
    account_type: "",
    opening_balance: 0,
    currency_id: "",
    bank_name: "",
    branch_name: "",
    account_holder_name: "",
    is_active: true,
    company_id: "",
    department_id: "",
    default_account: "",
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => setShowSuccessModal(false);
  const handleShow = () => setShowSuccessModal(true);

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
      } catch (error) {
        logger.error(`Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
      // Add other headers if needed
    };
  };

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
      logger.error(`Error fetching departments:`, error);
    }
  };

  /*const handleChange = (e) => {

    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Set current_balance to opening_balance
    if (e.target.name === "opening_balance") {
      setFormData((prevData) => ({
        ...prevData,
        current_balance: e.target.value,
      }));
    }
  };*/

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
      // Set current_balance to opening_balance
      current_balance:
        name === "opening_balance" ? newValue : prevData.current_balance,
      // Add logic for default_account checkbox
      default_account:
        name === "default_account" ? checked : prevData.default_account,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Generate today's date in the format DDMMYYYY
    const today = new Date();
    const day = String(today.getDate()).padStart(2, "0");
    const month = String(today.getMonth() + 1).padStart(2, "0"); // January is 0!
    const year = today.getFullYear().toString().slice(-2);
    const currentDate = day + month + year;
    let accountName = "";

    // Generate a random 5-digit number
    const randomDigits = Math.floor(10000 + Math.random() * 90000) % 90000;
    const formattedRandomDigits = String(randomDigits).padStart(5, "0");
    // Combine date and random digits to create a unique identifier
    const uniqueIdentifier = currentDate + formattedRandomDigits;
    if (formData.account_name !== "") {
      accountName = `${formData.account_name}-${uniqueIdentifier}`;
    } else {
      accountName = uniqueIdentifier;
    }

    // Modify account_number and account_name before submitting to the database
    const modifiedFormData = {
      ...formData,
      account_number: `${formData.company_id}-${formData.department_id}-${uniqueIdentifier}`,
      account_name: `${accountName}`,
      default_account: formData.default_account ? true : null, // Convert false to null
    };

    try {
      const response = await axios.post(
        `${API_URL}/create_account`,
        modifiedFormData,
        {
          headers: generateHeaders(),
        }
      );
      handleShow(); // Show the success modal
      setSuccessMessage(
        `Account Number: ${modifiedFormData.account_number},` +
          ` Account Name: ${modifiedFormData.account_name}`
      );

      setErrorMessage(""); // Clear error message if any
      logger.debug(
        `[${new Date().toLocaleTimeString()}] Accounts data:`,
        response.data
      );

      // Reset form data
      setFormData({
        account_number: "",
        account_name: "",
        account_category: "",
        account_type: "",
        opening_balance: 0,
        current_balance: "", // Set current_balance to an appropriate default value
        currency_id: "",
        bank_name: "",
        branch_name: "",
        account_holder_name: "",
        is_active: true,
        company_id: "",
        department_id: "",
        default_account: "",
      });
    } catch (error) {
      console.error("Error creating account:", error);
      setErrorMessage(`Error creating account: ${error.message}`);
      setSuccessMessage(""); // Clear success message if any
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Account</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Company field */}
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

          {/* Department field */}
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

          {/* Account Name field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="account_name">Account Name:</label>
              </div>
              <input
                type="text"
                id="account_name"
                name="account_name"
                value={formData.account_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Account Category field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="account_category">Account Category:</label>
              </div>
              <select
                id="account_category"
                name="account_category"
                value={formData.account_category}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Account Category</option>
                {ACCOUNT_CATEGORY.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Account Type field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="account_type">Account Type:</label>
              </div>
              <select
                id="account_type"
                name="account_type"
                value={formData.account_type}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Account Type</option>
                {ACCOUNT_TYPES.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Opening Balance field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="opening_balance">Opening Balance:</label>
              </div>
              <input
                type="text"
                id="opening_balance"
                name="opening_balance"
                value={formData.opening_balance}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Currency field */}
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
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option
                    key={currency.currency_id}
                    value={currency.currency_id}
                  >
                    {currency.currencycode} ({currency.currencysymbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

         
          <label>
            <input
              type="checkbox"
              id="default_account"
              name="default_account"
              checked={formData.default_account}
              onChange={handleChange}
            />
            Default Account
          </label>

          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Account
              </button>
            </div>
          </div>
        </form>
        {/* Display success message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
