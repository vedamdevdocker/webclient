import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateCompanyPage = () => (
  <div>
    <h2 className="subheading">Companies Menu</h2>
    <p className="indented-paragraph">
      The `Companies Menu` allows users to access various functionalities related to company management based on their permissions.
    </p>

    <h3 className="subheading">Menu Options</h3>
    <p className="indented-paragraph">
      The menu contains several actions that can be performed related to companies:
    </p>
    <ul>
      <li><strong>View Companies:</strong> Allows the user to view a list of companies. This option is visible only if the user has the permission to view company data.</li>
      <li><strong>Create Company:</strong> Allows the user to create a new company. This option is available only if the user has the permission to create companies.</li>
      <li><strong>Update Company:</strong> Allows the user to update company information. This option is shown only if the user has the permission to update company data.</li>
      {/* Add more items as necessary */}
    </ul>

    <h3 className="subheading">Permissions and Access Control</h3>
    <p className="indented-paragraph">
      The options available in the Companies Menu depend on the permissions assigned to the user. If a user does not have permission to access a particular module (such as "Create Company"), the corresponding button will not be visible in the menu.
    </p>

    <h3 className="subheading">How to Use the Menu</h3>
    <p className="indented-paragraph">
      - To view companies, select the "View Companies" button.
      <br />
      - To create a new company, click the "Create Company" button.
      <br />
      - To update company information, click the "Update Company" button.
    </p>

    <h3 className="subheading">Logging and Tracking</h3>
    <p className="indented-paragraph">
      Every time a menu item is clicked, relevant details such as the action performed and the path navigated to are logged for tracking purposes.
    </p>
  </div>
);

export default HELP_UpdateCompanyPage;
