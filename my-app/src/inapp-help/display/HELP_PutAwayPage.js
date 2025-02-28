import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_PutAwayPage = () => (
  <div>
    <h2 className="subheading">Put Away Inventory Form</h2>
    <p className="indented-paragraph">
      The Put Away Inventory Form allows users to perform put-away operations for received items or inspected items.
    </p>

    <h3 className="subheading">Transaction Type</h3>
    <p className="indented-paragraph">
      Select the type of transaction you want to perform put-away for, either "Receipts" or "Inspections."
    </p>

    <h3 className="subheading">Transaction Number</h3>
    <p className="indented-paragraph">
      Choose a specific transaction by selecting its corresponding number. The available transactions will depend on the chosen transaction type.
    </p>

    <h3 className="subheading">Item Details</h3>
    <p className="indented-paragraph">
      The form displays details of the selected item, including its name, location, quantity, unit of measure (UOM), and additional information.
    </p>

    <h3 className="subheading">Target Bin</h3>
    <p className="indented-paragraph">
      Choose the target bin for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Target Rack</h3>
    <p className="indented-paragraph">
      Choose the target rack for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Target Row</h3>
    <p className="indented-paragraph">
      Choose the target row for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Target Aisle</h3>
    <p className="indented-paragraph">
      Choose the target aisle for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Target Zone</h3>
    <p className="indented-paragraph">
      Choose the target zone for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Target Location</h3>
    <p className="indented-paragraph">
      Choose the target location for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Target Warehouse</h3>
    <p className="indented-paragraph">
      Choose the target warehouse for the put-away operation from the available list.
    </p>

    <h3 className="subheading">Additional Information</h3>
    <p className="indented-paragraph">
      Provide any additional information related to the put-away operation in the designated field.
    </p>

    <h3 className="subheading">Submit</h3>
    <p className="indented-paragraph">
      Click the "Put Away" button to submit the form and execute the put-away operation. Upon success, a success message will be displayed.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      - Ensure that the selected transaction and target location details are accurate before submitting the form.
      <br />
      - Users must have the necessary permissions to perform put-away operations.
    </p>
  </div>

);

export default HELP_PutAwayPage;
