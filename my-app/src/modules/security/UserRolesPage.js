import React, { useEffect } from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import UserRolesMenu from "./menus/UserRolesMenu";
import PermissionsMenu from "./menus/PermissionsMenu";
import DisplayCard from "../utilities/DisplayCard";
import logger from "../utilities/Logs/logger"; // Import your logger module here

// Define an array of components to render
const componentsToRender = [UserRolesMenu, PermissionsMenu];

// Define an array of components for componentsToRender2
const helpComponentsToRender = ["UserRolesPage"];

export default function UserRolesPage() {
  useEffect(() => {
    // Log component rendering
    logger.info(`[${new Date().toLocaleTimeString()}] UserRolePage component rendered.`);
  }, []);

  return (
    <div className="page-container">
      <h1 className="title">User Access Management</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <h2 className="title">Menu</h2>
          <div className="menu-list-container">
            {componentsToRender.map((Component, index) => (
              <DisplayCard
                key={index}
                title={Component.name}
                color="#4caf50" // You can set colors dynamically if needed
              >
                <Component />
              </DisplayCard>
            ))}
          </div>
        </div>
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
