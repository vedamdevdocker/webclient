import { usePermissions } from "./PermissionsContext";
import { hasPermission } from "./hasPermission";
import { SUPER_USERS_COUNT } from "../../admin/setups/ConstDecl";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

// modules/employee/permissions.js
export const ModulePermission = {
  VIEW_EMPLOYEES: "read_permission",
  CREATE_EMPLOYEES: "write_permission",
  DELETE_EMPLOYEES: "delete_permission",
  UPDATE_EMPLOYEES: "update_permission",
};

export default function ModulePermissions({ moduleName }) {
  const userPermissions = usePermissions(); // Fetch user permissions from context
  const userid = localStorage.getItem("userid");

  logger.info(`[${new Date().toLocaleTimeString()}] ModulePermissions: Checking permissions for moduleName=${moduleName}, userid=${userid}`);

  if (parseInt(userid) < SUPER_USERS_COUNT) {
    logger.info(`[${new Date().toLocaleTimeString()}] ModulePermissions: User is a superuser, granting all permissions.`);
    console.log("super user granting all the accesses in module permissions");
    return {
      canViewModule: true,
      canCreateModule: true,
      canDeleteModule: true,
      canUpdateModule: true,
    };
  }

  const canViewModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.VIEW_EMPLOYEES
  );
  const canCreateModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.CREATE_EMPLOYEES
  );
  const canDeleteModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.DELETE_EMPLOYEES
  );
  const canUpdateModule = hasPermission(
    userPermissions,
    moduleName,
    ModulePermission.UPDATE_EMPLOYEES
  );

  logger.info(`[${new Date().toLocaleTimeString()}] ModulePermissions: Permissions for moduleName=${moduleName}, userid=${userid} - canViewModule=${canViewModule}, canCreateModule=${canCreateModule}, canDeleteModule=${canDeleteModule}, canUpdateModule=${canUpdateModule}`);

  return {
    canViewModule,
    canCreateModule,
    canDeleteModule,
    canUpdateModule
  };
}
