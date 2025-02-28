import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import ShowAllUISetupsForm from "./forms/ShowAllUISetupsForm";

// Import your logger utility here
import logger from "../utilities/Logs/logger";

function UISetupsSearchPage() {
  // Log an info message when the UISetupsSearchPage component starts rendering with the current time
  logger.info(`[${new Date().toLocaleTimeString()}] UISetupsSearchPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Create React Configurations File</h1>

      <div className="parent-container">
        <ShowAllUISetupsForm />
        <DocumentationContainer />
      </div>

      {/* Log a debug message when the RotatingImage component is rendered with the current time */}
      {RotatingImage && logger.debug(`[${new Date().toLocaleTimeString()}] RotatingImage component is rendered.`)}

      {/* Log a warning message when BottomContainer is included with the current time */}
      {BottomContainer && logger.warn(`[${new Date().toLocaleTimeString()}] BottomContainer is included.`)}
    </div>
  );
}

export default UISetupsSearchPage;
