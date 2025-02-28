import React, { useEffect } from "react";
import logger from "../../../utilities/Logs/logger"; // Import the logger with timestamps

export default function ViewBOMPage({ explodedBOM, bomByDescriptions }) {


  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] ResultsContainer component has mounted.`);
    logger.debug(`[${new Date().toLocaleTimeString()}] Number of explodedBOM items: ${explodedBOM.length}`);
    logger.debug(`[${new Date().toLocaleTimeString()}] BOM Explosion by descriptions ?: ${bomByDescriptions}`);
    console.log('BOM description value', bomByDescriptions);

    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] ResultsContainer component is unmounting.`);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="results-container">
      <div className="model-item-quantity">
        {/* Assuming explodedBOM is not empty */}
        <p>
          <span className="model-item-label">Model Item:</span> 
          <span className="model-item-value">
            {bomByDescriptions ? explodedBOM[0]?.ModelItem_name : explodedBOM[0]?.ModelItem_code}
          </span>
        </p>
      </div>
      
      <table className="table table-striped table-bordered center-aligned-table">
        <thead>
          <tr>
            <th>Model Item</th>
            <th>Level</th>
            <th>Parent Item</th>
            <th>Component Item</th>
            <th>Quantity</th>
            <th>UOM</th>
            <th>Revision</th>            
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {explodedBOM.map((item, index) => (
            <tr key={item.ID} className="table-row">
              <td>{bomByDescriptions ? item.ModelItem_name : item.ModelItem_code}</td>
              <td>{item.Level}</td>
              <td>{bomByDescriptions ? item.ParentItem_name : item.ParentItem_code}</td>    
              <td>{bomByDescriptions ? item.ComponentItem_name : item.ComponentItem_code}</td>             
              <td>{parseInt(item.Quantity)}</td>
              <td>{item.uom}</td>
              <td>{item.Revision}</td>
              {/* Render more table row data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
