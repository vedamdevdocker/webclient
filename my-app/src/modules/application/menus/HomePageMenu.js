import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../utilities/button/behaviorOptions";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import {
  BACKEND_PRODUCT_MODULE_NAME,
  BACKEND_ADMIN_MODULE_NAME,
  BACKEND_COMMON_MODULE_NAME,
  BACKEND_INVENTORY_MODULE_NAME,
  BACKEND_PURCHASE_MODULE_NAME,
  BACKEND_SALES_MODULE_NAME,
  BACKEND_FINANCE_MODULE_NAME,
} from "../../admin/setups/ConstDecl"; // Import your constants

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function HomePageMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path, moduleName) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }

    // Log the menu item click with module name and the current time
    logger.info(`[${new Date().toLocaleTimeString()}] Menu item clicked: ${moduleName}`);
  };

  // Define the menu items with their module names
  const menuItems = [
    { path: "/admin-module", text: "System Admin", moduleName: BACKEND_ADMIN_MODULE_NAME },
    { path: "/common-module", text: "Enterprise Setup", moduleName: BACKEND_COMMON_MODULE_NAME },
    { path: "/products-module", text: "Product Management", moduleName: BACKEND_PRODUCT_MODULE_NAME },
    { path: "/inventory-module", text: "Inventory Control", moduleName: BACKEND_INVENTORY_MODULE_NAME },
    { path: "/purchase-module", text: "Procurement Orders", moduleName: BACKEND_PURCHASE_MODULE_NAME },
    { path: "/sales-module", text: "Sales Operations", moduleName: BACKEND_SALES_MODULE_NAME },
    { path: "/finance-module", text: "Finance Management", moduleName: BACKEND_FINANCE_MODULE_NAME },
    // ... add more menu items here
  ];

  // Log the total number of menu items with the current time
  logger.debug(`[${new Date().toLocaleTimeString()}] Total menu items: ${menuItems.length}`);

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) => {
          // Retrieve permissions for the current module name
          const modulePermissions = ModulePermissions({
            moduleName: item.moduleName,
          });

          // Destructure module permissions
          const {
            canViewModule,
            canCreateModule,
            canDeleteModule,
            canUpdateModule,
          } = modulePermissions;

          // Check if any permissions are granted for the module
          const isModulePermissionGranted =
            canViewModule ||
            canCreateModule ||
            canDeleteModule ||
            canUpdateModule;

          if (isModulePermissionGranted) {
            // Log that module permissions are granted for the current module with the current time
            logger.debug(`[${new Date().toLocaleTimeString()}] Module permissions granted for: ${item.moduleName}`);
          } else {
            // Log that no permissions are granted for the current module with the current time
            logger.warn(`[${new Date().toLocaleTimeString()}] No permissions granted for: ${item.moduleName}`);
          }

          return (
            isModulePermissionGranted && (
              <ButtonComponent
                key={item.path}
                path={item.path}
                buttonText={item.text}
                onClick={() => handleMenuItemClick(item.path, item.moduleName)}
              />
            )
          );
        })}
      </div>
    </div>
  );
}
