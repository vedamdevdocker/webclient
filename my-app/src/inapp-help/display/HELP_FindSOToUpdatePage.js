import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_FindSOToUpdatePage = () => (
  <div>
    <h2 className="subheading">Find Sales Order to Update</h2>
    <p className="indented-paragraph">
      The `Find Sales Order to Update` page allows users to search for a specific sales order by its sales order number or its associated Request for Quotation (RFQ) ID. Once the relevant sales order is found, users can proceed to the update form to modify the sales order details.
    </p>

    <h3 className="subheading">Sales Order Number</h3>
    <p className="indented-paragraph">
      The `Sales Order Number` field allows users to enter the unique identifier for the sales order they want to update. After entering the sales order number, users can click on the "Update Sales Order" button to navigate to the update form for that sales order.
    </p>

    <h3 className="subheading">Request for Quotation (RFQ) ID</h3>
    <p className="indented-paragraph">
      The `Request for Quotation (RFQ) ID` field allows users to optionally enter the ID of the associated RFQ. This can be helpful if users are working with RFQs and need to find a sales order linked to a specific RFQ.
    </p>

    <h3 className="subheading">Update Sales Order</h3>
    <p className="indented-paragraph">
      The `Update Sales Order` button navigates the user to the sales order update form. The entered `Sales Order Number` and/or `RFQ ID` are passed in the URL to ensure the correct sales order is updated.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Access to this page is permission-controlled. Users without the necessary permissions will see a message indicating they are not authorized to view or update sales orders.
    </p>
  </div>
);

export default HELP_FindSOToUpdatePage;
