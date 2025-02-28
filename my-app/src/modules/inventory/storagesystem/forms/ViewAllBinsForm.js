import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, MODULE_LEVEL_VIEW_ACCESS, BACKEND_PRODUCT_MODULE_NAME } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    'Authorization': `Bearer ${token}`,
    'UserId': userId,
  };
};

function ViewAllBinsForm() {
  const [binsList, setBinsList] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_PRODUCT_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_bins`, {
          headers: generateHeaders(),
        });
        setBinsList(response.data.bin_list);
      } catch (error) {
        // Log the error with timestamp
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching bins:`, error);
      }
    };

    fetchData();
  }, [hasRequiredAccess]);

  return (
    hasRequiredAccess ? (
      <div className="bins-container">
        <h2>Bins List</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Bin ID</th>
              <th>Bin Name</th>
              <th>Capacity</th>
              <th>Location</th>
              <th>Rack</th>
              <th>Row</th>
              <th>Warehouse</th>
              <th>Zone</th>
              <th>Located In </th>              
            </tr>
          </thead>
          <tbody>
            {binsList.map((bin) => (
              <tr key={bin.bin_id}>
                <td>{bin.bin_id}</td>
                <td>{bin.bin_name}</td>
                <td>{bin.capacity}</td>
                <td>{bin.location_name}</td>
                <td>{bin.rack_name}</td>
                <td>{bin.row_name}</td>
                <td>{bin.warehouse_name}</td>
                <td>{bin.zone_name}</td>
                <td>{bin.warehouse_name}-{bin.zone_name}-{bin.location_name}-{bin.row_name}-{bin.rack_name}-{bin.bin_name}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div> You do not have permission to view this module </div>
    )
  );
}

export default ViewAllBinsForm;
