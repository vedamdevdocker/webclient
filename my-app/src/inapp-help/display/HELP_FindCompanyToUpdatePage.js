import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_FindCompanyToUpdatePage = () => (
  <div>
    <h2 className="subheading">Find Company to Update</h2>
    <p className="indented-paragraph">
      The `Find Company to Update` page allows users to select a company from a list and navigate to the company update form.
    </p>

    <h3 className="subheading">Select Company</h3>
    <p className="indented-paragraph">
      The `Select Company` dropdown allows users to choose a company from a list of available companies. Once a company is selected, users can proceed to update the company's details.
    </p>

    <h3 className="subheading">Update Company</h3>
    <p className="indented-paragraph">
      The `Update Company` button navigates to the company update form, where users can modify the selected company's details.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If a company is not selected from the dropdown, an error message will be displayed prompting the user to select a company before proceeding.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Access to this page is restricted based on user permissions. If the user does not have the required permissions to view or update companies, a message will be shown stating they do not have permission to view the module.
    </p>
  </div>
);

export default HELP_FindCompanyToUpdatePage;
