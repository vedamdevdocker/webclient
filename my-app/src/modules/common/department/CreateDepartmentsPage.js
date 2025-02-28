import React from "react";
import CreateDepartmentForm from "./forms/CreateDepartmentForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function CreateDepartmentsPage() {
  // Log a message with the current time when entering the CreatePartnerPage component
  logger.info(`[${new Date().toLocaleTimeString()}] Entered CreatePartnerPage`);

  // Define the list of components to render
  const componentsToRender = [CreateDepartmentForm];
  const helpComponentsToRender = ["CreateDepartmentsPage"];

  return (
    <div className="page-container">
      <h1 className="title">Create New Department</h1>

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

export default CreateDepartmentsPage;
