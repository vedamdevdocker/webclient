//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import React from "react";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import CreateSalesForm from "./forms/CreateSalesForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function CreateSalesPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Sales Page`);

  const componentsToRender = [CreateSalesForm];
  const helpComponentsToRender = ["CreateSalesPage"];

  return (
    <div className="page-container">
      <h1 className="title">Sales Invoice Creation</h1>

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

export default CreateSalesPage;