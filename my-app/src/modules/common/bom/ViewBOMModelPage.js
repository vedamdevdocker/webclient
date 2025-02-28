// ViewBOMModelPage.js
import React, { useState, useEffect } from 'react';
import RotatingImage from '../../utilities/RotatingImage';
import BottomContainer from '../../utilities/BottomContainer';
import ViewBOMForm from './forms/ViewBOMForm';
import ViewBOMPage from './extras/ViewBOMPage';
import DocumentationContainer from '../../utilities/DocumentationContainer';
import logger from '../../utilities/Logs/logger';
import '../../utilities/css/appcss.css';

function ViewBOMModelPage() {
  logger.info(`[${new Date().toLocaleTimeString()}] Rendering ViewBOMModelPage`);

  const [explodedBOM, setExplodedBOM] = useState([]); // State to store the exploded BOM data
  const [bomByDescriptions, setBOMByDescriptions] = useState(false); // Add state for bomByDescriptions

  const componentsToRender = [
    <ViewBOMForm
      updateExplodedBOM={setExplodedBOM}
      bomByDescriptions={bomByDescriptions}
      setBOMByDescriptions={setBOMByDescriptions}
    />,
  ];

  useEffect(() => {
    console.log('Received bomDescription value:', bomByDescriptions);
    logger.info(`[${new Date().toLocaleTimeString()}] useEffect triggered with bomByDescriptions: ${bomByDescriptions}`);
  }, [bomByDescriptions]);

  const helpComponentsToRender = ["ViewBOMPage"];

  if (explodedBOM.length > 0) {
    componentsToRender.push(<ViewBOMPage explodedBOM={explodedBOM} bomByDescriptions={bomByDescriptions} />);
  } else {
    componentsToRender.push(
      <DocumentationContainer componentNames={helpComponentsToRender} />
    );
  }

  return (
    <div className="page-container">
      <h1 className="title">View Modal Item Bill of Materials</h1>
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

export default ViewBOMModelPage;
