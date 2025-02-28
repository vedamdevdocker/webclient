import React from "react";
import ViewAllDesignationsForm from "./forms/ViewAllDesignationsForm";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import logger from "../utilities/Logs/logger"; // Import your logger

function ViewAllDesignationsPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Loading ViewAllDesignationsPage.`); // Info log message

  return (
    <div className="page-container">
      <h1 className="title">Designations</h1>
      <ViewAllDesignationsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ViewAllDesignationsPage;
