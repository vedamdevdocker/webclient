import React, { useState } from "react";
import axios from "axios";
//import { Modal, Button } from "react-bootstrap";
import {
  TAX_TYPES,
  TAX_AUTHORITIES,
  TAX_JURISDICTIONS,
  TAX_APPLICABILITY,
  TAX_REPORTING_CODES,
} from "../../setups/config";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";
import "../../../utilities/css/appcss.css"; // Ensure this file contains relevant styles

export default function CreateTaxForm() {
  const [formData, setFormData] = useState({
    tax_code: "",
    tax_description: "",
    tax_rate: 0.0,
    tax_type: "",
    tax_authority: "",
    tax_jurisdiction: "",
    tax_applicability: "",
    effective_date: "",
    exemption: "",
    reporting_codes: "",
    integration_info: "",
    status: true,
    notes: "",
  });

  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === "checkbox" ? checked : value;

    setFormData((prevData) => ({
      ...prevData,
      [name]: newValue,
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
        `${API_URL}/create_tax_codes`,
        {
          tax_code: formData.tax_code,
          tax_description: formData.tax_description,
          tax_rate: parseFloat(formData.tax_rate), // Convert to number
          tax_type: formData.tax_type,
          tax_authority: formData.tax_authority,
          tax_jurisdiction: formData.tax_jurisdiction,
          tax_applicability: formData.tax_applicability,
          effective_date: formData.effective_date, // Ensure correct format
          exemption: formData.exemption,
          reporting_codes: formData.reporting_codes,
          integration_info: formData.integration_info,
          status: formData.status,
          notes: formData.notes,
        },
        {
          headers: generateHeaders(),
        }
      );

      setSuccessMessage("Tax data created successfully");
      setErrorMessage("");

      logger.debug(
        `[${new Date().toLocaleTimeString()}] Tax data:`,
        response.data
      );

      // Reset form data
      setFormData({
        tax_code: "",
        tax_description: "",
        tax_rate: 0.0,
        tax_type: "",
        tax_authority: "",
        tax_jurisdiction: "",
        tax_applicability: "",
        effective_date: "",
        exemption: "",
        reporting_codes: "",
        integration_info: "",
        status: true,
        notes: "",
      });
    } catch (error) {
      console.error("Error creating tax:", error);
      setErrorMessage(`Error creating tax: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="form-title">Create Tax</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit} className="form">
          {/* Tax Code */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_code">Tax Code:</label>
              </div>
              <input
                type="text"
                id="tax_code"
                name="tax_code"
                value={formData.tax_code}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Tax Description */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_description">Tax Description:</label>
              </div>
              <input
                type="text"
                id="tax_description"
                name="tax_description"
                value={formData.tax_description}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Tax Rate */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_rate">Tax Rate (%):</label>
              </div>
              <input
                type="number"
                step="0.01"
                id="tax_rate"
                name="tax_rate"
                value={formData.tax_rate}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Tax Type */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_type">Tax Type:</label>
              </div>
              <select
                id="tax_type"
                name="tax_type"
                value={formData.tax_type}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Tax Type</option>
                {TAX_TYPES.map((type) => (
                  <option key={type.code} value={type.code}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tax Authority */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_authority">Tax Authority:</label>
              </div>
              <select
                id="tax_authority"
                name="tax_authority"
                value={formData.tax_authority}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Tax Authority</option>
                {TAX_AUTHORITIES.map((authority) => (
                  <option key={authority.code} value={authority.code}>
                    {authority.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tax Jurisdiction */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_jurisdiction">Tax Jurisdiction:</label>
              </div>
              <select
                id="tax_jurisdiction"
                name="tax_jurisdiction"
                value={formData.tax_jurisdiction}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Tax Jurisdiction</option>
                {TAX_JURISDICTIONS.map((jurisdiction) => (
                  <option key={jurisdiction.code} value={jurisdiction.code}>
                    {jurisdiction.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Tax Applicability */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_applicability">Tax Applicability:</label>
              </div>
              <select
                id="tax_applicability"
                name="tax_applicability"
                value={formData.tax_applicability}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Tax Applicability</option>
                {TAX_APPLICABILITY.map((applicability) => (
                  <option key={applicability.code} value={applicability.code}>
                    {applicability.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Effective Date */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="effective_date">Effective Date:</label>
              </div>
              <input
                type="date"
                id="effective_date"
                name="effective_date"
                value={formData.effective_date}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Exemption */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="exemption">Exemption Reason:</label>
              </div>
              <input
                type="text"
                id="exemption"
                name="exemption"
                value={formData.exemption}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Reporting Codes */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="reporting_codes">Reporting Codes:</label>
              </div>
              <select
                id="reporting_codes"
                name="reporting_codes"
                value={formData.reporting_codes}
                onChange={handleChange}
                className="form-control input-field"
              >
                {/* Option to select nothing */}
                <option value="">Select a Reporting Code</option>

                {/* Dynamically generate options from TAX_REPORTING_CODES */}
                {TAX_REPORTING_CODES.map((code) => (
                  <option key={code.code} value={code.code}>
                    {code.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Integration Info */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="integration_info">Additional Info:</label>
              </div>
              <input
                type="text"
                id="integration_info"
                name="integration_info"
                value={formData.integration_info}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Status */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label className="form-check-label">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={formData.status}
                    onChange={handleChange}
                    className="form-check-input"
                  />
                  Active Status
                </label>
              </div>
            </div>
          </div>

          {/* Notes */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="notes">Notes:</label>
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <button type="submit" className="btn btn-primary">
              Create Tax
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
