import React, { useEffect } from "react";
import AdminPageMenu from "./menus/AdminPageMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";

// Import your logger utility here
import logger from "../utilities/Logs/logger";

export default function AdminPage() {
  // Log an info message with the current time when the AdminPage component starts rendering
  logger.info(`[${new Date().toLocaleTimeString()}] AdminPage component is rendering.`);

  // Create an array of components to render
  const componentsToRender = [AdminPageMenu]; // Add other components as needed

  useEffect(() => {
    // Log a message when the component mounts
    logger.info(`[${new Date().toLocaleTimeString()}] AdminPage component has mounted.`);

    // You can also log additional information as needed
    logger.debug(`[${new Date().toLocaleTimeString()}] Debug message for component mount.`);
    
    // Cleanup function: Log a message when the component unmounts
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] AdminPage component is unmounting.`);
    };
  }, []);

  return (
    <div className="page-container">
      <h1 className="title">Access Management</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Functions of Accessmanagment" color="#FFD799">
            {componentsToRender.map((Component, index) => (
              <Component key={index} />
            ))}
          </DisplayCard>
        </div>
        <DocumentationContainer  componentNames={componentsToRender.map(component => component.name)} />

      </div>
      <BottomContainer />
      {/* Log a debug message with the current time when the RotatingImage component is rendered */}
      {RotatingImage && logger.debug(`[${new Date().toLocaleTimeString()}] RotatingImage component is rendered.`)}

      {/* Log a warning message with the current time when BottomContainer is included */}
      {BottomContainer && logger.warn(`[${new Date().toLocaleTimeString()}] BottomContainer is included.`)}
    </div>
  );
}
