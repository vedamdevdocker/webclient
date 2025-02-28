import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateDefaultTaxCodesPage = () => (
  <div>
    <h2 className="subheading">Create Default Tax Codes Help Page</h2>
    <p className="indented-paragraph">
      This page provides instructions on how to use the <strong>Create Default Tax Codes</strong> form to associate tax codes with a default account header.
    </p>

    <h3 className="subheading">Tax Code Selection</h3>
    <p className="indented-paragraph">
      In the <strong>Tax ID</strong> column, you can select a tax code from the available list of tax codes. This will automatically populate the <strong>Tax Type</strong> and <strong>Description</strong> fields based on the selected tax code.
    </p>

    <h3 className="subheading">Adding New Lines</h3>
    <p className="indented-paragraph">
      To add a new tax code line, click the <strong>Add Line</strong> button. This will create a new row where you can select a tax code and fill in the relevant details. Each line represents a different tax code that will be associated with the header.
    </p>

    <h3 className="subheading">Removing Lines</h3>
    <p className="indented-paragraph">
      To remove a line, click the <strong>Remove</strong> button next to the corresponding row. You cannot remove the last remaining line.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If a tax code is not selected or if there is an invalid entry, an error message will appear at the top of the page. Make sure that each line contains a valid tax code before submitting.
    </p>

    <h3 className="subheading">Submitting Tax Codes</h3>
    <p className="indented-paragraph">
      Once you've added all the tax codes, click the <strong>Create Default Tax Codes</strong> button to submit your changes. If the operation is successful, a success message will appear, and the page will close after a brief delay.
    </p>

    <h3 className="subheading">Success and Error Messages</h3>
    <p className="indented-paragraph">
      After submitting, if the operation is successful, a message will confirm the creation of the default tax codes. If an error occurs, you will be shown an error message explaining the issue.
    </p>
  </div>
);

export default HELP_CreateDefaultTaxCodesPage;
