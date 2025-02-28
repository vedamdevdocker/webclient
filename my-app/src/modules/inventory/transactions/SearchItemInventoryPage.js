import React, { useState } from "react";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";
import DocumentationContainer from "../../utilities/DocumentationContainer";
import logger from "../../utilities/Logs/logger"; // Import your logger module here
import SearchItemInventoryForm from "./forms/SearchItemInventoryForm";
import ItemInventoryResultsPage from "./ItemInventoryResultsPage";

function SearchItemInventoryPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering Search Item Inventory Page`);

  const [SearchItemInventory, setSearchItemInventory] = useState([]); // State to store the exploded BOM data

  // Define the list of components to render
  const componentsToRender = [
    <SearchItemInventoryForm updateSearchItemInventory={setSearchItemInventory} />,
  ];

  const helpComponentsToRender = ["SearchItemInventoryPage"];

  if (SearchItemInventory.length > 0) {
    componentsToRender.push(<ItemInventoryResultsPage SearchItemInventory={SearchItemInventory} />);
  } else {
    componentsToRender.push(<DocumentationContainer componentNames={helpComponentsToRender} />);
  }

  return (
    <div className="page-container">
      <h1 className="title">Search Inventory Items</h1>
      <div className="side-by-side-container">
        {componentsToRender.map((Component, index) => (
          <React.Fragment key={index}>{Component}</React.Fragment>
        ))}
      </div>
      <RotatingImage />
      <BottomContainer />
    </div>
  );
}

export default SearchItemInventoryPage;
