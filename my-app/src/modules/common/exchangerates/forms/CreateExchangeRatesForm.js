import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";
import "../../../utilities/css/appcss.css"; // Ensure this file contains relevant styles

export default function CreateExchangeRatesForm() {
  const [formData, setFormData] = useState({
    from_currency_id: "",
    to_currency_id: "",
    exchangerate: 0.0,
    valid_from: "",
    valid_to: "",
    conversion_type: "",
    provider_id: "",
    status: "",
    version: "",
  });

  const [currencies, setCurrencies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  // Fetch currency list on component mount
  useEffect(() => {
    const fetchCurrencies = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_currencies`, {
          headers: generateHeaders(),
        });
        setCurrencies(response.data.currencies);
      } catch (error) {
        console.error("Error fetching currencies:", error);
        setErrorMessage("Error fetching currencies.");
      }
    };

    fetchCurrencies();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = name === "from_currency_id" || name === "to_currency_id" ? parseInt(value) : value;
    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
    }));

    // Handle exchange rate auto-update if from_currency_id equals to_currency_id
    if (name === "from_currency_id" || name === "to_currency_id") {
      if (formData.from_currency_id === formData.to_currency_id) {
        setFormData((prevData) => ({
          ...prevData,
          exchangerate: 1.0,
        }));
      }
    }
  };

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Type cast provider_id to Number
    const processedData = {
      ...formData,
      provider_id: Number(formData.provider_id),
    };

    try {
      const response = await axios.post(
        `${API_URL}/create_exchange_rates`,
        processedData,
        {
          headers: generateHeaders(),
        }
      );

      setSuccessMessage("Exchange rate created successfully");
      setErrorMessage("");

      logger.debug(
        `[${new Date().toLocaleTimeString()}] Exchange rate data:`,
        response.data
      );

      // Reset form data
      setFormData({
        from_currency_id: "",
        to_currency_id: "",
        exchangerate: 0.0,
        valid_from: "",
        valid_to: "",
        conversion_type: "",
        provider_id: "",
        status: "",
        version: "",
      });
    } catch (error) {
      console.error("Error creating exchange rate:", error);
      setErrorMessage(`Error creating exchange rate: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="form-title">Create Exchange Rate</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit} className="form">
          {/* From Currency ID */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="from_currency_id">From Currency:</label>
              </div>
              <select
                id="from_currency_id"
                name="from_currency_id"
                value={formData.from_currency_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency.currency_id} value={currency.currency_id}>
                    {currency.currencycode} ({currency.currencysymbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* To Currency ID */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="to_currency_id">To Currency:</label>
              </div>
              <select
                id="to_currency_id"
                name="to_currency_id"
                value={formData.to_currency_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Currency</option>
                {currencies.map((currency) => (
                  <option key={currency.currency_id} value={currency.currency_id}>
                    {currency.currencycode} ({currency.currencysymbol})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Exchange Rate */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="exchangerate">Exchange Rate:</label>
              </div>
              <input
                type="number"
                step="0.000001"
                id="exchangerate"
                name="exchangerate"
                value={formData.exchangerate}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formData.from_currency_id === formData.to_currency_id}
              />
            </div>
          </div>

          {/* Valid From */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="valid_from">Valid From:</label>
              </div>
              <input
                type="date"
                id="valid_from"
                name="valid_from"
                value={formData.valid_from}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Valid To */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="valid_to">Valid To:</label>
              </div>
              <input
                type="date"
                id="valid_to"
                name="valid_to"
                value={formData.valid_to}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Conversion Type */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="conversion_type">Conversion Type:</label>
              </div>
              <input
                type="text"
                id="conversion_type"
                name="conversion_type"
                value={formData.conversion_type}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Provider ID */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="provider_id">Provider ID:</label>
              </div>
              <input
                type="text"
                id="provider_id"
                name="provider_id"
                value={formData.provider_id}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="status">Status:</label>
              </div>
              <input
                type="text"
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Version */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="version">Version:</label>
              </div>
              <input
                type="text"
                id="version"
                name="version"
                value={formData.version}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <button type="submit" className="btn btn-primary">
              Create Exchange Rate
            </button>
          </div>
        </form>

        {/* Display success message */}
        {successMessage && (
          <div className="alert alert-success">{successMessage}</div>
        )}

        {/* Display error message */}
        {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
      </div>
    </div>
  );
}
