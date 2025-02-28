import React from "react";
import ViewExchangeRatesMenu from "./menus/ViewExchangeRatesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger utility here
import { BACKEND_COMMON_MODULE_NAME } from "../../admin/setups/ConstDecl"; // Import your constants here

export default function ExchangeRatesPage() {
  const moduleName = BACKEND_COMMON_MODULE_NAME;

  // Log the module name with time
  logger.info(`[${new Date().toLocaleTimeString()}] Module Name: ${moduleName}`);

  return (
    <DisplayCard title="Manage Exchange Rates" color="#FFD799">
      <div className="menu-list">
        <ViewExchangeRatesMenu />
      </div>
    </DisplayCard>
  );
}
