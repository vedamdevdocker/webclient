import "../../modules/utilities/css/appcss.css";
// UsersAndAccessesMenu.js

import React from "react";

const HELP_UsersAndAccessesPage = () => (
  <div>
    <h2 className="subheading">Users & Accesses Menu</h2>
    <p className="indented-paragraph">
      The `Users & Accesses Menu` provides functionality for managing user accounts, their roles, and access permissions within the system. Administrators can create, delete, and modify user accounts, manage roles and permissions, and ensure users have the appropriate access to system modules.
    </p>

    <h3 className="subheading">User Roles Menu</h3>
    <p className="indented-paragraph">
      The `User Roles Menu` allows administrators to manage user roles within the system. Roles define what access and privileges users have within the platform, ensuring that the right individuals have the necessary permissions for their tasks.
    </p>

    <h3 className="subheading">Create User</h3>
    <p className="indented-paragraph">
      The `Create User` option allows administrators to add new users to the system. By entering essential information such as the user’s name, email, and role, new user profiles are created, granting them access to the system according to their assigned roles.
    </p>

    <h3 className="subheading">Delete User</h3>
    <p className="indented-paragraph">
      The `Delete User` option enables administrators to remove users from the system. This action is necessary when users leave the organization or no longer require access to the system.
    </p>

    <h3 className="subheading">Modify User</h3>
    <p className="indented-paragraph">
      The `Modify User` feature allows administrators to update user details, such as their contact information, roles, or access permissions. This ensures that user profiles remain current and reflect any changes in their responsibilities.
    </p>

    <h3 className="subheading">List Users</h3>
    <p className="indented-paragraph">
      The `List Users` option enables administrators to view all registered users in the system. This feature provides an overview of all active users and can be filtered or searched to find specific users as needed.
    </p>

    <h3 className="subheading">Permissions Menu</h3>
    <p className="indented-paragraph">
      The `Permissions Menu` allows administrators to manage the system’s permissions, defining what users can or cannot access within the platform. This includes configuring user access to specific modules and functionalities.
    </p>

    <h3 className="subheading">Load Modules</h3>
    <p className="indented-paragraph">
      The `Load Modules` feature enables administrators to add new modules to the system. This allows the platform to evolve and expand, ensuring that new features and functionalities can be integrated as needed.
    </p>

    <h3 className="subheading">Assign Modules</h3>
    <p className="indented-paragraph">
      The `Assign Modules` option allows administrators to assign specific modules to users or user groups. By managing module assignments, administrators control which features and functionalities are available to individual users or roles.
    </p>

    <h3 className="subheading">Grant Accesses</h3>
    <p className="indented-paragraph">
      The `Grant Accesses` functionality enables administrators to assign specific access permissions to users for various modules and actions within the system. This ensures that users have the appropriate levels of access to perform their tasks while maintaining security.
    </p>

    <h3 className="subheading">List User Accesses</h3>
    <p className="indented-paragraph">
      The `List User Accesses` option provides a comprehensive view of all user access configurations, showing which users have access to which modules and permissions. This feature is essential for monitoring and auditing user access rights across the system.
    </p>

  </div>
);

export default HELP_UsersAndAccessesPage;
