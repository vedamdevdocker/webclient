//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import FindDepartmentToUpdateForm from "./forms/FindDepartmentToUpdateForm";
import "../../utilities/css/appcss.css";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function FindDepartmentToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Department Page`);

  const componentsToRender = [FindDepartmentToUpdateForm];
  const helpComponentsToRender = ["FindDepartmentToUpdatePage"];

  return (
    <div className="page-container">
      <h1 className="title">Find Department to Update </h1>

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

export default FindDepartmentToUpdatePage;