import React from "react";
import GroupCompaniesMenu from "./menus/GroupCompaniesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function GroupCompaniesPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] Group Company component is rendering.`);

  return (
    <DisplayCard title="Manage Group Companies" color="#FFD799">
      <div className="menu-list">
        <GroupCompaniesMenu />
      </div>
    </DisplayCard>
  );
}
