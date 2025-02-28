import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";
import "../../../utilities/css/appcss.css"; // Ensure this file contains relevant styles

export default function CreateCurrenciesForm() {
  const [formData, setFormData] = useState({
    currencycode: "",
    currencyname: "",
    currencysymbol: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
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

    try {
      const response = await axios.post(
        `${API_URL}/create_currencies`,
        formData,
        {
          headers: generateHeaders(),
        }
      );

      setSuccessMessage("Currency created successfully");
      setErrorMessage("");

      logger.debug(
        `[${new Date().toLocaleTimeString()}] Currency data:`,
        response.data
      );

      // Reset form data
      setFormData({
        currencycode: "",
        currencyname: "",
        currencysymbol: "",
      });
    } catch (error) {
      console.error("Error creating currency:", error);
      setErrorMessage(`Error creating currency: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="form-title">Create Currency</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit} className="form">
          {/* Currency Code */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="currencycode">Currency Code:</label>
              </div>
              <input
                type="text"
                id="currencycode"
                name="currencycode"
                value={formData.currencycode}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Currency Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="currencyname">Currency Name:</label>
              </div>
              <input
                type="text"
                id="currencyname"
                name="currencyname"
                value={formData.currencyname}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Currency Symbol */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="currencysymbol">Currency Symbol:</label>
              </div>
              <input
                type="text"
                id="currencysymbol"
                name="currencysymbol"
                value={formData.currencysymbol}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <button type="submit" className="btn btn-primary">
              Create Currency
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
