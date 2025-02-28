//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindSOToUpdateForm from "./forms/FindSOToUpdateForm";
//import SalesResultsForm from "./forms/SalesResultsForm";

function FindSOToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Sales Order Page`);

  const componentsToRender = [FindSOToUpdateForm];
  const helpComponentsToRender = ["FindSOToUpdatePage"];

  return (
    <div className="page-container">
      <h1 className="title">Search Sales Orders for Update </h1>

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

export default FindSOToUpdatePage;