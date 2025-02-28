import React from "react";
import ViewAllDepartmentsForm from "./forms/ViewAllDepartmentsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllDepartmentsPage() {
  // Log the component rendering
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAll Departments component is rendering.`);

  return (
    <div className="page-container">
      {/* Log the page title */}

      <h1 className="title">Departments</h1>

      <ViewAllDepartmentsForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllDepartmentsPage;
