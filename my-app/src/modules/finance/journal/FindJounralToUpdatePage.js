//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindJounralToUpdateForm from "./forms/FindJounralToUpdateForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function FindJounralToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Order Page`);

  const componentsToRender = [FindJounralToUpdateForm];
  const helpComponentsToRender = ["FindJounralToUpdatePage"];

  return (
    <div className="page-container">
      <h1 className="title">Find Journal Entries to Edit </h1>

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

export default FindJounralToUpdatePage;