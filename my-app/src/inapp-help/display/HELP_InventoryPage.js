import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_InventoryPage = () => (
  <div>
    <h2 className="subheading">Inventory Page</h2>
    <p className="indented-paragraph">
      The `Inventory Page` serves as a hub for various inventory-related functions and provides access to key modules for managing inventory, handling receipts, and performing inventory transactions.
    </p>

    <h3 className="subheading">Handling Menu</h3>
    <p className="indented-paragraph">
      The `Handling Menu` provides options for managing inventory items at a high level, including:
      <ul>
        <li>UOM Conversion: Convert units of measure for inventory items.</li>
        <li>Item Consolidation: Consolidate multiple inventory items into a single item for better management.</li>
        <li>Move Inventory: Move inventory from one location to another within the warehouse.</li>
        <li>Pick Release Inventory: Release inventory for picking in preparation for shipments or further processing.</li>
      </ul>
    </p>

    <h3 className="subheading">Transactions Menu</h3>
    <p className="indented-paragraph">
      The `Transactions Menu` provides options for performing various transactions on inventory items:
      <ul>
        <li>Put Away: Move received inventory to its designated storage location.</li>
        <li>Inspect: Perform inspections on inventory items to ensure they meet quality standards.</li>
        <li>View Inspections: View inspection records for inventory items.</li>
      </ul>
    </p>

    <h3 className="subheading">Receipts Menu</h3>
    <p className="indented-paragraph">
      The `Receipts Menu` allows users to interact with receipts, enabling activities such as:
      <ul>
        <li>Miscellaneous Receipt: Process miscellaneous receipts for inventory items.</li>
        <li>Purchase Order Receipt: Process receipts related to purchase orders.</li>
        <li>Update Receipts: Update existing receipt records in the system.</li>
        <li>Get Receipts: Retrieve and view receipt records.</li>
      </ul>
    </p>

    <h3 className="subheading">Storage Menu</h3>
    <p className="indented-paragraph">
      The `Storage Menu` provides options for creating and managing storage locations within the warehouse:
      <ul>
        <li>Create Warehouses: Define warehouse locations for inventory storage.</li>
        <li>Create Locations: Create specific locations within warehouses for organizing inventory.</li>
        <li>Create Zones: Set up zones within the warehouse for more organized inventory management.</li>
        <li>Create Aisles: Create aisles within the warehouse to facilitate the movement of goods.</li>
        <li>Create Rows: Organize storage areas within aisles by creating rows.</li>
        <li>Create Racks: Set up racks within rows for better inventory placement.</li>
        <li>Create Bins: Define bins within racks to further organize and store inventory items.</li>
        <li>Get Bins: Retrieve and view bin locations for inventory management.</li>
      </ul>
    </p>
  </div>
);

export default HELP_InventoryPage;
