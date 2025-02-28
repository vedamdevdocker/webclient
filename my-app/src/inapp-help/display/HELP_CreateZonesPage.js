import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateZonesPage = () => (
  <div>
    <h2 className="subheading">Create Zone Page</h2>
    <p className="indented-paragraph">
      The `Create Zone` page allows users to create a new zone in the warehouse management system. Zones are used to organize the warehouse space and assign capacities for storage and retrieval of items.
    </p>

    <h3 className="subheading">Zone Name</h3>
    <p className="indented-paragraph">
      The `Zone Name` field is required and should contain a unique name for the zone you are creating. This name helps identify and reference the zone within the system.
    </p>

    <h3 className="subheading">Description</h3>
    <p className="indented-paragraph">
      The `Description` field is optional. You can add any relevant information about the zone, such as its purpose or specific characteristics.
    </p>

    <h3 className="subheading">Location</h3>
    <p className="indented-paragraph">
      The `Location` dropdown allows you to select the physical location where the zone will be created. Locations are predefined in the system and correspond to different areas within the warehouse.
    </p>

    <h3 className="subheading">Capacity</h3>
    <p className="indented-paragraph">
      The `Capacity` field defines how much the zone can hold. This is an optional field but should be a positive number if entered. This field helps in managing and planning the warehouse space effectively.
    </p>

    <h3 className="subheading">Unit of Measure (UOM)</h3>
    <p className="indented-paragraph">
      The `Unit of Measure (UOM)` dropdown allows you to select the measurement unit for the zone's capacity. This could be something like pieces, kilograms, or pallets, depending on how the warehouse organizes its inventory.
    </p>

    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      After filling in the required fields, click on the `Create Zone` button to submit the form and create the new zone. If the form is valid, the zone will be created, and you will receive a success message.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there are any errors while creating the zone, such as invalid capacity or a missing required field, an error message will be displayed to help guide you in fixing the issue.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the appropriate permissions will be able to access this page and create new zones. If you do not have permission, you will not be able to view or submit the form.
    </p>
  </div>
);

export default HELP_CreateZonesPage;
