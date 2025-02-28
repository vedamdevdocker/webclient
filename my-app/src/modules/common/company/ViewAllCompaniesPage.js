import React from "react";
import ViewAllCompaniesForm from "./forms/ViewAllCompaniesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllCompaniesPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAll Companies component is rendering.`);

  return (
    <div className="page-container">
      {/* Log the page title */}

      <h1 className="title">Companies View</h1>
      
      <ViewAllCompaniesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllCompaniesPage;
