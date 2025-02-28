import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SalesPage = () => (
  <div>
    <h2 className="subheading">Sales Orders Menu Help</h2>
    <p className="indented-paragraph">
      The `Sales Orders Menu` component allows users to navigate through different options related to sales orders. The available options depend on the user's permissions for the Sales module.
    </p>

    <h3 className="subheading">Create SO</h3>
    <p className="indented-paragraph">
      The "Create SO" option allows users with the appropriate permissions to create a new sales order. If you have the "Create" permission for the Sales module, you will be able to access this functionality.
    </p>

    <h3 className="subheading">Delete SO</h3>
    <p className="indented-paragraph">
      The "Delete SO" option enables users with the necessary permissions to delete an existing sales order. Only users with the "Delete" permission will see and be able to use this option.
    </p>

    <h3 className="subheading">Modify SO</h3>
    <p className="indented-paragraph">
      The "Modify SO" option allows users to modify an existing sales order. This option is available only to users who have the "Update" permission for the Sales module.
    </p>

    <h3 className="subheading">View SOs</h3>
    <p className="indented-paragraph">
      The "View SOs" option allows users to view the list of existing sales orders. Users with the "View" permission for the Sales module can access this functionality.
    </p>

    <h3 className="subheading">Permissions and Access</h3>
    <p className="indented-paragraph">
      The visibility of each menu item is controlled by the user's permissions within the Sales module. Depending on your access level, you may or may not see certain menu options:
      <ul>
        <li><strong>Create:</strong> Permission to create a new sales order.</li>
        <li><strong>Delete:</strong> Permission to delete an existing sales order.</li>
        <li><strong>Update:</strong> Permission to modify an existing sales order.</li>
        <li><strong>View:</strong> Permission to view sales orders.</li>
      </ul>
    </p>

    <h3 className="subheading">Behavior of Menu Items</h3>
    <p className="indented-paragraph">
      When you click on a menu item, the behavior will depend on the module settings. Some actions may open in a new tab (if configured to do so), while others will navigate to the corresponding page within the same tab.
    </p>
  </div>
);

export default HELP_SalesPage;
