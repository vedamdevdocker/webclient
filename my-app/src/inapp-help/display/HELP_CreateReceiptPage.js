import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateReceiptPage = () => (
  <div>
    <h2 className="subheading">Create Receipt</h2>
    <p className="indented-paragraph">
      The `Create Receipt Form` allows users to input information for creating a new receipt in the system. It includes necessary fields such as the transaction number, item details, quantity, status, and more.
    </p>

    <h3 className="subheading">Transaction Number</h3>
    <p className="indented-paragraph">
      This field is automatically generated when the form loads. It represents a unique identifier for the receipt transaction. The number is displayed and cannot be edited.
    </p>

    <h3 className="subheading">Item</h3>
    <p className="indented-paragraph">
      Select the item associated with the receipt from the dropdown list. The items are fetched from the system, and you can choose the relevant one based on the receipt type.
    </p>

    <h3 className="subheading">Quantity</h3>
    <p className="indented-paragraph">
      Enter the quantity of the item being received. This should be a numeric value representing the amount of the item in the receipt.
    </p>

    <h3 className="subheading">Unit of Measure (UOM)</h3>
    <p className="indented-paragraph">
      Select the unit of measure (UOM) for the item from the dropdown list. It represents the unit in which the quantity is measured, such as kilograms, liters, etc.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      Choose the status of the receipt from the available options. If you select "To Inspect", the system will prompt you to check the "Inspect" checkbox and select an inspection location.
    </p>

    <h3 className="subheading">Inspect</h3>
    <p className="indented-paragraph">
      Check the "Inspect" checkbox if the receipt requires inspection. This will enable additional fields to select the inspection location. This is mandatory if the receipt status is "To Inspect".
    </p>

    <h3 className="subheading">Receiving Location</h3>
    <p className="indented-paragraph">
      Select the location where the item will be received. If the status is "To Inspect", this field may be cleared, and the "Inspection Location" will become active instead.
    </p>

    <h3 className="subheading">Inspection Location</h3>
    <p className="indented-paragraph">
      If the receipt is marked as "To Inspect", you must select an inspection location from the list. This specifies where the item will be inspected before it can be accepted.
    </p>

    <h3 className="subheading">Comments</h3>
    <p className="indented-paragraph">
      You can enter any additional comments or notes related to the receipt. For example, details about batch numbers or serial numbers may be included here.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      After filling in the necessary information, click the "Create Receipt" button to submit the form and create the receipt. Upon successful submission, a confirmation message will be displayed.
    </p>

    <h3 className="subheading">Permission</h3>
    <p className="indented-paragraph">
      Users need appropriate permissions to access and use the Create Receipt Form. Ensure proper module-level access is granted for the user to proceed with receipt creation.
    </p>
  </div>
);

export default HELP_CreateReceiptPage;
