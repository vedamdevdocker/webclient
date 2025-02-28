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

export default function BOMMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const { canViewModule, canCreateModule ,canUpdateModule} = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME,
  });

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      logger.info(`[${new Date().toLocaleTimeString()}] Opening ${path} in a new tab.`);
      openInNewTab(path);
    } else {
      logger.info(`[${new Date().toLocaleTimeString()}] Navigating to ${path}.`);
      navigate(path);
    }
  };

  const menuItems = [
    { path: "/bom-explosion", text: "Explode BOM", canRender: canViewModule },
    { path: "/bom", text: "View BOM", canRender: canViewModule },
    { path: "/create-bom", text: "Create BOM", canRender: canCreateModule },
    { path: "/update-bom", text: "Update BOM", canRender: canUpdateModule },
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
                logger.info(`[${new Date().toLocaleTimeString()}] Clicked on menu item: ${item.text}`);
                handleMenuItemClick(item.path);
              }}
            />
          )
        ))}
      </div>
    </div>
  );
}
