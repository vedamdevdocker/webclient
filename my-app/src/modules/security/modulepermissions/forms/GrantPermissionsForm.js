import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

const GrantPermissionsForm = () => {
  const [username, setUsername] = useState("");
  const [userData, setUserData] = useState(null);
  const [gbuserid, setGbuserid] = useState("");
  const [moduleEntries, setModuleEntries] = useState([]);
  const [statusMessage, setStatusMessage] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_ADMIN_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  const displayStatusMessage = (message, duration = 3000) => {
    setStatusMessage(message);
    setTimeout(() => {
      setStatusMessage("");
    }, duration);
  };

  const handleCancel = () => {
    setUsername("");
    setUserData(null);
    setModuleEntries([]);
  };

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userId,
      // Add other headers if needed
    };
  };


  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    // Fetch data here if access is granted
    //fetchModules();
  }, [hasRequiredAccess]);

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleCheckUser = async () => {
    const trimmedUsername = username.trim();

    try {
      // Check if the user exists in adm.users table
      const usersResponse = await axios.get(`${API_URL}/list_users`, {
        headers: generateHeaders(), // Include headers here
      });
      const usersData = usersResponse.data.users;
      if (!Array.isArray(usersData)) {
        logger.error(`[${new Date().toLocaleTimeString()}] Invalid response from the server. Users data is not in the expected format.`);
        return;
      }

      const user = usersData.find((user) => user.username === trimmedUsername);

      if (!user) {
        displayStatusMessage(`User Not found in the DB!`);
        setUserData(null);
        setModuleEntries([]);
        return;
      }

      const dbuserid = user.id;
      setGbuserid(dbuserid);
      logger.info(`[${new Date().toLocaleTimeString()}] DB user id: ${dbuserid}`);

      // Check if the user exists in adm.user_module_permissions table
      const permissionsResponse = await axios.get(
        `${API_URL}/list_user_permissions`,
        {
          headers: generateHeaders(), // Include headers here
        }
      );
      const userPermissionsData =
        permissionsResponse.data.user_module_permissions;

      if (Object.keys(userPermissionsData).length === 0 || !Array.isArray(userPermissionsData)) {
        displayStatusMessage("The fetched Data is not proper or null")
        return;
      }

      logger.info(`[${new Date().toLocaleTimeString()}] User Permissions data: ${userPermissionsData}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Seems userPermissionsData is an Array`);

      const userPermissions = userPermissionsData.find(
        (perm) => perm.user_id === dbuserid
      );
      logger.info(`[${new Date().toLocaleTimeString()}] User permissions id: ${userPermissions.id}`);

      const userPermissionsbyUserid = userPermissionsData.filter(
        (perm) => perm.user_id === dbuserid
      );
      logger.info(`[${new Date().toLocaleTimeString()}] User permissions by User id: ${JSON.stringify(userPermissionsbyUserid)}`);
      if (userPermissionsbyUserid.length > 0) {
        // If the user exists in adm.user_module_permissions table, set the module entries for editing
        logger.info(`[${new Date().toLocaleTimeString()}] User is present in the permissions table as well`);
        setUserData(user);

        const moduleEntriesForUser = userPermissionsbyUserid.map(
          (permission) => ({
            //folder_name: permission.module,
            module: permission.module,
            read_permission: permission.read_permission,
            write_permission: permission.write_permission,
            update_permission: permission.update_permission,
            delete_permission: permission.delete_permission,
          })
        );

        setModuleEntries(moduleEntriesForUser);
      } else {
        // If the user does not exist in adm.user_module_permissions table, reset module entries
        logger.info(`[${new Date().toLocaleTimeString()}] User is not present in the permissions table`);
        setUserData(user);
        setModuleEntries([]);
      }
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching users: ${error}`);
    }
  };

  const handleModuleEntryChange = (index, event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? checked : value;

    setModuleEntries((prevEntries) => {
      const updatedEntries = [...prevEntries];
      updatedEntries[index] = {
        ...updatedEntries[index],
        [name]: newValue,
      };
      return updatedEntries;
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const updatedModuleEntries = moduleEntries.map((entry) => ({
      ...entry,
      user_id: gbuserid, // Add the dbuserid as the value of user_id for each entry
    }));

    logger.info(`[${new Date().toLocaleTimeString()}] Request data: ${JSON.stringify(updatedModuleEntries)}`);

    try {
      const response = await axios.post(
        `${API_URL}/create_permissions`,
        updatedModuleEntries,
        {
          headers: generateHeaders(), // Include headers here
        }
      );

      logger.info(`[${new Date().toLocaleTimeString()}] Response data: ${JSON.stringify(response.data)}`);
      // Clear form fields after successful submission
      setUsername("");
      setUserData(null);
      setModuleEntries([]);
      // Display success message
      displayStatusMessage("Permissions saved successfully!");
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error creating/updating permission: ${error}`);
      // Display error message
      displayStatusMessage(
        "Error saving permissions. Please try again later.",
        5000
      );
    }
  };

  return (
    <div className="child-container form-container">
      <h3 className="title">Assign Module Access to User</h3>
      {hasRequiredAccess ? (
        <form onSubmit={handleSubmit}>
          {statusMessage && <div className="status-message">{statusMessage}</div>}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="username">Username :</label>
              </div>
              <input
                type="text"
                id="usernameInput"
                name="usernameInput"
                value={username}
                onChange={handleUsernameChange}
                className="form-control input-field"
              />
              <button
                type="button"
                onClick={handleCheckUser}
                className="menu-button"
              >
                CheckUser
              </button>
            </div>
          </div>
          {userData && (
            <div>
              <h4 className="sub-title">Permissions for {userData.username}</h4>
              {moduleEntries.map((entry, index) => (
                <div key={index} className="form-row">
                  <div className="label-container">
                    <label htmlFor={`module`}>Module:</label>
                  </div>
                  <input
                    type="text"
                    id={`module`}
                    name="module"
                    defaultValue={entry.module}
                    className="permission-row"
                  />
                  <label>
                    <input
                      type="checkbox"
                      name={`read_permission`}
                      checked={entry.read_permission}
                      onChange={(event) => handleModuleEntryChange(index, event)}
                    />
                    Read
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name={`write_permission`}
                      checked={entry.write_permission}
                      onChange={(event) => handleModuleEntryChange(index, event)}
                    />
                    Write
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name={`update_permission`}
                      checked={entry.update_permission}
                      onChange={(event) => handleModuleEntryChange(index, event)}
                    />
                    Update
                  </label>
                  <label>
                    <input
                      type="checkbox"
                      name={`delete_permission`}
                      checked={entry.delete_permission}
                      onChange={(event) => handleModuleEntryChange(index, event)}
                    />
                    Delete
                  </label>
                </div>
              ))}

            </div>
          )}
          <div className="right-side-form-button">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCancel}
            >
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              Save Permissions
            </button>
          </div>
        </form>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
};

export default GrantPermissionsForm;
