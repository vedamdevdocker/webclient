import React, { useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../setups/ConstDecl"; // Import your constants
import "../../utilities/css/appcss.css"; // Adjust the import path as needed
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function CreateDBSetupsForm() {
  const [formData, setFormData] = useState({
    username: "",
    name: "",
    password: "",
    config_key: "",
    config_value: "",
  });

  const [submitStatus, setSubmitStatus] = useState(null); // Add state for form submission status
  const [hashedPassword, setHashedPassword] = useState("");
  const hasRequiredAccess = CheckModuleAccess(BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS); // Use your access checking function

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    logger.info(`[${new Date().toLocaleTimeString()}] ${name} value changed: ${value}`); // Info log message
  };

  const handlePasswordGeneration = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const userid = localStorage.getItem('userid');

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'UserId': userid,
      };

      const response = await axios.post(`${API_URL}/generate_password_hash`, {
        username: formData.username,
        plaintext_password: formData.password,
      }, { headers });
      setHashedPassword(response.data.hashed_password);
      logger.debug(`[${new Date().toLocaleTimeString()}] Hashed password generated successfully.`);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error generating hashed password:`, error);
      throw error; // Rethrow the error to be caught in handleSubmit
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Check if at least one set of required fields is present
    if (
      (formData.username && formData.name && formData.password) ||
      (formData.config_key && formData.config_value)
    ) {
      try {
        // Generate the hashed password
        await handlePasswordGeneration();

        // Update the form data with the generated password
        const updatedFormData = {
          ...formData,
          password: hashedPassword,
        };

        // Insert data into two tables using create_db_config_data API
        const authToken = localStorage.getItem('token');
        const userid = localStorage.getItem('userid');

        const headers = {
          'Authorization': `Bearer ${authToken}`,
          'UserId': userid,
        };

        logger.info(`[${new Date().toLocaleTimeString()}] Creating UI Configuration Data...`);

        const response = await axios.post(
          `${API_URL}/create_db_config_data`,
          updatedFormData,
          { headers }
        );

        // Log the response data
        logger.info(`[${new Date().toLocaleTimeString()}] Response data:`, response.data);

        setSubmitStatus("success"); // Set success status
        setFormData({
          username: "",
          name: "",
          password: "",
          config_key: "",
          config_value: "",
        });
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error inserting data into tables:`, error.response.data.error);
        logger.error(`[${new Date().toLocaleTimeString()}] Error inserting data into tables:`, error);
        setSubmitStatus("failure"); // Set failure status

        // Clear the form fields by resetting formData
      }
    } else {
      setSubmitStatus("failure"); // Set failure status if required fields are missing
    }
  };

  return (
    <div className="child-container menu-container">
      <h2>Database Interface Setup</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            {/* Display success or failure message */}
            {submitStatus === "success" && (
              <p className="success-message">Form submitted successfully!</p>
            )}
            {submitStatus === "failure" && (
              <p className="error-message">
                Form submission failed. Please enter username and password.
              </p>
            )}

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="username">Username:</label>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="name">Name:</label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="password">Password:</label>
                </div>
                <input
                  type="password" // Change the input type to "password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2 contact-fieldset">
              <div className="form-group col-md-6 mb-2 ">
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

              <div className="form-group col-md-6 mb-2 ">
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
