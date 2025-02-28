import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateAislesPage = () => (
  <div>
    <h2 className="subheading">Aisle Management Module</h2>
    <p className="indented-paragraph">
      The `Aisle Management Module` provides users with the ability to create, manage, and update aisles in the system.
    </p>

    <h3 className="subheading">Create Aisle</h3>
    <p className="indented-paragraph">
      The `Create Aisle` option allows users to create a new aisle in the system by specifying the following attributes:
      <ul>
        <li><strong>Aisle Name</strong>: A unique name for the aisle.</li>
        <li><strong>Description</strong>: A brief description of the aisle.</li>
        <li><strong>Capacity</strong>: The maximum capacity of the aisle (must be a number greater than 0).</li>
        <li><strong>Unit of Measure (UOM)</strong>: The unit of measure for the aisle's capacity (e.g., square feet, pallets).</li>
        <li><strong>Zone</strong>: The zone to which the aisle belongs. Zones help organize aisles based on their location within the warehouse or facility.</li>
      </ul>
      After submitting the form, a new aisle is created with the specified details, and the aisle's capacity is validated to ensure it's a number greater than 0.
    </p>

    <h3 className="subheading">Edit Aisle</h3>
    <p className="indented-paragraph">
      Users can also modify an existing aisle's details, such as the name, description, capacity, UOM, and zone, to keep the aisle information up to date.
    </p>

    <h3 className="subheading">Delete Aisle</h3>
    <p className="indented-paragraph">
      The Delete Aisle option enables users to remove aisles from the system when they are no longer needed.
    </p>
  </div>
);

export default HELP_CreateAislesPage;
