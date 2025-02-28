import React from "react";
import "../../../utilities/css/appcss.css";
import RotatingImage from "../../../utilities/RotatingImage";
import BottomContainer from "../../../utilities/BottomContainer";
import DocumentationContainer from "../../../utilities/DocumentationContainer";
import RegisterUserForm from "./forms/RegisterUserForm";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function RegisterUserPage() {
  // Constants and variables
  const pageTitle = "Add New User";

  const helpComponentsToRender = ["RegisterUserPage"];

  // Log the component rendering with constant
  logger.info(`[${new Date().toLocaleTimeString()}] RegisterUser component rendered. Page title: ${pageTitle}`);

  return (
    <div className="page-container">
      <h1 className="title">{pageTitle}</h1>

      <div className="parent-container">
        <RegisterUserForm />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default RegisterUserPage;
