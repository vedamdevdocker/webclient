import React from "react";
import CreateUOMForm from "./forms/CreateUOMForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function CreateUOMPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] CreateUOMPage component is rendering.`);

  const helpComponentsToRender = ["CreateUOMPage"];
  const componentsToRender = [CreateUOMForm];

  return (

    <div className="page-container">
      <h1 className="title">Create Unit of Measure</h1>

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

export default CreateUOMPage;
