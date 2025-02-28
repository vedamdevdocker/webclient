import React from "react";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function Logout(props) {
  const handleLogout = async () => {
    try {

      // Define keys to remove from localStorage
      const keysToRemove = [
        "token",
        "refresh_token",
        "name",
        "emp_img",
        "username",
        "userid",
        "currenciesDataFetched",
        "loglevel",
        "token_expires_delta",
        "token_expires_by",
        "refresh_token_expires_delta",
        "refresh_token_expires_by",
        'token_expires_by_timestamp',
        'refresh_token_expires_by_timestamp',
        'instance',
      ];

      // Remove each key from localStorage if it exists
      keysToRemove.forEach((key) => {
        localStorage.removeItem(key);
      });

      // Call the token function passed as a prop (if it exists)
      props.token();

      // Log successful logout with username
      logger.info(`[${new Date().toLocaleTimeString()}] User ${localStorage.getItem("username")} logged out successfully.`);
    } catch (error) {
      // Handle any errors that occur during the logout process
      if (error.response) {
        console.log(error.response);
        console.log(error.response.status);
        console.log(error.response.headers);
      }

      // Log any errors during logout
      logger.error(`[${new Date().toLocaleTimeString()}] Error logging out:`, error);
    }
  };

  return (
    <div>
      {/* Display the logged-in username (optional) */}
      {props.username && <p>Logged in as: {props.username}</p>}

      {/* Logout button to trigger the logout process */}
      {props.token && <button onClick={handleLogout}>Sign Off</button>}
    </div>
  );
}

export default Logout;
