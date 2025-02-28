import React from "react";
import DepartmentsMenu from "./menus/DepartmentsMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function DepartmentsPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] Departments component is rendering.`);

  return (
    <DisplayCard title="Manage Departments" color="#FFD799">
      <div className="menu-list">
        <DepartmentsMenu />
      </div>
    </DisplayCard>
  );
}
