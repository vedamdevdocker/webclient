import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_ADMIN_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

const AssignUserModulesForm = () => {
  const [formData, setFormData] = useState({
    username: "",
  });

  const [moduleList, setModuleList] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [error, setError] = useState("");
  const [userOptions, setUserOptions] = useState([]);
  const [fetchedModules, setFetchedModules] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_ADMIN_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  // Function to generate headers with Authorization token and UserId
  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
      // Add other headers if needed
    };
  };

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    fetchModuleList();
    fetchUserOptions();
    // eslint-disable-next-line
  }, [hasRequiredAccess]);


  const fetchModuleList = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_modules`, {
        headers: generateHeaders(), // Include headers here
      });
      setModuleList(response.data.modules);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching module list: ${error}`
      );
    }
  };

  const fetchUserOptions = async () => {
    try {
      const response = await axios.get(`${API_URL}/list_users`, {
        headers: generateHeaders(),
      });

      const usersData = response.data.users;
      if (Array.isArray(usersData)) {
        const options = usersData.map((user) => ({
          value: user.id,
          label: `${user.username} (${user.id})`, // Display username(id) in LOV
        }));
        setUserOptions(options);
      }
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching user options: ${error}`
      );
    }
  };

  const handleUsernameChange = (event) => {
    setFormData({
      ...formData,
      username: event.target.value, // Set selected user_id
    });
  };

  const handleCancel = () => {
    setFormData({ username: "" });
    setSelectedModule("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.username || !selectedModule) {
      setError("Please select both username and Module name.");
      return;
    }

    logger.info(
      `[${new Date().toLocaleTimeString()}] Selected Module: ${selectedModule}`
    );
    logger.info(
      `[${new Date().toLocaleTimeString()}] Selected user id: ${formData.username}`
    );

    console.log()

    // Check if the user and module combination already exists in the fetched modules
    const isAlreadyAssigned = fetchedModules.includes(selectedModule);

    if (isAlreadyAssigned) {
      setError("User is already assigned to the selected module.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/create_permissions`,
        [
          {
            user_id: formData.username,
            module: selectedModule,
          },
        ],
        {
          headers: generateHeaders(),
        }
      );

      logger.info(
        `[${new Date().toLocaleTimeString()}] Response data: ${JSON.stringify(
          response.data
        )}`
      );
      // Clear form field after successful submission
      // setFormData({ username: "" });
      // setSelectedModule("");
      // Refetch user permissions to update fetchedModules
      handleCheckUserPermissions();
    } catch (error) {
      setError(
        `[${new Date().toLocaleTimeString()}] Error creating/updating permission: ${error}`
      );
      logger.error(`[${new Date().toLocaleTimeString()}] ${error}`);
    }
  };


  const handleCheckUserPermissions = async () => {
    try {
      if (!formData.username) {
        setError("Please select a username.");
        return;
      }

      const response = await axios.get(`${API_URL}/list_user_permissions?user_id=${formData.username}`, {
        headers: generateHeaders(),
      });

      const userPermissionsData = response.data.user_module_permissions;

      console.log("User permissions ", userPermissionsData)

      const userModulesList = userPermissionsData.map((permission) => permission.module);

      setFetchedModules(userModulesList);
      setError(""); // Clear any previous error
      logger.info(`[${new Date().toLocaleTimeString()}] User Module List: ${userModulesList.join(", ")}`);
    } catch (error) {
      setError(`Error fetching user permissions: ${error}`);
      logger.error(`[${new Date().toLocaleTimeString()}] ${error}`);
    }
  };


  return (
    <div className="child-container form-container">
      <h2 className="title">Module Allocation to Users</h2>
      {hasRequiredAccess ? (
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="username">Username:</label>
              </div>
              <select
                id="username"
                name="username"
                value={formData.username}
                onChange={handleUsernameChange}
                className="form-control input-field"
              >
                <option value="">Select Username</option>
                {userOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={handleCheckUserPermissions}
                className="menu-button"
              >
                Checkuser
              </button>
            </div>
            {fetchedModules.length > 0 && (
              <div>
                <div className="form-row">
                  <p>
                    For this user the following list of module(s) are assigned : <u>{fetchedModules.join(", ")}</u>{" "}
                  </p>
                </div>
              </div>
            )}
            {error && (
              <div className="form-row">
                <p className="error-message">{error}</p>
              </div>
            )}
          </div>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectModule">Select Module:</label>
              </div>
              <select
                id="selectModule"
                name="selectModule"
                value={selectedModule}
                onChange={(event) => setSelectedModule(event.target.value)}
                className="form-control input-field"
              >
                <option value="">Select Module</option>
                {moduleList.map((module) => (
                  <option key={module.id} value={module.folder_name}>
                    {module.folder_name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="button"
            onClick={handleCancel}
            className="btn btn-secondary"
          >
            Cancel
          </button>
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
};

export default AssignUserModulesForm;
