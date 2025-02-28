import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import queryString from "query-string";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your permission checker

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

function PurchaseOrdersSearchForm() {
  const [queryParams, setQueryParams] = useState({
    param_header_id: "",
    param_company_id: "",
    param_department_id: "",
    param_rfq_header_id: "",
    param_supplier_id: "",
    param_tax_id: "",
    param_po_num: "",
    param_currency_id: "",
  });
  const [searchInput, setSearchInput] = useState("");
  const [companyList, setCompanyList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [partnerList, setPartnerList] = useState([]);
  const [taxCodeList, setTaxCodeList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);

  const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );
  const handleSearch = (e) => {
    e.preventDefault();

    // Combine queryParams with other form fields if needed
    const combinedParams = {
      ...queryParams,
      additionalField: "additionalValue",
    };

    // Convert combinedParams to a query string
    const searchQueryString = queryString.stringify(combinedParams);

    // Set searchInput to the query string
    setSearchInput(searchQueryString);

    const searchPath = searchQueryString
      ? `/purchase-order-results?${searchQueryString}`
      : "/purchase-order-results";

    if (!hasRequiredAccess) {
      alert("You do not have permission to perform this action.");
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Permission denied: User does not have access to perform the search. (hasRequiredAccess: ${hasRequiredAccess})`
      );
      return;
    }

    navigate(searchPath);
    logger.info(
      `[${new Date().toLocaleTimeString()}] Search initiated by Query parameters: ${JSON.stringify(
        queryParams
      )}, searchInput: ${searchInput}, and hasRequiredAccess: ${hasRequiredAccess}`
    );
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQueryParams((prevParams) => ({
      ...prevParams,
      [name]: value,
    }));
  };

  useEffect(() => {
    fetchDepartments();
    fetchPartners();
    fetchCompanies();
    fetchTaxCodes();
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_currencies`, {
        headers: generateHeaders(),
      });
      setCurrencyList(response.data.currencies || []);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching currencies:`,
        error
      );
    }
  };

  const fetchTaxCodes = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_tax_codes`, {
        headers: generateHeaders(),
      });
      setTaxCodeList(response.data.taxes || []);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching tax codes:`,
        error
      );
    }
  };

  const fetchPartners = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_partner_data`, {
        headers: generateHeaders(),
      });
      setPartnerList(response.data || []);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching partners:`,
        error
      );
    }
  };

  const fetchDepartments = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_departments`, {
        headers: generateHeaders(),
      });
      setDepartmentList(response.data.department_list || []);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching departments:`,
        error
      );
    }
  };

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_companies`, {
        headers: generateHeaders(),
      });
      setCompanyList(response.data.company_list || []);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching companies:`,
        error
      );
    }
  };
  return (
    <div className="child-container menu-container">
      <h2 className="title">Purchase order Search</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSearch}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="companyid">Company :</label>
                </div>
                {/* Use a select dropdown for company selection */}
                <select
                  id="param_company_id"
                  name="param_company_id"
                  value={queryParams.param_company_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                >
                  <option value="">Select Company</option>
                  {companyList.map((company) => (
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
                  <label htmlFor="headerId">Header Id:</label>
                </div>

                <input
                  type="text"
                  id="param_header_id"
                  name="param_header_id"
                  value={queryParams.param_header_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="poNumber">PO Number:</label>
                </div>

                <input
                  type="text"
                  id="param_po_num"
                  name="param_po_num"
                  value={queryParams.param_po_num}
                  onChange={handleInputChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="departmentID">Department :</label>
                </div>
                {/* Use a select dropdown for department selection */}
                <select
                  id="param_department_id"
                  name="param_department_id"
                  value={queryParams.param_department_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                >
                  <option value="">Select Department</option>
                  {departmentList.map((department) => (
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
                  <label htmlFor="supplier">Supplier :</label>
                </div>
                {/* Use a select dropdown for partner selection */}
                <select
                  id="param_supplier_id"
                  name="param_supplier_id"
                  value={queryParams.param_supplier_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                >
                  <option value="">Select Supplier</option>
                  {partnerList.map((partner) => (
                    <option key={partner.partnerid} value={partner.partnerid}>
                      {partner.partnername}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="taxid">Tax code :</label>
                </div>
                {/* Use a select dropdown for tax code selection */}
                <select
                  id="param_tax_id"
                  name="param_tax_id"
                  value={queryParams.param_tax_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                >
                  <option value="">Select Tax Code</option>
                  {taxCodeList.map((tax) => (
                    <option key={tax.tax_id} value={tax.tax_id}>
                      {tax.tax_code}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="currency">Currency :</label>
                </div>
                {/* Use a select dropdown for currency selection */}
                <select
                  id="param_currency_id"
                  name="param_currency_id"
                  value={queryParams.param_currency_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                >
                  <option value="">Select Currency</option>
                  {currencyList.map((currency) => (
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
                <button type="submit" className="btn btn-primary">
                  Search
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>
            You do not have permission to view this module.
            {logger.warn(
              `[${new Date().toLocaleTimeString()}] Permission denied: User does not have access to view the Purchase Orders module. (hasRequiredAccess: ${hasRequiredAccess})`
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default PurchaseOrdersSearchForm;
