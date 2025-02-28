import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import { useLocation } from "react-router-dom";
import "../../../utilities/css/appcss.css";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

export default function UpdateCompanyForm() {
  const location = useLocation();
  const { companyId } = location.state || {}; // Access companyId from hidden state

  const [formData, setFormData] = useState({
    group_company_id: "",
    name: "",
    description: "",
    default_tax_code_id: "",
    default_account_header_id: "",
    local_cur_id: "",
    home_cur_id: "",
    reporting_cur_id: "",
  });

  const [groupCompanies, setGroupCompanies] = useState([]);
  const [accountHeaders, setAccountHeaders] = useState([]);
  const [taxCodes, setTaxCodes] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [isFormDirty, setIsFormDirty] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
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

  const fetchGroupCompanies = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/get_group_companies`, {
        headers: generateHeaders(),
      });
      setGroupCompanies(response.data.group_company_list);
    } catch (error) {
      logger.error("Error fetching group companies:", error);
    }
  }, []);

  const fetchAccountHeaders = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/get_default_account_headers`, {
        headers: generateHeaders(),
      });
      setAccountHeaders(response.data.default_account_headers || []);
      console.log("Direct headers", response.data.default_account_headers);
      console.log("The account headers ", accountHeaders);
    } catch (error) {
      logger.error("Error fetching account headers:", error);
    }
    // eslint-disable-next-line
  }, []);

  const fetchTaxCodes = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/get_default_tax_headers`, {
        headers: generateHeaders(),
      });
      setTaxCodes(response.data.default_tax_headers || []);
    } catch (error) {
      logger.error("Error fetching tax codes:", error);
    }
  }, []);

  const fetchCurrencies = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/list_currencies`, {
        headers: generateHeaders(),
      });
      setCurrencies(response.data.currencies || []);
    } catch (error) {
      logger.error("Error fetching currencies:", error);
    }
  }, []);

  const fetchCompanyDetails = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/get_companies?company_id=${companyId}`, {
        headers: generateHeaders(),
      });

      const company = response.data.company_list[0];
      console.log("Found company details ", company)
      setFormData({
        group_company_id: company.group_company_id || "",
        name: company.company_name || "",
        description: company.company_description || "",
        default_tax_code_id: company.default_tax_code_id || "",
        default_account_header_id: company.default_account_header_id || "",
        local_cur_id: company.local_cur_id || "",
        home_cur_id: company.home_cur_id || "",
        reporting_cur_id: company.reporting_cur_id || "",
      });
      console.log("Form data defaulted", formData.default_account_header_id)
    } catch (error) {
      logger.error("Error fetching company details:", error);
      setError("Failed to load company details.");
    }
    // eslint-disable-next-line
  }, [companyId]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          fetchCompanyDetails(),
          fetchGroupCompanies(),
          fetchTaxCodes(),
          fetchCurrencies(),
          fetchAccountHeaders(),
        ]);
      } catch (error) {
        logger.error("Error fetching all data:", error);
      }
    };

    fetchData();
  }, [companyId, fetchGroupCompanies, fetchAccountHeaders, fetchTaxCodes, fetchCurrencies, fetchCompanyDetails]);

  useEffect(() => {
    if (accountHeaders.length > 0) {
      console.log("The account headers are now populated:", accountHeaders);
    }
  }, [accountHeaders]); // Logs when accountHeaders is updated

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormDirty(true);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const updatedCompanyData = {
      group_company_id: formData.group_company_id,
      name: formData.name,
      description: formData.description,
      default_tax_code_id: formData.default_tax_code_id,
      default_account_header_id: formData.default_account_header_id,
      local_cur_id: formData.local_cur_id,
      home_cur_id: formData.home_cur_id,
      reporting_cur_id: formData.reporting_cur_id,
    };

    try {
      const response = await axios.put(
        `${API_URL}/update_company?company_id=${companyId}`,
        updatedCompanyData,
        {
          headers: generateHeaders(),
        }
      );

      if (response.data.message) {
        setSuccessMessage(response.data.message);
      } else {
        setError(response.data.error);
      }

      setIsFormSubmitted(true);
      setIsFormDirty(false);
    } catch (error) {
      setError("An error occurred while updating the company.");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Update Company {companyId}</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleFormSubmit}>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="group_company_id">Group Company</label>
                </div>
                <select
                  id="group_company_id"
                  name="group_company_id"
                  className="form-control input-field"
                  value={formData.group_company_id || ""}
                  onChange={handleChange}
                >
                  <option value="">--Select Group Company--</option>
                  {groupCompanies.map((group, index) => (
                    <option key={`${group.id}-${index}`} value={group.id}>
                      {group.group_company_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="name">Company Name</label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  className="form-control input-field"
                  value={formData.name || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="description">Description</label>
                </div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  className="form-control input-field"
                  value={formData.description || ""}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="default_tax_code_id">Default Tax Code</label>
                </div>
                <select
                  id="default_tax_code_id"
                  name="default_tax_code_id"
                  className="form-control input-field"
                  value={formData.default_tax_code_id || ""}
                  onChange={handleChange}
                >
                  <option value="">--Select Tax Code--</option>
                  {taxCodes.map((tax, index) => (
                    <option key={`${tax.header_id}-${index}`} value={tax.header_id}>
                      {tax.description}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="default_account_header_id">Default Account Header</label>
                </div>
                <select
                  id="default_account_header_id"
                  name="default_account_header_id"
                  className="form-control input-field"
                  value={formData.default_account_header_id || ""}
                  onChange={handleChange}
                >
                  <option value="">--Select Account Header--</option>
                  {accountHeaders.map((header, index) => (
                    <option key={`${header.header_id}-${index}`} value={header.header_id}>
                      {header.header_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>


            {["local", "home", "reporting"].map((currencyType) => (
              <div className="form-group col-md-6 mb-2" key={currencyType}>
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor={`${currencyType}_cur_id`}>
                      {`${currencyType.charAt(0).toUpperCase() + currencyType.slice(1)} Currency`}
                    </label>
                  </div>
                  <select
                    id={`${currencyType}_cur_id`}
                    name={`${currencyType}_cur_id`}
                    className="form-control input-field"
                    value={formData[`${currencyType}_cur_id`] || ""}
                    onChange={handleChange}
                  >
                    <option value="">--Select Currency--</option>
                    {currencies.map((currency, index) => (
                      <option key={`${currency.currency_id}-${index}`} value={currency.currency_id}>
                        {currency.currencycode} ({currency.currencysymbol})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            ))}


            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormDirty || isFormSubmitted}
                >
                  Submit
                </button>
              </div>
            </div>

          </form>

          {/* Display Success Message */}
          {successMessage && <div className="alert alert-success mt-3">{successMessage}</div>}

          {/* Display Error Message */}
          {error && <div className="alert alert-danger mt-3">{error}</div>}
        </div>
      ) : (
        <p>You do not have the required access to update a company.</p>
      )}
    </div>
  );
}
