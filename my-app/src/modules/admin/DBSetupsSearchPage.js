import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import ShowAllDBSetupsForm from "./forms/ShowAllDBSetupsForm";

// Import your logger utility here
import logger from "../utilities/Logs/logger";

function DBSetupsSearchPage() {
  // Log an info message when the DBSetupsSearchPage component starts rendering with the current time
  logger.info(`[${new Date().toLocaleTimeString()}] DBSetupsSearchPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Create React Config file</h1>

      <div className="parent-container">
        <ShowAllDBSetupsForm />
        <DocumentationContainer />
      </div>

      {/* Log a debug message when the RotatingImage component is rendered with the current time */}
      {RotatingImage && logger.debug(`[${new Date().toLocaleTimeString()}] RotatingImage component is rendered.`)}

      {/* Log a warning message when BottomContainer is included with the current time */}
      {BottomContainer && logger.warn(`[${new Date().toLocaleTimeString()}] BottomContainer is included.`)}
    </div>
  );
}

export default DBSetupsSearchPage;
