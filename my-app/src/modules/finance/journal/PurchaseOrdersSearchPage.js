import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import PurchaseOrdersSearchForm from "./forms/PurchaseOrdersSearchForm";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function PurchaseOrdersSearchPage() {
  // Log a message with the current time when entering the PartnerSearchPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered PurchaseOrdersSearchPage`);

  // Define the list of components to render
  const componentsToRender = [PurchaseOrdersSearchForm];
  const helpComponentsToRender = ["PurchaseOrdersSearchPage"];

  return (
    <div className="page-container">
      <h1 className="title"> Find Purchase Orders</h1>

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

export default PurchaseOrdersSearchPage;
