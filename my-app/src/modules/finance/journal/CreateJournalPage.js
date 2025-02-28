//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import CreateJournalForm from "./forms/CreateJournalForm";
//import JournalResultsForm from "./forms/JournalResultsForm";

function CreateJournalPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Journal Page`);

  const componentsToRender = [CreateJournalForm];
  const helpComponentsToRender = ["CreateJournalPage"];

  return (
    <div className="page-container">
      <h1 className="title">Create Journals</h1>

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

export default CreateJournalPage;