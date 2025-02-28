import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateSOInvoiceHeaderPage = () => (
  <div>
    <h2 className="subheading">Sales Order and Invoice Update Help</h2>
    <p className="indented-paragraph">
      The `Sales Order and Invoice Update` page allows users to search and filter sales orders and invoices based on different criteria. The page provides a set of filters that help narrow down search results, and allows users to update the sales order and invoice records.
    </p>

    <h3 className="subheading">Search Filters</h3>
    <p className="indented-paragraph">
      The form allows filtering sales orders and invoices based on the following fields:
    </p>
    <ul className="indented-paragraph">
      <li><strong>Company</strong>: Select a company to filter sales orders and invoices related to that company.</li>
      <li><strong>Department</strong>: Choose a department within the selected company to narrow down the results.</li>
      <li><strong>Sales Type</strong>: Select the sales type to filter orders based on their sales category.</li>
      <li><strong>Reference Type</strong>: Filter orders by their reference type (e.g., Invoice, Credit Note).</li>
      <li><strong>Reference ID</strong>: Filter sales orders based on a specific reference ID.</li>
      <li><strong>Status</strong>: Filter orders by their current status (e.g., Pending, Completed).</li>
      <li><strong>Currency</strong>: Choose the currency in which the sales order or invoice was made.</li>
    </ul>

    <h3 className="subheading">Search by Sales Order No. or Invoice Number</h3>
    <p className="indented-paragraph">
      Alternatively, you can choose to search using specific sales order numbers or invoice numbers by checking the "Sales Invoice by Selection" checkbox. Once checked, the form will display input fields for entering either a sales order number or invoice number directly.
    </p>

    <h3 className="subheading">How to Use the Filters</h3>
    <p className="indented-paragraph">
      Follow these steps to filter and find the sales order or invoice you want to update:
    </p>
    <ol className="indented-paragraph">
      <li>Select the desired company and department from the dropdown lists.</li>
      <li>Choose the appropriate sales type, reference type, and reference ID to further filter the results.</li>
      <li>Optionally, select a status and currency to refine the search even more.</li>
      <li>If you prefer, instead of using the filters, you can search directly using the sales order or invoice number by checking the checkbox and entering the details in the input fields.</li>
    </ol>

    <h3 className="subheading">Key Actions</h3>
    <p className="indented-paragraph">
      Once the filters are applied, you can:
    </p>
    <ul className="indented-paragraph">
      <li><strong>Update Sales Invoice</strong>: After filtering, click the "Update Sales Invoice" button to update the selected invoice or sales order. This will navigate you to the appropriate page for making changes.</li>
    </ul>

    <h3 className="subheading">Permissions and Access</h3>
    <p className="indented-paragraph">
      To use this feature, you must have the appropriate access permissions. If you do not have the required permissions, you will be notified and unable to perform updates.
    </p>

    <h3 className="subheading">Troubleshooting</h3>
    <p className="indented-paragraph">
      If you experience any issues while using the form:
    </p>
    <ul className="indented-paragraph">
      <li>Ensure you have the correct permissions to access and update sales orders and invoices.</li>
      <li>Check that all required fields are properly selected before attempting to search or update.</li>
      <li>If the form does not return the expected results, try adjusting the filters for more specific criteria.</li>
    </ul>
  </div>
);

export default HELP_UpdateSOInvoiceHeaderPage;
