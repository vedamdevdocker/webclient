import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_FindJournalToUpdatePage = () => (
  <div>
    <h2 className="subheading">Find Journal to Update</h2>
    <p className="indented-paragraph">
      The `Find Journal to Update` page allows users to search for a specific journal by its journal number. Once a journal is found, users can proceed to the update form to modify the journal details.
    </p>

    <h3 className="subheading">Journal Number</h3>
    <p className="indented-paragraph">
      The `Journal Number` field allows users to enter the journal number associated with the journal they want to update. After entering the journal number, users can click on the "Update Journal" button to proceed.
    </p>

    <h3 className="subheading">Update Journal</h3>
    <p className="indented-paragraph">
      The `Update Journal` button navigates the user to the journal update form. The journal number entered in the input field will be passed as part of the URL for the update form, allowing users to update the correct journal.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Access to this page is restricted based on user permissions. If a user does not have the required permission to view or update journal details, they will see a message indicating that they do not have permission to view this module.
    </p>
  </div>
);

export default HELP_FindJournalToUpdatePage;
