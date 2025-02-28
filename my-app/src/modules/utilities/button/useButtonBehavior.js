// useButtonBehavior.js
import { useCallback } from 'react';
import behaviorOptions from './behaviorOptions';
import logger from "../Logs/logger"; // Import your logger module here

const useButtonBehavior = () => {
  const openInNewTab = useCallback((url, behavior = behaviorOptions.DEFAULT) => {
    try {
      logger.info(`[${new Date().toLocaleTimeString()}] useButtonBehavior: Opening URL in a new tab with behavior: ${behavior}`);
      window.open(url, behavior);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] useButtonBehavior: Error opening URL in a new tab: ${error.message}`);
    }
  }, []);

  return openInNewTab;
};

export default useButtonBehavior;
