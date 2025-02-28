import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateLegalEntityPage = () => (
  <div>
    <h2 className="subheading">Create Legal Entity Page</h2>
    <p className="indented-paragraph">
      The Create Legal Entity Page allows users to create a new legal entity by filling in the required details. It consists of a form with fields such as Legal Entity Name, Registration Number, Address, Contact Email, Contact Phone, and About.
    </p>

    <h3 className="subheading">Legal Entity Form</h3>
    <p className="indented-paragraph">
      The Legal Entity Form provides input fields for entering information about the legal entity. Users can input the Legal Entity Name, Registration Number, Address, Contact Email, Contact Phone, and a brief description in the About field. Once the required details are entered, clicking the "Create Legal Entity" button submits the form for processing.
      <span className="help-example">Example: Enter the legal entity details and click "Create Legal Entity" to initiate the creation process.</span>
    </p>

    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      Upon submitting the form, the entered data is sent to the server using an API request. The server processes the request and creates a new legal entity with the provided information. If successful, a confirmation message is logged, and the form is reset for additional entries. In case of an error, an error message is displayed.
      <span className="help-example">Example: After form submission, check the logs for a success message or an error description.</span>
    </p>

  </div>
);

export default HELP_CreateLegalEntityPage;
