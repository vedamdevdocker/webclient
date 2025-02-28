//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import UpdateSOInvoiceHeaderForm from "./forms/UpdateSOInvoiceHeaderForm";

export default function UpdateSOInvoiceHeaderPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Sales Page`);

  // Extracting parameters from the URL
  const { SalesParameters } = useParams();

  const helpComponentsToRender = ["UpdateSOInvoiceHeaderPage"]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Modify Sales Invoice</h1>

      <div className="parent-container">
        {/* Render UpdateSOInvoiceHeaderForm component directly */}
        <UpdateSOInvoiceHeaderForm SalesParameters={SalesParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
