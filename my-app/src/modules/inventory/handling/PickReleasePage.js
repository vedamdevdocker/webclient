import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import PickReleaseForm from "./forms/PickReleaseForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function PickReleasePage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Pick Rlease the inventory .`);

  // Define the list of components to render
  const componentsToRender = [PickReleaseForm];
  const helpComponentsToRender = ["PickReleasePage"];

  return (
    <div className="page-container">
      <h1 className="title">Inventory Pick Release</h1>

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

export default PickReleasePage;
