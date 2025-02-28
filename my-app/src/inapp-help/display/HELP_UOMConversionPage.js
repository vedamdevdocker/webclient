import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UOMConversionPage = () => (
  <div>
    <h2 className="subheading">Inventory Transaction UOM Conversion Form</h2>
    <p className="indented-paragraph">
      The `Inventory Transaction UOM Conversion` form allows authorized users to convert units of measure (UOM) for inventory transactions.
    </p>

    <h3 className="subheading">Usage</h3>
    <p className="indented-paragraph">
      To use the form, follow these steps:
      <ol>
        <li>Select an item from the "Item" dropdown.</li>
        <li>Choose the "Transaction Type" from the available options.</li>
        <li>Select the "Inventory ID" for the transaction.</li>
        <li>View and confirm the "Quantity" displayed based on the selected inventory.</li>
        <li>Select the "Source UOM" and "Target UOM" for the conversion.</li>
        <li>Click the "Convert" button to perform the UOM conversion.</li>
      </ol>
    </p>

    <h3 className="subheading">Additional Notes</h3>
    <p className="indented-paragraph">
      - The "Quantity" field automatically displays the quantity based on the selected inventory.
      <br />
      - Ensure that the required items, UOMs, and inventory details are available before using the form.
      <br />
      - The form dynamically updates dropdown options based on user selections.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Users must have the necessary permissions, specifically the ability to create transactions in the inventory module, to access this form.
    </p>

    <h3 className="subheading">Button Action</h3>
    <p className="indented-paragraph">
      Click the "Convert" button to initiate the UOM conversion. Make sure to fill in the required fields before clicking the button.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      - If an error occurs during the UOM conversion API call, an error message will be displayed.
      <br />
      - Check for error details and ensure data consistency before retrying the conversion.
    </p>
  </div>
);

export default HELP_UOMConversionPage;
