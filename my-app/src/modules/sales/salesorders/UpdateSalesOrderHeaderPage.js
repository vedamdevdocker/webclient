//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import UpdateSOHeaderForm from "./forms/UpdateSOHeaderForm";

export default function UpdateSalesOrderHeaderPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Sales Page`);

  // Extracting parameters from the URL
  const { SOParameters } = useParams();

  const helpComponentsToRender = ["UpdateSalesOrderHeaderPage"]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Modify Sales Orders</h1>

      <div className="parent-container">
        {/* Render UpdateSOInvoiceHeaderForm component directly */}
        <UpdateSOHeaderForm SOParameters={SOParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
