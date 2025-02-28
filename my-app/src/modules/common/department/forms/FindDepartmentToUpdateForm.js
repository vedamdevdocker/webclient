import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import "../../../utilities/css/appcss.css";
import axios from "axios";
import logger from "../../../utilities/Logs/logger";

function FindDepartmentToUpdateForm() {
  const [departmentNumber, setDepartmentNumber] = useState(""); // This will hold the department ID
  const [departments, setDepartments] = useState([]); // To store fetched departments
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  // Fetch departments from API
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_departments`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "UserId": localStorage.getItem("userid")
          }
        });
        setDepartments(response.data.department_list);
      } catch (error) {
        console.error("Error fetching departments", error);
        setError("Failed to load departments.");
      }
    };

    fetchDepartments();
  }, []);

  const handleDepartmentChange = (e) => {
    setDepartmentNumber(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      if (!departmentNumber) {
        setError("Please select a department.");
        return;
      }

      // Navigate to update form with department number in hidden state
      navigate(`/update-department`, {
        state: { departmentNumber }, // Send departmentNumber as hidden state
      });
    } catch (error) {
      logger.error("Error navigating to department update form:", error);
      alert("Error navigating to update department form.");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Find Department</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">

          {/* Department LOV */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="department_id">Select Department</label>
              </div>
              <select
                id="department_id"
                value={departmentNumber}
                onChange={handleDepartmentChange}
                className="form-control input-field"
              >
                <option value="">--Select Department--</option>
                {departments.map((department) => (
                  <option key={department.id} value={department.id}>
                    {department.department_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button onClick={handleButtonClick} className="btn btn-primary">
                Update Department
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default FindDepartmentToUpdateForm;
