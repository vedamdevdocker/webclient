import React from "react";
import LegalEntityMenu from "./menus/LegalEntityMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function LegalEntityPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] Legal Entity  component is rendering.`);

  return (
    <DisplayCard title="Manage Legal Entities" color="#FFD799">
      <div className="menu-list">
        <LegalEntityMenu />
      </div>
    </DisplayCard>
  );
}
