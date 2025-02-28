import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchPurchaseInvoicePage = () => (
  <div>
    <h2 className="subheading">Search Purchase Invoice Form Component</h2>
    <p className="indented-paragraph">
      The `Search Purchase Invoice Form` component allows users to search for purchase invoices based on various criteria such as company, department, purchase type, reference type, reference ID, status, and currency.
    </p>
    <h3 className="subheading">Functionality</h3>
    <p className="indented-paragraph">
      Users can search for purchase invoices by selecting criteria from dropdown menus or entering values directly into input fields. The component dynamically updates the available options based on the user's selections.
    </p>
    <h3 className="subheading">Fields</h3>
    <ul>
      <li><strong>Company:</strong> Select a company from the dropdown menu.</li>
      <li><strong>Department:</strong> Select a department from the dropdown menu.</li>
      <li><strong>Purchase Type:</strong> Select a purchase type from the dropdown menu.</li>
      <li><strong>Reference Type:</strong> Select a reference type from the dropdown menu.</li>
      <li><strong>Reference ID:</strong> Select a reference ID from the dropdown menu.</li>
      <li><strong>Status:</strong> Select a status from the dropdown menu.</li>
      <li><strong>Currency:</strong> Select a currency from the dropdown menu.</li>
      <li><strong>Company No:</strong> Enter the company ID directly into the input field.</li>
      <li><strong>Purchase Type:</strong> Enter the purchase type directly into the input field.</li>
      <li><strong>Source Transaction No:</strong> Enter the source transaction number directly into the input field.</li>
      <li><strong>Purchase Number:</strong> Enter the purchase number directly into the input field.</li>
    </ul>
    <h3 className="subheading">Usage</h3>
    <p className="indented-paragraph">
      To use the `Search Purchase Invoice Form` component, include it in your React application and integrate it with your backend API for fetching purchase headers and results.
    </p>
    <h3 className="subheading">Dependencies</h3>
    <p className="indented-paragraph">
      This component depends on React, axios for HTTP requests, react-router-dom for navigation, and other utility functions and constants defined in the project.
    </p>
    <h3 className="subheading">Styling</h3>
    <p className="indented-paragraph">
      The component uses CSS classes defined in the `appcss.css` file for styling purposes.
    </p>
  </div>
);

export default HELP_SearchPurchaseInvoicePage;
