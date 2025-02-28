import React from "react";
import ViewAllEmployeesForm from "./forms/ViewAllEmployeesForm";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import logger from "../utilities/Logs/logger"; // Import your logger

function ViewAllEmployeesPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Loading ViewAllEmployeesPage.`); // Info log message

  return (
    <div className="page-container">
      <h1 className="title">Employees</h1>
      <ViewAllEmployeesForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllEmployeesPage;
