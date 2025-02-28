import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_FindDepartmentToUpdatePage = () => (
  <div>
    <h2 className="subheading">Find Department to Update</h2>
    <p className="indented-paragraph">
      The `Find Department to Update` page allows users to select a department from a list of available departments. Once a department is selected, users can proceed to update the department details.
    </p>

    <h3 className="subheading">Select Department</h3>
    <p className="indented-paragraph">
      The `Select Department` dropdown allows users to choose a department from a list of available departments in the system. After selecting a department, users can navigate to the department update form.
    </p>

    <h3 className="subheading">Update Department</h3>
    <p className="indented-paragraph">
      The `Update Department` button enables users to navigate to the department update form, where they can modify the details of the selected department.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If no department is selected from the dropdown, an error message will be shown, prompting users to select a department before proceeding.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Access to this page is restricted based on user permissions. If a user does not have the required permissions to view or update department details, they will be shown a message indicating they do not have permission to view this module.
    </p>
  </div>
);

export default HELP_FindDepartmentToUpdatePage;
