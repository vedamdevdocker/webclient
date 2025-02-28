// contexts/PermissionsContext.js
import { createContext, useContext } from "react";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

const PermissionsContext = createContext();

export function usePermissions() {
  logger.info(`[${new Date().toLocaleTimeString()}] usePermissions: Retrieving user permissions from context`);
  return useContext(PermissionsContext);
}

export default PermissionsContext;
