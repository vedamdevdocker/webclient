import "../../modules/utilities/css/appcss.css";
// EmployeeMenu.js

import React from "react";

const HELP_EmployeePage = () => (
  <div>
    <h2 className="subheading">Employee Menu</h2>
    <p className="indented-paragraph">
      The `Employee Menu` provides comprehensive functionality for managing employee records and designations within the system. It enables administrators to create, modify, list, and remove employee details and their respective roles within the organization.
    </p>

    <h3 className="subheading">Create Employee</h3>
    <p className="indented-paragraph">
      The `Create Employee` option allows administrators to add new employee records to the system. This feature enables the input of essential details such as name, contact information, role, and other relevant employee data.
    </p>

    <h3 className="subheading">Delete Employee</h3>
    <p className="indented-paragraph">
      The `Delete Employee` option allows administrators to remove employee records from the system. This is useful when employees leave the organization or when their data is no longer required.
    </p>

    <h3 className="subheading">Update Employee</h3>
    <p className="indented-paragraph">
      The `Update Employee` functionality enables administrators to modify existing employee details, including contact information, job roles, or other employee-specific data that needs to be updated.
    </p>

    <h3 className="subheading">List Employees</h3>
    <p className="indented-paragraph">
      The `List Employees` option allows administrators to view all employee records currently registered in the system. This provides an overview of the organization's workforce and can be filtered or searched for specific employees.
    </p>

    <h3 className="subheading">List Designations</h3>
    <p className="indented-paragraph">
      The `List Designations` option provides a list of all available designations within the organization. This allows administrators to quickly reference the different roles and positions in the system.
    </p>

    <h3 className="subheading">Create Designations</h3>
    <p className="indented-paragraph">
      The `Create Designations` feature allows administrators to add new designations or job titles to the system. This is essential when new roles are introduced or when the company restructures its teams or departments.
    </p>

  </div>
);

export default HELP_EmployeePage;
