import { useState, useEffect } from "react";
import {
  TOKEN_EXPIRATION_CHECK_FREQUENCY,
  API_URL,
  APPLICATION_NAME,
} from "../../../admin/setups/ConstDecl";
import axios from "axios";
import logger from "../../../utilities/Logs/logger";

function useToken() {
  const refreshTokenKey = "refresh_token";
  const userTokenKey = "token";

  function getToken() {
    const refreshToken = localStorage.getItem(refreshTokenKey);
    const userln = localStorage.getItem("loggedInUsername");

    // Check if the refresh token is expired
    if (refreshToken) {
      try {
        const payload1 = JSON.parse(atob(refreshToken.split(".")[1]));
        const refreshtokenexpiry = new Date(payload1.exp * 1000);
        const currentTime = new Date();
        if (refreshtokenexpiry < currentTime) {
          // If refresh token is expired, remove both the token and the refresh token
          removeToken();
          return null;
        }
      } catch (error) {
        console.error("Error decoding refresh token:", error);
        return null;
      }
    }

    // Check if the user token is expired
    const userToken = localStorage.getItem(userTokenKey);
    if (userToken) {
      try {
        const payload = JSON.parse(atob(userToken.split(".")[1]));
        const expirationTime = new Date(payload.exp * 1000);
        const currentTime = new Date();
        if (expirationTime < currentTime) {
          // If user token is expired, remove the token
          removeToken();
          return null;
        }
      } catch (error) {
        console.error("Error decoding user token:", error);
        return null;
      }
    }

    // If neither token is expired, return the user token
    return userToken;
  }

  const [token, setToken] = useState(getToken());
  const [username, setUsername] = useState(localStorage.getItem("loggedInUsername") || "");

  async function refreshAccessToken() {
    const refresh_token = localStorage.getItem(refreshTokenKey);
    if (!refresh_token) {
      removeToken();
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/refresh_token`, {}, {
        headers: {
          Authorization: `Bearer ${refresh_token}`,
        },
      });
      const { access_token } = response.data;
      saveToken(access_token, username);
      logger.info(`[${new Date().toLocaleTimeString()}] Access token refreshed successfully for user: ${username}`);
    } catch (error) {
      console.error("Error refreshing access token: ", error);
      removeToken();
      logger.error(`[${new Date().toLocaleTimeString()}] Error refreshing access token for user: ${username}`, error);
    }
  }

  function saveToken(userToken, userUsername) {
    localStorage.setItem(userTokenKey, userToken);
    localStorage.setItem("loggedInUsername", userUsername); // Save the username as well
    setToken(userToken);
    setUsername(userUsername);
  }

  function removeToken() {
    if (token !== null) {
      localStorage.removeItem(userTokenKey);
      localStorage.removeItem(refreshTokenKey);
      localStorage.removeItem("loggedInUsername");
      setToken(null);
      setUsername("");
      logger.info(`[${new Date().toLocaleTimeString()}] Token removed for user: ${username}`);
    }
  }

  useEffect(() => {
    function checkTokenExpiration() {
      const currentToken = getToken();

      if (!currentToken) {
        // If no valid token is found, attempt to refresh
        refreshAccessToken();
      }
    }

    checkTokenExpiration(); // Initial check on load

    const interval = setInterval(checkTokenExpiration, TOKEN_EXPIRATION_CHECK_FREQUENCY);

    return () => {
      clearInterval(interval); // Cleanup interval on unmount
      removeToken(); // Cleanup on component unmount
    };
  }, []); // Empty dependency array ensures this runs only on mount

  logger.info(`[${new Date().toLocaleTimeString()}] useToken hook initialized. Application name: ${APPLICATION_NAME}`);

  return {
    setToken: saveToken,
    token,
    removeToken,
    username,
  };
}

export default useToken;
