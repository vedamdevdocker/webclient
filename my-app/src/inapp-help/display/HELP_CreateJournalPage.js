import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateJournalPage = () => (
  <div>
    <h2 className="subheading">Create Journal Header Page</h2>
    <p className="indented-paragraph">
      The `Create Journal Header` page allows users to create a journal entry in the system. This involves entering information such as the company, department, journal date, journal type, description, currency, and status.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      The following fields are available in the journal header creation form:
    </p>
    <ul className="indented-list">
      <li><strong>Company</strong>: Select the company for which the journal is being created. This will also determine the available departments.</li>
      <li><strong>Department</strong>: After selecting a company, choose the relevant department associated with the journal entry.</li>
      <li><strong>Journal Date</strong>: Enter the date for the journal entry.</li>
      <li><strong>Journal Type</strong>: Select the type of journal (e.g., general journal, cash journal, etc.).</li>
      <li><strong>Description</strong>: Provide a short description or purpose of the journal entry.</li>
      <li><strong>Currency</strong>: Select the currency associated with the journal entry (e.g., USD, EUR).</li>
      <li><strong>Status</strong>: Choose the current status of the journal (e.g., draft, finalized).</li>
    </ul>

    <h3 className="subheading">Generating Journal Number</h3>
    <p className="indented-paragraph">
      The system automatically generates a unique journal number when the form is submitted. This number is composed of a prefix, the current timestamp, and a random suffix to ensure uniqueness.
    </p>

    <h3 className="subheading">Creating Journal Lines</h3>
    <p className="indented-paragraph">
      After the journal header is successfully created, the user is prompted to enter the journal lines (specific transactions or entries) through a modal window. This step ensures the complete entry of financial data for the journal.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Users must have the appropriate permissions to create a journal header. The system checks whether the user has the required access before allowing them to submit the form.
    </p>

    <h3 className="subheading">Security & Validation</h3>
    <p className="indented-paragraph">
      The form includes built-in validation for required fields (e.g., company, department, journal type, etc.). If any required field is missing, the user is prompted to complete the missing information.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If any error occurs during the form submission (e.g., failed API calls), the user will receive an appropriate error message, and the system ensures no data is lost.
    </p>

    <h3 className="subheading">Other Modules</h3>
    <p className="indented-paragraph">
      Aside from the journal header creation, users may also interact with other modules in the system:
    </p>
    <ul className="indented-list">
      <li><strong>Employee Module</strong>: Manage employee-related functionalities.</li>
      <li><strong>Security Module</strong>: Handle user access and permissions.</li>
      <li><strong>Email Module</strong>: View emails generated within the system.</li>
    </ul>
  </div>
);

export default HELP_CreateJournalPage;
