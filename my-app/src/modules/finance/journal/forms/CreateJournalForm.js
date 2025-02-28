import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import {
  JOURNAL_STATUS,
  JOURNAL_TYPES,
  JO_SEQUENCE_PREFIX,
} from "../../config/config";
import CreateJournalLineModalForm from "./CreateJournalLineModalForm";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function CreateJournalForm() {
  const [formData, setFormData] = useState({
    company_id: "",
    department_id: "",
    journal_date: "",
    journal_type: "",
    description: "",
    currency_id: "",
    status: "",
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showModalWindow, setShowModal] = useState(false);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState("");

  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleSuccessModalClose = () => {
    setShowModal(false);
    //setSuccessMessage(null);
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
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const getCurrenyCode = (currencyId) => {
    // Convert currencyId to an integer (if it's not already)
    currencyId = parseInt(currencyId);
    const currency = currencies.find(
      (currency) => currency.currency_id === currencyId
    );
    const currencyCode = currency ? currency.currencycode : "";
    return currencyCode;
  };

  const getCurrencySymbol = (currencyId) => {
    currencyId = parseInt(currencyId);
    const currency = currencies.find(
      (currency) => currency.currency_id === currencyId
    );
    const currencySymbol = currency ? currency.currencysymbol : "";
    return currencySymbol;
  };

  const handleCompanyChange = async (companyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_departments?company_id=${companyId}`,
        { headers: generateHeaders() }
      );
      setDepartments(response.data.department_list);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };
  const handleCreateJOLinesSuccess = (response) => {
    setSuccessMessage({
      journal_number: response.data.journal_number,
      message: response.data.message,
      header_id: response.data.header_id,
      status: response.data.success,
    });

    // Clear the success message after 15 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);

    setFormData({
      company_id: "",
      department_id: "",
      journal_date: "",
      journal_type: "",
      description: "",
      currency_id: "",
      status: "",
    });
    setIsFormSubmitted(false);
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update selectedCurrencyId when currency_id is changed
    if (name === "currency_id") {
      setSelectedCurrencyId(value);
    }

    if (name === "company_id") {
      setSelectedCompany(value);
    }

    if (name === "department_id") {
      setSelectedDepartment(value);
    }

    

  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isFormSubmitted) {
      handleCreateJOLines();
      return;
    }

    const generatedJournalNumber = generateJournalNumber();

    try {
      const response = await axios.post(
        `${API_URL}/create_journal_header`,
        {
          ...formData,
          journal_number: generatedJournalNumber,
        },
        { headers: generateHeaders() }
      );
      setSuccessMessage({
        header_id: response.data.header_id,
        journal_number: response.data.journal_number,
        status: response.data.status,
        currency_id: response.data.currency_id,
      });

      if (response.data.success === true) {
        setIsFormSubmitted(true); // Update form submission status
        handleCreateJOLines();
      }
    } catch (error) {
      console.error("Error creating journal header:", error);
    } finally {
      setFormData({
        company_id: "",
        department_id: "",
        journal_date: "",
        journal_type: "",
        description: "",
        currency_id: "",
        status: "",
      });
    }
  };

  const handleCreateJOLines = () => {
    setShowModal(true);
  };

  const generateJournalNumber = () => {
    const timestamp = new Date().getTime() % 1000; // Extract the last 3 digits of the timestamp
    const randomSuffix = Math.floor(Math.random() * 1000); // Generates a random number with a maximum of 5 digits
    const formattedRandomSuffix = String(randomSuffix).padStart(3, "0"); // Ensures the random number has exactly 5 digits
    const journalNumber = `${JO_SEQUENCE_PREFIX}${timestamp}${formattedRandomSuffix}`;

    // Type-cast the generated Journal Number to an integer
    return parseInt(journalNumber);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Journal Header</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            {/* Company Select */}
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

            {/* Department Select */}
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

            {/* Journal Date */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="journal_date">Journal Date:</label>
                </div>
                <input
                  type="date"
                  id="journal_date"
                  name="journal_date"
                  value={formData.journal_date}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                />
              </div>
            </div>

            {/* Journal Type */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="journal_type">Journal Type:</label>
                </div>
                <select
                  id="journal_type"
                  name="journal_type"
                  value={formData.journal_type}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Journal Type</option>
                  {JOURNAL_TYPES.map((type) => (
                    <option key={type.code} value={type.code}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="description">Description:</label>
                </div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                />
              </div>
            </div>

            {/* Currency Select */}
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
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Status</option>
                  {JOURNAL_STATUS.filter((status) => status.display).map(
                    (status) => (
                      <option key={status.code} value={status.code}>
                        {status.name}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Journal Header
                </button>
              </div>
            </div>
          </form>

          {successMessage && showModalWindow && (
            <div>
              <CreateJournalLineModalForm
                showModalWindow={showModalWindow}
                headerId={successMessage.header_id}
                companyId={selectedCompany}
                departmentId={selectedDepartment}
                journalNumber={successMessage.journal_number}
                status={successMessage.status}
                currencyId={successMessage.currency_id}
                currencyCode={getCurrenyCode(selectedCurrencyId)} // Pass currency code based on currency_id
                currencySymbol={getCurrencySymbol(selectedCurrencyId)} // Pass currency symbol based on currency_id
                onClose={handleSuccessModalClose}
                onSuccess={(response) => handleCreateJOLinesSuccess(response)}
              />
            </div>
          )}
        </div>
      ) : (
        <div>You do not have permission to create a journal header.</div>
      )}
    </div>
  );
}
