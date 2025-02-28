import React, { useEffect } from "react";
import "../utilities/css/appcss.css";
import HomePageMenu from "./menus/HomePageMenu";
//import HomePageMenu1 from "./menus/HomePageMenu1";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";
import { APPLICATION_NAME, APPLICATION_LEVEL } from "../admin/setups/ConstDecl";
import logger from "../utilities/Logs/logger";

export default function HomePage() {
  useEffect(() => {
    // Log a message when the component mounts
    logger.info(`[${new Date().toLocaleTimeString()}] HomePage component has mounted (Environment: ${APPLICATION_LEVEL}).`);

    // You can also log additional information as needed
    logger.debug(`[${new Date().toLocaleTimeString()}] Debug message for component mount.`);

    // Cleanup function: Log a message when the component unmounts
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] HomePage component is unmounting.`);
    };
  }, []);

  // Create an array of components to render
  const componentsToRender = [HomePageMenu];
  const helpComponentsToRender = ["HomePageMenu"];

  return (
    <div className="page-container">
      <h1 className="title">{APPLICATION_NAME}</h1>

      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Functional Modules" color="#FFD799">
            {componentsToRender.map((Component, index) => (
              <Component key={index} />
            ))}
            <RotatingImage />
          </DisplayCard>
        </div>
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <BottomContainer />
    </div>
  );
}
