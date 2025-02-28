import React, { useEffect } from "react";
import logger from "../utilities/Logs/logger"; // Import your logger module here
import "../utilities/css/appcss.css";

export default function ButtonComponent({ path, buttonText, onClick }) {
  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] ButtonComponent (${buttonText}) is rendered.`);
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] ButtonComponent (${buttonText}) is unmounted.`);
    };
  }, [buttonText]);

  return (
    <button className="menu-button" onClick={onClick}>
      <span className="button-text">{buttonText}</span>
    </button>
  );
}
