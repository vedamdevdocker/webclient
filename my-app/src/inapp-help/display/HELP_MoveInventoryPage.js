import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_MoveInventoryPage = () => (
  <div>
    <h2 className="subheading">Move Item Inventory Form</h2>
    <p className="indented-paragraph">
      The `Move Item Inventory` form allows authorized users to move inventory items to a different location within the warehouse.
    </p>

    <h3 className="subheading">Usage</h3>
    <p className="indented-paragraph">
      To use the form, follow these steps:
      <ol>
        <li>Select the item to be moved from the "Item" dropdown.</li>
        <li>Choose the "Transaction Type" from the available options.</li>
        <li>Select the "Inventory ID" for the item to be moved.</li>
        <li>Review and confirm the "Inventory Quantity" displayed based on the selected inventory.</li>
        <li>Specify the "Move Quantity" for the item.</li>
        <li>Click the "Move To ?" button to select the target location for the item.</li>
        <li>Select the target "Bin," "Rack," "Row," "Aisle," "Zone," "Location," and "Warehouse" for the item.</li>
        <li>Click the "Move" button to initiate the inventory item movement.</li>
      </ol>
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Users must have the necessary permissions to view and move items within the warehouse to access this form.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      - Ensure that the required items, transaction types, and inventory details are available before using the form.
      <br />
      - Review the accuracy of the selected target location details.
      <br />
      - The form includes dynamic dropdowns that update based on user selections.
    </p>

    <h3 className="subheading">Button Actions</h3>
    <p className="indented-paragraph">
      - Click the "Move To ?" button to select the target location for the item.
      <br />
      - Click the "Move" button to initiate the inventory item movement.
    </p>

    <h3 className="subheading">Success and Error Handling</h3>
    <p className="indented-paragraph">
      - Upon successful movement, a success message will be displayed.
      <br />
      - If an error occurs during the movement, an error message will be displayed. Check for error details and ensure data consistency before retrying.
    </p>
  </div>
);

export default HELP_MoveInventoryPage;
