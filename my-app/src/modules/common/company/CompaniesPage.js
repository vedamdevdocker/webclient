import React from "react";
import CompaniesMenu from "./menus/CompaniesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function CompaniesPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] Company component is rendering.`);

  return (
    <DisplayCard title="Manage Companies" color="#FFD799">
      <div className="menu-list">
        <CompaniesMenu />
      </div>
    </DisplayCard>
  );
}
