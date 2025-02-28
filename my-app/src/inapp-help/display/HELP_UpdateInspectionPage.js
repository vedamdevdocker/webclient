import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateInspectionForm = () => (
  <div>
    <h2 className="subheading">Perform Inspection Form</h2>
    <p className="indented-paragraph">
      The `Perform Inspection Form` allows users to perform inspections by selecting transaction types,
      transaction numbers, and reviewing and updating inspection details. This form is used for updating
      the inspection status and other associated details.
    </p>

    <h3 className="subheading">Transaction Type</h3>
    <p className="indented-paragraph">
      This field allows the user to select the type of transaction for the inspection. The available
      transaction types are fetched dynamically based on the inspections available in the system.
    </p>

    <h3 className="subheading">Transaction Number</h3>
    <p className="indented-paragraph">
      Once a transaction type is selected, this dropdown will populate with available transaction numbers
      for the inspection. Select the relevant transaction number to update its inspection details.
    </p>

    <h3 className="subheading">Inspection Name</h3>
    <p className="indented-paragraph">
      Enter the name of the inspection. This will be used to label the inspection performed for a
      particular transaction.
    </p>

    <h3 className="subheading">Item Code</h3>
    <p className="indented-paragraph">
      Displays the item code for the product or service being inspected. This field is read-only and will
      be pre-filled based on the selected transaction number.
    </p>

    <h3 className="subheading">Location Name</h3>
    <p className="indented-paragraph">
      The location of the inspection. This field is read-only and will be pre-filled based on the selected
      transaction number.
    </p>

    <h3 className="subheading">Transaction Quantity</h3>
    <p className="indented-paragraph">
      The total quantity of the transaction. This field is read-only and will be pre-filled based on the
      selected transaction number.
    </p>

    <h3 className="subheading">Accepted Quantity</h3>
    <p className="indented-paragraph">
      Enter the quantity that is accepted in the inspection. This will be updated after performing the
      inspection.
    </p>

    <h3 className="subheading">Rejected Quantity</h3>
    <p className="indented-paragraph">
      Enter the quantity that was rejected during the inspection. This will be updated after performing the
      inspection.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      Select the status of the inspection (e.g., "Pending", "Completed"). This field is essential for tracking
      the current state of the inspection.
    </p>

    <h3 className="subheading">Unit of Measure (UOM)</h3>
    <p className="indented-paragraph">
      Displays the unit of measure associated with the inspected item. This field is read-only and will
      be pre-filled based on the selected transaction.
    </p>

    <h3 className="subheading">Accepted Quantity Details</h3>
    <p className="indented-paragraph">
      Provides a detailed breakdown of the accepted quantity. You can enter additional information as needed
      to explain the accepted quantity.
    </p>

    <h3 className="subheading">Rejected Quantity Details</h3>
    <p className="indented-paragraph">
      Provides a detailed breakdown of the rejected quantity. You can enter additional information as needed
      to explain the rejected quantity.
    </p>

    <h3 className="subheading">Comments</h3>
    <p className="indented-paragraph">
      This field allows you to enter comments or additional information related to the inspection.
      For example, batch numbers or any other relevant details.
    </p>
  </div>
);

export default HELP_UpdateInspectionForm;
