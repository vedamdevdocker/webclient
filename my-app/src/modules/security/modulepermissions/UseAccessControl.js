// useAccessControl.js
import { useEffect, useState } from "react";
import CheckModuleAccess from "./CheckModuleAccess";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function UseAccessControl(moduleName, moduleLevelAccess) {
  const [hasRequiredAccess, setHasRequiredAccess] = useState(false);

  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] useAccessControl: Checking module access for ${moduleName}`);
    const access = CheckModuleAccess(moduleName, moduleLevelAccess);
    setHasRequiredAccess(access);
    logger.info(`[${new Date().toLocaleTimeString()}] useAccessControl: Module access checked. Result: ${access}`);
  }, [moduleName, moduleLevelAccess]);

  return hasRequiredAccess;
}

export default UseAccessControl;
