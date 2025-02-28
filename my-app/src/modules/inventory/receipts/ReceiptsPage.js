import React from "react";
import ReceiptsMenu from "./menus/ReceiptsMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function ReceiptsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Receipts are rendering.`);

  return (
    <DisplayCard title="Manage Receipts" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <ReceiptsMenu />
        </div>
      </div>
    </DisplayCard>
  );
}