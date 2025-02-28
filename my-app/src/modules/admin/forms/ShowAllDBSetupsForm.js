import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../utilities/css/appcss.css";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../setups/ConstDecl"; // Import your constants
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function ShowAllDBSetupsForm() {
  const [configData, setConfigData] = useState([]);
  const [userData, setUserData] = useState([]);
  const [error, setError] = useState(null);
  const [isGeneratingFile, setIsGeneratingFile] = useState(false);
  const [useApiUrlFromFile, setUseApiUrlFromFile] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [generationMessage, setGenerationMessage] = useState("");

  const hasRequiredAccess = CheckModuleAccess(BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS); // Use your access checking function

  const getFinalApiUrl = () => {
    if (useApiUrlFromFile) {
      return `${API_URL}/list_db_config_data`;
    } else if (apiUrl) {
      return `${apiUrl}/list_db_config_data`;
    }
    return "";
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const finalApiUrl = getFinalApiUrl();

        const authToken = localStorage.getItem('token');
        const userid = localStorage.getItem('userid');

        const headers = {
          'Authorization': `Bearer ${authToken}`,
          'UserId': userid,
        };

        logger.info(`[${new Date().toLocaleTimeString()}] Fetching data from API URL: ${finalApiUrl}`);

        const response = await axios.get(finalApiUrl, { headers });
        const { config_data, user_data } = response.data;

        setConfigData(config_data);
        setUserData(user_data);
        setError(null);
        setGenerationMessage("");
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching data:`, error);
        setError("An error occurred while fetching data.");
      }
    };

    if (useApiUrlFromFile || apiUrl) {
      fetchData();
    }
    // eslint-disable-next-line
  }, [apiUrl, useApiUrlFromFile]);

  const handleGenerateFile = async () => {
    const finalApiUrl = getFinalApiUrl();

    if (!finalApiUrl) {
      setError("Please enter a valid API URL or check 'Retrieve Configuration Data by API URL'.");
      return;
    }

    setIsGeneratingFile(true);
    setGenerationMessage("Generating File...");

    try {
      logger.info(`[${new Date().toLocaleTimeString()}] Generating file from API URL: ${finalApiUrl}`);

      const response = await axios.get(finalApiUrl);

      // Extract config_data from the response
      const { config_data, user_data } = response.data;

      // Create a mapping of config_key to config_value
      const configMapping = {};
      config_data.forEach((config) => {
        configMapping[config.config_key] = config.config_value;
      });

      // Define the content for config.py
      let fileContent = `from datetime import timedelta\n`;

      Object.keys(configMapping).forEach((key) => {
        const value = configMapping[key];
        if (value === "True" || value === "False") {
          // Handle "True" and "False" values as booleans without quotes
          fileContent += `${key} = ${value}\n`;
        } else if (value.match(/timedelta\(.*\)/)) {
          // Handle timedelta values without quotes
          fileContent += `${key} = ${value}\n`;
        } else {
          fileContent += `${key} = "${value}"\n`;
        }
      });

      // Generate APPLICATION_CREDENTIALS based on config_data
      fileContent += `APPLICATION_CREDENTIALS = [\n`;
      user_data.forEach((user, index) => {
        fileContent += `    {"userid": "${user.userid}", "username": "${user.username}", "name": "${user.name}", "password": "${user.password}"},\n`;
      });
      fileContent += `]\n`;

      // Create a Blob with the file content
      const blob = new Blob([fileContent], { type: "text/plain" });
      const url = window.URL.createObjectURL(blob);

      // Create a download link and trigger the download
      const a = document.createElement("a");
      a.href = url;
      a.download = "config.py";
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);

      setIsGeneratingFile(false);
      setGenerationMessage("File Generated!");
      setError("");
      logger.info(`[${new Date().toLocaleTimeString()}] File Generated`);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error generating file:`, error);
      setIsGeneratingFile(false);
      setGenerationMessage("Error generating file.");
      setError("An error occurred while generating the file.");
    }
  };

  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
    setUseApiUrlFromFile(false);
    setConfigData([]);
    setUserData([]);
    setError("");
    logger.info(`[${new Date().toLocaleTimeString()}] API URL changed: ${event.target.value}`);
  };

  const handleUseApiUrlFromFileChange = (event) => {
    setUseApiUrlFromFile(event.target.checked);
    setApiUrl("");
    setConfigData([]);
    setUserData([]);
    setError("");
    logger.info(`[${new Date().toLocaleTimeString()}] Use API URL from file: ${event.target.checked}`);
  };

  return (
    <div className="child-container menu-container">
      <h2>Database Configurations</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <label htmlFor="serverUrl" className="label-container">
                Server URL:
              </label>
              <input
                type="text"
                id="serverUrl"
                placeholder="Enter API URL"
                value={apiUrl}
                onChange={handleApiUrlChange}
                className="form-control input-field"
                disabled={useApiUrlFromFile}
              />
            </div>
          </div>
          <div className="form-check">
            <input
              type="checkbox"
              id="ignoreUrlEntry"
              checked={useApiUrlFromFile}
              onChange={handleUseApiUrlFromFileChange}
              className="form-check-input"
              disabled={!!apiUrl}
            />
            <label htmlFor="ignoreUrlEntry" className="form-check-label">
              Retrieve Configuration Data by API URL
            </label>
          </div>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              {configData && configData.length > 0 && (
                <div>
                  <h3>Configuration Data</h3>
                  <table className="striped-table">
                    <thead>
                      <tr className="table-header">
                        <th>Config Key</th>
                        <th>Config Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {configData.map((config, index) => (
                        <tr key={index}>
                          <td>{config.config_key}</td>
                          <td>{config.config_value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              {userData && userData.length > 0 && (
                <div>
                  <h3>User Data</h3>
                  <table className="striped-table">
                    <thead>
                      <tr className="table-header">
                        <th>User ID</th>
                        <th>Username</th>
                        <th>Name</th>
                        <th>Password</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userData.map((user, index) => (
                        <tr key={index}>
                          <td>{user.userid}</td>
                          <td>{user.username}</td>
                          <td>{user.name}</td>
                          <td>{user.password}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <button
                onClick={handleGenerateFile}
                className="btn btn-primary"
                disabled={isGeneratingFile}
              >
                {isGeneratingFile ? "Generating File..." : "Generate File"}
              </button>
              <p>{generationMessage}</p>
            </>
          )}
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default ShowAllDBSetupsForm;
