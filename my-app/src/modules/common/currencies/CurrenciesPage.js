import React, { useEffect } from "react";
import ViewCurrenciesMenu from "./menus/ViewCurrenciesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function CurrenciesPage() {
  // Log tokens, userId, and other constants when the component is loaded
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    logger.info(`[${new Date().toLocaleTimeString()}] Token: ${token}, UserId: ${userId}, Page: CurrenciesPage`);
  }, []);

  return (
    <DisplayCard title="Manage Currencies" color="#FFD799">
      <ViewCurrenciesMenu />
    </DisplayCard>
  );
}
