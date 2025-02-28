import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import PutAwayForm from "./forms/PutAwayForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function PutAwayPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] Perform PutAway.`);

  // Define the list of components to render
  const componentsToRender = [PutAwayForm];
  const helpComponentsToRender = ["PutAwayPage"];

  return (
    <div className="page-container">
      <h1 className="title">PutAway Inventory</h1>

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

export default PutAwayPage;
