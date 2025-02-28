import React from "react";
import ViewSalesOrdersForm from "./forms/ViewSalesOrdersForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllSalesOrdersPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAll SalesOrdersPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Sales Orders Overview</h1>
      <ViewSalesOrdersForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllSalesOrdersPage;
