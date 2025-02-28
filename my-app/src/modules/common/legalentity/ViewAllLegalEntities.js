import React from "react";
import ViewAllLegalEntitiesForm from "./forms/ViewAllLegalEntitiesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllLegalEntities() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAll Legal Entities component is rendering.`);

  return (
    <div className="page-container">
      {/* Log the page title */}

      <h1 className="title">Legal Entities</h1>

      <ViewAllLegalEntitiesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllLegalEntities;
