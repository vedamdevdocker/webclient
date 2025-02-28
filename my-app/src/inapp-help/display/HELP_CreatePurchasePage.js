import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreatePurchasePage = () => (
  <div>
    <h2 className="subheading">Admin Page Menu Component</h2>
    <p className="indented-paragraph">
      The `Admin Page Menu` component is responsible for rendering a list of menu items based on user permissions.
    </p>
    <h3 className="subheading">Employee Module</h3>
    <p className="indented-paragraph">
      The Employee Module allows users to manage employee-related functionalities.
    </p>
    <h3 className="subheading">Security Module</h3>
    <p className="indented-paragraph">
      The Security Module is responsible for managing user access and permissions.
    </p>
    <h3 className="subheading">Email </h3>
    <p className="indented-paragraph">
      One can view all the emails generated in the system.
    </p>

    {/* Updated section for CreatePurchaseForm */}
    <h3 className="subheading">Create Purchase Order</h3>
    <p className="indented-paragraph">
      The `Create Purchase Order` form allows the admin to create a new purchase order by filling out necessary details such as:
    </p>
    <ul className="indented-list">
      <li>Company: Select the company from the list of available companies.</li>
      <li>Department: Choose the department within the selected company.</li>
      <li>Currency: Choose the currency for the purchase order.</li>
      <li>Tax: Select the applicable tax for the order.</li>
      <li>Partner: Select the partner for this purchase order.</li>
      <li>Invoice Date: Provide the invoice date for the purchase.</li>
      <li>Payment Due Date: Set the due date for payment.</li>
      <li>Payment Terms: Define the payment terms for the invoice.</li>
      <li>Status: Set the initial status for the purchase order.</li>
    </ul>
    <p className="indented-paragraph">
      After submitting the form, the admin can add lines to the purchase order and distribute the invoice across various departments and companies as needed. This process helps streamline the invoicing workflow and manage purchase orders efficiently.
    </p>
  </div>
);

export default HELP_CreatePurchasePage;
