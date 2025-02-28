import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_SalesOrdersSearchPage = () => (
  <div>
    <h2 className="subheading">Sales Order Search Help</h2>
    <p className="indented-paragraph">
      The Sales Order Search form allows you to search for sales orders based on various parameters. Below are explanations for each field and how to use them.
    </p>

    <h3 className="subheading">Company</h3>
    <p className="indented-paragraph">
      Select the company you want to search sales orders for. You can choose from a list of available companies. If left unselected, all companies will be included in the search.
    </p>

    <h3 className="subheading">Header ID</h3>
    <p className="indented-paragraph">
      Enter the sales order header ID if you know it. This field helps narrow down the search to a specific sales order header.
    </p>

    <h3 className="subheading">SO Number</h3>
    <p className="indented-paragraph">
      The Sales Order (SO) Number field allows you to search for a specific sales order by its unique number. Enter the full or partial SO number to filter the results.
    </p>

    <h3 className="subheading">Department</h3>
    <p className="indented-paragraph">
      Choose the department associated with the sales orders you want to search for. If you are unsure, leave it blank to search across all departments.
    </p>

    <h3 className="subheading">Supplier</h3>
    <p className="indented-paragraph">
      Select the supplier (or partner) from whom the sales orders originate. This will filter the results based on the selected supplier.
    </p>

    <h3 className="subheading">Tax Code</h3>
    <p className="indented-paragraph">
      Choose the applicable tax code for the sales orders you want to search for. This will narrow down the search to only those sales orders with the specified tax code.
    </p>

    <h3 className="subheading">Currency</h3>
    <p className="indented-paragraph">
      Select the currency in which the sales order is billed. This helps filter the sales orders based on the chosen currency.
    </p>

    <h3 className="subheading">Search Button</h3>
    <p className="indented-paragraph">
      After filling in the required fields, click the "Search" button to execute the query. The results will be displayed on a new page with a list of sales orders matching the selected filters.
    </p>

    <h3 className="subheading">Permissions</h3>
    <p className="indented-paragraph">
      If you do not have permission to access the search functionality, a message will inform you that you are not authorized to perform the search. Ensure that you have the required permissions to use this page.
    </p>

    <h3 className="subheading">Search Results</h3>
    <p className="indented-paragraph">
      Once you submit the search, the results will display sales orders matching the selected criteria. You can view additional details or take further actions depending on your permissions.
    </p>
  </div>
);

export default HELP_SalesOrdersSearchPage;
