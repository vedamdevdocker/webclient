import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../utilities/css/appcss.css";
import ConfigFileGenerator from "../ConfigFileGenerator";
import { API_URL, BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../setups/ConstDecl"; // Import your constants
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

// Import your logger utility here
import logger from "../../utilities/Logs/logger";

function ShowAllUISetupsForm() {
  const [configData, setConfigData] = useState([]);
  const [error, setError] = useState(null);
  const [isGeneratingFile, setIsGeneratingFile] = useState(false);
  const [useApiUrlFromFile, setUseApiUrlFromFile] = useState(false);
  const [apiUrl, setApiUrl] = useState("");
  const [generationMessage, setGenerationMessage] = useState(""); // Added a state for generation message

  const hasRequiredAccess = CheckModuleAccess(BACKEND_ADMIN_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS); // Use your access checking function

  const getFinalApiUrl = () => {
    if (useApiUrlFromFile) {
      return `${API_URL}/list_ui_config_data`;
    } else if (apiUrl) {
      return `${apiUrl}/list_ui_config_data`;
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

        logger.info(`[${new Date().toLocaleTimeString()}] Fetching config data from API URL: ${finalApiUrl}`);

        const response = await axios.get(finalApiUrl, { headers });
        setConfigData(response.data);
        setError(null);
        setGenerationMessage("");
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching config data:`, error);
        setError("An error occurred while fetching data.");
      }
    };

    if (useApiUrlFromFile || apiUrl) {
      fetchData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

      // Simulate file generation with a timeout
      await new Promise((resolve) => setTimeout(resolve, 2000));

      setIsGeneratingFile(false);
      setGenerationMessage("File Generated!");
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error generating file:`, error);
      setIsGeneratingFile(false);
      setGenerationMessage("Error generating file.");
      setError("An error occurred while generating the file.");
    }
  };

  const handleApiUrlChange = (event) => {
    setApiUrl(event.target.value);
    setUseApiUrlFromFile(false); // Disable the checkbox when input is entered
    setConfigData([]); // Clear the table data
    setError(""); // Clear any previous error message
    logger.info(`[${new Date().toLocaleTimeString()}] API URL changed: ${event.target.value}`);
  };

  const handleUseApiUrlFromFileChange = (event) => {
    setUseApiUrlFromFile(event.target.checked);
    setApiUrl(""); // Clear the input field when checkbox is selected
    setConfigData([]); // Clear the table data
    setError(""); // Clear any previous error message
    logger.info(`[${new Date().toLocaleTimeString()}] Use API URL from file: ${event.target.checked}`);
  };

  return (
    <div className="child-container menu-container">
      <h2>Config Management & Export</h2>
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
                disabled={useApiUrlFromFile} // Disable input when checkbox is selected
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
              disabled={!!apiUrl} // Disable checkbox when input has a value
            />
            <label htmlFor="ignoreUrlEntry" className="form-check-label">
              Retrieve Configuration Data by API URL
            </label>
          </div>
          {error ? (
            <p>{error}</p>
          ) : (
            <>
              {configData.length > 0 && (
                <table className="striped-table">
                  <thead>
                    <tr className="table-header">
                      <th>Config Key</th>
                      <th>Config Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {configData.map((config) => (
                      <tr key={config.config_key}>
                        <td>{config.config_key}</td>
                        <td>{config.config_value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
              <button
                onClick={handleGenerateFile}
                className="btn btn-primary"
                disabled={isGeneratingFile}
              >
                {isGeneratingFile ? "Generating File..." : "Generate File"}
              </button>
              <p>{generationMessage}</p>
              {isGeneratingFile && <ConfigFileGenerator apiUrl={getFinalApiUrl()} />}
            </>
          )}
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default ShowAllUISetupsForm;
