import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

function SearchPurchaseInvoiceForm() {
  const [companyList, setCompanyList] = useState([]);
  const [departmentList, setDepartmentList] = useState([]);
  const [referenceTypeList, setReferenceTypeList] = useState([]);
  const [referenceIdList, setReferenceIdList] = useState([]);
  const [statusList, setStatusList] = useState([]);
  const [currencyList, setCurrencyList] = useState([]);
  const [PurchaseTypes, setPurchaseTypes] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedPurchaseType , setSelectPurchasetype]  = useState("");
  const [selectedReferenceType , setSelectedReferenceType]  = useState("");
  const navigate = useNavigate();


  const [data, setData] = useState({ Purchase_headers_list: [] });
 // eslint-disable-next-line
  const [referenceId, setReferenceId] = useState("");
  const [companyid, setCompanyId] = useState("");
  const [Purchasetype, setPurchaseType] = useState("");
  const [transaction_source, setTransactionSource] = useState("");
  const [invoice_number, setInvoiceNumber] = useState("");  
  
  // eslint-disable-next-line
  const [status, setSelectedStatus] = useState("");
  const [showExistingFields, setShowExistingFields] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );


  const handleCompanyChange = (e) => {
    const selectedCompanyId = parseInt(e.target.value.trim(), 10);
    setSelectedCompany(selectedCompanyId);
    setSelectedDepartment(""); // Reset department
    setPurchaseTypes([]); // Reset Purchase types
    setReferenceTypeList([]); // Reset reference types
    setReferenceIdList([]); // Reset reference ids
    setStatusList([]); // Reset statuses
    setCurrencyList([]); // Reset currencies

    const sectId = parseInt(selectedCompanyId, 10);
    const filteredDepartments = data.Purchase_headers_list.filter(
      (item) => item.company_id === sectId
    );

    const departments = filteredDepartments.map((item) => ({
      department_id: item.department_id,
      department_name: item.department_name,
    }));

    setDepartmentList(departments);
  };

  const handleDepartmentChange = (e) => {
    const selectedDepartmentId = parseInt(e.target.value.trim(), 10);
    setSelectedDepartment(selectedDepartmentId);
    setPurchaseTypes([]); // Reset Purchase types
    setReferenceTypeList([]); // Reset reference types
    setReferenceIdList([]); // Reset reference ids
    setStatusList([]); // Reset statuses
    setCurrencyList([]); // Reset currencies

    const filteredPurchaseTypes = data.Purchase_headers_list.filter(
      (item) => item.department_id === selectedDepartmentId
    );

    const types = filteredPurchaseTypes.map((item) => ({
      company_id: item.company_id,
      department_id: item.department_id,
      Purchase_type: item.Purchase_type,
    }));

    setPurchaseTypes(types);
  };

  const handlePurchaseTypeChange = (e) => {
    const selectedPurchaseType = e.target.value;
    setReferenceTypeList([]); // Reset reference types
    setReferenceIdList([]); // Reset reference ids
    setStatusList([]); // Reset statuses
    setCurrencyList([]); // Reset currencies
    setSelectPurchasetype(selectedPurchaseType)
    // Filter the data to get Purchase headers with the selected Purchase type
    const filteredPurchaseHeaders = data.Purchase_headers_list.filter(
      (item) => item.Purchase_type === selectedPurchaseType
    );
    const uniqueReferenceTypes = [
      ...new Set(filteredPurchaseHeaders.map((item) => item.reference_type)),
    ];
    const referenceTypes = uniqueReferenceTypes.map((type, index) => ({
      id: index,
      name: type,
    }));

    // Update the state to set the filtered reference types
    setReferenceTypeList(referenceTypes);
  };

  const handleReferenceTypeChange = (e) => {
    const selectedReferenceType = e.target.value;
    setSelectedReferenceType(selectedReferenceType)
    setReferenceIdList([]); // Reset reference ids
    setStatusList([]); // Reset statuses
    setCurrencyList([]); // Reset currencies

    // Filter the data to get Purchase headers with the selected reference type
    const filteredPurchaseHeaders = data.Purchase_headers_list.filter(
      (item) => item.reference_type === selectedReferenceType
    );

    // Extract unique reference ids from the filtered Purchase headers
    const uniqueReferenceIds = [
      ...new Set(filteredPurchaseHeaders.map((item) => item.reference_id)),
    ];
    const referenceIds = uniqueReferenceIds.map((id, index) => ({
      id: index,
      value: id,
    }));

    // Update the state to set the filtered reference ids
    setReferenceIdList(referenceIds);
  };

  const handleReferenceIdChange = (e) => {
    const selectedReferenceId = parseInt(e.target.value.trim(), 10);
    setStatusList([]); // Reset statuses
    setCurrencyList([]); // Reset currencies

    // Filter the data to get Purchase headers with the selected reference id
    const filteredPurchaseHeaders = data.Purchase_headers_list.filter(
      (item) => item.reference_id === selectedReferenceId
    );

    // Extract unique statuses from the filtered Purchase headers
    const uniqueStatuses = [
      ...new Set(filteredPurchaseHeaders.map((item) => item.status)),
    ];
    const statuses = uniqueStatuses.map((status, index) => ({
      id: index,
      value: status,
    }));

    // Update the state to set the filtered statuses
    setStatusList(statuses);
  };

  const handleStatusChange = (e) => {
    const selectedStatus = e.target.value;
    setCurrencyList([]); // Reset currencies

    // Filter the data to get Purchase headers with the selected status and company_id
    const filteredPurchaseHeaders = data.Purchase_headers_list.filter(
      (item) => item.status === selectedStatus && item.company_id === selectedCompany
    );

    // Extract unique currencies from the filtered Purchase headers
    const uniqueCurrencies = [
      ...new Set(filteredPurchaseHeaders.map((item) => item.currencyname)),
    ];
    const currencies = uniqueCurrencies.map((currency, index) => {
      // Find the first item in filteredPurchaseHeaders with the currencyname
      const currencyItem = filteredPurchaseHeaders.find(
        (item) => item.currencyname === currency
      );
      return {
        id: index,
        value: currency,
        currencycode: currencyItem.currencycode,
        currencysymbol: currencyItem.currencysymbol,
      };
    });

    // Update the state to set the filtered currencies
    setCurrencyList(currencies);
  };

  const handleCompanyIdChange = (e) => {
    setCompanyId(e.target.value);
  };

  
  const handlePurchaseTypeIdChange = (e) => {
    setPurchaseType(e.target.value);
  };

  const handleTransactionNumberChange = (e) => {
    setTransactionSource(e.target.value);
  };


  const handlePurchaseInvoiceNumberChange = (e) => {
    setInvoiceNumber(e.target.value);
  };

  

  
 
  const handleCheckboxChange = () => {
    setShowExistingFields((prev) => !prev);
  };

  const handleButtonClick = async () => {

   // await fetchPurchaseHeaders();
    try {
      let requestUrl ="";
      if (showExistingFields) {
        requestUrl += [
          selectedCompany && `company_id=${selectedCompany}`,
          selectedDepartment && `department_id=${selectedDepartment}`,
          selectedPurchaseType && `Purchase_type=${selectedPurchaseType}`,
          selectedReferenceType && `reference_type=${selectedReferenceType}`,
          referenceId && `reference_id=${referenceId}`,
          status && `status=${status}`,
        ].filter(Boolean).join("&");
      } else {
        requestUrl += [
          transaction_source && `transaction_source=${transaction_source}`,
          invoice_number && `invoice_number=${invoice_number}`,          
        ].filter(Boolean).join("&");
      }

      navigate(`/get-purchase-invoices/${requestUrl}`)
    
    } catch (error) {
      logger.error("Error fetching Purchase headers:", error);
      alert("Error fetching Purchase headers");
    }
  };
  
  
  return (
    <div className="child-container menu-container">
      <h2 className="title">Find Purchase</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <div className="form-group col-md-6 mb-2">
            <input
              type="checkbox"
              id="chooseBy"
              onChange={handleCheckboxChange}
              checked={showExistingFields}
            />
            <label htmlFor="chooseBy">Purchase Invoice by Selection</label>
          </div>
          {showExistingFields ? (
            <>
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
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="department">Department:</label>
                  </div>
                  <select
                    id="department"
                    onChange={handleDepartmentChange}
                    className="form-control input-field"
                  >
                    <option value="">Select a Department</option>
                    {departmentList.map((department) => (
                      <option
                        key={department.department_id}
                        value={department.department_id}
                      >
                        {department.department_name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="PurchaseType">Purchase Type:</label>
                  </div>
                  <select
                    id="PurchaseType"
                    onChange={handlePurchaseTypeChange}
                    className="form-control input-field"
                  >
                    <option value="">Select a Purchase type</option>
                    {PurchaseTypes.map((item, index) => (
                      <option key={index} value={item.Purchase_type}>
                        {item.Purchase_type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="referenceType">Reference Type:</label>
                  </div>
                  <select
                    id="referenceType"
                    className="form-control input-field"
                    onChange={handleReferenceTypeChange}
                  >
                    <option value="">Select a Reference type</option>
                    {referenceTypeList.map((referenceType) => (
                      <option key={referenceType.id} value={referenceType.name}>
                        {referenceType.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="referenceId">Reference ID:</label>
                  </div>
                  <select
                    id="referenceId"
                    onChange={handleReferenceIdChange}
                    className="form-control input-field"
                  >
                    <option value="">Select a Reference id</option>
                    {referenceIdList.map((referenceId) => (
                      <option key={referenceId.id} value={referenceId.value}>
                        {referenceId.value}
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
                  <select id="status"  onChange={handleStatusChange} className="form-control input-field">
                    <option value="">Select a status id</option>
                    {statusList.map((status) => (
                      <option key={status.id} value={status.value}>
                        {status.value}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="currency">Currency:</label>
                  </div>
                  <select id="currency" className="form-control input-field">
                  <option value="">Select a status id</option>
                    {currencyList.map((currency) => (
                      <option key={currency.id} value={currency.id}>
                        {currency.currencycode} {currency.currencysymbol}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="companyid">Purchase Order No</label>
                  </div>
                  <input
                    type="text"
                    id="transaction_source"
                    value={transaction_source}
                    onChange={handleTransactionNumberChange}
                    className="form-control input-field"
                  />
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="companyid">Purchase Invoice Number</label>
                  </div>
                  <input
                    type="text"
                    id="invoice_number"
                    value={invoice_number}
                    onChange={handlePurchaseInvoiceNumberChange}
                    className="form-control input-field"
                  />
                </div>
              </div>
            </>
          )}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button onClick={handleButtonClick} className="btn btn-primary">
                Get Purchase Headers
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}      
    </div>
  );
}

export default SearchPurchaseInvoiceForm;
