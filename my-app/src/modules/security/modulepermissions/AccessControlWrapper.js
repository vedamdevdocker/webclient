import React from "react";
import CheckModuleAccess from "./CheckModuleAccess";
import * as ConstDecl from "../../admin/setups/ConstDecl";


const withAccessControl =
  (moduleNameKey, accessLevelKey) => (WrappedComponent) => {
    // Transform the keys to corresponding constants
    const moduleName = `BACKEND_${moduleNameKey}_MODULE_NAME`;
    const accessLevel = `MODULE_LEVEL_${accessLevelKey}_ACCESS`;

    return function AccessControlWrapper(props) {
      const hasRequiredAccess = CheckModuleAccess(
        ConstDecl[moduleName],
        ConstDecl[accessLevel]
      );

     if (!hasRequiredAccess) {
        // Return a component indicating no permission
        return <NoPermissionComponent moduleNameKey={moduleNameKey} accessLevelKey={accessLevelKey} />;
      }
      // Return the original wrapped component
      return <WrappedComponent />;
    };
  };

const NoPermissionComponent = ({ moduleNameKey, accessLevelKey }) => (
  <div>
    {`You need ${accessLevelKey} level permission for the module ${moduleNameKey} to view this form`}
  </div>

  
);

export default withAccessControl;
