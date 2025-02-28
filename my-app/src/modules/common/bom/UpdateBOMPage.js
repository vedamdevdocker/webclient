//import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import { useParams } from "react-router-dom";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger";
import UpdateModelBOM from "./forms/UpdateModelBOM";

export default function UpdateBOMPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering UpdateBOMPage`);

  // Extracting parameters from the URL
  const { BOMParameters } = useParams();

  const helpComponentsToRender = ["UpdateBOMPage"];

  return (
    <div className="page-container">
      <h1 className="title">Update Bill of Materials</h1>

      <div className="parent-container">
        <UpdateModelBOM BOMParameters={BOMParameters} />
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
