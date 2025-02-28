//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import UpdatePOInvoiceHeaderForm from "./forms/UpdatePOInvoiceHeaderForm";

export default function UpdatePOInvoiceHeaderPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Create Purchase Page`);

  // Extracting parameters from the URL
  const { PurchaseParameters } = useParams();

  const helpComponentsToRender = ["UpdatePOInvoiceHeaderPage"]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Update Purchase Invoice</h1>

      <div className="parent-container">
        {/* Render UpdatePOInvoiceHeaderForm component directly */}
        <UpdatePOInvoiceHeaderForm PurchaseParameters={PurchaseParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
