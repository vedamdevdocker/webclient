import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateBOMPage = () => (
  <div>
    <h2 className="subheading">Create BOM Help Page</h2>
    <p className="indented-paragraph">
      This page provides guidance on how to use the <strong>Create BOM</strong> form to define a Bill of Materials (BOM) for your products.
    </p>

    <h3 className="subheading">Model Item</h3>
    <p className="indented-paragraph">
      The <strong>Model Item</strong> is the primary item for which the BOM is being created. This item will act as the "parent" in the BOM structure.
    </p>

    <h3 className="subheading">BOM Rows</h3>
    <p className="indented-paragraph">
      The BOM consists of multiple rows that define the relationship between parent and component items:
      <ul>
        <li><strong>Parent Item:</strong> The item that will use the components defined in the BOM.</li>
        <li><strong>Component Item:</strong> The item that is part of the parent item and used to assemble it.</li>
        <li><strong>Quantity:</strong> The amount of the component item needed for the parent item.</li>
        <li><strong>UOM:</strong> The unit of measure for the quantity (e.g., pieces, kilograms, etc.).</li>
        <li><strong>Effective Date:</strong> The date when the BOM becomes effective.</li>
        <li><strong>End Date:</strong> The date when the BOM is no longer valid.</li>
      </ul>
    </p>

    <h3 className="subheading">Actions</h3>
    <p className="indented-paragraph">
      The form allows you to add new rows or remove existing ones to define the BOM structure. You can add as many rows as necessary, and the system will automatically calculate effective and end dates for each row based on the information provided.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      Once you've filled out the form, click <strong>Submit</strong> to create the BOM. The system will process your entries and save the BOM structure for future use.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there are any issues with your entries (e.g., missing fields or invalid data), the form will display an error message to guide you.
    </p>
  </div>
);

export default HELP_CreateBOMPage;
