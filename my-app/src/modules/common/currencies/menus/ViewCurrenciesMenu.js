import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_COMMON_MODULE_NAME } from "../../../admin/setups/ConstDecl";

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";

export default function ViewCurrenciesMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  // Log tokens, userId, and other constants
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  logger.info(`[${new Date().toLocaleTimeString()}] Token: ${token}, UserId: ${userId}, ModuleName: ${BACKEND_COMMON_MODULE_NAME}`);

  const { canViewModule,canCreateModule } = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME,
  });

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
    // Log a message when a menu item is clicked
    logger.info(`[${new Date().toLocaleTimeString()}] Menu item clicked: ${path}`);
  };

  const menuItems = [
    { path: "/list-currencies", text: "View Currencies", canRender: canViewModule },
    { path: "/create-currencies", text: "Create Currencies", canRender: canCreateModule },
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
              onClick={() => handleMenuItemClick(item.path)}
            />
          )
        ))}
      </div>
    </div>
  );
}
