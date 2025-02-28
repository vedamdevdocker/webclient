import React from "react";
import ViewWarehousesForm from "./forms/ViewWarehousesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewWarehousesPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewWarehousesPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Warehouses</h1>
      <ViewWarehousesForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewWarehousesPage;
