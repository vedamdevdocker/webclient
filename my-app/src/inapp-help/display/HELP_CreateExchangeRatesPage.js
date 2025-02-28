import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateExchangeRatesPage = () => (
  <div>
    <h2 className="subheading">Create Exchange Rates Help Page</h2>
    <p className="indented-paragraph">
      This page provides instructions on how to use the <strong>Create Exchange Rates</strong> form to create new exchange rates between different currencies.
    </p>

    <h3 className="subheading">From Currency</h3>
    <p className="indented-paragraph">
      In the <strong>From Currency</strong> dropdown, select the currency from which you are converting. This is the base currency for the exchange rate.
    </p>

    <h3 className="subheading">To Currency</h3>
    <p className="indented-paragraph">
      In the <strong>To Currency</strong> dropdown, select the currency to which you are converting. The exchange rate will be applied based on this selection.
    </p>

    <h3 className="subheading">Exchange Rate</h3>
    <p className="indented-paragraph">
      The <strong>Exchange Rate</strong> field will automatically fill if the selected currencies are different. If the from and to currencies are the same, the exchange rate will be set to <strong>1.0</strong>.
    </p>

    <h3 className="subheading">Valid From and Valid To</h3>
    <p className="indented-paragraph">
      Specify the date range for which the exchange rate is valid. The exchange rate will be applicable only during this period.
    </p>

    <h3 className="subheading">Conversion Type</h3>
    <p className="indented-paragraph">
      Enter the <strong>Conversion Type</strong>, which could describe the type of conversion (e.g., Forex, In-house conversion, etc.).
    </p>

    <h3 className="subheading">Provider ID</h3>
    <p className="indented-paragraph">
      The <strong>Provider ID</strong> is used to identify the source of the exchange rate, such as a specific currency provider or system.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      The <strong>Status</strong> field allows you to specify whether the exchange rate is active or inactive.
    </p>

    <h3 className="subheading">Version</h3>
    <p className="indented-paragraph">
      The <strong>Version</strong> field is used to track different versions of the exchange rates in case they are updated over time.
    </p>

    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      Once you have entered all the details, click on the <strong>Create Exchange Rate</strong> button to submit the form. If the exchange rate is successfully created, a confirmation message will appear.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there are any issues with the form (e.g., missing or invalid fields), an error message will be displayed. Ensure all required fields are filled out correctly before submitting.
    </p>
  </div>
);

export default HELP_CreateExchangeRatesPage;
