//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchPOInvoiceToUpdateForm from "./forms/SearchPOInvoiceToUpdateForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchPOInvoiceToUpdatePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Invoice Page`);

  const componentsToRender = [SearchPOInvoiceToUpdateForm];
  const helpComponentsToRender = ["SearchPOInvoiceToUpdatePage"];

  return (
    <div className="page-container">
      <h1 className="title">Search Purchase Order Invoices </h1>

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

export default SearchPOInvoiceToUpdatePage;