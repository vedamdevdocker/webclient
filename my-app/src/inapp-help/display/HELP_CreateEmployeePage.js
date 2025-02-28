import "../../modules/utilities/css/appcss.css";
import React from "react";

const HELP_CreateEmployeePage = () => (
  <div>
    <h2 className="subheading">Create Employee Form</h2>
    <p className="indented-paragraph">
      The `CreateEmployeeForm` component allows you to create new employee records in the system.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      This form contains various fields for entering employee information:
    </p>
    <ul>
      <li>
        <strong>Name:</strong> Enter the employee's name. <span className="help-example">Example: John Doe</span>
      </li>
      <li>
        <strong>Date of Birth:</strong> Select the employee's date of birth. <span className="help-example">Example: 11/08/1983</span>
      </li>
      <li>
        <strong>Date of Joining:</strong> Select the employee's date of joining. <span className="help-example">Example: 15/10/2018</span>
      </li>
      <li>
        <strong>Manager:</strong> Select the manager from the list of employees. <span className="help-example">Example: John Smith</span>
      </li>
      <li>
        <strong>Supervisor:</strong> Select the supervisor from the list of employees. <span className="help-example">Example: Mary Johnson</span>
      </li>
      <li>
        <strong>Designation:</strong> Select the employee's designation from the list of options. <span className="help-example">Example: Senior Software Engineer</span>
      </li>
      <li>
        <strong>Salary:</strong> Enter the employee's salary. <span className="help-example">Example: 60000</span>
      </li>
      <li>
        <strong>Picture:</strong> Upload a picture of the employee. Supported formats: JPG, PNG, GIF. <span className="help-example">Example: employee.jpg</span>
      </li>
    </ul>

    <h3 className="subheading">Submit Button</h3>
    <p className="indented-paragraph">
      Click the "Create Employee" button to create a new employee record with the provided information.
    </p>

    <h3 className="subheading">Access Permissions</h3>
    <p className="indented-paragraph">
      Your access to this module is determined by your user role and permissions. If you do not have the necessary access, you will see a message indicating that you do not have permission to view this module.
    </p>
  </div>
);

export default HELP_CreateEmployeePage;
