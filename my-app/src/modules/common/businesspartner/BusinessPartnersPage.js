import React from "react";
import BusinessPartnerMenu from "./menus/BusinessPartnerMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function BusinessPartnersPage() {
  // Log a message with the current time when entering the BusinessPartnersPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered BusinessPartnersPage`);

  return (
    <DisplayCard title="Manage Business Partners" color="#FFD799">
      <BusinessPartnerMenu />
    </DisplayCard>
  );
}
