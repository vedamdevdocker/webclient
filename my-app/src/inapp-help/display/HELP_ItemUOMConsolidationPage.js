import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_ItemUOMConsolidationPage = () => (
  <div>
    <h2 className="subheading">Inventory Item UOM Conversion Form</h2>
    <p className="indented-paragraph">
      The `Inventory Item UOM Consolidation ` form allows authorized users to perform Unit of Measure (UOM) conversions for inventory items.
    </p>

    <h3 className="subheading">Usage</h3>
    <p className="indented-paragraph">
      To use the form, follow these steps:
      <ol>
        <li>Select an inventory item from the "Item" dropdown.</li>
        <li>Choose the "Transaction Type" from the available options.</li>
        <li>Select the "Source UOM" and "Target UOM" for the conversion.</li>
        {/* Add additional steps based on your form's functionality */}
      </ol>
    </p>

    <h3 className="subheading">Additional Fields</h3>
    <p className="indented-paragraph">
      The form includes additional fields for specifying the target location in the warehouse:
      <ul>
        <li>Target Bin</li>
        <li>Target Rack</li>
        <li>Target Row</li>
        <li>Target Aisle</li>
        <li>Target Zone</li>
        <li>Target Location</li>
        <li>Target Warehouse</li>
      </ul>
      Fill in the relevant details based on your requirements.
    </p>

    <h3 className="subheading">Button Action</h3>
    <p className="indented-paragraph">
      Click the "Convert" button to initiate the UOM conversion. Make sure to fill in the required fields before clicking the button.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Users must have the necessary permissions, specifically the ability to create transactions in the inventory module, to access this form.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      - Ensure that the required items and UOMs are available before using the form.
      <br />
      - Verify the accuracy of the selected target location details.
    </p>
  </div>
);

export default HELP_ItemUOMConsolidationPage;
