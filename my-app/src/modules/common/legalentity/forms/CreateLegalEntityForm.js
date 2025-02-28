import React, { useState } from "react";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

export default function CreateLegalEntityForm() {
  const [formData, setFormData] = useState({
    name: "",
    registration_number: "",
    address: "",
    contact_email: "",
    contact_phone: "",
    about: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userid,
    };
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setLoading(true);
    setError(null);

    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await axios.post(
        `${API_URL}/create_legal_entity`,
        formDataToSend,
        { headers: generateHeaders() }
      );

      logger.info(`[${new Date().toLocaleTimeString()}] Legal entity created successfully`, response.data);
      setSuccessMessage("Legal entity created successfully");
      setFormData({
        name: "",
        registration_number: "",
        address: "",
        contact_email: "",
        contact_phone: "",
        about: "",
      });
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error creating legal entity`, error);
      setError("An error occurred while creating the legal entity. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Legal Entity</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="name">Legal Entity Name:</label>
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
                  <label htmlFor="registration_number">Registration Number:</label>
                </div>
                <input
                  type="text"
                  id="registration_number"
                  name="registration_number"
                  value={formData.registration_number}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="address">Address:</label>
                </div>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="contact_email">Contact Email:</label>
                </div>
                <input
                  type="email"
                  id="contact_email"
                  name="contact_email"
                  value={formData.contact_email}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="contact_phone">Contact Phone:</label>
                </div>
                <input
                  type="tel"
                  id="contact_phone"
                  name="contact_phone"
                  value={formData.contact_phone}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="about">About:</label>
                </div>
                <textarea
                  id="about"
                  name="about"
                  value={formData.about}
                  onChange={handleChange}
                  className="form-control text-field"
                />
              </div>
            </div>
            {loading && <div className="loading-indicator">Creating...</div>}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Legal Entity
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>You do not have permission to view this module</div>
        )}
      </div>
    </div>
  );
}
