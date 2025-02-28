import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateDepartmentPage = () => (
  <div>
    <h2 className="subheading">Create Department Form</h2>
    <p className="indented-paragraph">
      The Create Department Form allows authorized users to create new department entries. It facilitates the addition of essential information such as the department name, description, associated company, and manager.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The form includes the following fields:
    </p>
    <ul className="help-list">
      <li><strong>Department Name:</strong> Enter the name of the new department.</li>
      <li><strong>Description:</strong> Provide a brief description of the department.</li>
      <li><strong>Company:</strong> Select the associated company from the dropdown list.</li>
      <li><strong>Manager:</strong> Select the manager from the dropdown list.</li>
    </ul>

    <h3 className="subheading">Creating a Department</h3>
    <p className="indented-paragraph">
      To create a new department entry, follow these steps:
    </p>
    <ol className="help-list">
      <li>Fill in the required information in the respective input fields.</li>
      <li>Select the associated company and manager from the dropdown lists.</li>
      <li>Click the "Create Department" button to submit the form.</li>
    </ol>
    <p className="help-example">Example: Enter the details for a new department, select the company and manager, and click "Create Department" to add the entry to the system.</p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the necessary permissions can access and use the Create Department Form. If you do not have the required permissions, you will see a message indicating that you do not have access to this module.
    </p>
  </div>
);

export default HELP_CreateDepartmentPage;
