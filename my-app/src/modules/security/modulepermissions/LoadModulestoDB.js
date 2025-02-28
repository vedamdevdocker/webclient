import React from "react";
import LoadModulestoDBForm from "./forms/LoadModulestoDBForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function LoadModulestoDB() {
  logger.info(`[${new Date().toLocaleTimeString()}] Load Modules to DB page loaded.`);

  return (
    <div className="page-container">
    
      <LoadModulestoDBForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default LoadModulestoDB;
