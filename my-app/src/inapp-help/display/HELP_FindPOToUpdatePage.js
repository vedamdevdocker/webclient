import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_FindPOToUpdatePage = () => (
  <div>
    <h2 className="subheading">Find Purchase Order to Update</h2>
    <p className="indented-paragraph">
      The `Find Purchase Order to Update` page allows users to search for a specific purchase order by its purchase order number or its associated Request for Quotation (RFQ) ID. After finding the purchase order, users can navigate to the update form to modify the purchase order details.
    </p>

    <h3 className="subheading">Purchase Order Number</h3>
    <p className="indented-paragraph">
      The `Purchase Order Number` field allows users to enter the unique identifier for the purchase order they want to update. After entering the purchase order number, users can click on the "Update Purchase Order" button to proceed to the update page.
    </p>

    <h3 className="subheading">Request for Quotation (RFQ) ID</h3>
    <p className="indented-paragraph">
      The `Request for Quotation (RFQ) ID` field allows users to optionally enter the ID of the associated RFQ. If users are aware of the RFQ ID, they can input it to narrow down their search for the relevant purchase order.
    </p>

    <h3 className="subheading">Update Purchase Order</h3>
    <p className="indented-paragraph">
      The `Update Purchase Order` button navigates the user to the purchase order update form. The entered `Purchase Order Number` and/or `RFQ ID` will be included in the URL for the update form, allowing users to update the correct purchase order.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Access to this page is controlled by user permissions. Users without the required permissions will see a message indicating they do not have permission to view or update purchase orders.
    </p>
  </div>
);

export default HELP_FindPOToUpdatePage;
