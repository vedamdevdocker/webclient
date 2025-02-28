import React, { useEffect } from "react";
import logger from "../../utilities/Logs/logger";  // Import the logger with timestamps

export default function ItemInventoryResultsPage({ SearchItemInventory }) {
  useEffect(() => {
    // Log a message when the component mounts
    logger.info(`[${new Date().toLocaleTimeString()}] ResultsContainer component has mounted.`);
    console.log("Search", SearchItemInventory);

    // Log the number of explodedBOM items
    logger.debug(`[${new Date().toLocaleTimeString()}] Number of Items items: ${SearchItemInventory.length}`);

    // Cleanup function: Log a message when the component unmounts
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] ResultsContainer component is unmounting.`);
    };
    // eslint-disable-next-line
  }, []);

  return (
    <div className="results-container">
      <table className="table table-striped table-bordered center-aligned-table">
        <thead>
          <tr>
            <th>Inventory ID</th>
            <th>Transaction Number</th>
            <th>Item Code</th>
            <th>Item Name</th>
            <th>Quantity</th>
            <th>UOM</th>
            <th>Bin</th>
            <th>Rack</th>
            <th>Row</th>
            <th>Aisle</th>
            <th>Zone</th>
            <th>Location</th>
            <th>Warehouse</th>
            <th>Pick Released?</th>
            <th>Released for</th>
            {/* Add more table headers as needed */}
          </tr>
        </thead>
        <tbody>
          {SearchItemInventory.map((item, index) => (
            <tr key={index} className="table-row">
              <td>{item.inventory_id}</td>
              <td>{item.transaction_id}</td>
              <td>{item.item_code}</td>
              <td>{item.item_name}</td>
              <td>{parseInt(item.quantity)}</td>
              <td>{item.uom_name}</td>
              <td>{item.bin_name}</td>
              <td>{item.rack_name}</td>
              <td>{item.row_name}</td>
              <td>{item.aisle_name}</td>
              <td>{item.zone_name}</td>
              <td>{item.location_name}</td>
              <td>{item.warehouse_name}</td>
              <td>{item.status}</td>
              <td>{item.subject}</td>
              {/* Render more table row data as needed */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
