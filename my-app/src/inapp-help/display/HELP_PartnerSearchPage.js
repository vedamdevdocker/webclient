import "../../modules/utilities/css/appcss.css";
import React from "react";

const HELP_PartnerSearchPage = () => {
  return (
    <div>
      <h2 className="subheading">Partner Search Form</h2>
      <p className="indented-paragraph">
        The `PartnerSearchForm` component allows you to search for partner information within the system.
      </p>

      <h3 className="subheading">Search Criteria</h3>
      <p className="indented-paragraph">
        To efficiently search for business partners, you can use the following search criteria:
      </p>
      <ul>
        <li>
          <strong>Search By:</strong> Choose the type of search you want to perform. If you select "Partner ID," you can enter the specific ID to find a particular business partner. Leaving this field empty will list all business partners. If you choose "Partner Name," you can enter either the full name or a part of the name to search for matching business partners. An empty field in this case will also list all business partners.
          <span className="help-example">Example: Searching by Partner ID - Enter the ID, or leave it empty to list all business partners. Searching by Partner Name - Enter the full name or a part of the name, or leave it empty to list all business partners.</span>
        </li>
        <li>
          <strong>Search Input:</strong> Enter the search term that corresponds to the selected "Search By" option. This can be the Partner ID or the Partner Name, depending on your choice.
          <span className="help-example">Example: Partner ID - Enter a specific ID. Partner Name - Enter a full or partial name.</span>
        </li>
      </ul>

      <h3 className="subheading">Performing a Search</h3>
      <p className="indented-paragraph">
        If you have the necessary access, you can initiate a search by clicking the "Search" button. The search results will be based on the search criteria you've provided. If you do not have the required access, you will see a message indicating that you do not have permission to perform this action.
      </p>

      <h3 className="subheading">Access Permissions</h3>
      <p className="indented-paragraph">
        Your access to this module is determined by your user role and permissions. If you do not have the necessary access, you will see a message indicating that you do not have permission to view this module.
        <span className="help-example">Example: You do not have permission to view this module</span>
      </p>
    </div>
  );
};

export default HELP_PartnerSearchPage;
