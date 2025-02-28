//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import UpdateJournalHeaderForm from "./forms/UpdateJournalHeaderForm";

export default function UpdateJournalHeaderPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Update Journal page  Page`);

  // Extracting parameters from the URL
  const { JournalParameters } = useParams();

  const helpComponentsToRender = ["UpdateJournalHeaderPage"]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Modify Journal</h1>

      <div className="parent-container">
        {/* Render UpdatePOInvoiceHeaderForm component directly */}
        <UpdateJournalHeaderForm JournalParameters={JournalParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
