import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateCompaniesPage = () => (
  <div>
    <h2 className="subheading">Create Company Form</h2>
    <p className="indented-paragraph">
      The Create Company Form allows authorized users to create new company entries. It includes input fields for essential company information, such as the company name, description, group company association, and currency details.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The form includes the following fields:
    </p>
    <ul className="help-list">
      <li><strong>Company Name:</strong> Enter the name of the new company.</li>
      <li><strong>Description:</strong> Provide a brief description of the company.</li>
      <li><strong>Group Company:</strong> Select the associated group company from the dropdown list.</li>
      <li><strong>Local Currency:</strong> Select the local currency for the company from the dropdown list.</li>
      <li><strong>Home Currency:</strong> Select the home currency for the company from the dropdown list.</li>
      <li><strong>Reporting Currency:</strong> Select the reporting currency for the company from the dropdown list.</li>
    </ul>

    <h3 className="subheading">Creating a Company</h3>
    <p className="indented-paragraph">
      To create a new company entry, follow these steps:
    </p>
    <ol className="help-list">
      <li>Fill in the required information in the respective input fields.</li>
      <li>Select the associated group company, local currency, home currency, and reporting currency.</li>
      <li>Click the "Create Company" button to submit the form.</li>
    </ol>
    <p className="help-example">Example: Enter the details for a new company, select the group company, and currencies, then click "Create Company" to add the entry to the system.</p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the necessary permissions can access and use the Create Company Form. If you do not have the required permissions, you will see a message indicating that you do not have access to this module.
    </p>
  </div>
);

export default HELP_CreateCompaniesPage;
