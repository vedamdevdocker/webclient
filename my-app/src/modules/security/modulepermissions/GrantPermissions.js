import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import GrantPermissionsForm from "./forms/GrantPermissionsForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function GrantPermissions() {
  logger.info(`[${new Date().toLocaleTimeString()}] Grant Permissions page loaded.`);
  
  return (
    <div className="page-container">
      <h1 className="title">Access Control for Modules</h1>

      <div className="parent-container">
        <GrantPermissionsForm />
        <DocumentationContainer />
      </div>
      <RotatingImage />
      <BottomContainer /> 
    </div>
  );
}

export default GrantPermissions;
