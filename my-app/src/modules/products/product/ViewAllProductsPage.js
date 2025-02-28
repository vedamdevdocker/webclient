import React from "react";
import ViewAllProductsForm from "./forms/ViewAllProductsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllProductsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllProductsPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Products</h1>
      <ViewAllProductsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllProductsPage;
