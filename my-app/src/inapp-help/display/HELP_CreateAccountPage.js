import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_AccountsMenu = () => (
  <div>
    <h2 className="subheading">Accounts Menu Component</h2>
    <p className="indented-paragraph">
      The `Accounts Menu` component is responsible for rendering a list of menu items based on user permissions.
    </p>

    <h3 className="subheading">Create Account</h3>
    <p className="indented-paragraph">
      The Create Account option allows users to create a new account in the system. Users can define various account attributes such as:
      <ul>
        <li>Account number</li>
        <li>Account name</li>
        <li>Account category and type</li>
        <li>Opening balance and currency</li>
        <li>Company and department details</li>
        <li>Setting a default account status</li>
      </ul>
      After submitting the form, a new account is created with a unique account number and name generated automatically.
    </p>

    <h3 className="subheading">Delete Account</h3>
    <p className="indented-paragraph">
      The Delete Account option enables users to delete an existing account from the system. This option allows users to manage and remove accounts that are no longer needed or are incorrect.
    </p>

    <h3 className="subheading">Update Account</h3>
    <p className="indented-paragraph">
      The Update Account option allows users to modify details of an existing account. Users can update attributes such as:
      <ul>
        <li>Account name</li>
        <li>Account category</li>
        <li>Account type</li>
        <li>Opening balance</li>
        <li>Currency</li>
      </ul>
      After submitting the changes, the account's information is updated in the system.
    </p>

    <h3 className="subheading">Get Accounts</h3>
    <p className="indented-paragraph">
      The Get Accounts option provides users with a list of existing accounts in the system. This list can be filtered based on various criteria such as company, department, and account status.
    </p>
  </div>
);

export default HELP_AccountsMenu;
