import React, { useEffect, useState } from "react";
import axios from "axios";
import logger from "../utilities/Logs/logger"; // Import your logger module here
import { SMTP_URL, BACKEND_EMPLOYEE_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../admin/setups/ConstDecl"; // Import your constants
import "./css/appcss.css";
import CheckModuleAccess from "../security/modulepermissions/CheckModuleAccess"; // Import your access checking function

const ViewEmailsPage = () => {
  const [emails, setEmails] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(BACKEND_EMPLOYEE_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS);

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }
    fetchData();
  }, [hasRequiredAccess]);

  const fetchData = async () => {
    try {
      logger.info(`[${new Date().toLocaleTimeString()}] Fetching emails from the server...`);

      const response = await axios.get(`${SMTP_URL}/view_emails`);
      setEmails(response.data);

      logger.info(`[${new Date().toLocaleTimeString()}] Emails fetched successfully.`);
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching emails:`, error);
    }
  };

  return (
    hasRequiredAccess ? (
      <div className="child-container form-container">
        <h1 className="title">List of Emails</h1>
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>Email ID</th>
              <th>Sender Email</th>
              <th>Recipient Email</th>
              <th>Subject</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {emails.map((email) => (
              <tr key={email.id} className="table-row">
                <td>{email.id}</td>
                <td>{email.sender_email}</td>
                <td>{email.recipient_email}</td>
                <td>{email.subject}</td>
                <td>{email.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    ) : (
      <div>You do not have permission to view this module</div>
    )
  );
};

export default ViewEmailsPage;
