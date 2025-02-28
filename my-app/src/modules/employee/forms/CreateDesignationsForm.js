import React, { useState } from "react";
import axios from "axios";

import {
  API_URL,
  BACKEND_EMPLOYEE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../admin/setups/ConstDecl"; // Import your constants
import "../../utilities/css/appcss.css";
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import logger from "../../utilities/Logs/logger"; // Import your logger

export default function CreateDesignationsForm() {
  const [formData, setFormData] = useState({
    designation_name: "",
    description: "",
    salary_range: "",
    responsibilities: "",
    qualifications: "",
  });

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_EMPLOYEE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });

    logger.debug(
      `[${new Date().toLocaleTimeString()}] ${e.target.name} value changed: ${e.target.value}`
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.post(`${API_URL}/create_designations`, formData, { headers });

      logger.info(
        `[${new Date().toLocaleTimeString()}] Designation created successfully:`,
        response.data
      );

      setFormData({
        designation_name: "",
        description: "",
        salary_range: "",
        responsibilities: "",
        qualifications: "",
      });
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error creating designation:`,
        error
      );
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Designation</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="designation_name">Designation Name:</label>
                </div>
                <input
                  type="text"
                  id="designation_name"
                  name="designation_name"
                  value={formData.designation_name}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="description">Description:</label>
                </div>
                <textarea
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="salary_range">Salary Range:</label>
                </div>
                <input
                  type="text"
                  id="salary_range"
                  name="salary_range"
                  value={formData.salary_range}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="responsibilities">Responsibilities:</label>
                </div>
                <textarea
                  id="responsibilities"
                  name="responsibilities"
                  value={formData.responsibilities}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="qualifications">Qualifications:</label>
                </div>
                <textarea
                  id="qualifications"
                  name="qualifications"
                  value={formData.qualifications}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Designation
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
