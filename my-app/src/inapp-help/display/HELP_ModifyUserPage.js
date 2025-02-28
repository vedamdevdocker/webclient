import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_ModifyUserPage = () => (
  <div>
    <h2 className="subheading">Modify User Form</h2>
    <p className="indented-paragraph">
      The `Modify User` form allows authorized users to search for and modify user details.
    </p>

    <h3 className="subheading">Search Criteria</h3>
    <p className="indented-paragraph">
      To search for a user, enter the username and/or employee ID in the respective fields and click the "Search" button.
    </p>

    <h3 className="subheading">User Details</h3>
    <p className="indented-paragraph">
      Once a user is found, the form displays the user's details, including username, status, expiry date, and email ID.
    </p>

    <h3 className="subheading">Modify User</h3>
    <p className="indented-paragraph">
      To modify a user, enter the new email ID, password, and select the new status. If the status is set to "Expired," provide the expiry date. Click the "Modify User" button to apply the changes.
    </p>

    <h3 className="subheading">Password</h3>
    <p className="indented-paragraph">
      When changing the password, enter the new password and confirm it in the "Confirm Password" field. Ensure that both passwords match.
    </p>

    <h3 className="subheading">Expiry Date</h3>
    <p className="indented-paragraph">
      If the user status is set to "Expired," a field for the expiry date will appear. Enter the date when the user's status will expire.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Users must have the necessary permissions, specifically the ability to update user information, to access this form.
    </p>

    <h3 className="subheading">Notes</h3>
    <p className="indented-paragraph">
      - Ensure that the provided information is accurate before modifying the user.
      <br />
      - Passwords must match for the changes to take effect.
    </p>
  </div>
);

export default HELP_ModifyUserPage;
