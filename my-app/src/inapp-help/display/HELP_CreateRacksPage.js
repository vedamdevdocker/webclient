import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateRacksPage = () => (
  <div>
    <h2 className="subheading">Create Racks Page</h2>
    <p className="indented-paragraph">
      The `Create Racks` page allows the user to create racks for inventory. The user can define important attributes such as row, rack name, description, capacity, and unit of measure (UOM).
    </p>
    <h3 className="subheading">Row Name</h3>
    <p className="indented-paragraph">
      Select the row where the rack will be placed. This field allows users to pick from a predefined list of rows that are available in the system.
    </p>
    <h3 className="subheading">Rack Name</h3>
    <p className="indented-paragraph">
      Enter a unique name for the rack. The name will be used to identify the rack in the system.
    </p>
    <h3 className="subheading">Description</h3>
    <p className="indented-paragraph">
      Provide a brief description for the rack. This can be used to include details such as the purpose or capacity of the rack.
    </p>
    <h3 className="subheading">Capacity</h3>
    <p className="indented-paragraph">
      Enter the maximum capacity of the rack. This value must be a number greater than 0 and represents how much the rack can hold.
    </p>
    <h3 className="subheading">Unit of Measure (UOM)</h3>
    <p className="indented-paragraph">
      Select the unit of measure for the rack's capacity, such as liters, kilograms, etc. This field determines the measurement units for the capacity entered.
    </p>
    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      After filling out the form, click the "Create Rack" button to submit the information. If the submission is successful, a confirmation message will appear.
    </p>
    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there are any errors during the form submission (e.g., invalid capacity), an error message will appear, and the form will not be submitted until the issue is resolved.
    </p>
  </div>
);

export default HELP_CreateRacksPage;
