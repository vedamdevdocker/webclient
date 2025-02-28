import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../utilities/button/behaviorOptions";
import ButtonComponent from "../../utilities/ButtonComponent"; // Import the new ButtonComponent
import "../../utilities/css/appcss.css";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function PermissionsMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  // Constants and variables
  const defaultBehavior = behaviorOptions.DEFAULT;
  const menuItems = [
    { path: "/load-all-modules", text: "Import Modules" },
    { path: "/assign-user-modules", text: "Allocate Modules" },
    { path: "/create-permissions", text: "Grant Permissions" },
    { path: "/list-user-permissions", text: "Show User Access Rights" },
    // ... add more menu items here
  ];

  const handleMenuItemClick = (path) => {
    if (defaultBehavior === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }

    // Log menu item click with path
    logger.info(`[${new Date().toLocaleTimeString()}] Menu item clicked. Path: ${path}`);
  };

  // Log component rendering with a constant
  logger.info(`[${new Date().toLocaleTimeString()}] PermissionsMenu component rendered.`);

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) => (
          <ButtonComponent
            key={item.path}
            path={item.path}
            buttonText={item.text}
            onClick={() => handleMenuItemClick(item.path)}
          />
        ))}
      </div>
    </div>
  );
}
