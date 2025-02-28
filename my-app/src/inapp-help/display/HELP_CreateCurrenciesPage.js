import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateCurrenciesPage = () => (
  <div>
    <h2 className="subheading">Create Currency Help Page</h2>
    <p className="indented-paragraph">
      This page provides guidance on how to use the <strong>Create Currency</strong> form to define a new currency for the system.
    </p>

    <h3 className="subheading">Currency Code</h3>
    <p className="indented-paragraph">
      The <strong>Currency Code</strong> is a unique identifier for the currency. It is typically a short code (e.g., "USD" for the US Dollar, "EUR" for the Euro).
    </p>

    <h3 className="subheading">Currency Name</h3>
    <p className="indented-paragraph">
      The <strong>Currency Name</strong> is the full name of the currency, such as "United States Dollar" or "Euro."
    </p>

    <h3 className="subheading">Currency Symbol</h3>
    <p className="indented-paragraph">
      The <strong>Currency Symbol</strong> is the symbol used to represent the currency. For example, "$" for USD, "€" for EUR.
    </p>

    <h3 className="subheading">Actions</h3>
    <p className="indented-paragraph">
      After entering the required fields (Currency Code, Currency Name, Currency Symbol), click on the <strong>Create Currency</strong> button to submit the form and create a new currency in the system.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      Once the currency is created successfully, a success message will be displayed. If there's an error (e.g., missing information), an error message will appear instead.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If any fields are left blank or if there’s a problem during the submission process, an error message will be displayed. Ensure that all fields are filled out correctly before submitting the form.
    </p>
  </div>
);

export default HELP_CreateCurrenciesPage;
