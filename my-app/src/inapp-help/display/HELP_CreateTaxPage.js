import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateTaxPage = () => (
  <div>
    <h2 className="subheading">Create Tax Page</h2>
    <p className="indented-paragraph">
      The `Create Tax` page allows administrators to create new tax records by filling out the tax details in the form. This is used for registering new tax codes and their associated attributes, such as tax type, rate, and applicability.
    </p>

    <h3 className="subheading">Tax Code</h3>
    <p className="indented-paragraph">
      The `Tax Code` is a unique identifier for the tax. It should be entered as a text value.
    </p>

    <h3 className="subheading">Tax Description</h3>
    <p className="indented-paragraph">
      The `Tax Description` provides a short description of the tax. This will help in identifying the tax code in the system.
    </p>

    <h3 className="subheading">Tax Rate</h3>
    <p className="indented-paragraph">
      The `Tax Rate` is the percentage value that represents the rate of the tax. It should be entered as a decimal number (e.g., 10% as 10.00).
    </p>

    <h3 className="subheading">Tax Type</h3>
    <p className="indented-paragraph">
      The `Tax Type` refers to the classification of the tax (e.g., Sales Tax, VAT). Select the appropriate tax type from the dropdown.
    </p>

    <h3 className="subheading">Tax Authority</h3>
    <p className="indented-paragraph">
      The `Tax Authority` is the governing body that manages the tax. Select the relevant tax authority from the available options.
    </p>

    <h3 className="subheading">Tax Jurisdiction</h3>
    <p className="indented-paragraph">
      The `Tax Jurisdiction` defines the geographical area where the tax is applicable. Choose the appropriate jurisdiction from the list.
    </p>

    <h3 className="subheading">Tax Applicability</h3>
    <p className="indented-paragraph">
      The `Tax Applicability` defines whether the tax applies to specific products, services, or geographical regions. Select the relevant option based on your scenario.
    </p>

    <h3 className="subheading">Effective Date</h3>
    <p className="indented-paragraph">
      The `Effective Date` refers to the date from which the tax code becomes active. This is important for determining the tax rate applicable at different times.
    </p>

    <h3 className="subheading">Exemption Reason</h3>
    <p className="indented-paragraph">
      The `Exemption Reason` should be filled if the tax has an exemption. Specify the reason for the exemption here.
    </p>

    <h3 className="subheading">Reporting Codes</h3>
    <p className="indented-paragraph">
      The `Reporting Codes` are used for financial reporting and compliance. Choose the relevant code from the list if applicable.
    </p>

    <h3 className="subheading">Integration Info</h3>
    <p className="indented-paragraph">
      `Integration Info` allows you to add additional information about how this tax integrates with other systems or services.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      The `Status` checkbox defines whether the tax code is active or inactive. If the status is checked, the tax code will be active.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      You can provide additional `Notes` related to the tax code here. This is an optional field that allows you to add more context or information.
    </p>

    <h3 className="subheading">Submitting the Form</h3>
    <p className="indented-paragraph">
      After filling out all the fields, click the `Create Tax` button to submit the form. A success message will be displayed if the tax is created successfully.
    </p>

  </div>
);

export default HELP_CreateTaxPage;
