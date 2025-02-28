import React from "react";
import ListUserPermissionsForm from "./forms/ListUserPermissionsForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function ListUserPermissions() {
  logger.info(`[${new Date().toLocaleTimeString()}] Users Permissions page loaded.`);

  return (
    <div className="page-container">
      <h1 className="title">Assigned User Permissions</h1>
      
      <ListUserPermissionsForm />

      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
export default ListUserPermissions;
