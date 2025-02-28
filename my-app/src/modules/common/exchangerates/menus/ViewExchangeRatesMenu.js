import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import logger from "../../../utilities/Logs/logger"; // Import your logger utility here
import { BACKEND_COMMON_MODULE_NAME } from "../../../admin/setups/ConstDecl";

export default function ViewExchangeRatesMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const { canViewModule,canCreateModule } = ModulePermissions({
    moduleName: BACKEND_COMMON_MODULE_NAME,
  });

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }
  };

  const menuItems = [
    { path: "/list-exchange-rates", text: "View Rates", canRender: canViewModule },
    { path: "/create-exchange-rates", text: "Create Exchange Rates", canRender: canCreateModule },
    // ... add more menu items here
  ];

  // Log constants and permissions with time
  const moduleName = BACKEND_COMMON_MODULE_NAME;
  const permissions = {
    canViewModule,
    // ... add other permissions here
  };
  logger.info(`[${new Date().toLocaleTimeString()}] Module Name: ${moduleName}, Permissions: ${JSON.stringify(permissions)}`);

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
