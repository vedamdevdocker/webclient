import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../../utilities/button/behaviorOptions";
import ButtonComponent from "../../../utilities/ButtonComponent";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { BACKEND_PRODUCT_MODULE_NAME } from "../../../admin/setups/ConstDecl"; // Import your constants
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

export default function PurchaseInvoiceMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const ProductPermissions = ModulePermissions({ moduleName: BACKEND_PRODUCT_MODULE_NAME });
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } = ProductPermissions;

  const menuItems = [
    { path: "/create-purchase-invoice", text: "New Invoice", canRender: canCreateModule },
    { path: "/delete-purchase-invoice", text: "Delete Invoice", canRender: canDeleteModule },
    { path: "/update-purchase-invoices", text: "Update", canRender: canUpdateModule },
    { path: "/search-purchase-invoices", text: "Get Invoices", canRender: canViewModule },
    { path: "/auto-create-purchase-invoices", text: "Auto Create Invoice", canRender: canViewModule },
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
  logger.info(`[${new Date().toLocaleTimeString()}] PurchaseMenu component is rendering.`);

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
