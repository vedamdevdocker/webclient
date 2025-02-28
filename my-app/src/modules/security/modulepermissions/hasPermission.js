// permissions.js

import logger from "../../utilities/Logs/logger"; // Import your logger module here

export const hasPermission = (userPermissions, module, permissionType) => {
  logger.info(`[${new Date().toLocaleTimeString()}] hasPermission: Checking permission for module=${module}, permissionType=${permissionType}`);
  
  const permission = userPermissions.find(
    (perm) => perm.module === module && perm[permissionType]
  );
  
  logger.info(`[${new Date().toLocaleTimeString()}] hasPermission: Permission for module=${module}, permissionType=${permissionType} - ${permission ? "GRANTED" : "DENIED"}`);
  
  return !!permission;
};
