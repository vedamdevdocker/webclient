import React from "react";
import ViewDefaultAccountsForm from "./forms/ViewDefaultAccountsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ViewDefaultAccountsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] View All Default Accounts component is rendering.`);

  return (
    <div className="page-container">
      <h1 className="title">Default Accounts</h1>
      <ViewDefaultAccountsForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default ViewDefaultAccountsPage;
