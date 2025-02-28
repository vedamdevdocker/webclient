import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateRowsPage = () => (
  <div>
    <h2 className="subheading">Create Inventory Row</h2>
    <p className="indented-paragraph">
      The `Create Inventory Row` form allows users to create a new inventory row by providing necessary details such as aisle, row name, description, capacity, and unit of measure (UOM).
    </p>

    <h3 className="subheading">Aisle Name</h3>
    <p className="indented-paragraph">
      Select the aisle where the new row will be placed. Aisles are listed in the dropdown and are fetched from the system.
    </p>

    <h3 className="subheading">Row Name</h3>
    <p className="indented-paragraph">
      Provide a unique name for the new inventory row. This name will be used for identification purposes.
    </p>

    <h3 className="subheading">Description</h3>
    <p className="indented-paragraph">
      Optionally, add a description for the row to help provide more context or details about its use.
    </p>

    <h3 className="subheading">Capacity</h3>
    <p className="indented-paragraph">
      Enter the maximum capacity of the row. This value should be a positive number representing how many items the row can hold.
    </p>

    <h3 className="subheading">Unit of Measure (UOM)</h3>
    <p className="indented-paragraph">
      Select the unit of measure for the row's capacity. The available UOMs are fetched from the system.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      After entering the required details, click the "Create Inventory Row" button to create the row. If successful, a confirmation message will appear.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there is an error, an error message will appear. Ensure all fields are filled correctly (e.g., capacity must be a number greater than 0) before submitting.
    </p>
  </div>
);

export default HELP_CreateRowsPage;
