import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateGroupCompaniesPage = () => (
  <div>
    <h2 className="subheading">Create Group Company Form</h2>
    <p className="indented-paragraph">
      The Create Group Company Form allows authorized users to create new group company entries. It facilitates the addition of essential information such as the group company name, description, and association with a legal entity.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The form includes the following fields:
    </p>
    <ul className="help-list">
      <li><strong>Group Company Name:</strong> Enter the name of the new group company.</li>
      <li><strong>Description:</strong> Provide a brief description of the group company.</li>
      <li><strong>Legal Entity:</strong> Select the associated legal entity from the dropdown list.</li>
    </ul>

    <h3 className="subheading">Creating a Group Company</h3>
    <p className="indented-paragraph">
      To create a new group company entry, follow these steps:
    </p>
    <ol className="help-list">
      <li>Fill in the required information in the respective input fields.</li>
      <li>Select the associated legal entity from the dropdown list.</li>
      <li>Click the "Create Group Company" button to submit the form.</li>
    </ol>
    <p className="help-example">Example: Enter the details for a new group company, select the legal entity, and click "Create Group Company" to add the entry to the system.</p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the necessary permissions can access and use the Create Group Company Form. If you do not have the required permissions, you will see a message indicating that you do not have access to this module.
    </p>
  </div>
);

export default HELP_CreateGroupCompaniesPage;
