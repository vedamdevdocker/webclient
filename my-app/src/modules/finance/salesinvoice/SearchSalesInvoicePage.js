//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchSalesInvoiceForm from "./forms/SearchSalesInvoiceForm";
//import SalesResultsForm from "./forms/SalesResultsForm";

function SearchSalesInvoicePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Sales Page`);

  const componentsToRender = [SearchSalesInvoiceForm];
  const helpComponentsToRender = ["SearchSalesInvoicePage"];

  return (
    <div className="page-container">
      <h1 className="title">Find Sales Invoice </h1>

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

export default SearchSalesInvoicePage;