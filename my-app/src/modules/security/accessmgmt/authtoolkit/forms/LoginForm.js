import React, { useState, useEffect } from "react";
import axios from "axios";

import { API_URL, USER_STATUS, ENV_INSTANCES } from "../../../../admin/setups/ConstDecl";
import "../../../../utilities/css/appcss.css";
import UpdateCredentialsForm from "./UpdateCredentialsForm";

import logger from "../../../../utilities/Logs/logger"; // Import your logger module here

function convertTimestampToDateTime(timestamp) {
  const date = new Date(timestamp * 1000);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export default function LoginForm(props) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    instance: "", // This will be set based on the selected instance
    company: "",  // This will be set based on the selected instance
  });
  const [showUpdateCredentialsForm, setShowUpdateCredentialsForm] = useState(false);
  const [error, setError] = useState("");
  const [activeInstances, setActiveInstances] = useState([]);

  useEffect(() => {
    const activeInstances = ENV_INSTANCES.filter((instance) => instance.status === "Active");
    setActiveInstances(activeInstances);
  }, []);

  const logMeIn = async (e) => {
    e.preventDefault();
    console.log("The API URL", { API_URL });

    try {
      const statusWithShortName = USER_STATUS.find((status) => status.short_name === "ACTIVE");

      // Retrieve selected instance and company from activeInstances
      const selectedInstance = activeInstances.find(
        (instance) => instance.disname === formData.instance
      );

      // If selected instance exists, set company and instance accordingly
      const updatedFormData = {
        ...formData,
        status: statusWithShortName ? statusWithShortName.short_name : "",
        instance: selectedInstance ? selectedInstance.instance.toLowerCase() : "", // Set instance
        company: selectedInstance ? selectedInstance.company : ""   // Set company here
      };

      console.log("Selected Data from data ", updatedFormData)

      const response = await axios.post(`${API_URL}/login_user`, updatedFormData);

      const {
        userid,
        username,
        access_token,
        refresh_token,
        name,
        emp_img,
        instance,
        token_expires_delta,
        refresh_token_expires_delta,
      } = response.data;

      localStorage.setItem("token", access_token);
      localStorage.setItem("refresh_token", refresh_token);
      localStorage.setItem("userid", userid);
      localStorage.setItem("name", name);
      localStorage.setItem("emp_img", emp_img);
      localStorage.setItem("username", username);
      localStorage.setItem("token_expires_delta", token_expires_delta);
      localStorage.setItem("instance", instance);

      const currentTimestamp = Math.floor(Date.now() / 1000);
      const expirationTimestamp = currentTimestamp + token_expires_delta;
      const token_expires_by = convertTimestampToDateTime(expirationTimestamp);
      logger.info(`[${new Date().toLocaleTimeString()}] Token expired by ${token_expires_by}`);
      localStorage.setItem("token_expires_by", token_expires_by);

      localStorage.setItem("refresh_token_expires_delta", refresh_token_expires_delta);
      const rexpirationTimestamp = currentTimestamp + refresh_token_expires_delta;
      const refresh_token_expires_by = convertTimestampToDateTime(rexpirationTimestamp);
      localStorage.setItem("refresh_token_expires_by", refresh_token_expires_by);
      logger.info(`[${new Date().toLocaleTimeString()}] Refresh token expired by ${refresh_token_expires_by}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Token Expires Delta ${token_expires_delta}`);
      logger.info(`[${new Date().toLocaleTimeString()}] Refresh token expires delta ${refresh_token_expires_delta}`);

      props.onLoginSuccess(userid, username, access_token, refresh_token, name, instance, emp_img);

      setFormData({ username: "", password: "", instance: "", company: "" });
      setError("");

      logger.info(`[${new Date().toLocaleTimeString()}] User ${username} logged in successfully.`);
    } catch (error) {
      setError("Invalid username or password");
      logger.error(`[${new Date().toLocaleTimeString()}] Error logging in:`, error);
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;

    // Only updating the instance field
    setFormData((prevState) => ({
      ...prevState,
      [name]: value, // Update the field that changed (username, password, instance)
    }));
  };


  const handleForgotPassword = () => {
    setError("");
    setShowUpdateCredentialsForm(true);
  };

  return (
    <div >
      {error && <div>{error}</div>}
      <div className="child-container form-container">
        {showUpdateCredentialsForm ? (
          <UpdateCredentialsForm />
        ) : (
          <form onSubmit={logMeIn}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="username">Username:</label>
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="password">Password:</label>
                </div>
                <input
                  type="password"
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="instance">Instance:</label>
                </div>
                <select
                  id="instance"
                  name="instance"
                  value={formData.instance} // Ensuring the select element is controlled
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Instance</option>
                  {activeInstances.map((instance) => (
                    <option key={instance.disname} value={instance.disname}>
                      {instance.disname}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button type="submit">Login</button>
            <button type="button" onClick={handleForgotPassword}>
              Forgot Password?
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
