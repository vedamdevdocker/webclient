import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_AutoCreateJournalPage = () => (
  <div>
    <h2 className="subheading">Auto Create Journal</h2>
    <p className="indented-paragraph">
      The `Auto Create Journal` form allows users to create journals automatically based on selected journal categories and associated invoice details. This is typically used to record financial transactions in the journal related to sales or purchase invoices.
    </p>

    <h3 className="subheading">Journal Category</h3>
    <p className="indented-paragraph">
      The user is required to select a `Journal Category` from options such as "Sales" or "Purchase." This selection determines the available options for invoice status and invoice target status.
    </p>

    <h3 className="subheading">Description</h3>
    <p className="indented-paragraph">
      The `Description` field allows the user to provide a brief explanation or note about the journal being created. This can be useful for tracking or categorizing the journal entry.
    </p>

    <h3 className="subheading">Journal Status</h3>
    <p className="indented-paragraph">
      The user must select a `Journal Status` from the available options. The status defines the state of the journal (e.g., "Draft," "Approved"). These options are filtered based on the selected journal category.
    </p>

    <h3 className="subheading">Invoice Status</h3>
    <p className="indented-paragraph">
      The `Invoice Status` determines the status of invoices that will be associated with the journal. Based on the selected `Journal Category`, different invoice status options will be available (e.g., "Pending," "Paid").
    </p>

    <h3 className="subheading">Invoices</h3>
    <p className="indented-paragraph">
      The `Invoices` field allows the user to enter a comma-separated list of invoice numbers related to the journal. The system will use these invoice numbers to link the corresponding invoices with the journal entry. If no invoices are provided, the user will be prompted for confirmation before proceeding with the journal creation.
    </p>

    <h3 className="subheading">Invoice Target Status</h3>
    <p className="indented-paragraph">
      The `Invoice Target Status` is the final status that the invoices should be updated to after the journal is created. This status could be "Paid," "Unpaid," or other relevant states, depending on the specific configuration for the selected journal category.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      The user must have the required permissions to create a journal entry. If the user does not have the necessary access, they will be informed and will not be able to submit the form.
    </p>

    <h3 className="subheading">Form Submission Workflow</h3>
    <p className="indented-paragraph">
      Once the form is filled out, the user can submit the journal creation request. The system will validate the entered invoice numbers, check for any empty fields, and then attempt to create the journal via an API request. After a successful submission, the form will reset, and the user will be informed of the outcome.
    </p>

    <h3 className="subheading">Key Functionalities</h3>
    <ul className="indented-paragraph">
      <li><strong>Journal Category:</strong> Select the category (e.g., Sales, Purchase) to define the nature of the journal entry.</li>
      <li><strong>Description:</strong> Provide a brief description for the journal.</li>
      <li><strong>Journal Status:</strong> Choose a status for the journal (e.g., Draft, Approved).</li>
      <li><strong>Invoice Status:</strong> Select the status of invoices (e.g., Pending, Paid).</li>
      <li><strong>Invoices:</strong> Enter a list of invoice numbers related to the journal.</li>
      <li><strong>Invoice Target Status:</strong> Define the target status for the invoices after the journal is created.</li>
    </ul>

    <h3 className="subheading">Error and Success Handling</h3>
    <p className="indented-paragraph">
      Upon submitting the form, the system will provide feedback:
      - **Success Message**: If the journal is successfully created, the form will reset, and a confirmation message will be displayed.
      - **Error Message**: If any error occurs (e.g., invalid invoice numbers or permission issues), an error message will be shown.
    </p>
  </div>
);

export default HELP_AutoCreateJournalPage;
