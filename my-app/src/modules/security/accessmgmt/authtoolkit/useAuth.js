import { useState } from "react";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function useAuth() {
  const [token, setToken] = useState(""); // Initialize token state

  // Log hook initialization with a message
  logger.info(`[${new Date().toLocaleTimeString()}] useAuth hook initialized.`);

  // Other authentication-related states or functions can be added here

  return { token, setToken };
}

export default useAuth;
