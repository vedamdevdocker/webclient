import React from "react";
import ViewAllBinsForm from "./forms/ViewAllBinsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllBinsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllBinsPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Bins</h1>
      <ViewAllBinsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllBinsPage;
