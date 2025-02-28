import React from "react";
import { useNavigate } from "react-router-dom";
import useButtonBehavior from "../../utilities/button/useButtonBehavior";
import behaviorOptions from "../../utilities/button/behaviorOptions";
import ButtonComponent from "../../utilities/ButtonComponent";
import ModulePermissions from "../../security/modulepermissions/ModulePermissions";
import { BACKEND_EMPLOYEE_MODULE_NAME } from "../../admin/setups/ConstDecl"; // Import your constants
import logger from "../../utilities/Logs/logger"; // Import your logger

export default function EmployeeMenu() {
  const navigate = useNavigate();
  const openInNewTab = useButtonBehavior();
  const employeePermissions = ModulePermissions({
    moduleName: BACKEND_EMPLOYEE_MODULE_NAME,
  });
  const { canCreateModule, canDeleteModule, canUpdateModule, canViewModule } =
    employeePermissions;

  const menuItems = [
    { path: "/create-employee", text: "Create Employee", canRender: canCreateModule },
    { path: "/delete-employee", text: "Delete Employee", canRender: canDeleteModule },
    { path: "/update-employee", text: "Update Employee", canRender: canUpdateModule },
    { path: "/list-employees", text: "List Employees", canRender: canViewModule },
    { path: "/designations", text: "List Designations", canRender: canViewModule },
    { path: "/create-designations", text: "Create Designations", canRender: canCreateModule },
  ];

  const handleMenuItemClick = (path) => {
    if (behaviorOptions.DEFAULT === "_blank") {
      openInNewTab(path);
      logger.debug(`[${new Date().toLocaleTimeString()}] Opening path "${path}" in a new tab.`);
    } else {
      navigate(path);
      logger.debug(`[${new Date().toLocaleTimeString()}] Navigating to path "${path}".`);
    }
    logger.info(`[${new Date().toLocaleTimeString()}] Clicked on "${path}" menu item.`); // Info log message
  };

  return (
    <div className="child-container form-container">
      <div className="menu-list">
        {menuItems.map((item) =>
          item.canRender && (
            <ButtonComponent
              key={item.path}
              path={item.path}
              buttonText={item.text}
              onClick={() => {
                handleMenuItemClick(item.path);
                logger.debug(`[${new Date().toLocaleTimeString()}] Clicked on "${item.text}" menu item.`); // Debug log message
              }}
            />
          )
        )}
      </div>
    </div>
  );
}
