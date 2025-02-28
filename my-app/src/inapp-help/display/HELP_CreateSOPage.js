import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateSOPage = () => (
  <div>
    <h2 className="subheading">Create Sales Order Page</h2>
    <p className="indented-paragraph">
      The `Create Sales Order` page allows users to create a new sales order header, filling out necessary information like company, department, customer, payment terms, shipping details, and more.
    </p>
    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The form includes multiple fields such as:
      <ul>
        <li><strong>Company</strong>: Select the company for which the sales order is being created.</li>
        <li><strong>Department</strong>: Choose the department associated with the order.</li>
        <li><strong>Customer</strong>: Select the customer for the sales order.</li>
        <li><strong>Currency</strong>: Specify the currency used in the order.</li>
        <li><strong>Tax Code</strong>: Choose the appropriate tax code for the order.</li>
        <li><strong>Status</strong>: Set the order status (e.g., pending, completed).</li>
        <li><strong>Payment Terms</strong>: Define the payment terms (e.g., Net 30, due on receipt).</li>
        <li><strong>Shipping Method</strong>: Choose the shipping method for delivering goods.</li>
        <li><strong>Billing and Shipping Address</strong>: Provide the billing and shipping addresses for the order.</li>
      </ul>
    </p>
    <h3 className="subheading">Success Message</h3>
    <p className="indented-paragraph">
      After successfully submitting the form, a confirmation message will appear with the details of the created sales order, including the sales order number and status.
    </p>
    <h3 className="subheading">Sales Order Lines</h3>
    <p className="indented-paragraph">
      Upon creating the sales order header, you can proceed to add sales order lines (items) through a modal window. This step involves adding products or services associated with the sales order.
    </p>
    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the required permissions will be able to create a sales order. Ensure that you have the necessary access rights to create and manage sales orders.
    </p>
  </div>
);

export default HELP_CreateSOPage;
