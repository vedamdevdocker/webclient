import React from "react";
import ProductMenu from "./menus/ProductMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function ProductPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ProductPage component is rendering.`);

  return (
    <DisplayCard title="Manage Products" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <ProductMenu />
        </div>
      </div>
    </DisplayCard>
  );
}
