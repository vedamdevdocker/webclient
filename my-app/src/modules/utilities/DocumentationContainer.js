import React, { useState, useEffect, Suspense } from "react";
import { IS_INAPP_HELP_NEEDED } from "../admin/setups/ConstDecl"; // Import your constants
import logger from "./Logs/logger";
import "../utilities/css/appcss.css";

// Import all files from the inapp-help/display folder dynamically using require.context
const requireFiles = require.context("../../inapp-help/display", false, /^\.\/HELP_.*\.js$/);

// Create a map of components from the context to easily reference them by name
const allComponents = requireFiles.keys().reduce((componentsMap, filePath) => {
  const componentName = filePath.replace("./", "").replace(".js", "");
  componentsMap[componentName] = requireFiles(filePath).default;
  return componentsMap;
}, {});

const imagePaths = [
  require("./images/lake-am.jpg"),
  require("./images/Red River Grass.png"),
  require("./images/Red River1.png"),
  // Add more image paths here
];

export default function DocumentationContainer(props) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [resolvedComponents, setResolvedComponents] = useState([]);

  useEffect(() => {
    logger.info(
      `[${new Date().toLocaleTimeString()}] DocumentationContainer is rendered`
    );

    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imagePaths.length);
    }, 30000); // 30 seconds in milliseconds

    return () => {
      logger.info(
        `[${new Date().toLocaleTimeString()}] DocumentationContainer is unmounted`
      );
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    if (props.componentNames && Array.isArray(props.componentNames) && IS_INAPP_HELP_NEEDED) {
      const dynamicComponentPromises = [];

      console.log(`Arrived Component : ${props.componentNames}`);
      console.log(`Arrived all properties : ${props}`);

      props.componentNames.forEach((componentName) => {
        // Add "HELP_" prefix to the componentName to match the imported files
        const docComponentName = `HELP_${componentName}`;


        console.log(`Looking for component: ${docComponentName}`);

        // Check if the component exists in the allComponents map
        if (allComponents[docComponentName]) {
          dynamicComponentPromises.push(Promise.resolve(allComponents[docComponentName]));
        } else {
          console.error(`Component ${docComponentName} not found`);
          dynamicComponentPromises.push(Promise.resolve(null)); // Return null if not found
        }
      });

      // Set the resolved components after all promises have resolved
      Promise.all(dynamicComponentPromises).then((resolvedComponents) => {
        setResolvedComponents(resolvedComponents.filter((comp) => comp !== null)); // Remove null entries
      });
    }
  }, [props.componentNames]);

  const backgroundImageStyle = {
    backgroundImage:
      currentImageIndex !== undefined
        ? `url(${imagePaths[currentImageIndex]?.default})`
        : "none",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center center",
    opacity: 0.8,
  };

  return (
    <div className={`child-container empty-container ${IS_INAPP_HELP_NEEDED ? 'help-enabled' : 'help-disabled'}`} style={backgroundImageStyle}>
      <div className="documentation-content">
        {IS_INAPP_HELP_NEEDED ? (
          <Suspense fallback={<div>Loading...</div>}>
            {resolvedComponents.map((DynamicComponent, index) =>
              DynamicComponent ? <DynamicComponent key={index} /> : null
            )}
          </Suspense>
        ) : (
          <p className="no-help-text-message">Help text is not enabled.</p>
        )}
      </div>
    </div>
  );
}
