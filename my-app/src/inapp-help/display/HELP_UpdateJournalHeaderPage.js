import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdateJournalHeaderPage = () => (
  <div>
    <h2 className="subheading">Update Journal Header</h2>
    <p className="indented-paragraph">
      The `Update Journal Header` page allows users to modify the header details of an existing journal entry.
    </p>

    <h3 className="subheading">Journal Number</h3>
    <p className="indented-paragraph">
      The journal number is displayed as a read-only field. This unique identifier is used for tracking the journal entry.
    </p>

    <h3 className="subheading">Company</h3>
    <p className="indented-paragraph">
      Select the company associated with the journal entry. This field is required for processing the journal and must be chosen from the available list.
    </p>

    <h3 className="subheading">Department</h3>
    <p className="indented-paragraph">
      Select the department related to the journal entry. Once the company is selected, the list of departments will update accordingly.
    </p>

    <h3 className="subheading">Currency</h3>
    <p className="indented-paragraph">
      Choose the currency in which the journal entry is recorded. The currency options are populated from the system's available currencies.
    </p>

    <h3 className="subheading">Journal Date</h3>
    <p className="indented-paragraph">
      Set the date of the journal entry. This field must follow the format of YYYY-MM-DD. Ensure that the journal date reflects the actual date of the transaction.
    </p>

    <h3 className="subheading">Journal Type</h3>
    <p className="indented-paragraph">
      Choose the type of journal entry. This field is required and only available if the journal is in an editable state.
    </p>

    <h3 className="subheading">Description</h3>
    <p className="indented-paragraph">
      Provide a description of the journal entry. This text will describe the purpose or details of the journal entry.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      Select the current status of the journal entry. Depending on the status chosen, the journal entry may be locked or editable.
    </p>

    <h3 className="subheading">Update Lines</h3>
    <p className="indented-paragraph">
      If you need to update the journal lines (details such as amounts, accounts, etc.), click the "Update Lines" button to open the Journal Lines Modal.
    </p>

    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      Once all required fields are filled in and the form is ready for submission, click the "Submit" button to save the changes to the journal header.
    </p>
  </div>
);

export default HELP_UpdateJournalHeaderPage;
