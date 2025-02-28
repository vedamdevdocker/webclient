import React, { useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../setups/ConstDecl"; // Import your constants
import "../../utilities/css/appcss.css"; // Adjust the import path as needed
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function CreateUISetupsForm() {
  const [formData, setFormData] = useState({
    config_key: "",
    config_value: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null); // Add state for form submission status
  const hasRequiredAccess = CheckModuleAccess(BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS); // Use your access checking function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    logger.info(`[${new Date().toLocaleTimeString()}] ${name} value changed: ${value}`); // Info log message
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const authToken = localStorage.getItem('token');
      const userid = localStorage.getItem('userid');

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'UserId': userid,
      };

      logger.info(`[${new Date().toLocaleTimeString()}] Creating UI Configuration Data...`);

      const response = await axios.post(`${API_URL}/create_ui_config_data`, formData, { headers });

      // Log the response data
      logger.info(`[${new Date().toLocaleTimeString()}] Response data:`, response.data);

      setFormData({
        config_key: "",
        config_value: "",
      });
      setSubmitStatus("success"); // Set success status
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error creating UI configuration data:`, error);
      setSubmitStatus("failure"); // Set failure status
    }
  };

  return (
    <div className="child-container menu-container">
      <h2>User Interface Setup</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            {/* Display success or failure message */}
            {submitStatus === "success" && (
              <p className="success-message">Form submitted successfully!</p>
            )}
            {submitStatus === "failure" && (
              <p className="error-message">Form submission failed. Please try again.</p>
            )}

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="config_key">Config Key:</label>
                </div>
                <input
                  type="text"
                  id="config_key"
                  name="config_key"
                  value={formData.config_key}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="config_value">Config Value:</label>
                </div>
                <input
                  type="text"
                  id="config_value"
                  name="config_value"
                  value={formData.config_value}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create UI Config Data
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}
