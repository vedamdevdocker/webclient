import React, { useState } from "react";
import axios from "axios";
import {
  API_URL,
  SMTP_URL,
  SMTP_EML,
  USER_STATUS,
} from "../../../../admin/setups/ConstDecl";
import { Modal, Button } from "react-bootstrap";
import "../../../../utilities/css/appcss.css";

import logger from "../../../../utilities/Logs/logger"; // Import your logger module here

export default function UpdateCredentialsForm() {
  const [formData, setFormData] = useState({
    username: "",
    emailid: "",
    password: "",
    password1: "",
    id: "",
    status: "",
    empid: "",
  });
  const [isUserExists, setIsUserExists] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordUpdated, setIsPasswordUpdated] = useState(false);
  const [passwordError, setPasswordError] = useState(null);
  const [emailid, setEmailid] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const parseDate = (dateString) => {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  };

  const handleCheckUser = async (e) => {
    e.preventDefault();

    // Check if the username is empty
    if (!formData.username.trim()) {
      // Clear the form and set flags to false
      setFormData({
        username: "",
        password: "",
        password1: "",
        id: "",
        status: "",
        empid: "",
      });
      setIsUserExists(false);
      setIsEmailValid(false);
      setPasswordError("There is no empty user in the database");
      return;
    }
    setIsPasswordUpdated(null);
    setPasswordError(null);
    setFormData({
      username: "",
      password: "",
      password1: "",
      id: "",
      status: "",
      empid: "",
    });

    try {
      // Call list_users_pwd_change API with the empid and username as parameters
      const response = await axios.get(`${API_URL}/list_users_pwd_change`, {
        params: {
          identifier: formData.username,
        },
      });

      const users = response.data.users;

      if (users.length > 0) {
        const user = users[0];

        setEmailid(user.emailid);

        // Check if the user status is "ACTIVE"
        const activeStatus = USER_STATUS.find(
          (status) => status.short_name === "ACTIVE"
        );

        if (activeStatus.name === user.status) {
          // Check if expiry_date is greater than today's date
          if (user.expiry_date !== null) {
            const expiryDate = parseDate(user.expiry_date);
            const today = new Date();

            if (expiryDate < today) {
              setIsUserExists(false);
              setIsEmailValid(false);
              setPasswordError("User has expired.");

              // Log the user expired with timestamp
              logger.warn(
                `[${new Date().toLocaleTimeString()}] User has expired.`
              );
              return;
            }
          }
          setIsUserExists(true);
          setIsEmailValid(true);
          setFormData({
            ...formData,
            status: activeStatus.name, // Add activeStatus to formData
            empid: user.empid, // Add empid to formData
            id: user.id,
          });

          // Log the successful user check with timestamp
          logger.info(
            `[${new Date().toLocaleTimeString()}] User exists. Emp ID: ${
              user.empid
            }`
          );
        } else {
          setIsUserExists(false);
          setIsEmailValid(false);
          setPasswordError("User is not active.");

          // Log the user not active with timestamp
          logger.warn(
            `[${new Date().toLocaleTimeString()}] User is not active.`
          );
        }
      } else {
        setIsUserExists(false);
        setIsEmailValid(false);
        setPasswordError("User not found with the provided username.");

        // Log the user not found with timestamp
        logger.warn(
          `[${new Date().toLocaleTimeString()}] User not found with the provided username.`
        );
      }
    } catch (error) {
      // ... (error handling)
    }
  };

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();

    // Check if passwords match
    if (formData.password !== formData.password1) {
      setPasswordError("Passwords do not match");

      // Log password mismatch with timestamp
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Passwords do not match.`
      );
      return;
    } else {
      setPasswordError(null);
    }

    if (!formData.password) {
      setPasswordError("Password cannot be empty");

      // Log empty password with timestamp
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Password cannot be empty.`
      );
      return;
    }

    if (!formData.username) {
      setPasswordError("User name or email or employee id is mandatory");

      // Log empty password with timestamp
      logger.warn(
        `[${new Date().toLocaleTimeString()}] User name or email or employee id is mandatory.`
      );
      return;
    }

    try {
      // Call modify_user_pwd_change API with the required parameters
      const response = await axios.put(`${API_URL}/modify_user_pwd_change`, {
        id: formData.id, // Provide the user id here
        identifier: formData.username,
        password: formData.password,
        status: formData.status,
      });
      logger.info(
        `[${new Date().toLocaleTimeString()}] Response message of modify_user_pwd_change API update: ${response}`
      );
      setIsPasswordUpdated(true);

      // Send an email to the user
      await sendEmailData();

      // Log the successful password update with timestamp
      logger.info(
        `[${new Date().toLocaleTimeString()}] Password updated successfully.`
      );

      setFormData({
        username: "",
        emailid: "",
        password: "",
        password1: "",
        id: "",
        status: "",
        empid: "",
      });
      setIsUserExists(false);
      setIsEmailValid(false);
      setPasswordError(
        "Password has been set successfully to the user and sent by email"
      );
      setIsModalOpen(true); // Open the modal
    } catch (error) {
      setIsPasswordUpdated(false);
      setPasswordError("Something wrong, password is not updated");
      console.error("Error updating password:", error);

      // Log the error with timestamp
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error updating password.`,
        error
      );
    }
  };

  const sendEmailData = async () => {
    try {
      // Sending email data to SMTP endpoint
      const emailData = {
        sender_email: SMTP_EML,
        recipient_email: emailid,
        subject: "Password Reset",
        message: "Your password has been successfully updated.",
      };

      await axios.post(`${SMTP_URL}/send_email`, emailData);

      // Log the successful email sending with timestamp
      logger.info(
        `[${new Date().toLocaleTimeString()}] Email sent successfully.`
      );
    } catch (error) {
      console.error("Error sending email:", error);

      // Log the error with timestamp
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error sending email.`,
        error
      );
    }
  };
  const closeModal = () => {
    setIsModalOpen(false); // Close the modal
    window.location.reload(); // Refresh the browser page
  };
  return (
    <div className="child-container menu-container">
      <h3 className="title">Set New Password </h3>
      {passwordError && <span className="error-message">{passwordError}</span>}
      <div className="child-container form-container">

        <form>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="username">EmpId/Email/Username:</label>
              </div>
              <input
                type="text"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="form-control input-field"
              />
              <button onClick={handleCheckUser} className="menu-button">
                Fetch
              </button>
              <a className="right-side-form-button" href="/" onClick={() => window.location.reload()} ><span> Login</span></a>
            </div>
            
          </div>

          {isUserExists && isEmailValid && (
            <>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="password">New Password:</label>
                  </div>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password: e.target.value,
                      })
                    }
                    className="form-control input-field"
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="password1">Confirm Password:</label>
                  </div>
                  <input
                    type="password"
                    id="password1"
                    name="password1"
                    value={formData.password1}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        password1: e.target.value,
                      })
                    }
                    className="form-control input-field"
                  />
                </div>
                {passwordError && (
                  <span className="error-message">{passwordError}</span>
                )}
              </div>

              <button onClick={handlePasswordUpdate}>Update Password</button>
            </>
          )}
        </form>
      </div>
      {isPasswordUpdated && (
        <div>
          <p>Password updated successfully</p>
          <Modal
            show={isModalOpen}
            onHide={closeModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>Password Updated</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              Password updated successfully. Click OK to continue.
            </Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={closeModal}>
                OK
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      )}
    </div>
  );
}
