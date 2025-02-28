//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import "../../utilities/css/appcss.css";
import UpdateDepartmentForm from "./forms/UpdateDepartmentForm";

export default function UpdateDepartmentPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Update Department page  Page`);

  // Extracting parameters from the URL
  const { DepartmentParameters } = useParams();

  const helpComponentsToRender = ["UpdateDepartmentPage"]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Update Department</h1>

      <div className="parent-container">
        {/* Render UpdatePOInvoiceHeaderForm component directly */}
        <UpdateDepartmentForm DepartmentParameters={DepartmentParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
