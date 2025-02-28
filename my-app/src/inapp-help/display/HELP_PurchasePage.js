import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_PurchasePage = () => (
  <div>
    <h2 className="subheading">Purchase Orders Menu Component</h2>
    <p className="indented-paragraph">
      The `Purchase Orders Menu` component is responsible for rendering a list of menu items based on user permissions. It facilitates navigation and actions related to purchase orders.
    </p>

    <h3 className="subheading">Menu Items</h3>
    <p className="indented-paragraph">
      The component defines a set of menu items, each associated with a specific path and user permission. The menu items include:
    </p>
    <ul>
      <li><strong>Create Purcahse order:</strong> Allows users to create a new purchase order. (Visible if user has create permissions.)</li>
      <li><strong>Delete Purcahse order:</strong> Allows users to delete a purchase order. (Visible if user has delete permissions.)</li>
      <li><strong>Modify Purcahse order:</strong> Allows users to update or modify an existing purchase order. (Visible if user has update permissions.)</li>
      <li><strong>View Purcahse orders:</strong> Allows users to view a list of purchase orders. (Visible if user has view permissions.)</li>
    </ul>

    <h3 className="subheading">Actions</h3>
    <p className="indented-paragraph">
      The component handles button clicks for each menu item. If the specified behavior is to open in a new tab, it logs the action with a timestamp using the logger module. If the behavior is to navigate within the application, it logs the navigation action with a timestamp.
    </p>

    <h3 className="subheading">Logging</h3>
    <p className="indented-paragraph">
      The component logs its rendering with a timestamp, and each button click or tab opening action is logged with the corresponding timestamp.
    </p>
  </div>
);

export default HELP_PurchasePage;
