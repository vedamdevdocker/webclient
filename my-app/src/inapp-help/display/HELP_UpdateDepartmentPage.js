import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateDepartmentPage = () => (
  <div>
    <h2 className="subheading">Update Department</h2>
    <p className="indented-paragraph">
      The `Update Department` page allows authorized users to modify the details of an existing department, such as the company, department name, manager, and default account header.
    </p>

    <h3 className="subheading">Company</h3>
    <p className="indented-paragraph">
      The user can select the company to which the department belongs. This dropdown lists all available companies. The user must choose a company for the department being updated.
    </p>

    <h3 className="subheading">Department Name</h3>
    <p className="indented-paragraph">
      The user can modify the name of the department. This field allows the user to enter a new name for the department.
    </p>

    <h3 className="subheading">Manager</h3>
    <p className="indented-paragraph">
      The user can select a manager for the department from a list of active employees. Only employees with an active status will appear in the dropdown.
    </p>

    <h3 className="subheading">Default Account Header</h3>
    <p className="indented-paragraph">
      The user can choose a default account header for the department. This selection determines the account header used by default for financial transactions related to the department.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the required permissions can update department details. The user will be able to access this page and submit the form only if they have the necessary privileges for the department module.
    </p>

    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      Once the department details have been updated, the user can submit the form. If successful, a confirmation message will be displayed. If there is an error, an error message will appear.
    </p>

    <h3 className="subheading">Logging</h3>
    <p className="indented-paragraph">
      All actions performed during the update, including any errors, are logged for audit and tracking purposes.
    </p>
  </div>
);

export default HELP_UpdateDepartmentPage;
