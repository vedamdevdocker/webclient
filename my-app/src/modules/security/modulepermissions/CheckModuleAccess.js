import ModulePermissions from "./ModulePermissions";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function CheckModuleAccess(moduleName, requiredAccess) {
  logger.info(`[${new Date().toLocaleTimeString()}] Checking module access for module: ${moduleName}, required access: ${requiredAccess}`);
  
  const userPermissions = ModulePermissions({ moduleName });
  const hasRequiredAccess = userPermissions[requiredAccess];
  
  logger.info(`[${new Date().toLocaleTimeString()}] Module access check result: ${hasRequiredAccess}`);
  
  return hasRequiredAccess;
}
