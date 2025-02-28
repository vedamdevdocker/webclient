import React from "react";
import EmployeeMenu from "./menus/EmployeeMenu";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import DisplayCard from "../utilities/DisplayCard";
import logger from "../utilities/Logs/logger";

export default function EmployeePage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Loading EmployeePage.`);

  // Define the list of components to render
  const componentsToRender = [EmployeeMenu];

  const helpComponentsToRender = ["EmployeePage"];

  return (
    <div className="page-container">
      <h1 className="title">Manage Employees</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <DisplayCard title="Employees" color="#FFD799">
            <div className="child-container form-container">
              <div className="menu-list">
                {componentsToRender.map((Component, index) => (
                  <Component key={index} />
                ))}
              </div>
            </div>
          </DisplayCard>
        </div>
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
