import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import CreateDesignationsForm from "./forms/CreateDesignationsForm";
import logger from "../utilities/Logs/logger";

function CreateDesignationsPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Loading CreateDesignationsPage.`); // Info log message

  // Define the list of components to render
  const componentsToRender = [CreateDesignationsForm];
  const helpComponentsToRender = ["CreateDesignationsPage"];

  return (
    <div className="page-container">
      <h1 className="title">Create Designations</h1>

      <div className="parent-container">
        {componentsToRender.map((Component, index) => (
          <React.Fragment key={index}>
            <Component />
          </React.Fragment>
        ))}
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default CreateDesignationsPage;
