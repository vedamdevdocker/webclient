import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchJournalPage = () => (
  <div>
    <h2 className="subheading">Search Journal</h2>
    <p className="indented-paragraph">
      The `Search Journal` page allows users to find specific journal headers based on multiple search criteria. You can choose to filter journals by company, department, journal type, reference type, reference ID, status, and currency.
    </p>

    <h3 className="subheading">Journal Data Selection</h3>
    <p className="indented-paragraph">
      Use the "Journal Data by Selection" checkbox to toggle between two modes:
    </p>
    <ul>
      <li>
        **Journal Data by Selection**: This mode allows you to filter journal headers based on specific parameters like company, department, journal type, reference type, and more.
      </li>
      <li>
        **Search by Journal Details**: If the checkbox is unchecked, you can search using more granular journal-specific details such as company number, journal type, source transaction number, and journal number.
      </li>
    </ul>

    <h3 className="subheading">Company</h3>
    <p className="indented-paragraph">
      The "Company" dropdown allows you to select the company whose journal headers you want to search. The department options will be updated based on your company selection.
    </p>

    <h3 className="subheading">Department</h3>
    <p className="indented-paragraph">
      After selecting a company, you can choose a specific department from the available list. This narrows down the search to journals associated with that department.
    </p>

    <h3 className="subheading">Journal Type</h3>
    <p className="indented-paragraph">
      Choose the "Journal Type" from the dropdown to filter journals based on the type (e.g., General Ledger, Accounts Payable).
    </p>

    <h3 className="subheading">Reference Type</h3>
    <p className="indented-paragraph">
      The "Reference Type" dropdown allows you to choose a specific type of reference associated with the journal. This can include things like invoice or payment type.
    </p>

    <h3 className="subheading">Reference ID</h3>
    <p className="indented-paragraph">
      After selecting a reference type, you can choose a specific "Reference ID" to filter the journals. The list of available reference IDs will depend on the reference type selected.
    </p>

    <h3 className="subheading">Status</h3>
    <p className="indented-paragraph">
      Use the "Status" dropdown to filter journals based on their current status (e.g., Pending, Completed).
    </p>

    <h3 className="subheading">Currency</h3>
    <p className="indented-paragraph">
      The "Currency" dropdown allows you to filter journals based on the currency used in the transaction.
    </p>

    <h3 className="subheading">Search by Journal Details</h3>
    <p className="indented-paragraph">
      If you choose not to use the advanced filtering options (by leaving the checkbox unchecked), you can search by the following journal-specific details:
    </p>
    <ul>
      <li>
        **Company Number**: Enter the company number associated with the journal.
      </li>
      <li>
        **Journal Type**: Specify the type of journal you are searching for.
      </li>
      <li>
        **Source Transaction Number**: Enter the source transaction number.
      </li>
      <li>
        **Journal Number**: Enter the specific journal number to narrow your search.
      </li>
    </ul>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      Ensure that you have the necessary permissions to access and search for journal headers. If you are unable to access certain data or fields, you may need additional access rights.
    </p>
  </div>
);

export default HELP_SearchJournalPage;
