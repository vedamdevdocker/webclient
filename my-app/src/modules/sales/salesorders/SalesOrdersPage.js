import React from "react";
import SalesOrdersMenu from "./menus/SalesOrdersMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function SalesOrdersPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] View Sales orders page is rendering.`);

  return (
    <DisplayCard title="Sales Management" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <SalesOrdersMenu />
        </div>
      </div>
    </DisplayCard>
  );
}