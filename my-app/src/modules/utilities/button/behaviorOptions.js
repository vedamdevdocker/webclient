// behaviorOptions.js
import logger from "../Logs/logger"; // Import your logger module here

const behaviorOptions = {
  NEW_TAB: '_blank',   // to open in the new tab
  SAME_TAB: '_self',   // to open in the same tab
  NEW_WINDOW: '_new',  // to open in the new window, similar behavior of new tab
  DEFAULT: '_self'    // Set the default behavior here
};

// Log when the behaviorOptions module is imported
logger.info(`[${new Date().toLocaleTimeString()}] behaviorOptions module is imported.`);

export default behaviorOptions;
