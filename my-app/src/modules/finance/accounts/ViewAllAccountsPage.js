import React from "react";
import ViewAllAccountsForm from "./forms/ViewAllAccountsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewAllAccountsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ViewAllAccountsPage component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Accounts</h1>
      <ViewAllAccountsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewAllAccountsPage;
