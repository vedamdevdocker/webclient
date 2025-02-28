import React from "react";
import ViewAllReceiptsForm from "./forms/ViewAllReceiptsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllReceiptsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllReceiptsPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Receipts</h1>
      <ViewAllReceiptsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllReceiptsPage;
