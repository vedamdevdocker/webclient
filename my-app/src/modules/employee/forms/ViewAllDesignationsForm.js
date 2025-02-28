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

function ViewAllDesignationsForm() {
  const [designations, setDesignations] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_EMPLOYEE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      logger.warn(`[${new Date().toLocaleTimeString()}] Access denied. You do not have permission to view this module.`);
      return; // Do not fetch data if access is not granted
    }

    logger.debug(`[${new Date().toLocaleTimeString()}] Fetching designations...`);

    const fetchData = async () => {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      try {
        const response = await axios.get(`${API_URL}/designations`, { headers });
        setDesignations(response.data);
        logger.debug(`[${new Date().toLocaleTimeString()}] Designations data fetched successfully.`);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching designations:`, error);
      }
    };

    fetchData(); // Call the fetchData function here
  }, [hasRequiredAccess]);

  return (
    hasRequiredAccess ? (
      <div className="child-container form-container">
        <h1 className="title">List of Designations</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th className="table-header">Designation ID</th>
              <th>Designation Name</th>
              <th>Description</th>
              <th>Salary Range</th>
            </tr>
          </thead>
          <tbody>
            {designations.map((designation) => (
              <tr key={designation.designation_id} className="table-row">
                <td>{designation.designation_id}</td>
                <td>{designation.designation_name}</td>
                <td>{designation.description}</td>
                <td>{designation.salary_range}</td>
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

export default ViewAllDesignationsForm;
