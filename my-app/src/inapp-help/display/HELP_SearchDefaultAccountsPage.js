import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchDefaultAccountsPage = () => (
  <div>
    <h2 className="subheading">Search Default Accounts</h2>
    <p className="indented-paragraph">
      The `Search Default Accounts` form allows users to search for default account information based on company, currency, and account header selections.
    </p>

    <h3 className="subheading">Company Selection</h3>
    <p className="indented-paragraph">
      The "Company" dropdown allows you to select a company from the available list. This is used to filter the accounts based on the company selected. Once a company is selected, the account headers related to that company will be displayed in the next dropdown.
    </p>

    <h3 className="subheading">Currency Selection</h3>
    <p className="indented-paragraph">
      The "Currency" dropdown lets you choose a currency from the available list. This will help filter the default accounts according to the selected currency.
    </p>

    <h3 className="subheading">Account Header Selection</h3>
    <p className="indented-paragraph">
      The "Account Header Name" dropdown is where you select an account header. This list is filtered based on the company you choose. If no company is selected, all available headers will be shown. If a company is selected, the dropdown will show only the headers that are related to that company's default account.
    </p>

    <h3 className="subheading">Search Button</h3>
    <p className="indented-paragraph">
      After selecting the desired company, currency, and account header, you can click the "Search" button to view the default accounts that match the selected criteria. If any of the fields are left blank, the search will be based on the available information.
    </p>

    <h3 className="subheading">Permissions and Access</h3>
    <p className="indented-paragraph">
      Ensure that you have the necessary permissions to view the company and account information. If certain companies or currencies are not visible, you may need additional access rights.
    </p>
  </div>
);

export default HELP_SearchDefaultAccountsPage;
