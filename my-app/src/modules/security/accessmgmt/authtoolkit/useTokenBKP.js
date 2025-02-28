import { useState, useEffect } from "react";
import {
  TOKEN_EXPIRATION_CHECK_FREQUENCY,
  API_URL,
  APPLICATION_NAME, // Include APPLICATION_NAME constant
} from "../../../admin/setups/ConstDecl";
import axios from "axios";
import logger from "../../../utilities/Logs/logger"; // Import your logger module here

function useToken() {
  // Constants and variables
  const refreshTokenKey = "refresh_token";
  const userTokenKey = "token";

  function getToken() {
    const refreshToken = localStorage.getItem(refreshTokenKey);
    const userln = localStorage.getItem("loggedInUsername");
  
    if (refreshToken) {
      try {
        const payload1 = JSON.parse(atob(refreshToken.split(".")[1]));
        const refreshtokenexpiry = new Date(payload1.exp * 1000);
  
        const currentTime = new Date();
        if (refreshtokenexpiry < currentTime) {
          const userToken = localStorage.getItem(userTokenKey);
          if (userToken) {
            localStorage.removeItem(userTokenKey);
          }
          if (userln) {
            localStorage.removeItem("loggedInUsername");
          }
          localStorage.removeItem(refreshTokenKey);
          return null; // Return null if refresh token is expired
        }
      } catch (error) {
        console.error("Error decoding refresh token:", error);
        return null;
      }
    }
  
    const userToken = localStorage.getItem(userTokenKey);
    
    if (userToken) {
      try {
        const payload = JSON.parse(atob(userToken.split(".")[1]));
        const expirationTime = new Date(payload.exp * 1000);
        const currentTime = new Date();
  
        if (expirationTime < currentTime) {
          localStorage.removeItem(userTokenKey);
          return null; // Return null if access token is expired
        }
      } catch (error) {
        console.error("Error decoding user token:", error);
        return null;
      }
    }
  
    return userToken;
  }
  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState(""); // Add username state

  async function refreshAccessToken() {
    try {
      const refresh_token = localStorage.getItem(refreshTokenKey);
      if (!refresh_token) {
        removeToken();
        return;
      }

      const response = await axios.post(
        `${API_URL}/refresh_token`,
        {},
        {
          headers: {
            Authorization: `Bearer ${refresh_token}`, // Add Bearer token here
          },
        }
      );

      const { access_token } = response.data;
      saveToken(access_token, username);
      // Log successful token refresh with username
      logger.info(`[${new Date().toLocaleTimeString()}] Access token refreshed successfully for user: ${username}`);
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      removeToken();
      // Log token refresh error with username
      logger.error(`[${new Date().toLocaleTimeString()}] Error refreshing access token for user: ${username}`, error);
    }
  }

  function saveToken(userToken, userUsername) {
    localStorage.setItem(userTokenKey, userToken);
    setToken(userToken);
    setUsername(userUsername); // Set the username when saving token
  }

  function removeToken() {
    localStorage.removeItem(userTokenKey);
    setToken(null);
    setUsername(""); // Clear the username when removing token
    // Log token removal with username
    logger.info(`[${new Date().toLocaleTimeString()}] Token removed for user: ${username}`);
  }

  useEffect(() => {
    function checkTokenExpiration() {
      const userToken = getToken();
      if (!userToken) {
        //console.log("useToken.js --> No userToken");
        refreshAccessToken(); // Token has expired or refresh token is expired, try to refresh it
      }
    }
    //console.log("Use Effect in useToken.js is executed");
    checkTokenExpiration();

    const interval = setInterval(
      checkTokenExpiration,
      TOKEN_EXPIRATION_CHECK_FREQUENCY
    );

    return () => {
      clearInterval(interval);
      // Add code here to perform auto-logout, e.g., redirect to the login page
      removeToken(); // This will clear the token and log the user out
    };
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Include refreshAccessToken in the dependency array

  // Log hook initialization with constant
  logger.info(`[${new Date().toLocaleTimeString()}] useToken hook initialized. Application name: ${APPLICATION_NAME}`);

  return {
    setToken: saveToken,
    token,
    removeToken,
    username, // Include username in the returned object
  };
}

export default useToken;
