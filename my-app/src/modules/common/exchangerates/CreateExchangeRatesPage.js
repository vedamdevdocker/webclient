import React from "react";
import "../../utilities/css/appcss.css";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import CreateExchangeRatesForm from "./forms/CreateExchangeRatesForm";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function CreateExchangeRatesPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] CreateExchangeRatesPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [CreateExchangeRatesForm];
  const helpComponentsToRender = ["CreateExchangeRatesPage"];

  return (
    <div className="page-container">
      <h1 className="title">Create Exchange Rates</h1>

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

export default CreateExchangeRatesPage;
