//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import React from "react";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import CreateDefaultAccountsForm from "./forms/CreateDefaultAccountsForm";
//import JournalResultsForm from "./forms/JournalResultsForm";

function CreateDefaultAccountsPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering CreateDefaultAccountsPage`);

  const componentsToRender = [CreateDefaultAccountsForm];
  const helpComponentsToRender = ["CreateDefaultAccountsPage"];

  return (
    <div className="page-container">
      <h1 className="title">Create Default Accounts</h1>

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

export default CreateDefaultAccountsPage;