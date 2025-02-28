import React from "react";

import BOMMenu from "./menus/BOMMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function BOMPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering BOMPage`); // Log when the component is rendered with time

  return (
    <DisplayCard title="Bill of Materials Menu Items" color="#FFD799">
      <BOMMenu />
    </DisplayCard>
  );
}
