import React from "react";
import SalesInvoiceMenu from "./menus/SalesInvoiceMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function SalesInvoicePage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Sales Invoice Page rendering.`);

  return (
    <DisplayCard title="Manage Sales Invoice" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <SalesInvoiceMenu />
        </div>
      </div>
    </DisplayCard>
  );
}