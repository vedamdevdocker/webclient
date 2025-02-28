import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchDefaultTaxCodesPage = () => (
  <div>
    <h2 className="subheading">Search Default Tax Codes</h2>
    <p className="indented-paragraph">
      The `Search Default Tax Codes` form allows users to search for default tax codes based on the tax header selection.
    </p>

    <h3 className="subheading">Tax Header Selection</h3>
    <p className="indented-paragraph">
      The "Tax Header" dropdown allows you to select a tax header from the available list of headers. Each tax header represents a category under which different tax codes are defined. Select the appropriate tax header to narrow down your search results.
    </p>

    <h3 className="subheading">Search Button</h3>
    <p className="indented-paragraph">
      After selecting a tax header, you can click the "Search" button to view the default tax codes associated with the selected header. If no tax header is selected, no search results will be returned.
    </p>

    <h3 className="subheading">Permissions and Access</h3>
    <p className="indented-paragraph">
      Make sure you have the necessary permissions to view and search for tax headers. If some tax headers are not visible, additional access rights may be required.
    </p>
  </div>
);

export default HELP_SearchDefaultTaxCodesPage;
