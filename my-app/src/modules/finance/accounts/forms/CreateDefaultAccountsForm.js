import React, { useState, useEffect } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CreateDefaultAccountsLineForm from "./CreateDefaultAccountsLineForm";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function CreateDefaultAccountsForm() {
  const [formData, setFormData] = useState({
    header_name: "",
    company_id: "",
    currency_id: "",
  });

  const [companies, setCompanies] = useState([]);
  const [currencies, setCurrencies] = useState([]);
  const [currenciesLoaded, setCurrenciesLoaded] = useState(false); // Track if currencies are fetched
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModalWindow, setShowModal] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState("");
  const [currencyCode, setCurrencyCode] = useState("");
  const [selectedcompanyId, setSelectedCompanyId] = useState("");
  const [selectedcurrencyId, setSelectedCurrencyId] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleSuccessModalClose = () => {
    setShowModal(false);
  };

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const companiesResponse = await axios.get(`${API_URL}/get_companies`, {
          headers: generateHeaders(),
        });
        setCompanies(companiesResponse.data.company_list);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    }

    fetchCompanies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_currencies`, {
        headers: generateHeaders(),
      });
      setCurrencies(response.data.currencies);
      setCurrenciesLoaded(true);
    } catch (error) {
      console.error("Error fetching currencies:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "currency_id") {
      if (!currenciesLoaded) {
        // If currencies are not loaded yet, fetch them
        fetchCurrencies();
      } else {
        // Convert value to number for proper comparison
        const currencyId = Number(value);

        const selectedCurrency =
          currencies.find((currency) => currency.currency_id === currencyId) ||
          {};
        setCurrencySymbol(selectedCurrency.currencysymbol || "");
        setCurrencyCode(selectedCurrency.currencycode || "");
        setSelectedCurrencyId(formData.currency_id);
      }
    }

    if (name === "company_id") {
      setSelectedCompanyId(formData.company_id);
      }
    


  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert formData.currency_id to a number for comparison
    const currencyId = Number(formData.currency_id);

    const selectedCurrency = currencies.find(
      (currency) => currency.currency_id === currencyId
    );

    if (selectedCurrency) {
      setCurrencySymbol(selectedCurrency.currencysymbol || "");
      setCurrencyCode(selectedCurrency.currencycode || "");
    } else {
      console.error("Selected currency not found!");
      // Set default values if currency is not found
      setCurrencySymbol("");
      setCurrencyCode("");
    }
    setCurrencySymbol(selectedCurrency.currencysymbol || "");
    setCurrencyCode(selectedCurrency.currencycode || "");
    setSelectedCurrencyId(Number(formData.currency_id));
    setSelectedCompanyId(Number(formData.company_id));

    console.log(formData)

    try {
      const response = await axios.post(
        `${API_URL}/create_default_account_headers`,
        {
          ...formData,
        },
        { headers: generateHeaders() }
      );

      setSuccessMessage({
        header_id: response.data.header_id,
        message: response.data.message,
      });

      if (response.status === 201) {
        setShowModal(true);
      }
    } catch (error) {
      console.error("Error creating default account header:", error);
    } finally {
      setFormData({
        header_name: "",
        company_id: "",
        currency_id: "",
      });
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Default Account Header</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            {/* Header Name Input */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="header_name">Header Name:</label>
                </div>
                <input
                  type="text"
                  id="header_name"
                  name="header_name"
                  value={formData.header_name}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                />
              </div>
            </div>

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
                  onChange={handleChange}
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
                  onClick={fetchCurrencies} // Fetch currencies when dropdown is clicked
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Currency</option>
                  {currenciesLoaded &&
                    currencies.map((currency) => (
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
                  Create Default Account Header
                </button>
              </div>
            </div>
          </form>

          {successMessage && showModalWindow && (
            <div>
              <CreateDefaultAccountsLineForm
                showModalWindow={showModalWindow}
                headerId={successMessage.header_id}
                message={successMessage.message}
                companyId={selectedcompanyId}
                currencyId={selectedcurrencyId}
                currencyCode={currencyCode}
                currencySymbol={currencySymbol}
                onClose={handleSuccessModalClose}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          You do not have permission to create a default account header.
        </div>
      )}
    </div>
  );
}
