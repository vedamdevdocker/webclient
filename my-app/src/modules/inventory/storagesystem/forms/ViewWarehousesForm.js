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

function ViewWarehousesForm() {
  const [receiptsList, setReceiptsList] = useState([]);
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
        const response = await axios.get(`${API_URL}/get_receipts`, {
          headers: generateHeaders(),
        });
        setReceiptsList(response.data.receipts_list);
      } catch (error) {
        // Log the error with timestamp
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching receipts:`, error);
      }
    };

    fetchData();
  }, [hasRequiredAccess]);

  return (
    hasRequiredAccess ? (
      <div className="receipts-container">
        <h2>Receipts List</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Receipt Type</th>
              <th>Transaction</th>
              <th>Transaction Header</th>
              <th>Receipt ID</th>
              <th>Item Code</th>
              <th>Quantity</th>
              <th>UOM</th>
              <th>Status</th>
              <th>Location</th>
              <th>Comments</th>
            </tr>
          </thead>
          <tbody>
            {receiptsList.map((receipt) => (
              <tr key={receipt.receipt_id}>
                <td>{receipt.receipt_name}</td>
                <td>{receipt.transaction_number}</td>
                <td>{receipt.transaction_header_number}</td>
                <td>{receipt.receipt_id}</td>
                <td>{receipt.item_code} ({receipt.item_name})</td>
                <td>{receipt.quantity}</td>
                <td>{receipt.uom_name}</td>
                <td>{receipt.status}</td>
                <td>{receipt.location_name}</td>
                <td>{receipt.comments}</td>
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

export default ViewWarehousesForm;
