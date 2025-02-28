//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchDefaultTaxCodesForm from "./forms/SearchDefaultTaxCodesForm";

function SearchDefaultTaxCodesPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search SearchDefaultTaxCodesPage`);

  const componentsToRender = [SearchDefaultTaxCodesForm];
  const helpComponentsToRender = ["SearchDefaultTaxCodesPage"];

  return (
    <div className="page-container">
      <h1 className="title">Find Tax Codes</h1>

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

export default SearchDefaultTaxCodesPage;