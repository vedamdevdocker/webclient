import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

const ListUserPermissionsForm = () => {
  const [userModulePermissions, setUserModulePermissions] = useState([]);
  const [userDetails, setUserDetails] = useState({});

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_ADMIN_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      logger.warn(`[${new Date().toLocaleTimeString()}] User does not have required access to view this module.`);
      return; // Do not fetch data if access is not granted
    }
    fetchData();
    // eslint-disable-next-line
  }, [hasRequiredAccess]);

  // eslint-disable-next-line 
  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
      // Add other headers if needed
    };
  };
  const fetchData = async () => {
    try {
      logger.info(`[${new Date().toLocaleTimeString()}] Fetching user module permissions...`);

      const response = await axios.get(`${API_URL}/list_user_permissions`, {
        headers: generateHeaders(), // Include headers here
      });
      const sortedPermissions = response.data.user_module_permissions.sort(
        (a, b) => a.user_id - b.user_id
      );

      setUserModulePermissions(sortedPermissions);

      // Fetch user details and store them in the userDetails state
      const usersResponse = await axios.get(`${API_URL}/list_users`, {
        headers: generateHeaders(), // Include headers here
      });
      const users = usersResponse.data.users.reduce(
        (acc, user) => ({ ...acc, [user.id]: user.username }),
        {}
      );
      setUserDetails(users);

      logger.info(`[${new Date().toLocaleTimeString()}] User details fetched successfully.`);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching data:`, error);
    }
  };

  return (
    <div className="child-container form-container">
      <h3 className="title">Granted Access Rights</h3>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>User ID</th>
              <th>Username</th>
              <th>Module</th>
              <th>Read Permission</th>
              <th>Write Permission</th>
              <th>Update Permission</th>
              <th>Delete Permission</th>
            </tr>
          </thead>
          <tbody>
            {userModulePermissions.map((permission) => (
              <tr key={permission.id} className="table-row">
                <td>{permission.id}</td>
                <td>{permission.user_id}</td>
                <td>{userDetails[permission.user_id]}</td>
                <td>{permission.module}</td>
                <td>{permission.read_permission.toString()}</td>
                <td>{permission.write_permission.toString()}</td>
                <td>{permission.update_permission.toString()}</td>
                <td>{permission.delete_permission.toString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
};

export default ListUserPermissionsForm;
