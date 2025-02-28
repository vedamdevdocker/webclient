import React from "react";
import ProductsCatMenu from "./menus/ProductsCatMenu";
import "../../utilities/css/appcss.css";
import DisplayCard from "../../utilities/DisplayCard";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

export default function ProductCategoriesPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ProductCategoriesPage component is rendering.`);

  return (
    <DisplayCard title="Manage Product Categories" color="#FFD799">
      <div className="child-container form-container">
        <div className="menu-list">
          <ProductsCatMenu />
        </div>
      </div>
    </DisplayCard>
  );
}