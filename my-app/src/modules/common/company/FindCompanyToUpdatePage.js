//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindCompanyToUpdateForm from "./forms/FindCompanyToUpdateForm";
import "../../utilities/css/appcss.css";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function FindCompanyToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Company Page`);

  const componentsToRender = [FindCompanyToUpdateForm];
  const helpComponentsToRender = ["FindCompanyToUpdatePage"];

  return (
    <div className="page-container">
      <h1 className="title">Find Company to Update </h1>

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

export default FindCompanyToUpdatePage;