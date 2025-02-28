import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateBinsPage = () => (
  <div>
    <h2 className="subheading">Bin Management Module</h2>
    <p className="indented-paragraph">
      The `Bin Management Module` allows users to create, manage, and update bins in the system. This feature is crucial for managing storage in a warehouse or facility.
    </p>

    <h3 className="subheading">Create Bin</h3>
    <p className="indented-paragraph">
      The `Create Bin` functionality allows users to create a new bin by specifying the following attributes:
      <ul>
        <li><strong>Rack Name</strong>: Select the rack where the bin will be stored. The list of racks is dynamically fetched from the system.</li>
        <li><strong>Bin Name</strong>: A unique name for the bin.</li>
        <li><strong>Description</strong>: A description of the bin.</li>
        <li><strong>Capacity</strong>: The maximum capacity of the bin (must be a number greater than 0).</li>
        <li><strong>Unit of Measure (UOM)</strong>: The unit of measure for the bin’s capacity (e.g., cubic meters, liters, etc.).</li>
      </ul>
      Once the form is submitted, the bin will be created and saved in the system with the provided details.
    </p>

    <h3 className="subheading">Edit Bin</h3>
    <p className="indented-paragraph">
      Users can also modify the details of an existing bin, including the name, description, capacity, and UOM, to keep the bin information up to date.
    </p>

    <h3 className="subheading">Delete Bin</h3>
    <p className="indented-paragraph">
      The Delete Bin option allows users to remove bins that are no longer needed or are obsolete.
    </p>
  </div>
);

export default HELP_CreateBinsPage;
