import React from "react";
import AccountsMenu from "./menus/AccountsMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function AccountsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Accounts is rendering.`);

  return (
    <DisplayCard title="Manage Chat of Accounts" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <AccountsMenu />
        </div>
      </div>
    </DisplayCard>
  );
}