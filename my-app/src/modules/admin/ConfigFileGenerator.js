import React, { useEffect } from "react";
import axios from "axios";

// Import your logger utility here
import logger from "../utilities/Logs/logger";

const ConfigFileGenerator = ({ apiUrl }) => {
  useEffect(() => {
    const fetchConfigData = async () => {
      try {
        const response = await axios.get(apiUrl);

        // Log the API URL sent as a parameter to ConfigFileGenerator with the current time
        logger.info(`[${new Date().toLocaleTimeString()}] The API URL sent as a parameter to ConfigFileGenerator: ${apiUrl}`);

        // Log the response data with the current time
        logger.debug(`[${new Date().toLocaleTimeString()}] The Response data`, response.data);

        const generateConfigFile = (data, apiURL) => {
          const configContent = data.reduce((content, item) => {
            return `${content}export const ${item.config_key} = "${item.config_value}";\n`;
          }, "");

          const comment = "// Data generated from the apiUrl " + apiURL;

          // Log the API URL before creating the file with the current time
          logger.debug(`[${new Date().toLocaleTimeString()}] Console log of API URL: ${apiURL}`);

          const fileName = "ConstDecl.js"; // File name

          const blob = new Blob([comment, "\n", configContent], { type: "text/javascript" });
          const url = window.URL.createObjectURL(blob);

          const link = document.createElement("a");
          link.href = url;
          link.download = fileName;

          document.body.appendChild(link);
          link.click();

          window.URL.revokeObjectURL(url);
        };

        generateConfigFile(response.data, apiUrl);
      } catch (error) {
        // Log an error message if there's an error fetching config data with the current time
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching config data:`, error);
      }
    };

    fetchConfigData();
  }, [apiUrl]);

  return <div>Generating Config File...</div>;
};

export default ConfigFileGenerator;
