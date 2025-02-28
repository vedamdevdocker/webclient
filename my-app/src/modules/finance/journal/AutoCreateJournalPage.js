//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import AutoCreateJournalForm from "./forms/AutoCreateJournalForm";
//import "../../utilities/css/appcss.css";
//import JournalResultsForm from "./forms/JournalResultsForm";

function AutoCreateJournalPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Auto Create Journal`);

  const componentsToRender = [AutoCreateJournalForm];
  const helpComponentsToRender = ["AutoCreateJournalPage"];

  return (
    <div className="page-container">
      <h1 className="title">Automated Journal Creation</h1>

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

export default AutoCreateJournalPage;