import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreatePOPage = () => (
  <div>
    <h2 className="subheading">Create Purchase Order Form</h2>
    <p className="indented-paragraph">
      The `Create Purchase Order` form is used to initiate a new purchase order. This form allows users to enter key details such as company, department, RFQ header, PO date, supplier, currency, tax code, and status.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The following fields are available in the purchase order creation form:
    </p>
    <ul className="indented-list">
      <li><strong>Company</strong>: Select the company from the available options.</li>
      <li><strong>Department</strong>: Choose the department associated with the purchase order.</li>
      <li><strong>RFQ Header</strong>: Optionally, input the RFQ header ID if applicable.</li>
      <li><strong>PO Date</strong>: Choose the date for the purchase order.</li>
      <li><strong>Supplier</strong>: Select the supplier for the order.</li>
      <li><strong>Currency</strong>: Select the currency to be used for the purchase order.</li>
      <li><strong>Tax Code</strong>: Choose the applicable tax code for the order.</li>
      <li><strong>Status</strong>: Select the status of the purchase order (e.g., Pending, Approved, etc.).</li>
    </ul>

    <h3 className="subheading">Form Validation</h3>
    <p className="indented-paragraph">
      The form ensures that all required fields are filled before submission. These fields include company, department, PO date, supplier, currency, tax code, and status. If any required field is left empty, the form will not be submitted and will prompt the user to fill in the missing details.
    </p>

    <h3 className="subheading">Dynamic Data Fetching</h3>
    <p className="indented-paragraph">
      The form dynamically fetches the following data from the backend:
    </p>
    <ul className="indented-list">
      <li><strong>Companies</strong>: A list of available companies is fetched from the backend for the user to select from.</li>
      <li><strong>Departments</strong>: Once a company is selected, the available departments for that company are fetched.</li>
      <li><strong>Suppliers</strong>: A list of available suppliers is fetched for the user to choose from.</li>
      <li><strong>Currencies</strong>: A list of available currencies is fetched for selection.</li>
      <li><strong>Tax Codes</strong>: A list of available tax codes is fetched for selection.</li>
    </ul>

    <h3 className="subheading">Handling Form Submission</h3>
    <p className="indented-paragraph">
      Upon successful submission, a purchase order number is automatically generated and used to create the purchase order. After the purchase order header is successfully created, the user is prompted to add purchase order lines in a separate modal window.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the appropriate permissions are allowed to create a new purchase order. If the user does not have the required access, they will be notified that they do not have permission to create a purchase order.
    </p>
  </div>
);

export default HELP_CreatePOPage;
