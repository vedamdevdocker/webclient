import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "../utilities/RotatingImage";
import BottomContainer from "../utilities/BottomContainer";
import DocumentationContainer from "../utilities/DocumentationContainer";
import UOMPage from "./uoms/UOMPage";
import TaxCodesPage from "./taxcodes/TaxCodesPage";
import ExchangeRatesPage from "./exchangerates/ExchangeRatesPage";
import CurrenciesPage from "./currencies/CurrenciesPage";
import BOMPage from "./bom/BOMPage";
import BusinessPartnersPage from "./businesspartner/BusinessPartnersPage";
import LegalEntityPage from "./legalentity/LegalEntityPage";
import GroupCompaniesPage from "./groupcompany/GroupCompaniesPage";
import CompaniesPage from "./company/CompaniesPage";
import DepartmentsPage from "./department/DepartmentsPage";
import logger from "../utilities/Logs/logger";

export default function CommonPage() {
  // Log the component rendering with timestamp
  logger.info(`[${new Date().toLocaleTimeString()}] CommonPage component is rendering.`);

  // Define the list of components to render
  const componentsToRender = [
    BusinessPartnersPage,
    UOMPage,
    TaxCodesPage,
    ExchangeRatesPage,
    CurrenciesPage,
    BOMPage,
    LegalEntityPage,
    GroupCompaniesPage,
    CompaniesPage,
    DepartmentsPage
  ];

  const helpComponentsToRender = ["CommonPage"];

  // Function to render components in rows
  const renderComponentsInRows = (components, componentsPerRow) => {
    const rows = [];
    for (let i = 0; i < components.length; i += componentsPerRow) {
      const row = components.slice(i, i + componentsPerRow);
      rows.push(row);
    }
    return rows;
  };

  // Set the number of components per row
  const componentsPerRow = 5;

  // Render components in rows
  const rowsOfComponents = renderComponentsInRows(componentsToRender, componentsPerRow);

  return (
    <div className="page-container">
      {/* Log the page title with timestamp */}
      <h1 className="title">Common Module Functions</h1>
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
