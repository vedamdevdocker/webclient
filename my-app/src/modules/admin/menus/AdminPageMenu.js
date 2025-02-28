import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../utilities/button/behaviorOptions";
import ButtonComponent from "../../utilities/ButtonComponent";
import "../../utilities/css/appcss.css";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import {
  BACKEND_EMPLOYEE_MODULE_NAME,
  BACKEND_SECURITY_MODULE_NAME,
  BACKEND_ADMIN_MODULE_NAME,
} from "../setups/ConstDecl"; // Import your constants

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

export default function AdminPageMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
    } else {
      navigate(path);
    }

    // Log the menu item click with the path
    logger.info(`[${new Date().toLocaleTimeString()}] Menu item clicked: ${path}`);
  };

  // Retrieve employee and security permissions
  const employeePermissions = ModulePermissions({
    moduleName: BACKEND_EMPLOYEE_MODULE_NAME,
  });

  const securityPermissions = ModulePermissions({
    moduleName: BACKEND_SECURITY_MODULE_NAME,
  });

  const adminPermissions = ModulePermissions({
    moduleName: BACKEND_ADMIN_MODULE_NAME,
  });

  // Destructure permissions for better readability
  const {
    canViewModule: canViewEmployeeModule,
    canCreateModule: canCreateEmployeeModule,
    canDeleteModule: canDeleteEmployeeModule,
    canUpdateModule: canUpdateEmployeeModule,
  } = employeePermissions;

  const {
    canViewModule: canViewSecurityModule,
    canCreateModule: canCreateSecurityModule,
    canDeleteModule: canDeleteSecurityModule,
    canUpdateModule: canUpdateSecurityModule,
  } = securityPermissions;

  const {
    canViewModule: canViewAdminModule,
    canCreateModule: canCreateAdminModule,
    canDeleteModule: canDeleteAdminModule,
    canUpdateModule: canUpdateAdminModule,
  } = adminPermissions;

  // Check if any permissions are granted
  const isEmployeePermissionGranted =
    canViewEmployeeModule ||
    canCreateEmployeeModule ||
    canDeleteEmployeeModule ||
    canUpdateEmployeeModule;

  const isSecurityPermissionGranted =
    canViewSecurityModule ||
    canCreateSecurityModule ||
    canDeleteSecurityModule ||
    canUpdateSecurityModule;

  const isAdminPermissionGranted =
    canViewAdminModule ||
    canCreateAdminModule ||
    canDeleteAdminModule ||
    canUpdateAdminModule;

  const menuItems = [
    { path: "/employee-functions", text: "Employee Setup" },
    { path: "/user-functions", text: "Access Control" },
    { path: "/view-emails-function", text: "Message Dashboard" },
    { path: "/create-ui-setups", text: "Create Interface Setup" },
    { path: "/list-ui-setups", text: "UI File Configuration" },
    { path: "/create-db-setups", text: "Create Database Setup" },
    { path: "/list-db-setups", text: "DB Setup Export" },
    // ... add more menu items here
  ];

  return (
    <div>
      <div className="child-container form-container">
        <div className="menu-list">
          {menuItems.map((item) =>
            // Check for permission and render the button if allowed
            (item.path === "/employee-functions" && isEmployeePermissionGranted) ||
              (item.path === "/user-functions" && isSecurityPermissionGranted) ||
              (item.path === "/view-emails-function" && isAdminPermissionGranted) ? (
              <ButtonComponent
                key={item.path}
                path={item.path}
                buttonText={item.text}
                onClick={() => handleMenuItemClick(item.path)}
              />
            ) : null
          )}
        </div>

      </div>
      <div className="child-container form-container">
        <div className="menu-list">
          {menuItems.map((item) =>
            // Check for permission and render the button if allowed
            (item.path === "/create-ui-setups" && isAdminPermissionGranted) ||
              (item.path === "/list-ui-setups" && isAdminPermissionGranted) ||
              (item.path === "/create-db-setups" && isAdminPermissionGranted) ||
              (item.path === "/list-db-setups" && isAdminPermissionGranted) ? (
              <ButtonComponent
                key={item.path}
                path={item.path}
                buttonText={item.text}
                onClick={() => handleMenuItemClick(item.path)}
              />
            ) : null
          )}
        </div>

      </div>
    </div>
  );
}
