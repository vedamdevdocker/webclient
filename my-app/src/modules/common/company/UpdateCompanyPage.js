//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import "../../utilities/css/appcss.css";
import UpdateCompanyForm from "./forms/UpdateCompanyForm";

export default function UpdateCompanyPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering UpdateCompanyPage page  Page`);

  // Extracting parameters from the URL
  const { CompanyParameters } = useParams();

  const helpComponentsToRender = ["UpdateCompanyPage"]; // Store the component directly without enclosing in an array

  return (
    <div className="page-container">
      <h1 className="title">Update Company</h1>

      <div className="parent-container">
        {/* Render UpdatePOInvoiceHeaderForm component directly */}
        <UpdateCompanyForm CompanyParameters={CompanyParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
