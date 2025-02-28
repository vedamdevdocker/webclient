
import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_RegisterUserPage = () => (
  <div>
    <h2 className="subheading">Register User Form</h2>
    <p className="indented-paragraph">
      The `Register User` form allows administrators to add new users by providing their details.
    </p>

    <h3 className="subheading">User Information</h3>
    <p className="indented-paragraph">
      Administrators need to enter the new user's username, password, employee ID (if applicable), and email ID.
    </p>

    <h3 className="subheading">Employee Selection</h3>
    <p className="indented-paragraph">
      If an authentication token is present, the administrator can select an employee from the available list.
    </p>

    <h3 className="subheading">Send Email</h3>
    <p className="indented-paragraph">
      Checking the "Send Email" option will trigger an email notification to the newly registered user with their credentials.
    </p>

    <h3 className="subheading">Registration Process</h3>
    <p className="indented-paragraph">
      Upon submitting the form, the user details are validated and stored in the system. If email sending is enabled, the new user will receive an email notification.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Only users with the required administrative permissions can access and use this form to register new users.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      - Ensure that the provided information is accurate before submitting the form.
      <br />
      - Passwords should be stored securely and shared responsibly.
    </p>
  </div>
);

export default HELP_RegisterUserPage;