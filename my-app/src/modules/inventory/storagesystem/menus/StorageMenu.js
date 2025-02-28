import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_PRODUCT_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

export default function StorageMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const ProductPermissions = ModulePermissions({ moduleName: BACKEND_PRODUCT_MODULE_NAME });
  // eslint-disable-next-line
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } = ProductPermissions;

  const menuItems = [
    { path: "/create-warehouses", text: "Create Warehouses", canRender: canCreateModule },
    { path: "/create-locations", text: "Create Locations", canRender: canCreateModule },
    { path: "/create-zones", text: "Create Zones", canRender: canCreateModule },
    { path: "/create-aisles", text: "Create Aisles", canRender: canCreateModule },
    { path: "/create-rows", text: "Create Rows", canRender: canCreateModule },
    { path: "/create-racks", text: "Create Racks", canRender: canCreateModule },
    { path: "/create-bins", text: "Create Bins", canRender: canCreateModule },
    { path: "/get-bins", text: "Get Bins", canRender: canViewModule },
  ];

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
      // Log the action of opening a new tab with timestamp
      logger.debug(`[${new Date().toLocaleTimeString()}] Opened tab: ${path}`);
    } else {
      navigate(path);
      // Log the navigation action with timestamp
      logger.info(`[${new Date().toLocaleTimeString()}] Navigated to: ${path}`);
    }
  };

  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] StorageMenu component is rendering.`);

  return (
    <div className="menu-list">
      {menuItems.map((item) =>
        item.canRender && (
          <ButtonComponent
            key={item.path}
            path={item.path}
            buttonText={item.text}
            onClick={() => {
              handleMenuItemClick(item.path);
              // Log the button click action with timestamp
              logger.info(`[${new Date().toLocaleTimeString()}] Clicked button: ${item.text}`);
            }}
          />
        )
      )}
    </div>
  );
}
