//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchSOInvoiceToUpdateForm from "./forms/SearchSOInvoiceToUpdateForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchSOInvoiceToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Sales Invoice Page`);

  const componentsToRender = [SearchSOInvoiceToUpdateForm];
  const helpComponentsToRender = ["SearchSOInvoiceToUpdatePage"];

  return (
    <div className="page-container">
      <h1 className="title">Find Sales Order Invoice for Editing </h1>

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

export default SearchSOInvoiceToUpdatePage;