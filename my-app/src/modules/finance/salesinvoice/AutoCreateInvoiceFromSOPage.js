//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import AutoCreateInvoiceFromSOForm from "./forms/AutoCreateInvoiceFromSOForm";

function AutoCreateInvoiceFromSOPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering the Auto Sales Invoice Creation`);

  const componentsToRender = [AutoCreateInvoiceFromSOForm];
  const helpComponentsToRender = ["AutoCreateInvoiceFromSOPage"];

  return (
    <div className="page-container">
      <h1 className="title">Auto Generate Invoices for Sale</h1>

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

export default AutoCreateInvoiceFromSOPage;