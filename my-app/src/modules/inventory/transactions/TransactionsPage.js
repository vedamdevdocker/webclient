import React from "react";
import TransactionsMenu from "./menus/TransactionsMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function TransactionsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Transactions are rendering.`);

  return (
    <DisplayCard title="Manage Inventory Transactions" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <TransactionsMenu />
        </div>
      </div>
    </DisplayCard>
  );
}