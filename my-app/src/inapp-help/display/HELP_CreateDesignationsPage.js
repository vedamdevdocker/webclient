import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateDesignationPage = () => (
  <div>
    <h2 className="subheading">Create Designation Form</h2>
    <p className="indented-paragraph">
      The `Create Designation` form allows authorized users to define new designations with relevant details.
    </p>

    <h3 className="subheading">Designation Name</h3>
    <p className="indented-paragraph">
      Enter the name of the designation. This should be a unique and descriptive title that accurately reflects the role.
    </p>

    <h3 className="subheading">Description</h3>
    <p className="indented-paragraph">
      Provide a brief description of the designation, outlining its key aspects and purpose.
    </p>

    <h3 className="subheading">Salary Range</h3>
    <p className="indented-paragraph">
      Specify the salary range associated with the designation. This helps in standardizing compensation structures.
    </p>

    <h3 className="subheading">Responsibilities</h3>
    <p className="indented-paragraph">
      List the primary responsibilities expected from employees holding this designation.
    </p>

    <h3 className="subheading">Qualifications</h3>
    <p className="indented-paragraph">
      Mention the required qualifications, such as educational background, certifications, or relevant experience.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Users must have the necessary permissions to create a new designation. Ensure that the appropriate access level is granted.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      - Ensure that all details are accurate before submitting the form.
      <br />
      - Designations should align with company policies and role structures.
    </p>
  </div>
);

export default HELP_CreateDesignationPage;
