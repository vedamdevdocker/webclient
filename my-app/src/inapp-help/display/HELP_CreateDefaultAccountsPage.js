import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateDefaultAccountsPage = () => (
  <div>
    <h2 className="subheading">Create Default Account Header Help Page</h2>
    <p className="indented-paragraph">
      This page provides guidance on how to use the <strong>Create Default Account Header</strong> form to create a new default account header.
    </p>

    <h3 className="subheading">Header Name</h3>
    <p className="indented-paragraph">
      The <strong>Header Name</strong> field is used to define the name for the new default account header. This name will help identify the header within the system.
    </p>

    <h3 className="subheading">Company Selection</h3>
    <p className="indented-paragraph">
      The <strong>Company</strong> dropdown allows you to select which company this default account header will belong to. Make sure to choose the correct company from the list.
    </p>

    <h3 className="subheading">Currency Selection</h3>
    <p className="indented-paragraph">
      The <strong>Currency</strong> dropdown allows you to select the currency associated with this default account header. The list of available currencies will be loaded when the currency dropdown is clicked. Choose the appropriate currency for your header.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      After entering the <strong>Header Name</strong>, selecting the <strong>Company</strong>, and choosing the <strong>Currency</strong>, click the <strong>Create Default Account Header</strong> button to submit the form.
    </p>

    <h3 className="subheading">Success</h3>
    <p className="indented-paragraph">
      Once the form is successfully submitted, a modal will appear showing the result of your action, including the newly created header ID and a confirmation message.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there are any errors during submission (e.g., missing fields or API issues), the system will show an error message. Ensure all fields are filled out correctly before submitting the form.
    </p>
  </div>
);

export default HELP_CreateDefaultAccountsPage;
