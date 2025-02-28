import React, { useEffect } from "react";
import logger from "../../../utilities/Logs/logger"; // Import the logger with timestamps

export default function ViewBOMResultsPage({ explodedBOM }) {
  useEffect(() => {
    // Log a message when the component mounts
    console.log("Exploded BOM",explodedBOM)
    logger.info(`[${new Date().toLocaleTimeString()}] ResultsContainer component has mounted.`);

    // Log the number of explodedBOM items
    logger.debug(`[${new Date().toLocaleTimeString()}] Number of explodedBOM items: ${explodedBOM.length}`);
    
    // Cleanup function: Log a message when the component unmounts
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] ResultsContainer component is unmounting.`);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="results-container">
      <div className="model-item-quantity">
        <p><span className="model-item-label">Model Item:</span> <span className="model-item-value">{explodedBOM[0]?.ModelItemCode}</span></p>
        <p><span className="quantity-label">Quantity:</span> <span className="quantity-value">{explodedBOM[0]?.RequiredModelQty}</span></p>
      </div>
      
      <table className="table table-striped table-bordered center-aligned-table">
        <thead>
          <tr>
            <th>Level</th>
            <th>Component Item</th>
            <th>BOM Quantity</th>
            <th>Req Quantity</th>
            <th>UOM</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {explodedBOM.map((item, index) => (
            <tr key={index} className="table-row">
              <td>{item.ComponentLevelInBOM}</td>
              <td>{item.ComponentItemCode}</td>
              <td>{parseInt(item.ComponetDefaultQty)}</td>
              <td>{item.ComponentRequiredQty}</td>
              <td>{item.ComponentUOMName}</td>
              {/* Render more table row data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
