import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { JOURNAL_STATUS, JOURNAL_TYPES } from "../../config/config";
import logger from "../../../utilities/Logs/logger";
import UpdateJournalLineModalForm from "./UpdateJournalLineModalForm";

export default function UpdateJournalHeaderForm() {
  const { JournalParameters } = useParams();

  console.log("Journal Paramters :", JournalParameters);

  const [formData, setFormData] = useState({
    journal_number: "",
    company_id: "",
    department_id: "",
    currency_id: "",
    currencyname: "", // Add currencyname
    currencysymbol: "", // Add currencysymbol
    journal_date: "",
    journal_type: "",
    description: "",
    status: "",
  });

  const [error, setError] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [journalHeader, setJournalHeader] = useState(null);
  const [journalNumber, setJournalNumber] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [showLinesModalWindow, setShowLinesModalWindow] = useState(false);
  const [isEditable, setIsEditable] = useState(true);


  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedCurrencyId, setSelectedCurrencyId] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("");

  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
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
        let apiUrl = `${API_URL}/get_journal_headers`;
        if (JournalParameters) {
          const queryParams = new URLSearchParams(JournalParameters);
          apiUrl += `?${queryParams.toString()}`;
        }
        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        const journalHeaders = response.data.journal_headers_list;
        if (journalHeaders && journalHeaders.length > 0) {
          const firstJournalHeader = journalHeaders[0];

          setJournalHeader(firstJournalHeader.header_id);
          setSelectedCompany(firstJournalHeader.company_id);
          setSelectedCurrencyId(firstJournalHeader.currency_id);
          setSelectedDepartment(firstJournalHeader.department_id);
          setSelectedStatus(firstJournalHeader.status);
          setJournalNumber(firstJournalHeader.journal_number);

          console.log ("The Status selected",selectedStatus)

          await Promise.all([
            getDepartments(firstJournalHeader.company_id),
            getCurrencies(),
            getCompanies(),
          ]);

          setFormData({
            journal_number: firstJournalHeader.journal_number,
            company_id: firstJournalHeader.company_id,
            department_id: firstJournalHeader.department_id,
            currency_id: firstJournalHeader.currency_id,
            currencyname: firstJournalHeader.currencyname, // Set currencyname
            currencysymbol: firstJournalHeader.currencysymbol, // Set currencysymbol
            journal_date: new Date(firstJournalHeader.journal_date)
              .toISOString()
              .split("T")[0],
            journal_type: firstJournalHeader.journal_type,
            description: firstJournalHeader.description,
            status: firstJournalHeader.status,
          });

          const journalStatus = JOURNAL_STATUS.find(
            (status) => status.code === firstJournalHeader.status
          );
          setIsEditable(journalStatus ? journalStatus.editable : true);
  
          logger.info(
            `[${new Date().toLocaleTimeString()}] Fetched Journal Header data successfully`
          );
        } else {
          console.log("No updatable journal headers found in the database");
        }
      } catch (error) {
        console.log("Error occurred:", error);
        setError("An error occurred while fetching data.");
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching Journal Header data`,
          error
        );
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, [JournalParameters]);

  

  const getDepartments = async (companyId) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_departments?company_id=${companyId}`,
        {
          headers: generateHeaders(),
        }
      );

      setDepartments(response.data.department_list);

      console.log("Departments array for coampay:", companyId);
      console.log("Departments array:", response.data.department_list);
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
      console.log("Listed Currencies ", currenciesResponse.data.currencies);
    } catch (error) {
      logger.error(`Error fetching Currencies:`, error);
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

  const handleChange = async (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormDirty(true);

    if (name === "currency_id") {
      setSelectedCurrencyId(value);
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


    if (name === "status") {
  const selectedStatus = JOURNAL_STATUS.find(status => status.code === value);
  
  if (selectedStatus && !selectedStatus.editable) {
    try {
      const validationResponse = await axios.get(
        `${API_URL}/validate_journal?journal_number=${formData.journal_number}`,
        { headers: generateHeaders() }
      );

      if (!validationResponse.data.valid) {
        setError(validationResponse.data.message);
        return; // Prevent status change
      }
    } catch (error) {
      console.error("Error validating journal:", error);
      setError("An error occurred during journal validation.");
      return; // Prevent status change
    }
  }
  setSelectedStatus(value);
}
  };

  const handleSuccessLinesModalClose = () => {
    setShowLinesModalWindow(false);
  };

  const handleUpdateJournalLinesSuccess = (response) => {
    if (typeof response === 'string') {
      // Directly use the string response as the success message
      setSuccessMessage(response);
  
      setTimeout(() => {
        setSuccessMessage(null);
      }, 15000);
  
      setIsFormSubmitted(true);
    } else {
      console.error("Invalid response structure", response);
      setSuccessMessage("Failed to update journal lines.");
    }
  };
  
  
  const handleUpdateLines = async (e) => {
    setShowLinesModalWindow(true);
  };

 /* const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedFormData = {
      journal_number: formData.journal_number,
      company_id: formData.company_id
        ? parseInt(formData.company_id, 10)
        : null,
      department_id: formData.department_id
        ? parseInt(formData.department_id, 10)
        : null,
      currency_id: formData.currency_id
        ? parseInt(formData.currency_id, 10)
        : null,
      journal_date: formData.journal_date,
      journal_type: formData.journal_type,
      description: formData.description,
      status: formData.status,
    };

    console.log("Data sent to back end ", updatedFormData);
    try {
      const response = await axios.put(
        `${API_URL}/update_journal_header`,
        updatedFormData,
        {
          "Content-Type": "application/json",
          headers: generateHeaders(),
        }
      );

      if (response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setError(response.data.error);
      }
      setIsFormSubmitted(true);
      setIsFormDirty(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setError("An error occurred while updating data.");
    }
  };*/

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    // Determine if the selected status is editable or not
    const selectedJournalStatus = JOURNAL_STATUS.find(status => status.code === formData.status);
    const isEditable = selectedJournalStatus ? selectedJournalStatus.editable : true;
  
    // If the status is not editable, validate the journal first
    if (!isEditable) {
      try {
        const validateResponse = await axios.get(
          `${API_URL}/validate_journal?journal_number=${formData.journal_number}`,
          { headers: generateHeaders() }
        );
  
        if (!validateResponse.data.valid) {
          setError(validateResponse.data.message);
          return; // Don't proceed if the journal is not valid
        }
      } catch (error) {
        console.error("Error validating journal:", error);
        setError("An error occurred while validating the journal.");
        return; // Don't proceed if the validation call fails
      }
    }
  
    const updatedFormData = {
      journal_number: formData.journal_number,
      company_id: formData.company_id ? parseInt(formData.company_id, 10) : null,
      department_id: formData.department_id ? parseInt(formData.department_id, 10) : null,
      currency_id: formData.currency_id ? parseInt(formData.currency_id, 10) : null,
      journal_date: formData.journal_date,
      journal_type: formData.journal_type,
      description: formData.description,
      status: formData.status,
    };
  
    console.log("Data sent to back end ", updatedFormData);
  
    try {
      const response = await axios.put(
        `${API_URL}/update_journal_header`,
        updatedFormData,
        {
          "Content-Type": "application/json",
          headers: generateHeaders(),
        }
      );
  
      if (response.data.success) {
        setSuccessMessage(response.data.message);
      } else {
        setError(response.data.error);
      }
      setIsFormSubmitted(true);
      setIsFormDirty(false);
    } catch (error) {
      console.error("Error updating data:", error);
      setError("An error occurred while updating data.");
    }
  };
  

  console.log("Rendering formData:", formData);
  console.log("Rendering selectedCompany:", selectedCompany);
  console.log("Rendering successMessage:", successMessage);
  console.log("Rendering error:", error);

  return (
    <div className="child-container menu-container">
      <h2>Update Journal Header</h2>
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
                    <label htmlFor="journal_number">Journal Number:</label>
                  </div>
                  <div className="input-container input-field">
                    <input
                      type="text"
                      id="journal_number"
                      name="journal_number"
                      className="form-control"
                      value={formData.journal_number}
                      onChange={handleChange}
                      readOnly
                      disabled={!isEditable} // Disable if not editable
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
                      value={selectedCompany || ""}
                      onChange={(e) => {
                        handleChange(e);
                        handleCompanyChange(e.target.value);
                      }}
                      disabled={!isEditable} // Disable if not editable
                    >
                      <option value="">--Select Company--</option>
                      {companies.map((company) => (
                        <option
                          key={company.company_id}
                          value={company.company_id.toString()}
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
                    <label htmlFor="department_id">Department Name:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="department_id"
                      name="department_id"
                      className="form-control"
                      value={selectedDepartment || ""}
                      onChange={handleChange}
                      disabled={!isEditable} // Disable if not editable
                    >
                      <option value="">--Select Department--</option>
                      {departments.map((department) => (
                        <option
                          key={department.id}
                          value={department.id.toString()}
                        >
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
                    <label htmlFor="currency_id">Currency Name:</label>
                  </div>
                  <div className="input-container">
                    <select
                      id="currency_id"
                      name="currency_id"
                      className="form-control"
                      value={selectedCurrencyId || ""}
                      onChange={handleChange}
                      disabled={!isEditable} // Disable if not editable
                    >
                      <option value="">--Select Currency--</option>
                      {currencies.map((currency) => (
                        <option
                          key={currency.currency_id}
                          value={currency.currency_id.toString()}
                        >
                          {currency.currencycode}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="journal_date">Journal Date:</label>
                  </div>
                  <div className="input-container input-field">
                    <input
                      type="date"
                      id="journal_date"
                      name="journal_date"
                      className="form-control"
                      value={formData.journal_date}
                      onChange={handleChange}
                      disabled={!isEditable} // Disable if not editable
                    />
                  </div>
                </div>
              </div>

              {/* Status Select */}
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
                    className="form-control"
                    required
                    disabled={!isEditable || isFormSubmitted}
                    
                  >
                    <option value="">Select Type</option>
                    {JOURNAL_TYPES.filter((status) => status.code).map(
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
                  <div className="label-container">
                    <label htmlFor="description">Description:</label>
                  </div>
                  <div className="input-container input-field">
                    <textarea
                      id="description"
                      name="description"
                      className="form-control"
                      value={formData.description}
                      onChange={handleChange}
                      disabled={!isEditable} // Disable if not editable
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
                    disabled={!isEditable || isFormSubmitted}
                  >
                    <option value="">Select Status</option>
                    {JOURNAL_STATUS.filter((status) => status.code).map(
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
                <button
                  type="button"
                  className="btn btn-secondary mr-2"
                  onClick={handleUpdateLines}
                  disabled={!isEditable} // Disable button if not editable
                >
                  Update Lines
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isEditable || !isFormDirty || isFormSubmitted}
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          {showLinesModalWindow && (
            <UpdateJournalLineModalForm
              show={showLinesModalWindow}
              onClose={handleSuccessLinesModalClose}
              onUpdateSuccess={(response) => handleUpdateJournalLinesSuccess(response)}              
              journalHeader={journalHeader}
              journalNumber={journalNumber}              
              selectedCompany={formData.company_id}
              selectedDepartment={formData.department_id}
              currency_id={formData.currency_id}
              currencyname={formData.currencyname}
              currencysymbol={formData.currencysymbol}
            />
          )}
        </>
      ) : (
        <p>You do not have the required access to update a journal header.</p>
      )}
    </div>
  );
}
