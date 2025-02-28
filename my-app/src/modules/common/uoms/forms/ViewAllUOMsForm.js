import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function ViewAllUOMsForm() {
  const [uoms, setUOMs] = useState([]);

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
    // Log the value of hasRequiredAccess
    logger.info(`[${new Date().toLocaleTimeString()}] Has Required Access: ${hasRequiredAccess}`);

    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUOMs(response.data.uom);

        // Log a success message
        logger.info(`[${new Date().toLocaleTimeString()}] UOM data fetched successfully.`);

      } catch (error) {
        // Log an error message
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching UOMs:`, error);
      }
    };

    fetchData();

  }, [hasRequiredAccess]); // Include hasRequiredAccess in the dependency array

  return (
    <div className="child-container form-container">
      <h1 className="title">Unit of Measures</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>UOM ID</th>
              <th>Abbreviation</th>
              <th>UOM Name</th>
              <th>Base Unit</th>
              <th>Conversion Factor</th>
              <th>Decimal Places</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {uoms.map((uom) => (
              <tr key={uom.uom_id} className="table-row">
                <td>{uom.uom_id}</td>
                <td>{uom.abbreviation}</td>
                <td>{uom.uom_name}</td>
                <td>{uom.base_unit || "N/A"}</td>
                <td>{uom.conversion_factor}</td>
                <td>{uom.decimal_places}</td>
                <td>{uom.notes}</td>
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

export default ViewAllUOMsForm;
