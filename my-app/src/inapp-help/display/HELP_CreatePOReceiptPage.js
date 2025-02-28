import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreatePOReceiptPage = () => (
  <div>
    <h2 className="subheading">Create Purchase Order Receipt</h2>
    <p className="indented-paragraph">
      The `Create PO Receipt` page allows users to create a receipt for a purchase order in the system. This involves selecting a transaction, item, and specifying the quantity received, unit of measure, status, and receiving location.
    </p>

    <h3 className="subheading">PO Number</h3>
    <p className="indented-paragraph">
      The PO Number field allows you to select the purchase order you are processing a receipt for. Once selected, the items and lines associated with the PO will be available for further processing.
    </p>

    <h3 className="subheading">Item</h3>
    <p className="indented-paragraph">
      The Item field lets you choose the specific item from the selected PO line. The system will auto-populate details like quantity and unit of measure based on the selected item.
    </p>

    <h3 className="subheading">Quantity</h3>
    <p className="indented-paragraph">
      This field shows the quantity for the selected item, which is typically pre-filled based on the selected PO line. This value is read-only and cannot be changed directly on the form.
    </p>

    <h3 className="subheading">Unit of Measure (UOM)</h3>
    <p className="indented-paragraph">
      The Unit of Measure field displays the measurement unit for the selected item. It is automatically populated based on the selected item from the PO.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      The Status field lets you select the current status of the receipt. If the status is set to "To Inspect," you will be required to select an inspection location and check the "Inspect" checkbox.
    </p>

    <h3 className="subheading">Receiving Location</h3>
    <p className="indented-paragraph">
      The Receiving Location field lets you select the location where the goods are being received. This is essential to track inventory and manage the receipt effectively.
    </p>

    <h3 className="subheading">Inspect</h3>
    <p className="indented-paragraph">
      If the status is "To Inspect," this checkbox needs to be selected to indicate that the goods will undergo inspection before being processed further.
    </p>

    <h3 className="subheading">Inspection Location</h3>
    <p className="indented-paragraph">
      The Inspection Location field allows you to choose the specific location where the inspection of the goods will take place. This is required when the status is set to "To Inspect."
    </p>

    <h3 className="subheading">Comments</h3>
    <p className="indented-paragraph">
      The Comments field lets you enter any additional information about the receipt, such as batch numbers or serial number ranges.
    </p>

    <h3 className="subheading">Submit Button</h3>
    <p className="indented-paragraph">
      Once all the necessary fields are completed, click the "Create Receipt" button to submit the form and create a new receipt for the purchase order.
    </p>
  </div>
);

export default HELP_CreatePOReceiptPage;
