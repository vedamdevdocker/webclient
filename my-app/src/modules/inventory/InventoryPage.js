import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import ReceiptsPage from "./receipts/ReceiptsPage";
import TransactionsPage from "./transactions/TransactionsPage";
import HandlingPage from "./handling/HandlingPage";
import StoragePage from "./storagesystem/StoragePage";
import logger from "../utilities/Logs/logger";

export default function InventoryPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] InventoryPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [
    HandlingPage,
    TransactionsPage,
    ReceiptsPage,
    StoragePage,
  ];

  const helpComponentsToRender = ["InventoryPage"];

  // Function to render components in rows
  const renderComponentsInRows = (components, componentsPerColumn) => {
    const rows = [];
    for (let i = 0; i < components.length; i += componentsPerColumn) {
      const row = components.slice(i, i + componentsPerColumn);
      rows.push(row);
    }
    return rows;
  };

  // Set the number of components per row
  const componentsPerColumn = 2;

  // Render components in rows
  const rowsOfComponents = renderComponentsInRows(componentsToRender, componentsPerColumn);

  return (
    <div className="page-container">
      {/* Log the page title with timestamp */}
      <h1 className="title">Inventory Operations</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <div className="menu-list-container">
            {rowsOfComponents.map((row, rowIndex) => (
              <div key={rowIndex} className="row-container">
                {row.map((Component, columnIndex) => (
                  <Component key={columnIndex} />
                ))}
              </div>
            ))}
          </div>
        </div>
        <DocumentationContainer componentNames={helpComponentsToRender} />
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}
