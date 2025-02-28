import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_CREATE_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

export default function CreateDepartmentForm() {
  const [formData, setFormData] = useState({
    company_id: "",
    department_name: "",
    manager_id: "",
    description: "",
    created_by: "",
    updated_by: "",
    account_group_id: "", // New state for account group ID
  });

  const [groupCompanies, setGroupCompanies] = useState([]);
  const [loadingGroupCompanies, setLoadingGroupCompanies] = useState(true);

  const [employees, setEmployees] = useState([]);
  const [loadingEmployees, setLoadingEmployees] = useState(true);

  const [accountGroups, setAccountGroups] = useState([]);
  const [loadingAccountGroups, setLoadingAccountGroups] = useState(true);

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
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/create_department`,
        formData,
        { headers: generateHeaders() }
      );

      logger.info(`[${new Date().toLocaleTimeString()}] Department created successfully`, response.data);
      setSuccessMessage("Department created successfully");
      setFormData({
        company_id: "",
        department_name: "",
        manager_id: "",
        description: "",
        created_by: "",
        updated_by: "",
        account_group_id: "", // Reset account group ID after successful submission
      });
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error creating Department`, error);
      setError("An error occurred while creating the Department. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchGroupCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_companies`, {
          headers: generateHeaders(),
        });
        setGroupCompanies(response.data.company_list);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching companies:`, error);
      } finally {
        setLoadingGroupCompanies(false);
      }
    };

    const fetchEmployees = async () => {
      try {


        const status = 1;
        const response = await axios.get(`${API_URL}/employee?status=${status}`, {
          headers: generateHeaders(),
        });
        setEmployees(response.data); // Assuming the employee data is an array
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching employees:`, error);
      } finally {
        setLoadingEmployees(false);
      }
    };

    const fetchAccountGroups = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/get_default_account_headers`,
          {
            headers: generateHeaders(),
          }
        );
        setAccountGroups(response.data.default_account_headers);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching account groups:`,
          error
        );
      } finally {
        setLoadingAccountGroups(false);
      }
    };

    fetchGroupCompanies();
    fetchEmployees();
    fetchAccountGroups();
  }, []);

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Department</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="department_name">Department Name:</label>
                </div>
                <input
                  type="text"
                  id="department_name"
                  name="department_name"
                  value={formData.department_name}
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
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control input-field"
                  rows="4"  // Adjust the number of rows as needed
                />
              </div>
            </div>
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
                >
                  <option value="" disabled>Select Company</option>
                  {loadingGroupCompanies ? (
                    <option value="" disabled>Loading Companies...</option>
                  ) : (
                    groupCompanies.map((company) => (
                      <option key={company.company_id} value={company.company_id}>
                        {company.company_name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
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
                  <option value="" disabled>Select Manager</option>
                  {loadingEmployees ? (
                    <option value="" disabled>Loading Managers...</option>
                  ) : (
                    employees.map((employee) => (
                      <option key={employee.empid} value={employee.empid}>
                        {employee.name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="account_group_id">Account Group ID:</label>
                </div>
                <select
                  id="account_group_id"
                  name="account_group_id"
                  value={formData.account_group_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Account Group ID</option>
                  {loadingAccountGroups ? (
                    <option value="" disabled>Loading Account Groups...</option>
                  ) : (
                    accountGroups.map((group) => (
                      <option key={group.header_id} value={group.header_id}>
                        {group.header_name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>
            {/* Include other form fields as needed */}
            {loading && <div className="loading-indicator">Creating...</div>}
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Department
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
