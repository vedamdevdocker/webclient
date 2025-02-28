import React from "react";
import ViewAllUOMsForm from "./forms/ViewAllUOMsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllUOMsPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllUOMsPage component is rendering.`);

  return (
    <div className="page-container">
      {/* Log the page title */}

      <h1 className="title">Unit of Measures</h1>
      
      <ViewAllUOMsForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllUOMsPage;
