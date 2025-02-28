import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateSalesPage = () => (
  <div>
    <h2 className="subheading">Create Sales Form Component</h2>
    <p className="indented-paragraph">
      The `Create Sales Form` component facilitates the creation of new sales invoices within the system.
    </p>
    <h3 className="subheading">Functionality Overview</h3>
    <p className="indented-paragraph">
      This component provides a form interface for users to input details required for creating a sales invoice. It includes fields for selecting company, department, currency, tax, partner, invoice date, payment due date, payment terms, and status.
    </p>
    <h3 className="subheading">Dependencies</h3>
    <p className="indented-paragraph">
      This component relies on external modules such as React, axios for HTTP requests, and CheckModuleAccess for security permissions.
    </p>
    <h3 className="subheading">State Variables</h3>
    <p className="indented-paragraph">
      - `formData`: Manages the form data including company, department, currency, tax, partner, invoice date, payment due date, payment terms, and status.<br/>
      - `companies`, `departments`, `currencies`, `partners`, `taxes`: Store data fetched from API calls.<br/>
      - `invoiceNumber`, `invoiceHeader`: Track generated invoice number and header ID.<br/>
      - `successMessage`: Displays success messages.<br/>
      - `showLinesModalWindow`, `showDistModalWindow`: Control modal window visibility for creating sales lines and distributions.<br/>
      - `selectedCurrencyId`, `selectedTaxId`: Track selected currency and tax.<br/>
      - `totalSum`: Stores the total sum of the invoice.<br/>
      - `selectedCompany`, `selectedDepartment`: Track selected company and department.
    </p>
    <h3 className="subheading">Lifecycle Methods</h3>
    <p className="indented-paragraph">
      - `useEffect`: Fetches data such as companies, currencies, partners, and taxes from the API on component mount.<br/>
    </p>
    <h3 className="subheading">Helper Functions</h3>
    <p className="indented-paragraph">
      - `generateHeaders`: Generates authorization headers for API requests.<br/>
      - `getCurrenyCode`, `getCurrencySymbol`: Retrieve currency code and symbol based on currency ID.<br/>
      - `getTaxCode`, `getTaxRate`: Retrieve tax code and rate based on tax ID.<br/>
      - `handleCompanyChange`: Handles company change event and fetches related departments.<br/>
      - `handleChange`: Handles form input changes.<br/>
      - `handleDistributeLines`, `handleCreateLines`: Handle form submission for creating sales lines and distributions.<br/>
      - `handleSuccessLinesModalClose`, `handleSuccessDistModalClose`: Close modal windows after successful operations.<br/>
      - `handleDistributionSuccess`, `handleCreateSILinesSuccess`: Handle success responses for creating sales lines and distributions.
    </p>
    <h3 className="subheading">Rendering</h3>
    <p className="indented-paragraph">
      The component renders a form with input fields for various details required for creating a sales invoice. It also renders modal windows for creating sales lines and distributions based on user actions.
    </p>
  </div>
);

export default HELP_CreateSalesPage;
