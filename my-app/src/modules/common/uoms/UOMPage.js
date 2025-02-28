import React from "react";
import UOMMenu from "./menus/UOMMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function UOMPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] UOMPage component is rendering.`);

  return (
    <DisplayCard title="Manage Unit of Measures" color="#FFD799">
      <div className="menu-list">
        <UOMMenu />
      </div>
    </DisplayCard>
  );
}
