import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_PurchaseOrdersSearchPage = () => (
  <div>
    <h2 className="subheading">Purchase Orders Forms</h2>

    <h3 className="subheading">Purchase Orders Search Form</h3>
    <p className="indented-paragraph">
      The `Purchase Orders Search Form` component provides a user interface for searching and filtering purchase orders based on various criteria.
    </p>

    <h3 className="subheading">Search Criteria</h3>
    <p className="indented-paragraph">
      The form includes the following search criteria fields:
    </p>
    <ul>
      <li><strong>Company:</strong> Select the company for the purchase orders.</li>
      <li><strong>Header ID:</strong> Enter the header ID for the purchase order.</li>
      <li><strong>PO Number:</strong> Enter the PO number for the purchase order.</li>
      <li><strong>Department:</strong> Select the department associated with the purchase order.</li>
      <li><strong>Supplier:</strong> Select the supplier for the purchase order.</li>
      <li><strong>Tax Code:</strong> Select the tax code associated with the purchase order.</li>
      <li><strong>Currency:</strong> Select the currency for the purchase order.</li>
    </ul>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      The component checks the user's permissions using the `CheckModuleAccess` function to determine if the user has the required access level to view the module.
    </p>

    <hr />

    <h3 className="subheading">View Purchase Orders Form</h3>
    <p className="indented-paragraph">
      The `View Purchase Orders Form` component displays a list of purchase orders and allows the user to view detailed information, including order lines.
    </p>

    <h3 className="subheading">List Display</h3>
    <p className="indented-paragraph">
      The component renders a table displaying the following purchase order details:
    </p>
    <ul>
      <li><strong>PO Number</strong></li>
      <li><strong>Department</strong></li>
      <li><strong>Status</strong></li>
      <li><strong>Supplier Name</strong></li>
      <li><strong>Currency Code</strong></li>
      <li><strong>Tax Code</strong></li>
      <li><strong>Created Date</strong></li>
    </ul>

    <h3 className="subheading">Order Lines Modal</h3>
    <p className="indented-paragraph">
      Clicking the "Order Lines" button opens a modal displaying detailed order lines information. The modal adjusts its size based on the number of lines.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      The component checks the user's permissions using the `CheckModuleAccess` function to determine if the user has the required access level to view the module.
    </p>
  </div>
);

export default HELP_PurchaseOrdersSearchPage;
