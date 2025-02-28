import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SearchPOInvoiceToUpdatePage = () => (
  <div>
    <h2 className="subheading">Search Purchase Invoice to Update</h2>
    <p className="indented-paragraph">
      This page allows you to search for existing purchase invoices to update them. You can either search by different selection filters (Company, Department, Purchase Type, etc.) or use a specific Purchase Order or Invoice number.
    </p>
    <h3 className="subheading">Step 1: Choose the Search Method</h3>
    <p className="indented-paragraph">
      You can search by either choosing filters for the invoice (e.g., Company, Department, Purchase Type) or use the checkbox to search by Purchase Order No and Invoice Number directly.
    </p>

    <h3 className="subheading">Step 2: Filter by Company</h3>
    <p className="indented-paragraph">
      Select a Company to narrow down the list of purchase invoices. This will also filter the available departments for that company.
    </p>

    <h3 className="subheading">Step 3: Filter by Department</h3>
    <p className="indented-paragraph">
      After selecting a company, you can choose a specific department within the company to further refine your search for purchase invoices.
    </p>

    <h3 className="subheading">Step 4: Select Purchase Type</h3>
    <p className="indented-paragraph">
      Based on your department selection, choose the type of purchase for which you are searching invoices. The options will depend on the company's available purchase types.
    </p>

    <h3 className="subheading">Step 5: Choose Reference Type and Reference ID</h3>
    <p className="indented-paragraph">
      Select the Reference Type (such as Order Number, Invoice Number) and the corresponding Reference ID to narrow your search to specific invoice references.
    </p>

    <h3 className="subheading">Step 6: Select Status and Currency</h3>
    <p className="indented-paragraph">
      Filter by the status (e.g., Pending, Approved, etc.) and currency to find specific purchase invoices.
    </p>

    <h3 className="subheading">Alternative Search Method</h3>
    <p className="indented-paragraph">
      If you prefer, you can check the "Purchase Invoice by Selection" checkbox to search by specific Purchase Order No and Invoice Number. This allows you to directly enter known invoice details without applying multiple filters.
    </p>

    <h3 className="subheading">Final Step: Update Purchase Invoice</h3>
    <p className="indented-paragraph">
      Once you’ve applied the necessary filters or entered specific invoice details, click on the "Update Purchase Invoice" button to proceed with the update process.
    </p>
  </div>
);

export default HELP_SearchPOInvoiceToUpdatePage;
