import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_PickReleasePage = () => (
  <div>
    <h2 className="subheading">Pick Release Help</h2>
    <p className="indented-paragraph">
      The Pick Release form allows users to process pick releases based on selected sales orders, inventory IDs, and their statuses. Below is a breakdown of the fields in the form and what they represent.
    </p>

    <h3 className="subheading">Sales Orders</h3>
    <p className="indented-paragraph">
      Enter one or more sales order numbers, separated by commas. These are the orders that will be processed for the pick release. For example: `SO12345,SO12346,SO12347`.
    </p>

    <h3 className="subheading">Look Only Inventory IDs</h3>
    <p className="indented-paragraph">
      Enter a list of inventory IDs, separated by commas, to restrict the pick release process to only those inventory items. For example: `INV001,INV002,INV003`. Leave blank if you want to include all inventory.
    </p>

    <h3 className="subheading">Sales Order Status</h3>
    <p className="indented-paragraph">
      The system will automatically assign the sales order status based on predefined values. This status is typically used to filter or process orders in different states, such as `Pending`, `In Progress`, etc. You do not need to manually enter this field unless instructed to.
    </p>

    <h3 className="subheading">Submit Button</h3>
    <p className="indented-paragraph">
      Once you've filled in the necessary fields, click the 'Submit' button to initiate the pick release process. A success message will appear if the operation completes successfully. If there is an error, an error message will show up with the details.
    </p>

    <h3 className="subheading">Success and Error Messages</h3>
    <p className="indented-paragraph">
      After submission, you will see a success message if the pick release was processed correctly. In case of any issues, an error message will appear, indicating what went wrong (e.g., invalid data or server errors).
    </p>
  </div>
);

export default HELP_PickReleasePage;
