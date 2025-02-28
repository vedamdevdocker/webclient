import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your permission checker

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";

function ViewExplodeBOMForm({ updateExplodedBOM }) {
  const [itemCode, setItemCode] = useState("");
  const [requiredQuantity, setRequiredQuantity] = useState("");
  const [explodedBOM, setExplodedBOM] = useState([]);
  const [itemList, setItemList] = useState([]); // State to store the list of items

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      // Optionally, handle the case where access is not granted
      logger.warn(`[${new Date().toLocaleTimeString()}] Access denied to ViewExplodeBOMForm component.`);
      return;
    }
    fetchItemList();
  }, [hasRequiredAccess]);

  const fetchItemList = async () => {
    try {
      const authToken = localStorage.getItem('token');
      const userid = localStorage.getItem('userid');

      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'UserId': userid,
      };

      const response = await axios.get(`${API_URL}/list_items`, { headers });
      setItemList(response.data.items);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching item lists:`, error);
      alert("Error fetching item lists");
    }
  };

  const handleItemCodeChange = (event) => {
    setItemCode(event.target.value);
  };

  const handleRequiredQuantityChange = (event) => {
    const quantity = event.target.value;
    if (quantity !== "" && parseInt(quantity) > 0) {
      setRequiredQuantity(quantity);
    } else {
      setRequiredQuantity("");
    }
  };

  const handleExplodeBOM = async () => {
    if (!itemCode) {
      logger.warn(`[${new Date().toLocaleTimeString()}] No item code selected.`);
      alert("Please select an item.");
      return;
    }
    
    if (!requiredQuantity) {
      logger.warn(`[${new Date().toLocaleTimeString()}] Invalid quantity input.`);
      alert("Please enter a positive quantity.");
      return;
    }

    try {
      const authToken = localStorage.getItem('token');
      const userid = localStorage.getItem('userid');
  
      const headers = {
        'Authorization': `Bearer ${authToken}`,
        'UserId': userid,
      };
      const response = await axios.get(`${API_URL}/process_exploded_bom`, {
        headers, // Include the headers here
        params: {
          item_code: itemCode,
          required_quantity: requiredQuantity,
        },
      });

      if (response.data.processed_data) {
        updateExplodedBOM(response.data.processed_data);
      } else {
        logger.warn(`[${new Date().toLocaleTimeString()}] No data available for Item: ${itemCode}`);
        updateExplodedBOM([]);
        alert("No data available for the Item.");
      }
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error exploding BOM:`, error);
      setExplodedBOM([]);
      alert("Error exploding BOM");
    }
  };

  return (
    <div className="child-container menu-container">
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <div className="form-group  col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="itemCode">Item:</label>
              </div>
              {/* Replace this input field */}
              <select
                id="itemCode"
                value={itemCode}
                onChange={handleItemCodeChange}
                className="form-control input-field"
              >
                <option value="">Select an item code</option>
                {itemList.map((item) => (
                  <option key={item.item_id} value={item.item_code}>
                    {item.item_code} - {item.item_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group  col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="requiredQuantity">Quantity:</label>
              </div>
              <input
                type="number"
                id="requiredQuantity"
                value={requiredQuantity}
                onChange={handleRequiredQuantityChange}
                className="form-control input-field"
              />
            </div>
          </div>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button onClick={handleExplodeBOM} className="btn btn-primary">
                Explode BOM
              </button>
            </div>
          </div>

          <table className="table table-striped table-bordered">
            {/* Render table headers here */}
            <tbody>
              {explodedBOM.map((item, index) => (
                <tr key={index} className="table-row">
                  {/* Render table row data here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default ViewExplodeBOMForm;
