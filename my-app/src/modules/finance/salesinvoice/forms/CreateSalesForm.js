import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { SALES_INVOICE_STATUS, SALES_INVOICE_SQ_PREFIX,STANDARD_INV_TRANS_SOURCE } from "../../config/config";
import CreateSalesLineModalForm from "./CreateSalesLineModalForm";
import CreateSIDistributions from "./CreateSIDistributions";

export default function CreateSalesForm() {
  const [formData, setFormData] = useState({
    company_id: "",
    department_id: "",
    currency_id: "",
    status: "",
    tax_id: "",
    totalamount: "",
    partnerid: "",
    invoicedate: "",
    payment_duedate: "",
    payment_terms: "",
  });

  const [companies, setCompanies] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [partners, setPartners] = useState([]);
  const [taxes, setTaxes] = useState([]); // Define taxes state
  const [invoiceNumber, setInvoiceNumber] = useState(null);
  const [invoiceHeader, setInvoiceHeader] = useState(null);  
  const [successMessage, setSuccessMessage] = useState(null);
  const [showLinesModalWindow, setShowLinesModalWindow] = useState(false);
  const [showDistModalWindow, setShowDistModalWindow] = useState(false);
  const [selectedCurrencyId, setSelectedCurrencyId] = useState("");
  const [selectedTaxId, setSelectedTaxId] = useState("");  
  const [totalSum, setTotalSum] = useState(0); 

  const [formSubmitted, setFormSubmitted] = useState(false)
  const [responseData, setResponseData] = useState(false)

  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);
  
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
        
        const partnersResponse = await axios.get(
          `${API_URL}/get_partner_data`,
          {
            headers: generateHeaders(),
          }
        );
        setPartners(partnersResponse.data);
        const taxesResponse = await axios.get(`${API_URL}/list_tax_codes`, { // Fetch taxes data
          headers: generateHeaders(),
        });
        setTaxes(taxesResponse.data.taxes); // Set taxes state
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const getCurrenyCode = (currencyId) => {
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


  const getTaxCode = (TaxId) => {
    TaxId = parseInt(TaxId);
    const tax = taxes.find(
      (tax) => tax.tax_id === TaxId
    );
    const TaxCode = tax ? tax.tax_code : "";
    return TaxCode;
  };

  const getTaxRate = (TaxId) => {
    TaxId = parseInt(TaxId);
    const tax = taxes.find(
      (tax) => tax.tax_id === TaxId
    );
    const TaxRate = tax ? tax.tax_rate : "";
    return TaxRate;
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Update selectedCurrencyId when currency_id is changed
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
  };

  const handleDistributeLines = async (e) => {
    e.preventDefault();
    console.log("Distribute button pressed")
  }
  const handleSuccessLinesModalClose = () => {
    setShowLinesModalWindow(false);
    //setSuccessMessage(null);
  };

  const handleSuccessDistModalClose = () => {
    setFormData({
      company_id: "",
      department_id: "",
      currency_id: "",
      status: "",
      tax_id: "",
      totalamount: "",
      partnerid: "",
      invoicedate: "",
      payment_duedate: "",
      payment_terms: "",
    });
    setShowDistModalWindow(false);
    //setSuccessMessage(null);
  }; 

  

  const handleDistributionSuccess = (response) => {
    const { message } = response.data;
  
    setSuccessMessage(`Header Id: ${invoiceHeader}, Message: ${message}`);
  
    // Clear the success message after 15 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);
  
    setFormData({
      company_id: "",
      department_id: "",
      currency_id: "",
      status: "",
      tax_id: "",
      totalamount: "",
      partnerid: "",
      invoicedate: "",
      payment_duedate: "",
      payment_terms: "",
    });
    setShowDistModalWindow(false);
    setSuccessMessage(null);
    setIsFormSubmitted(false);
    setResponseData(null);
    setInvoiceHeader(null); // Reset invoiceHeader to null
    //setIsFormSubmitted(false);
  };

  const handleCreateSILinesSuccess = (response) => {
    const { message } = response.data;
  
    setSuccessMessage(`Header Id: ${invoiceHeader}, Message: ${message}`);
  
    // Clear the success message after 15 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);
  
    /*setFormData({
      company_id: "",
      department_id: "",
      currency_id: "",
      status: "",
      tax_id: "",
      totalamount: "",
      partnerid: "",
      invoicedate: "",
      payment_duedate: "",
      payment_terms: "",
    });*/
    setIsFormSubmitted(true);
    setShowDistModalWindow(true)
  };
  
  const handleCreateLines = async (e) => {
    e.preventDefault();
  
    try {
      let response;
      if (!formSubmitted) {

        const { invoicedate, payment_duedate } = formData;

        // Convert dates to JavaScript Date objects
        const invoiceDate = new Date(invoicedate);
        const dueDate = new Date(payment_duedate);
  
        // Check if invoice date and due date are the same
        if (invoiceDate.getTime() === dueDate.getTime()) {
          // If yes, throw an alert message and return
          alert("Invoice date and due date cannot be the same.");
          return;
        }

        console.log("Display Form data ",formData)
        response = await axios.post(
          `${API_URL}/create_sales_invoice`,
          {
            ...formData,
            invoice_number: `${SALES_INVOICE_SQ_PREFIX}${Math.floor(
              Math.random() * 100000
            )}`,
            totalamount: 0, // Dynamically generate invoice number
            transaction_source: STANDARD_INV_TRANS_SOURCE,
          },
          { headers: generateHeaders() }
        );
        setFormSubmitted(true);
        setSuccessMessage(response.data.message);
        setInvoiceNumber(response.data.invoice_number);
        setInvoiceHeader(response.data.header_id);
        console.log("Invoice header", response.data.header_id);
        setShowLinesModalWindow(true); // Display modal window
        setResponseData(response);
      }  
      else {// Handle previous success response
      console.log("Response Data ",responseData)
      if (responseData) {
        setSuccessMessage(responseData.data.message);
        setInvoiceNumber(responseData.data.invoice_number);
        setInvoiceHeader(responseData.data.header_id);
        console.log("Invoice header", responseData.data.header_id);
        setShowLinesModalWindow(true); // Display modal window
      }}
    } catch (error) {
      console.error("Error creating PO invoice:", error);
      // Handle error response
      setSuccessMessage("Error creating PO invoice");
    }
  };
  
  

  return (
    <div className="child-container menu-container">
      {/* Your form JSX here */}
      {hasRequiredAccess && (
      <div className="child-container form-container">
        <form onSubmit={handleCreateLines}>
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
          {/* End of Company Select */}

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
          {/* End of Department Select */}

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
                    {currency.currencycode} ({currency.currencysymbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tax Select */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_id">Tax:</label>
              </div>
              <select
                id="tax_id"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleChange}
                className="form-control input-field"
                required
              >
                <option value="">Select Tax</option>
                {/* Populate options dynamically */}
                {/* Assuming you have tax data available in a state variable named taxes */}
                {taxes.map((tax) => (
                  <option key={tax.tax_id} value={tax.tax_id}>
                    {tax.tax_code} ({tax.tax_rate})
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* End of Tax Select */}

          
          {/* Partner Select */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="partnerid">Partner:</label>
              </div>
              <select
                id="partnerid"
                name="partnerid"
                value={formData.partnerid}
                onChange={handleChange}
                className="form-control input-field"
                required
              >
                <option value="">Select Partner</option>
                {partners.map((partner) => (
                  <option key={partner.partnerid} value={partner.partnerid}>
                    {partner.partnername}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* End of Partner Select */}

          {/* Invoice Date */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="invoicedate">Invoice Date:</label>
              </div>
              <input
                type="date"
                id="invoicedate"
                name="invoicedate"
                value={formData.invoicedate}
                onChange={handleChange}
                className="form-control input-field"
                required
              />
            </div>
          </div>
          {/* End of Invoice Date */}

          {/* Payment Due Date */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="payment_duedate">Due Date:</label>
              </div>
              <input
                type="date"
                id="payment_duedate"
                name="payment_duedate"
                value={formData.payment_duedate}
                onChange={handleChange}
                className="form-control input-field"
                required
              />
            </div>
          </div>
          {/* End of Payment Due Date */}

          {/* Payment Terms */}
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
          {/* End of Payment Terms */}

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
                {SALES_INVOICE_STATUS.filter((status) => status.display).map(
                  (status) => (
                    <option key={status.code} value={status.code}>
                      {status.name}
                    </option>
                  )
                )}
              </select>
            </div>
          </div>
          {/* End of Status Select */}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Lines
              </button>
              <button
                type="button"
                className="btn btn-primary"
                disabled={!isFormSubmitted}
                onClick={handleDistributeLines}
              >
                Distribute
              </button>
            </div>
          </div>
        </form>
        {successMessage && (
            <div>
              <p>{successMessage} ({invoiceNumber}) and Total {totalSum}</p>
            </div>
          )}
      </div>
            )}
             {/* Modal window */}
      <CreateSalesLineModalForm
        showLinesModalWindow={showLinesModalWindow}
        headerId={invoiceHeader}
        currencyId={selectedCurrencyId}
        invoiceNumber={invoiceNumber}
        currencyCode={getCurrenyCode(selectedCurrencyId)} 
        currencySymbol={getCurrencySymbol(selectedCurrencyId)} 
        tax_id={selectedTaxId}
        tax_code={getTaxCode(selectedTaxId)} 
        tax_rate={getTaxRate(selectedTaxId)}
        setTotalSum={setTotalSum}
        onClose={handleSuccessLinesModalClose} // Close modal window function
        onSuccess={(response) => handleCreateSILinesSuccess(response)}
      />

        {/* Modal window */}
        <CreateSIDistributions
        showDistModalWindow={showDistModalWindow}
        headerId={invoiceHeader}
        companyId={selectedCompany}
        departmentId={selectedDepartment}
        currencyId={selectedCurrencyId}
        invoiceNumber={invoiceNumber}
        currencyCode={getCurrenyCode(selectedCurrencyId)} 
        currencySymbol={getCurrencySymbol(selectedCurrencyId)} 
        tax_id={selectedTaxId}
        tax_code={getTaxCode(selectedTaxId)} 
        tax_rate={getTaxRate(selectedTaxId)}
        invoice_total={totalSum}
        onClose={handleSuccessDistModalClose} // Close modal window function
        onSuccess={(response) => handleDistributionSuccess(response)}
      />
    </div>
  );
}
