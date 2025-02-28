import "../../modules/utilities/css/appcss.css";
import React from "react";

const HELP_HomePageMenu = () => (
  <div>
    <h2 className="subheading">Welcome Page</h2>
    <p className="indented-paragraph">
      The `Welcome Page` component is responsible for rendering a list of available modules within the system. It displays the menu options that users can access, depending on their permissions.
    </p>

    <h3 className="subheading">System Admin</h3>
    <p className="indented-paragraph">
      The `System Admin` module allows administrators to manage users, roles, and system-wide configurations. This includes creating employees, user IDs, and setting up permissions.
    </p>

    <h3 className="subheading">Enterprise Setup</h3>
    <p className="indented-paragraph">
      The `Enterprise Setup` module is used for managing items shared across all other modules, such as tax codes, exchange rates, business partners, currencies, and bill of materials.
    </p>

    <h3 className="subheading">Product Management</h3>
    <p className="indented-paragraph">
      The `Product Management` module allows users to create and manage products and product categories, facilitating inventory and sales management.
    </p>

    <h3 className="subheading">Inventory Control</h3>
    <p className="indented-paragraph">
      The `Inventory Control` module enables users to manage inventory processes, including receiving and distributing materials, as well as performing cycle counts.
    </p>

    <h3 className="subheading">Procurement Orders</h3>
    <p className="indented-paragraph">
      The `Procurement Orders` module allows users to create purchase requisitions and generate purchase orders, streamlining the procurement process.
    </p>

    <h3 className="subheading">Sales Operations</h3>
    <p className="indented-paragraph">
      The `Sales Operations` module enables users to create and manage sales orders, which are integral for processing customer orders and shipments.
    </p>

    <h3 className="subheading">Finance Management</h3>
    <p className="indented-paragraph">
      The `Finance Management` module is used to create financial transactions, including sales invoices, purchase invoices, and other accounting activities.
    </p>

    <p className="indented-paragraph">
      Each menu item in the `Welcome Page` is linked to a specific module. Access to these modules is controlled by user permissions, ensuring that only authorized users can access and perform actions within each module.
    </p>
  </div>
);

export default HELP_HomePageMenu;
