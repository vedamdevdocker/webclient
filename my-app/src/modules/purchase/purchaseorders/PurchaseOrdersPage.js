import React from "react";
import PurchaseOrdersMenu from "./menus/PurchaseOrdersMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function PurchaseOrdersPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] View Purchase orders page is rendering.`);

  return (
    <DisplayCard title="Purchase Order Administration" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <PurchaseOrdersMenu />
        </div>
      </div>
    </DisplayCard>
  );
}