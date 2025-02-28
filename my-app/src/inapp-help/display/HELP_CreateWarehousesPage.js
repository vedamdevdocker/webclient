import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_ViewWarehousesPage = () => (
  <div>
    <h2 className="subheading">View Warehouses Page</h2>
    <p className="indented-paragraph">
      The `View Warehouses` page allows users to view a list of receipts related to warehouse transactions. The table displays relevant information about the receipts including the type, transaction details, item information, status, location, and comments.
    </p>

    <h3 className="subheading">Receipts List</h3>
    <p className="indented-paragraph">
      The `Receipts List` section displays details about the receipts related to warehouse transactions. The table includes the following columns:
    </p>

    <ul className="indented-list">
      <li><strong>Receipt Type:</strong> The type of receipt, such as goods receipt or return receipt.</li>
      <li><strong>Transaction:</strong> The transaction number associated with the receipt.</li>
      <li><strong>Transaction Header:</strong> The header number for the transaction that the receipt belongs to.</li>
      <li><strong>Receipt ID:</strong> A unique identifier for the receipt.</li>
      <li><strong>Item Code:</strong> The code associated with the item being received, along with its name.</li>
      <li><strong>Quantity:</strong> The quantity of the items in the receipt.</li>
      <li><strong>UOM (Unit of Measure):</strong> The unit of measure for the quantity, such as pieces, boxes, or pallets.</li>
      <li><strong>Status:</strong> The current status of the receipt, which could indicate whether the receipt is processed, pending, or rejected.</li>
      <li><strong>Location:</strong> The warehouse location where the receipt is stored.</li>
      <li><strong>Comments:</strong> Any additional comments or notes related to the receipt.</li>
    </ul>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the necessary permissions can view the receipts list. If you do not have the required access, a message will be displayed informing you that you do not have permission to view this module.
    </p>

    <h3 className="subheading">Data Fetching</h3>
    <p className="indented-paragraph">
      The receipt data is fetched from the backend when the page loads. If an error occurs during data retrieval, it will be logged for troubleshooting. You may not see any data if the backend is unavailable or if no receipts match the current view.
    </p>
  </div>
);

export default HELP_ViewWarehousesPage;
