import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, MODULE_LEVEL_VIEW_ACCESS, BACKEND_INVENTORY_MODULE_NAME } from "../../../admin/setups/ConstDecl";
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

function ViewAllItemInventoriesForm() {
  const [itemInventoryList, setItemInventoryList] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_item_inventory`, {
          headers: generateHeaders(),
          params: {
            // Add any additional query parameters if needed
          },
        });
        setItemInventoryList(response.data.item_inventory_list);
      } catch (error) {
        // Log the error with timestamp
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching item inventory:`, error);
      }
    };

    fetchData();
  }, [hasRequiredAccess]);

  return (
    hasRequiredAccess ? (
      <div className="item-inventory-container">
        <h2>Item Inventory List</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              {/* Add additional table headers based on your item_inventory_list structure */}
              <th>Item ID</th>
              <th>Item Code</th>
              <th>Item Name</th>
              <th>Quantity</th>
              <th>UOM</th>
              <th>Transaction Number</th>
              <th>Transaction Type</th>
              <th>Inventory ID</th>
              <th>Bin Name</th>
              <th>Rack Name</th>
              <th>Row Name</th>
              <th>Aisle Name</th>
              <th>Zone Name</th>
              <th>Location Name</th>
              <th>Warehouse Name</th>
              <th>Picked Released?</th>
              <th>Released for</th>
              {/* Add more headers as needed */}
            </tr>
          </thead>
          <tbody>
            {itemInventoryList.map((item) => (
              <tr key={item.inventory_id}>
                <td>{item.item_id}</td>
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{item.quantity}</td>
                <td>{item.uom_name}</td>
                <td>{item.transaction_id}</td>
                <td>{item.transaction_type}</td>
                <td>{item.inventory_id}</td>
                <td>{item.bin_name}</td>
                <td>{item.rack_name}</td>
                <td>{item.row_name}</td>
                <td>{item.aisle_name}</td>
                <td>{item.zone_name}</td>
                <td>{item.location_name}</td>
                <td>{item.warehouse_name}</td>
                <td>{item.status}</td>
                <td>{item.subject}</td>
                {/* Add more table data cells as needed */}
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

export default ViewAllItemInventoriesForm;
