import React from "react";
import JournalMenu from "./menus/JournalMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function JournalPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Journal is rendering.`);

  return (
    <DisplayCard title="Manage Journal Entries" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <JournalMenu />
        </div>
      </div>
    </DisplayCard>
  );
}