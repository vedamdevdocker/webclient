import React, { useEffect } from "react";
import logger from "../utilities/Logs/logger"; // Import your logger module here

export default function BottomContainer() {
  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] BottomContainer component is rendered.`);
    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] BottomContainer component is unmounted.`);
    };
  }, []);

  return (
    <div className="bottom-container">
      <div className="sub-container">
        <address>
          123 Main Street
          <br />
          City, State 1<br />
          Country 1
        </address>
      </div>
      <div className="sub-container">
        <address>
          456 Elm Street
          <br />
          City, State 2<br />
          Country 2
        </address>
      </div>
      <div className="sub-container">
        <address>
          789 Oak Street
          <br />
          City, State 3<br />
          Country 3
        </address>
      </div>
      <div className="sub-container">
        <address>
          101 Maple Street
          <br />
          City, State 4<br />
          Country 4
        </address>
      </div>
      <div className="sub-container">
        <address>
          222 Pine Street
          <br />
          City, State 5<br />
          Country 5
        </address>
      </div>
    </div>
  );
}
