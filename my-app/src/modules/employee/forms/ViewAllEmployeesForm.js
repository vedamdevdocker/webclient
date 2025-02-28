import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_EMPLOYEE_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../admin/setups/ConstDecl"; // Import your constants
import "../../utilities/css/appcss.css";
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import logger from "../../utilities/Logs/logger"; // Import your logger

function ViewAllEmployeesForm() {
  const [employees, setEmployees] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_EMPLOYEE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      logger.warn(`[${new Date().toLocaleTimeString()}] Access denied. You do not have permission to view this module.`);
      return; // Do not fetch data if access is not granted
    }

    logger.debug(`[${new Date().toLocaleTimeString()}] Fetching employees...`);

    const fetchData = async () => {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      try {
        const response = await axios.get(`${API_URL}/employee`, { headers });
        setEmployees(response.data);
        logger.debug(`[${new Date().toLocaleTimeString()}] Employees data fetched successfully.`);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching employees:`, error);
      }
    };

    fetchData(); // Call the fetchData function here

  }, [hasRequiredAccess]);

  return (
    hasRequiredAccess ? (
      <div className="child-container form-container">
        <h1 className="title">List of Employees</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th className="table-header">Name</th>
              <th>Employee No.</th>
              <th>Manager</th>
              <th>Supervisor</th>
              <th>Salary</th>
              <th>Status</th>
              <th>Designation</th>
              <th>Date of Birth</th>
              <th>Date of Joining</th>
              <th>Picture</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.empid} className="table-row">
                <td>{employee.name}</td>
                <td>{employee.empid}</td>
                <td>{employee.manager_name}</td>
                <td>{employee.supervisor_name}</td>
                <td>{employee.salary}</td>
                <td>{employee.status === 1 ? "Active" : "Inactive"}</td>
                <td>{employee.designation_name}</td>
                <td>{employee.dob}</td>
                <td>{employee.doj}</td>
                <td>
                  {employee.pic && (
                    <img
                      src={`data:image/png;base64,${employee.pic}`}
                      alt="Employee Pic"
                      className="employee-pic"
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>You do not have permission to view this module</div>
    )
  );
}

export default ViewAllEmployeesForm;
