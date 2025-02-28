import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent"; // Import the new ButtonComponent
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions"; // Import the ModulePermissions hook
import { BACKEND_COMMON_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants// Import your constants
import logger from "../../../utilities/Logs/logger"; // Import your logger utility here

export default function ViewTaxCodesMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  //  const { canViewModule, canCreateModule, canDeleteModule, canUpdateModule } =
  const { canViewModule , canCreateModule} = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME, // Set the module name as needed
  });

  const handleMenuItemClick = (path, canRender) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }

    // Log relevant variables and constants when a menu item is clicked
    logger.info(`[${new Date().toLocaleTimeString()}] Clicked Menu Item: Path - ${path}, Can Render - ${canRender}`);
    logger.info(`[${new Date().toLocaleTimeString()}] Module Name: ${BACKEND_COMMON_MODULE_NAME}`);
  };

  const menuItems = [
    { path: "/list-tax-codes", text: "View Tax Codes", canRender: canViewModule }, // Add the "canRender" property
    { path: "/create-tax-codes", text: "Create Tax Codes", canRender: canCreateModule }, // Add the "canRender" property
    { path: "/search-default-taxcodes", text: "Get Default Tax Codes", canRender: canViewModule },
    { path: "/create-default-taxcodes", text: "Create Default Tax Codes", canRender: canCreateModule },
    // ... add more menu items here
  ];

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) => (
          item.canRender && (
            <ButtonComponent
              key={item.path}
              path={item.path}
              buttonText={item.text}
              onClick={() => handleMenuItemClick(item.path, item.canRender)}
            />
          )
        ))}
      </div>
    </div>
  );
}
