import React from "react";
import ViewAllExchangeRatesForm from "./forms/ViewAllExchangeRatesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger utility here
import { BACKEND_COMMON_MODULE_NAME } from "../../admin/setups/ConstDecl"; // Import your constants here

function ViewAllExchangeRatesPage() {
  const moduleName = BACKEND_COMMON_MODULE_NAME;
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  // Log the module name, token, and user ID with time
  logger.info(`[${new Date().toLocaleTimeString()}] Module Name: ${moduleName}`);
  logger.info(`[${new Date().toLocaleTimeString()}] Token: ${token}`);
  logger.info(`[${new Date().toLocaleTimeString()}] User ID: ${userId}`);

  return (
    <div className="page-container">
      <h1 className="title">Exchange Rates</h1>
      <ViewAllExchangeRatesForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllExchangeRatesPage;
