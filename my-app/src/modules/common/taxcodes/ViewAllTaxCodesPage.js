import React, { useEffect } from "react";
import ViewAllTaxCodesForm from "./forms/ViewAllTaxCodesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

// Import your logger module
import logger from "../../utilities/Logs/logger"; // Replace with the correct path

function ViewAllTaxCodesPage() {
  // Log the component rendering
  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] ViewAllTaxCodesPage component is rendering.`);
  }, []);

  return (
    <div className="page-container">
      {/* Log the page title */}
      {useEffect(() => {
        logger.info(`[${new Date().toLocaleTimeString()}] Page title: List of Tax Codes`);
      }, [])}

      <h1 className="title">Tax Codes</h1>

      <ViewAllTaxCodesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllTaxCodesPage;
