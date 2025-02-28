import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import logger from "../../../utilities/Logs/logger"; // Import your logger utility here

function ViewAllTaxCodesForm() {
  const [taxCodes, setTaxCodes] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userId,
      // Add other headers if needed
    };
  };

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_tax_codes`, {
          headers: generateHeaders(),
        });
        setTaxCodes(response.data.taxes);
      } catch (error) {
        console.error(`[${new Date().toLocaleTimeString()}] Error fetching tax codes:`, error);

        // Log the module name, token, and user ID in case of an error
        logger.error(`[${new Date().toLocaleTimeString()}] Module Name: ${BACKEND_COMMON_MODULE_NAME}`);
        logger.error(`[${new Date().toLocaleTimeString()}] Token: ${localStorage.getItem("token")}`);
        logger.error(`[${new Date().toLocaleTimeString()}] User ID: ${localStorage.getItem("userid")}`);
      }
    };

    fetchData();

  }, [hasRequiredAccess]); // Include hasRequiredAccess in the dependency array

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Tax Codes</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th className="table-header">Tax Code</th>
              <th>Tax Description</th>
              <th>Tax Type</th>
              <th>Tax Rate (%)</th>
              <th>Tax Applicability</th>
              <th>Tax Authority</th>
              <th>Status</th>              
            </tr>
          </thead>
          <tbody>
            {taxCodes.map((tax) => (
              <tr key={tax.tax_id} className="table-row">
                <td>{tax.tax_code}</td>
                <td>{tax.tax_description}</td>
                <td>{tax.tax_type}</td>
                <td>{tax.tax_rate}</td>
                <td>{tax.tax_applicability}</td>
                <td>{tax.tax_authority}</td>
                <td>{tax.status === 1 ? 'Active' : 'Not Active'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}

export default ViewAllTaxCodesForm;
