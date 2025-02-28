// UsersList.js
import React, { useEffect } from "react";
import UsersListForm from "./forms/UsersListForm";
import RotatingImage from "../../../utilities/RotatingImage";
import BottomContainer from "../../../utilities/BottomContainer";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function UsersListPage() {
  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] UsersList: Loading Users List page`);
  }, []);

  return (
    <div className="page-container">
      <h1 className="title">User Accounts</h1>
      <UsersListForm />
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default UsersListPage;
