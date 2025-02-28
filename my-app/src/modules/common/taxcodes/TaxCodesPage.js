import React, { useEffect } from "react";
import ViewTaxCodesMenu from "./menus/ViewTaxCodesMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

// Import your logger module
import logger from "../../utilities/Logs/logger"; // Replace with the correct path

export default function TaxCodesPage() {
  // Log the component rendering
  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] TaxCodesPage component is rendering.`);
  }, []);

  return (
    <DisplayCard title="Manage Tax Codes" color="#FFD799">
      <div className="menu-list">
        <ViewTaxCodesMenu />
      </div>
    </DisplayCard>
  );
}
