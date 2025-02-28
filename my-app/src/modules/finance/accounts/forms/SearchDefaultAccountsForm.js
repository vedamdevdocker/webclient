import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";
import { API_URL } from "../../../admin/setups/ConstDecl"; // Adjust this import based on your project structure

function SearchDefaultAccountsForm() {
  const [companyList, setCompanyList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [headerList, setHeaderList] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("");
  const [selectedHeaderId, setSelectedHeaderId] = useState("");

  const navigate = useNavigate();

  // Memoize fetchHeaders function using useCallback
  const fetchHeaders = useCallback(async () => {
    try {
      const params = selectedHeaderId ? { header_id: selectedHeaderId } : {};

      const response = await axios.get(
        `${API_URL}/get_default_account_headers`,
        {
          headers: generateHeaders(),
          params,
        }
      );
      setHeaderList(response.data.default_account_headers);
    } catch (error) {
      console.error("Error fetching headers:", error);
      logger.error("Error fetching headers:", error);
    }
  }, [selectedHeaderId]);

  // Fetch companies and currencies when the component loads
  useEffect(() => {
    async function fetchCompaniesAndCurrencies() {
      try {
        const [companyResponse, currencyResponse] = await Promise.all([
          axios.get(`${API_URL}/get_companies`, {
            headers: generateHeaders(),
          }),
          axios.get(`${API_URL}/list_currencies`, {
            headers: generateHeaders(),
          }),
        ]);
        setCompanyList(companyResponse.data.company_list);
        setCurrencyList(currencyResponse.data.currencies);
      } catch (error) {
        console.error("Error fetching companies or currencies:", error);
        logger.error("Error fetching companies or currencies:", error);
      }
    }

    fetchCompaniesAndCurrencies();
    fetchHeaders(); // Initial call without headerId
  }, [fetchHeaders]);

  // Fetch headers again when selectedHeaderId changes
  useEffect(() => {
    fetchHeaders();
  }, [selectedHeaderId, fetchHeaders]);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleCompanyChange = (e) => {
    const selectedCompanyId = parseInt(e.target.value.trim(), 10);
    setSelectedCompany(selectedCompanyId);

    // Reset header ID when company changes
    setSelectedHeaderId("");
  };

  const handleCurrencyChange = (e) => {
    const selectedCurrencyId = parseInt(e.target.value.trim(), 10);
    setSelectedCurrency(selectedCurrencyId);
  };

  const handleHeaderIdChange = (e) => {
    const selectedHeaderId = parseInt(e.target.value.trim(), 10);
    setSelectedHeaderId(selectedHeaderId);
  };

  const handleButtonClick = async () => {
    try {
      let requestUrl = "";

      requestUrl += [
        selectedCompany && `company_id=${selectedCompany}`,
        selectedCurrency && `currency_id=${selectedCurrency}`,
        selectedHeaderId && `header_id=${selectedHeaderId}`,
      ]
        .filter(Boolean)
        .join("&");

      navigate(`/get-default-accounts/${requestUrl}`);
    } catch (error) {
      logger.error("Error fetching default accounts:", error);
      alert("Error fetching default accounts");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Search Default Accounts</h2>
      <div className="child-container form-container">
        {/* Company Select */}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="company">Company:</label>
            </div>
            <select
              id="company"
              onChange={handleCompanyChange}
              className="form-control input-field"
            >
              <option value="">Select a Company</option>
              {companyList.map((company) => (
                <option key={company.company_id} value={company.company_id}>
                  {company.company_name}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* End of Company Select */}

        {/* Currency Select */}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="currency">Currency:</label>
            </div>
            <select
              id="currency"
              onChange={handleCurrencyChange}
              className="form-control input-field"
            >
              <option value="">Select a Currency</option>
              {currencyList.map((currency) => (
                <option key={currency.currency_id} value={currency.currency_id}>
                  {currency.currencycode} ({currency.currencysymbol})
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* End of Currency Select */}

        {/* Header ID Select */}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="headerId">Account Header Name:</label>
            </div>
            <select
              id="headerId"
              onChange={handleHeaderIdChange}
              className="form-control input-field"
            >
              <option value="">Select an Account Header</option>
              {headerList
                .filter((header) => {
                  if (!selectedCompany) {
                    // If no company is selected, display all headers
                    return true;
                  }
                  // If a company is selected, filter based on the company's default account header name
                  return (
                    companyList.find(
                      (company) => company.company_id === selectedCompany
                    )?.default_account_header_name === header.header_name
                  );
                })
                .map((header) => (
                  <option key={header.header_id} value={header.header_id}>
                    {header.header_name}
                  </option>
                ))}
            </select>
          </div>
        </div>
        {/* End of Header ID Select */}

        {/* Search Button */}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <button
              type="button"
              onClick={handleButtonClick}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
        {/* End of Search Button */}
      </div>
    </div>
  );
}

export default SearchDefaultAccountsForm;
