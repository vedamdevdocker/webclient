import React, { useState, useEffect } from "react";
import {
  API_URL,
  SMTP_URL,
  SMTP_EML,
  BACKEND_ADMIN_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
  USER_STATUS
} from "../../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../modulepermissions/CheckModuleAccess";
import logger from "../../../../utilities/Logs/logger"; // Import your logger module here

export default function RegisterUserForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    empid: "",
    emailid: "",
  });
  const useridauthToken = localStorage.getItem("token");
  const userid = localStorage.getItem("userid");
  const [sendEmail, setSendEmail] = useState(false); // New state for the checkbox

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_ADMIN_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const [employeeData, setEmployeeData] = useState([]);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  useEffect(() => {
    if (!hasRequiredAccess) {
      return;
    }

    fetchEmployeeData();
    // eslint-disable-next-line
  }, [hasRequiredAccess]);

  const fetchEmployeeData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${useridauthToken}`,
        UserId: userid,
      };
      logger.info(
        `[${new Date().toLocaleTimeString()}] Token value to call employee: ${useridauthToken}`
      );
      logger.info(
        `[${new Date().toLocaleTimeString()}] User id to call employee: ${userid}`
      );
      const status = 1;
      const response = await axios.get(`${API_URL}/employee?status=${status}`, { headers });
      const data = response.data;
      setEmployeeData(data);

      // Log the successful data fetch with timestamp
      logger.info(
        `[${new Date().toLocaleTimeString()}] Fetched employee data. Access granted: ${hasRequiredAccess}`
      );
    } catch (error) {
      console.error("Error fetching employee data:", error);
      // Log the error with timestamp
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching employee data. Access granted: ${hasRequiredAccess}`,
        error
      );
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.type === "checkbox") {
      setSendEmail(e.target.checked); // Update checkbox state
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  const sendEmailData = async () => {
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        UserId: localStorage.getItem("userid"),
      };

      // Sending email data to SMTP endpoint
      const emailData = {
        sender_email: SMTP_EML,
        recipient_email: formData.emailid,
        subject: "Test email by Vedam",
        message:
          "Being an employee with an id " +
          formData.empid +
          " Your Registration is successful with the user id  " +
          formData.username +
          "and password  " +
          formData.password,
      };

      const response2 = await axios.post(`${SMTP_URL}/send_email`, emailData, {
        headers: headers,
      });

      logger.info(
        `[${new Date().toLocaleTimeString()}] Response from send_email API call: ${response2}`
      );
      // Log the successful email sending with timestamp
      logger.info(
        `[${new Date().toLocaleTimeString()}] Email sent successfully. Access granted: ${hasRequiredAccess}`
      );
    } catch (error) {
      console.error("Error sending email:", error);
      // Log the error with timestamp
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error sending email. Access granted: ${hasRequiredAccess}`,
        error
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        UserId: localStorage.getItem("userid"),
      };

      // Set the values for status_value, start_date_value, and expiry_date_value
      const statusValue = USER_STATUS.find(status => status.status === "Active").short_name;
      const startDateValue = new Date().toISOString().split('T')[0];  // DD-MM-YYYY format
      const expiryDateValue = null;

      // Create the request payload
      const requestPayload = {
        ...formData,
        status_value: statusValue,
        start_date_value: startDateValue,
        expiry_date_value: expiryDateValue,
      };

      // Send the registration request
      const response = await axios.post(`${API_URL}/register_user`, requestPayload, {
        headers: headers,
      });

      setRegistrationSuccess(true);

      setFormData({
        username: "",
        password: "",
        empid: "",
        emailid: "",
      });

      logger.info(
        `[${new Date().toLocaleTimeString()}] Response Register_user API: ${response}`
      );

      // Conditionally send email if the checkbox is checked
      logger.info(
        `[${new Date().toLocaleTimeString()}] Send Email check box: ${sendEmail}`
      );
      if (sendEmail) {
        await sendEmailData();
      }

      // Log the successful registration with timestamp
      logger.info(
        `[${new Date().toLocaleTimeString()}] User registered successfully. Access granted: ${hasRequiredAccess}`
      );
    } catch (error) {
      console.error("Error registering user:", error);
      // Log the error with timestamp
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error registering user. Access granted: ${hasRequiredAccess}`,
        error
      );
    }
  };


  return (
    <div className="child-container menu-container">
      <h2 className="title">Add User</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          {registrationSuccess ? (
            // Show success message after successful registration
            <div className="success-message">
              Registration Process is completed. Credentical details are sent to
              your email.
            </div>
          ) : (
            // Show the registration form if registrationSuccess is false
            <form onSubmit={handleSubmit} autoComplete="off">
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
                    autoComplete="off"  // Disable autocomplete for company
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
                    autoComplete="off"  // Disable autocomplete for company
                  />
                </div>
              </div>

              {/* Conditionally show the Employee ID field based on the token */}
              {useridauthToken && (
                <div className="form-group col-md-6 mb-2">
                  <div className="form-row">
                    <div className="label-container">
                      <label htmlFor="empid">Employee ID:</label>
                    </div>
                    <select
                      id="empid"
                      name="empid"
                      value={formData.empid}
                      onChange={handleChange}
                      className="form-control input-field"
                      autoComplete="off"  // Disable autocomplete for company
                    >
                      <option value="">Select Employee</option>
                      {employeeData.map((employee) => (
                        <option key={employee.empid} value={employee.empid}>
                          {employee.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              )}

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="emailid">Email ID:</label>
                  </div>
                  <input
                    type="email"
                    id="emailid"
                    name="emailid"
                    value={formData.emailid}
                    onChange={handleChange}
                    className="form-control input-field"
                    autoComplete="off"  // Disable autocomplete for company
                  />
                </div>
              </div>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <input
                    type="checkbox"
                    id="sendEmail"
                    name="sendEmail"
                    checked={sendEmail}
                    onChange={handleChange}
                    className="form-check-input"
                    autoComplete="off"  // Disable autocomplete for company
                  />
                  <label htmlFor="sendEmail" className="form-check-label">
                    Send Email
                  </label>
                </div>
              </div>
              <button type="submit" className="btn btn-primary">
                Register User
              </button>
            </form>
          )}
        </div>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}
