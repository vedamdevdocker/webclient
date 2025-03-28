//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchPurchaseInvoiceForm from "./forms/SearchPurchaseInvoiceForm";
//import PurchaseResultsForm from "./forms/PurchaseResultsForm";

function SearchPurchaseInvoicePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Purchase Page`);

  const componentsToRender = [SearchPurchaseInvoiceForm];
  const helpComponentsToRender = ["SearchPurchaseInvoicePage"];

  return (
    <div className="page-container">
      <h1 className="title">Search Purchase Invoices </h1>

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

export default SearchPurchaseInvoicePage;