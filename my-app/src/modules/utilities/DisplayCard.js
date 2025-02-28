import React, { useEffect } from "react";
import logger from "../utilities/Logs/logger"; // Import your logger module here

function DisplayCard({ title, color, children }) {
  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] DisplayCard (${title}) is rendered.`);
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] DisplayCard (${title}) is unmounted.`);
    };
  }, [title]);

  const cardStyle = {
    backgroundColor: color || "#ffffff", // Default to white if color is not provided
  };

  return (
    <div className="card" style={cardStyle}>
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        {children}
      </div>
    </div>
  );
}

export default DisplayCard;
