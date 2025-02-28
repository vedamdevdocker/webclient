import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdatePurchaseOrderHeaderPage = () => (
  <div>
    <h2 className="subheading">Update Purchase Order Header</h2>
    <p className="indented-paragraph">
      The `Update Purchase Order Header` page allows users to update the details of an existing purchase order.
      It includes fields to modify essential information such as the PO number, company, department, supplier, currency,
      tax code, status, and other relevant details.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The form includes the following fields to be updated:
    </p>
    <ul>
      <li><strong>PO Number:</strong> The unique identifier for the purchase order. This field is read-only and cannot be changed.</li>
      <li><strong>Company Name:</strong> Select the company associated with this purchase order.</li>
      <li><strong>Department:</strong> Select the department responsible for the purchase order.</li>
      <li><strong>Order Date:</strong> Select the date when the purchase order was created.</li>
      <li><strong>Supplier:</strong> Select the supplier for this order from the list of available partners.</li>
      <li><strong>Currency:</strong> Choose the currency in which the purchase order is denominated.</li>
      <li><strong>Tax Code:</strong> Select the applicable tax code for the purchase order.</li>
      <li><strong>Total Amount:</strong> The total value of the purchase order, which is read-only and displayed for informational purposes.</li>
      <li><strong>Status:</strong> Update the status of the purchase order (e.g., Open, Closed, etc.).</li>
    </ul>

    <h3 className="subheading">Modal for Line Items</h3>
    <p className="indented-paragraph">
      Users can also update the line items of the purchase order by clicking on the "Lines" button. This will open a modal
      window where users can modify the individual items within the purchase order.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      After making the necessary updates to the purchase order, click the "Submit" button to save the changes. If the form
      is valid and changes are made, the updated purchase order will be saved, and a success message will be displayed.
    </p>

    <h3 className="subheading">Access Control</h3>
    <p className="indented-paragraph">
      Only users with the required permissions can access this page and make updates to the purchase order headers.
    </p>
  </div>
);

export default HELP_UpdatePurchaseOrderHeaderPage;
