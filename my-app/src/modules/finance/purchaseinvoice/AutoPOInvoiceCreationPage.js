//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import AutoPOInvoiceCreationForm from "./forms/AutoPOInvoiceCreationForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function AutoPOInvoiceCreationPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Auto create Purchase Invoice`);

  const componentsToRender = [AutoPOInvoiceCreationForm];
  const helpComponentsToRender = ["AutoPOInvoiceCreationPage"];

  return (
    <div className="page-container">
      <h1 className="title">Automatic PO Invoice Generation</h1>

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

export default AutoPOInvoiceCreationPage;