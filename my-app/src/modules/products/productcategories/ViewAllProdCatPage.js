import React from "react";
import ViewAllProdCatForm from "./forms/ViewAllProdCatForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllProdCatPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllProdCatPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Product Categories</h1>
      <ViewAllProdCatForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllProdCatPage;
