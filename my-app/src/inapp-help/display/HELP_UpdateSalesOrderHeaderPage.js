import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateSalesOrderHeaderPage = () => (
  <div>
    <h2 className="subheading">Sales Order Header Update Help</h2>
    <p className="indented-paragraph">
      The `Sales Order Header Update` form allows users to update the details of an existing sales order. The form includes fields for key information such as company, customer, tax codes, and more.
    </p>

    <h3 className="subheading">Form Overview</h3>
    <p className="indented-paragraph">
      The form is designed to allow the admin or authorized users to modify specific fields of a sales order, including:
    </p>
    <ul className="indented-paragraph">
      <li><strong>SO Number</strong>: This field is read-only and displays the unique identifier for the sales order.</li>
      <li><strong>Company Name</strong>: Select the associated company for the sales order.</li>
      <li><strong>Department</strong>: Choose the department associated with the order.</li>
      <li><strong>Order Date</strong>: Update the date for the sales order.</li>
      <li><strong>Customer</strong>: Choose the customer linked to the order.</li>
      <li><strong>Currency</strong>: Select the currency in which the order is priced.</li>
      <li><strong>Tax Code</strong>: Choose the appropriate tax code for the order.</li>
      <li><strong>Total Amount</strong>: This field is read-only and displays the calculated total amount of the sales order.</li>
      <li><strong>Status</strong>: Select the current status of the sales order (e.g., pending, approved).</li>
      <li><strong>Payment Terms</strong>: Define the payment terms for the sales order.</li>
      <li><strong>Shipping Method</strong>: Enter the method of shipment for the order.</li>
      <li><strong>Billing Address</strong>: Update the billing address for the customer.</li>
      <li><strong>Shipping Address</strong>: Update the shipping address for the customer.</li>
      <li><strong>Rep ID</strong>: Optionally add the ID of the representative handling the order.</li>
      <li><strong>Comments</strong>: Include any additional comments related to the sales order.</li>
    </ul>

    <h3 className="subheading">Key Actions</h3>
    <p className="indented-paragraph">
      Once all fields are filled out, you can take the following actions:
    </p>
    <ul className="indented-paragraph">
      <li><strong>Submit</strong>: Click the "Submit" button to save the changes made to the sales order header. This button is disabled if the form is not dirty (i.e., no changes have been made) or if the form has already been submitted.</li>
      <li><strong>Lines</strong>: If you need to update the lines of the sales order (items, quantities, etc.), click the "Lines" button to open a modal where you can make changes to individual line items. The "Lines" button is disabled until the form is either submitted or edited.</li>
    </ul>

    <h3 className="subheading">Permissions and Access</h3>
    <p className="indented-paragraph">
      To access the sales order update form, users must have the necessary permissions. If you do not have the required access, a message will appear stating that you do not have access to this module.
    </p>

    <h3 className="subheading">Troubleshooting</h3>
    <p className="indented-paragraph">
      If you encounter any issues while updating the sales order header, please ensure:
    </p>
    <ul className="indented-paragraph">
      <li>You have the required permissions to access the form.</li>
      <li>All required fields (e.g., Company Name, Customer, Order Date) are filled out correctly.</li>
      <li>There are no errors or validation issues in the form before submitting.</li>
    </ul>
  </div>
);

export default HELP_UpdateSalesOrderHeaderPage;
