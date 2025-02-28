import React from "react";
import PurchaseInvoiceMenu from "./menus/PurchaseInvoiceMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function PurchaseInvoicePage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Purchase Invoice Page rendering.`);

  return (
    <DisplayCard title="Manage Purchase Invoices" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <PurchaseInvoiceMenu />
        </div>
      </div>
    </DisplayCard>
  );
}