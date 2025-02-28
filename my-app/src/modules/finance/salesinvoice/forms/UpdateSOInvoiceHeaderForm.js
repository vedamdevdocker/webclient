import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import {
  UPDATABLE_SALES_INVOICE_STATUS,
} from "../../config/config";
import logger from "../../../utilities/Logs/logger";
import UpdateSalesLineModalForm from "./UpdateSalesLineModalForm";
import UpdateDistributionsModalForm from "./UpdateDistributionsModalForm";

export default function UpdatePOInvoiceHeaderForm() {
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

  // Function to reset form fields to initial state

  const { SalesParameters } = useParams();
 
  const [isDistributionsButtonPressed, setIsDistributionsButtonPressed] =
    useState(false);
    // eslint-disable-next-line 
  const [resultData, setResultData] = useState([]);
  // eslint-disable-next-line 
  const [error, setError] = useState(null);
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
  const [invoiceTotal, setInvoiceTotal] = useState(0);

  const [selectedCompany, setSelectedCompany] = useState([]);
  const [selectedDepartment, setSelectedDepartment] = useState([]);

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
    //console.log("Use Effect in the Header form")
    const fetchData = async () => {
      try {
        let apiUrl = `${API_URL}/get_so_invoices`;

        if (SalesParameters) {
          const queryParams = new URLSearchParams(SalesParameters);
          apiUrl += `?${queryParams.toString()}`;
        }
        //apiUrl += apiUrl.includes('?') ? '&status=NEW' : '?status=NEW';

        apiUrl += apiUrl.includes('?') ? '&' : '?'; // Check if URL already has query params
        apiUrl += UPDATABLE_SALES_INVOICE_STATUS.map(status => `status=${status.code}`).join('&');


        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        setResultData(response.data.sales_invoice_headers);
        setError(null);

        if (response.data.sales_invoice_headers.length > 0) {
          const firstSalesInvoice =
            response.data.sales_invoice_headers[0];
          const companyId = firstSalesInvoice.company_id;
          setInvoiceHeader(firstSalesInvoice.header_id);
          setSelectedCurrencyId(firstSalesInvoice.currency_id);
          setInvoiceNumber(firstSalesInvoice.invoice_number);
          setSelectedTaxId(firstSalesInvoice.tax_id);
          setTotalSum(firstSalesInvoice.totalamount);
          setInvoiceTotal(firstSalesInvoice.totalamount);
          setSelectedCompany(companyId)
          setSelectedDepartment(firstSalesInvoice.department_id)

          // Fetch departments, currencies, tax codes, business partners, and companies in parallel
          await Promise.all([
            getDepartments(companyId),
            getCurrencies(),
            getTaxCodes(),
            getBusinessPartners(),
            getCompanies(),
          ]);

          setFormData({
            company_id: firstSalesInvoice.company_id,
            department_id: firstSalesInvoice.department_id,
            currency_id: firstSalesInvoice.currency_id,
            status: firstSalesInvoice.status,
            tax_id: firstSalesInvoice.tax_id,
            totalamount: firstSalesInvoice.totalamount,
            partnerid: firstSalesInvoice.partnerid,
            invoicedate: new Date(firstSalesInvoice.invoicedate)
              .toISOString()
              .split("T")[0],
            payment_duedate: new Date(firstSalesInvoice.payment_duedate)
              .toISOString()
              .split("T")[0],
            payment_terms: firstSalesInvoice.payment_terms,
          });

          logger.info(
            `[${new Date().toLocaleTimeString()}] Fetched Sales data successfully`
          );
        } else {
          console.log("No updatable invoices found in the database");
        }
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching Sales data`,
          error
        );
      }
    };

    fetchData();
    // eslint-disable-next-line
  }, []);

  const getDepartments = async (companyId) => {
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

  const getCurrencies = async () => {
    try {
      const currenciesResponse = await axios.get(`${API_URL}/list_currencies`, {
        headers: generateHeaders(),
      });
      setCurrencies(currenciesResponse.data.currencies);
    } catch (error) {
      logger.error(`Error fetching Currencies:`, error);
    }
  };

  const getTaxCodes = async () => {
    try {
      const taxesResponse = await axios.get(`${API_URL}/list_tax_codes`, {
        // Fetch taxes data
        headers: generateHeaders(),
      });
      setTaxes(taxesResponse.data.taxes); // Set taxes state
    } catch (error) {
      logger.error(`Error fetching Tax codes:`, error);
    }
  };
  const getBusinessPartners = async () => {
    try {
      const partnersResponse = await axios.get(`${API_URL}/get_partner_data`, {
        headers: generateHeaders(),
      });
      setPartners(partnersResponse.data);
    } catch (error) {
      logger.error(`Error fetching Business partners:`, error);
    }
  };

  const getCompanies = async () => {
    try {
      const companiesResponse = await axios.get(`${API_URL}/get_companies`, {
        headers: generateHeaders(),
      });
      setCompanies(companiesResponse.data.company_list);
      //setSelectedCompany(companyId);
    } catch (error) {
      logger.error(`Error fetching companies:`, error);
    }
  };
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
    const tax = taxes.find((tax) => tax.tax_id === TaxId);
    const TaxCode = tax ? tax.tax_code : "";
    return TaxCode;
  };

  const getTaxRate = (TaxId) => {
    TaxId = parseInt(TaxId);
    const tax = taxes.find((tax) => tax.tax_id === TaxId);
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
      // Update selectedCompany state
      setSelectedCompany(companyId);
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setIsFormDirty(true); // Set form as dirty when any field changes

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

  /*const handleDistributeLines = async (e) => {
    e.preventDefault();
    console.log("Distribute button pressed");
  };*/
  const handleSuccessLinesModalClose = () => {
    setShowLinesModalWindow(false);
    //setSuccessMessage(null);
  };

  const handleSuccessDistModalClose = () => {
    setShowDistModalWindow(false);
    //setSuccessMessage(null);
  };

  const handleDistributionSuccess = (response) => {

    console.log("Response from Child form ",response)
    if (response != null) {
      const { message } = response;
      setSuccessMessage(`Header Id: ${invoiceHeader}, Message: ${message}`);
  
      // Clear the success message after 15 seconds
      setTimeout(() => {
        setSuccessMessage(null);
      }, 15000);

      setIsFormSubmitted(true);
      setShowDistModalWindow(true);
    } else {
      // Handle case where message property is undefined
      console.error("Error handling distribution lines: Message property not found in response");
      // You can set an error message or take other appropriate actions here
    }
  };
  

  /* const handleDistributionSuccess = (response) => {
    const { message } = response.data;

    setSuccessMessage(`Header Id: ${invoiceHeader}, Message: ${message}`);

    // Clear the success message after 15 seconds
    setTimeout(() => {
      setSuccessMessage(null);
    }, 15000);

    /* setFormData({
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
    //setIsFormSubmitted(false);
    setIsFormSubmitted(true);
    setShowDistModalWindow(true);
  }; */

  const handleCreatePILinesSuccess = (response) => {
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
    //setShowDistModalWindow(true);
  };

  const handleUpdateLines = async (e) => {
    // e.preventDefault();
    setShowLinesModalWindow(true);
  };

  const handleDistributions = async (e) => {
    setShowDistModalWindow(true);
    setIsDistributionsButtonPressed(true); // Update the state variable
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
  
    let validateResponse;
  
    if (formData.status === "APPROVED") {
      try {
        console.log("Before calling API");
        validateResponse = await axios.get(
          `${API_URL}/validate_sales_invoice?header_id=${invoiceHeader}`,
          { headers: generateHeaders() }
        );
  
        // Log the response data for debugging purposes
        console.log("Response from validation API:", validateResponse.data);
  
        // Check if the request was successful (status 200) and handle the message
        if (validateResponse.status === 200) {
          if (validateResponse.data.message === "Invoice validation successful") {
            setSuccessMessage(validateResponse.data.message);
          } else {
            setError(validateResponse.data.error || "Validation failed for unknown reason");
            return;
          }
        } else {
          // Handle other status codes if necessary
          setError(`Validation API returned status code ${validateResponse.status}`);
          return;
        }
      } catch (error) {
        // Handle any errors that occurred during the API call
        console.error("Error validating Sales Invoice:", error.response.data.error);
        if (error.response && error.response.data && error.response.data.error) {
          // If the error response contains an error message, set it in the setError state
          setError(error.response.data.error);
        } else {
          // If the error does not contain a specific error message, set a generic error message
          setError("An error occurred while validating the sales invoice.");
        }
        return;
      }
    }
  
    try {
      let apiUrl = `${API_URL}/update_sales_invoice`;
  
      if (SalesParameters) {
        const queryParams = new URLSearchParams(SalesParameters);
        apiUrl += `?${queryParams.toString()}`;
      }

      const response = await axios.put(apiUrl, formData, {
        headers: generateHeaders(),
      });
  
      if (response.data.status) {
        // Display success message
        setSuccessMessage(response.data.message);
        //resetForm();
      } else {
        // Display error message
        setError(response.data.error || "Unknown error occurred while updating the sales invoice");
      }
      setIsFormSubmitted(true);
      setIsFormDirty(false); // Reset form dirty state after submission
    } catch (error) {
      console.error("Error updating Sales Invoice:", error);
      // Handle error response
      setError("An error occurred while updating the sales invoice.", error);
    }
  };
  
  
  
  

  return (
    <div className="child-container menu-container">
      {/* Your form JSX here */}
      {hasRequiredAccess && (
        <div className="child-container form-container">
          <form onSubmit={handleFormSubmit}>
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
                >
                  <option value="">Select Tax</option>
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
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
                  disabled={isFormSubmitted} // Disable if form is submitted
                >
                  <option value="">Select Status</option>
                  {UPDATABLE_SALES_INVOICE_STATUS.filter(
                    (status) => status.display
                  ).map((status) => (
                    <option key={status.code} value={status.code}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            {/* End of Status Select */}

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={!isFormDirty || isFormSubmitted} // Disable if form is not dirty or already submitted
                >
                  Submit
                </button>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button
                  type="button"
                  disabled={!isFormSubmitted && isFormDirty} // Enable if form is submitted or if any change is made to form fields
                  onClick={() => handleUpdateLines()}
                >
                  Lines
                </button>
                <button
                  type="button"
                  disabled={!isFormSubmitted && isFormDirty} // Enable if form is submitted or if any change is made to form fields
                  onClick={() => handleDistributions()}
                >
                  Distributions
                </button>
              </div>
            </div>
          </form>
          {successMessage && (
            <div>
              <p>
                {successMessage} ({invoiceNumber}) and Total {totalSum}  and new Invoice Total {invoiceTotal}
              </p>
            </div>
          )}
          {error && (
            <div>
              <p>
                {error} 
              </p>
            </div>
          )}
        </div>
      )}

      {showLinesModalWindow && (
        <UpdateSalesLineModalForm
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
          setInvoiceTotal={setInvoiceTotal}
          onClose={handleSuccessLinesModalClose} // Close modal window function
          onSuccess={(response) => handleCreatePILinesSuccess(response)}
        />
      )}

      {showDistModalWindow && isDistributionsButtonPressed && (
        <UpdateDistributionsModalForm
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
          invoice_total={totalSum !== invoiceTotal ? invoiceTotal : totalSum} 
          onClose={handleSuccessDistModalClose} // Close modal window function
          onSuccess={(response) => handleDistributionSuccess(response)}
        />
      )}

    </div>
  );
}
