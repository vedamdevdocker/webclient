import React from "react";
import HandlingMenu from "./menus/HandlingMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function HandlingPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Inventory Handling.`);

  return (
    <DisplayCard title="Stock Handling" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <HandlingMenu />
        </div>
      </div>
    </DisplayCard>
  );
}