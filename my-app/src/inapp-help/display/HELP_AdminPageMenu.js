import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_AdminPageMenu = () => (
  <div>
    <h2 className="subheading">Access Management</h2>
    <p className="indented-paragraph">
      The `Access Management Menu` provides various administrative functions that allow users to manage employee data, user access and roles, and view sent emails within the system. These features help ensure the smooth operation of administrative tasks related to employees, security, and email monitoring.
    </p>

    <h3 className="subheading">Employee Module</h3>
    <p className="indented-paragraph">
      The Employee Module allows administrators to manage employee data efficiently. This includes the ability to create new employee profiles, update existing employee details, and view employee information. Additionally, administrators can add and manage designations for employees to categorize roles and responsibilities within the organization.
    </p>

    <h3 className="subheading">Users & Accesses Module</h3>
    <p className="indented-paragraph">
      The Users & Accesses Module focuses on managing user accounts and their corresponding permissions. Administrators can create new user profiles, modify their module access levels, and assign or restrict access to specific system functionalities. Moreover, this module provides the ability to load new modules into the system if any are added or removed, keeping the system updated and aligned with organizational needs.
    </p>

    <h3 className="subheading">View Emails</h3>
    <p className="indented-paragraph">
      The View Emails section allows administrators to view all emails sent within the system. This feature provides insight into the communication happening within the platform and ensures transparency in email interactions.
    </p>

  </div>
);

export default HELP_AdminPageMenu;
