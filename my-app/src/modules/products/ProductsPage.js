import React from "react";
import ProductPage from "./product/ProductPage";
import ProductCategoriesPage from "./productcategories/ProductCategoriesPage";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import logger from "../utilities/Logs/logger"; // Import your logger module here

export default function ProductsPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] ProductsPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [ProductPage, ProductCategoriesPage];

  const helpComponentsToRender = ["ProductsPage"];

  return (
    <div className="page-container">
      <h1 className="title">Products and Categories</h1>
      <div className="parent-container">
        <div className="child-container menu-container">
          <div className="menu-list-container">
            {componentsToRender.map((Component, index) => (
              <Component key={index} />
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
