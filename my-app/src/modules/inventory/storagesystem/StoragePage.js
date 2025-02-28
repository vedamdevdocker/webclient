import React from "react";
import StorageMenu from "./menus/StorageMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function StoragePage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] StorageMenu are rendering.`);

  return (
    <DisplayCard title="Storage Area Administration" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <StorageMenu />
        </div>
      </div>
    </DisplayCard>
  );
}