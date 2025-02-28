import React from "react";
import ViewAllItemInventoriesForm from "./forms/ViewAllItemInventoriesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllItemInventoriesPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllItemInventoriesPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Item Inventories</h1>
      <ViewAllItemInventoriesForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllItemInventoriesPage;
