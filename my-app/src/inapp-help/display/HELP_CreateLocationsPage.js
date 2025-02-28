import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateLocationsPage = () => (
  <div>
    <h2 className="subheading">Create Location Form</h2>
    <p className="indented-paragraph">
      The `Create Location` form is used to add a new location within the system. It involves entering key details such as the location name, type, warehouse, description, capacity, unit of measure (UOM), temperature control status, and security level.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The following fields are available in the location creation form:
    </p>
    <ul className="indented-list">
      <li><strong>Location Name</strong>: Enter a unique name for the location being created.</li>
      <li><strong>Location Type</strong>: Select the type of location (e.g., storage, processing, etc.).</li>
      <li><strong>Warehouse</strong>: Choose the warehouse where the location is situated.</li>
      <li><strong>Description</strong>: Provide a brief description of the location.</li>
      <li><strong>Capacity</strong>: Enter the capacity of the location (must be a positive number).</li>
      <li><strong>Unit of Measure (UOM)</strong>: Select the unit of measure (e.g., cubic meters, square feet, etc.).</li>
      <li><strong>Temperature Controlled</strong>: Choose whether the location is temperature-controlled.</li>
      <li><strong>Security Level</strong>: Select the security level required for the location.</li>
    </ul>

    <h3 className="subheading">Form Validation</h3>
    <p className="indented-paragraph">
      The form includes validation for required fields such as location name, type, warehouse, capacity, and UOM. Additionally, the capacity field must contain a numeric value greater than 0. If any required field is missing or invalid, the form will not be submitted, and the user will receive an error message.
    </p>

    <h3 className="subheading">Data Fetching</h3>
    <p className="indented-paragraph">
      The form fetches data dynamically from the backend:
    </p>
    <ul className="indented-list">
      <li><strong>Unit of Measure (UOM)</strong>: A list of available UOMs is fetched from the backend when the form is loaded.</li>
      <li><strong>Warehouses</strong>: A list of available warehouses is fetched from the backend for selection in the "Warehouse" field.</li>
    </ul>

    <h3 className="subheading">Error and Success Messages</h3>
    <p className="indented-paragraph">
      If an error occurs while submitting the form (e.g., network issues or validation failures), an error message is displayed to the user. On successful creation of a location, a success message is shown, and the form is cleared for the next entry.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the appropriate permissions are allowed to create new locations. The form ensures that the user has valid access before submitting the data.
    </p>

    <h3 className="subheading">Other Modules</h3>
    <p className="indented-paragraph">
      In addition to creating locations, users may interact with other modules in the system:
    </p>
    <ul className="indented-list">
      <li><strong>Employee Module</strong>: Manage employee-related functionalities.</li>
      <li><strong>Security Module</strong>: Handle user access and permissions.</li>
      <li><strong>Email Module</strong>: View emails generated within the system.</li>
    </ul>
  </div>
);

export default HELP_CreateLocationsPage;
