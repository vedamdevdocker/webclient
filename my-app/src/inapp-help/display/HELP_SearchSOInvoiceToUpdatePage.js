import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchPOInvoiceToUpdatePage = () => (
  <div>
    <h2 className="subheading">Sales Invoice Update Form</h2>
    <p className="indented-paragraph">
      The `Sales Invoice Update Form` allows users to search for and update sales invoice information based on various filter criteria.
    </p>

    <h3 className="subheading">Filter Criteria</h3>
    <p className="indented-paragraph">
      Use the filters to narrow down your search for specific sales invoices:
    </p>
    <ul>
      <li>
        <strong>Company:</strong> Select the company for which you want to find the sales invoice.
      </li>
      <li>
        <strong>Department:</strong> Choose the department to further refine the search.
      </li>
      <li>
        <strong>Sales Type:</strong> Specify the type of sale to filter invoices.
      </li>
      <li>
        <strong>Reference Type:</strong> Choose the reference type for the sales invoice.
      </li>
      <li>
        <strong>Reference ID:</strong> Select the specific reference ID for the sales invoice.
      </li>
      <li>
        <strong>Status:</strong> Filter invoices based on their current status.
      </li>
      <li>
        <strong>Currency:</strong> Choose the currency associated with the sales invoice.
      </li>
    </ul>

    <h3 className="subheading">Search by Transaction Number or Invoice Number</h3>
    <p className="indented-paragraph">
      Alternatively, you can search by entering the sales order number or sales invoice number directly. This will narrow down the results for easier lookup.
    </p>

    <h3 className="subheading">Checkbox Option</h3>
    <p className="indented-paragraph">
      The checkbox at the top allows you to toggle between searching by sales invoice filters or by transaction/invoice number.
    </p>

    <h3 className="subheading">Update Sales Invoice</h3>
    <p className="indented-paragraph">
      Once you've selected the desired filters or entered transaction/invoice numbers, click the "Update Sales Invoice" button to proceed with the update.
    </p>
  </div>
);

export default HELP_SearchPOInvoiceToUpdatePage;
