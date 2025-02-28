import React from "react";
import ViewPurchaseOrdersForm from "./forms/ViewPurchaseOrdersForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllPurchaseOrdersPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllPurchaseOrdersPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Purchase Orders List</h1>
      <ViewPurchaseOrdersForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllPurchaseOrdersPage;
