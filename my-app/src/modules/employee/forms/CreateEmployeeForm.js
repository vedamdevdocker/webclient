import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_EMPLOYEE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../admin/setups/ConstDecl"; // Import your constants
import "../../utilities/css/appcss.css";
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import logger from "../../utilities/Logs/logger"; // Import your logger

// Import EMPLOYEE_STATUS constant
import { EMPLOYEE_STATUS } from "../config/config.js"; // Make sure the path is correct

export default function CreateEmployeeForm() {
  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    doj: "",
    resignation_date: "", // Added resignation_date
    status: "", // Added status
    manager_id: "",
    supervisor_id: "",
    designation_id: "",
    salary: "",
    pic: null,
  });

  const [managerOptions, setManagerOptions] = useState([]);
  const [supervisorOptions, setSupervisorOptions] = useState([]);
  const [designationOptions, setDesignationOptions] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_EMPLOYEE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchEmployees = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");

        const headers = {
          Authorization: `Bearer ${authToken}`,
          UserId: userid,
        };
        const status = 1;
        const response = await axios.get(`${API_URL}/employee?status=${status}`, { headers });
        const employees = response.data;
        setManagerOptions(employees);

        logger.info(
          `[${new Date().toLocaleTimeString()}] Fetching employees and designations...`
        );

        setSupervisorOptions(employees);
        logger.info(
          `[${new Date().toLocaleTimeString()}] Employees data fetched successfully.`
        );
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching employees:`,
          error
        );
      }
    };

    const fetchDesignations = async () => {
      try {
        const authToken = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");

        const headers = {
          Authorization: `Bearer ${authToken}`,
          UserId: userid,
        };

        const response = await axios.get(`${API_URL}/designations`, {
          headers,
        });
        const designations = response.data;
        setDesignationOptions(designations);

        logger.info(
          `[${new Date().toLocaleTimeString()}] Designations data fetched successfully.`
        );
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching designations:`,
          error
        );
      }
    };

    fetchEmployees();
    fetchDesignations();
  }, [hasRequiredAccess]);

  const handleChange = (e) => {
    if (e.target.name === "pic") {
      setFormData({ ...formData, pic: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }

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

      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("dob", formData.dob);
      formDataToSend.append("doj", formData.doj);
      formDataToSend.append("resignation_date", formData.resignation_date); // Added resignation_date
      formDataToSend.append("status", formData.status); // Added status
      formDataToSend.append("manager_id", formData.manager_id);
      formDataToSend.append("supervisor_id", formData.supervisor_id);
      formDataToSend.append("designation_id", formData.designation_id);
      formDataToSend.append("salary", formData.salary);
      formDataToSend.append("pic", formData.pic);

      logger.info(`[${new Date().toLocaleTimeString()}] Creating employee...`);

      const response = await axios.post(
        `${API_URL}/create_employee`,
        formDataToSend,
        { headers }
      );

      logger.info(
        `[${new Date().toLocaleTimeString()}] Employee created successfully:`,
        response.data
      );

      setFormData({
        name: "",
        dob: "",
        doj: "",
        resignation_date: "", // Clear resignation_date
        status: "", // Clear status
        manager_id: "",
        supervisor_id: "",
        designation_id: "",
        salary: "",
        pic: null,
      });
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error creating employee:`,
        error
      );
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Employee</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
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
                  <label htmlFor="dob">Date of Birth:</label>
                </div>
                <input
                  type="date"
                  id="dob"
                  name="dob"
                  value={formData.dob}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="doj">Date of Joining:</label>
                </div>
                <input
                  type="date"
                  id="doj"
                  name="doj"
                  value={formData.doj}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Resignation Date */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="resignation_date">Resignation Date:</label>
                </div>
                <input
                  type="date"
                  id="resignation_date"
                  name="resignation_date"
                  value={formData.resignation_date}
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
                <select
                  id="status"
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Status</option>
                  {EMPLOYEE_STATUS.map((status) => (
                    <option key={status.code} value={status.value}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Manager LOV */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="manager_id">Manager:</label>
                </div>
                <select
                  id="manager_id"
                  name="manager_id"
                  value={formData.manager_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Manager</option>
                  {managerOptions.map((employee) => (
                    <option key={employee.empid} value={employee.empid}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Supervisor LOV */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="supervisor_id">Supervisor:</label>
                </div>
                <select
                  id="supervisor_id"
                  name="supervisor_id"
                  value={formData.supervisor_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Supervisor</option>
                  {supervisorOptions.map((employee) => (
                    <option key={employee.empid} value={employee.empid}>
                      {employee.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Designation LOV */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="designation_id">Designation:</label>
                </div>
                <select
                  id="designation_id"
                  name="designation_id"
                  value={formData.designation_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Designation</option>
                  {designationOptions.map((designation) => (
                    <option
                      key={designation.designation_id}
                      value={designation.designation_id}
                    >
                      {designation.designation_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Salary */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="salary">Salary:</label>
                </div>
                <input
                  type="text"
                  id="salary"
                  name="salary"
                  value={formData.salary}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Picture */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="pic">Picture:</label>
                </div>
                <div className="custom-file">
                  <input
                    type="file"
                    id="pic"
                    name="pic"
                    onChange={handleChange}
                    className="custom-file-input"
                  />
                  {formData.pic && (
                    <img
                      src={URL.createObjectURL(formData.pic)}
                      alt="Selected Pic"
                      className="selected-pic"
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Employee
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div> You do not have permission to view this module </div>
        )}
      </div>
    </div>
  );
}
