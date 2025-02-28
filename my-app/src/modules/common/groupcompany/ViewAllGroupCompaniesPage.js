import React from "react";
import ViewAllGroupCompaniesForm from "./forms/ViewAllGroupCompaniesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllGroupCompaniesPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAll Group companies component is rendering.`);

  return (
    <div className="page-container">
      {/* Log the page title */}

      <h1 className="title">Group Companies</h1>
      
      <ViewAllGroupCompaniesForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllGroupCompaniesPage;
