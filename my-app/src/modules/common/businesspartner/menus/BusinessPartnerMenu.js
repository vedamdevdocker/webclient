import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_COMMON_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";

export default function BusinessPartnerMenu() {
  const { canViewModule, canCreateModule } = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME,
  });
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
      logger.info(`[${new Date().toLocaleTimeString()}] Opened path ${path} in a new tab.`);
    } else {
      navigate(path);
      logger.info(`[${new Date().toLocaleTimeString()}] Navigated to path ${path}.`);
    }
  };

  const menuItems = [
    { path: "/list-businesspartners", text: "List Business Partners", canRender: canViewModule },
    { path: "/create-businesspartner", text: "Create Business Partner", canRender: canCreateModule },
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
              onClick={() => {
                handleMenuItemClick(item.path);
                logger.info(`[${new Date().toLocaleTimeString()}] Clicked on menu item: ${item.text}`);
              }}
            />
          )
        ))}
      </div>
    </div>
  );
}
