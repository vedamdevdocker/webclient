import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateBOMPage = () => (
  <div>
    <h2 className="subheading">Update BOM (Bill of Materials) for Model Items</h2>
    <p className="indented-paragraph">
      This page allows you to view and edit the Bill of Materials (BOM) for a selected Model Item.
    </p>

    <h3 className="subheading">Step 1: Select Model Item</h3>
    <p className="indented-paragraph">
      Choose a Model Item from the dropdown list to view its corresponding BOM data. The dropdown will display unique Model Items available for editing.
    </p>

    <h3 className="subheading">Step 2: View and Edit BOM Data</h3>
    <p className="indented-paragraph">
      After selecting a Model Item, click the "Show Modal and Fetch Data" button to open the modal where you can edit the BOM details for that item.
    </p>
    <p className="indented-paragraph">
      The modal contains a table with the following editable fields:
      <ul>
        <li><strong>Parent Item:</strong> The parent item code.</li>
        <li><strong>Component Item:</strong> The component item code.</li>
        <li><strong>Quantity:</strong> The quantity of the component item.</li>
        <li><strong>UOM:</strong> The unit of measure for the quantity.</li>
        <li><strong>Revision:</strong> The revision number of the BOM.</li>
        <li><strong>Effective Date:</strong> The date when the BOM is effective.</li>
        <li><strong>End Date:</strong> The date when the BOM is no longer valid.</li>
        <li><strong>Notes/Comments:</strong> Additional notes or comments related to the BOM.</li>
        <li><strong>Level:</strong> The level of the item in the BOM structure.</li>
      </ul>
    </p>

    <h3 className="subheading">Step 3: Submit Changes</h3>
    <p className="indented-paragraph">
      After making your changes, click the "Submit" button to save the updated BOM data.
    </p>

    <h3 className="subheading">Important Notes:</h3>
    <p className="indented-paragraph">
      - Ensure that all changes are accurate before submitting, as these will be reflected in the BOM for the selected Model Item.
      - The modal allows for direct editing of BOM rows, and any change is automatically reflected in the modal data.
    </p>
  </div>
);

export default HELP_UpdateBOMPage;
