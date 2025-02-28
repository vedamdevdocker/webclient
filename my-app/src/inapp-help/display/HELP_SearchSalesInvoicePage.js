import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchSalesInvoicePage = () => (
  <div>
    <h2 className="subheading">Search Sales Invoice Form Component</h2>
    <p className="indented-paragraph">
      The `Search Sales Invoice Form` component allows users to search for sales invoices based on various criteria.
    </p>
    <h3 className="subheading">Company List</h3>
    <p className="indented-paragraph">
      The component fetches and displays the list of available companies for selection.
    </p>
    <h3 className="subheading">Department List</h3>
    <p className="indented-paragraph">
      Users can select a department from the fetched department list.
    </p>
    <h3 className="subheading">Reference Type List</h3>
    <p className="indented-paragraph">
      Displays a list of reference types available for selection.
    </p>
    <h3 className="subheading">Reference ID List</h3>
    <p className="indented-paragraph">
      Users can select a reference ID from the fetched list.
    </p>
    <h3 className="subheading">Status List</h3>
    <p className="indented-paragraph">
      Displays a list of statuses available for selection.
    </p>
    <h3 className="subheading">Currency List</h3>
    <p className="indented-paragraph">
      Users can select a currency from the fetched currency list.
    </p>
    <h3 className="subheading">Search Criteria</h3>
    <p className="indented-paragraph">
      Users can search for sales invoices based on different criteria like company, department, sales type, reference type, reference ID, status, transaction source, and invoice number.
    </p>
    <h3 className="subheading">Permission Check</h3>
    <p className="indented-paragraph">
      The component checks if the user has permission to view this module.
    </p>
  </div>
);

export default HELP_SearchSalesInvoicePage;
