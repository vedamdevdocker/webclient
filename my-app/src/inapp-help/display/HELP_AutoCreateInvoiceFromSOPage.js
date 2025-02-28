import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_AutoCreateInvoiceFromSOPage = () => (
  <div>
    <h2 className="subheading">Auto Create Sales Order Invoice</h2>
    <p className="indented-paragraph">
      The `Auto Create Sales Order Invoice` feature allows users to automatically generate sales invoices from selected sales orders. The process takes into account company or department-level configurations, tax codes, and the current statuses of the sales orders.
    </p>

    <h3 className="subheading">Form Fields and Functionality</h3>
    <p className="indented-paragraph">
      The form on this page allows users to input one or more sales order numbers, which will then be used to create corresponding invoices. The following fields and functionality are part of the form:
    </p>

    <h4 className="subheading">Sales Order Numbers</h4>
    <p className="indented-paragraph">
      The `Sales Order Numbers` field is used to input the numbers of the sales orders for which invoices are to be created. Users can enter one or more sales order numbers, separated by commas. The system will process the sales orders and automatically create invoices based on the provided numbers.
    </p>
    <p className="indented-paragraph">
      Example: `1001, 1002, 1003`
    </p>

    <h4 className="subheading">Handling Multiple Sales Orders</h4>
    <p className="indented-paragraph">
      When multiple sales order numbers are entered, the system will create invoices for each valid sales order. If a user does not specify any sales order numbers, they will be prompted with a confirmation dialog to create invoices for all sales orders.
    </p>

    <h4 className="subheading">Invoice Creation Based on Company Setup</h4>
    <p className="indented-paragraph">
      The invoice creation process is influenced by the setup of each company or department within the system. Each company can have its own configuration for automatically generating invoices, and this configuration will be used during the invoice creation process.
    </p>
    <p className="indented-paragraph">
      The system groups the selected sales orders by company, checks if an invoice configuration exists, and calculates whether the Debit and Credit percentages match for the company's setup. If the sums are not equal, the company will be skipped in the invoice creation process.
    </p>

    <h4 className="subheading">Tax Code Setup</h4>
    <p className="indented-paragraph">
      The sales orders are also processed based on their tax code setup. The system checks each sales order’s status to ensure that it is eligible for auto-invoicing based on the tax code configuration. If the order's status does not match the required criteria, it will be excluded from the invoice creation.
    </p>

    <h4 className="subheading">Invoice Distribution</h4>
    <p className="indented-paragraph">
      The system creates invoices in the form of headers and lines for the specified sales orders. The invoice lines are then distributed according to the company configuration and tax rules, ensuring that each line reflects the correct distribution of costs and taxes.
    </p>

    <h3 className="subheading">Process Flow</h3>
    <p className="indented-paragraph">
      The following steps occur when the user submits the form:
    </p>
    <ol>
      <li>
        The system first splits the entered sales order numbers into an array and validates them.
      </li>
      <li>
        The system checks if the sales orders are eligible for invoicing based on their status and the company configuration.
      </li>
      <li>
        The sales orders are grouped by company, and each group is processed according to the company's setup.
      </li>
      <li>
        If the company's setup is valid, an invoice request is sent to the backend, and a sales invoice is generated.
      </li>
      <li>
        A success or error message is displayed to inform the user about the result of the invoice creation process.
      </li>
    </ol>

    <h3 className="subheading">Success and Error Messages</h3>
    <p className="indented-paragraph">
      After submitting the form, the system will display either a success or error message. If the invoice creation process is successful, a message will summarize how many invoices were created. If there is an issue (such as an invalid company configuration or an error in fetching sales order data), an error message will be shown to the user.
    </p>
    <p className="indented-paragraph">
      Possible success messages include:
    </p>
    <ul>
      <li>"Single Invoice successfully created for the single order entered."</li>
      <li>"Invoices are created for all the sales orders."</li>
      <li>"Invoices are not created for all the sales orders."</li>
      <li>"There are more invoices created than sales orders."</li>
    </ul>
    <p className="indented-paragraph">
      Error messages might indicate:
    </p>
    <ul>
      <li>"There is no AUTO_SALES_INVOICE_CONFIG setup for the company."</li>
      <li>"The Debit distribution percentage does not match the Credit distribution percentage for the company setup."</li>
      <li>"An error occurred while creating the sales invoice."</li>
    </ul>

    <h3 className="subheading">Permissions and Access</h3>
    <p className="indented-paragraph">
      The ability to create sales order invoices is restricted based on user access permissions. The user must have the necessary permission (Create Access) to process the invoice creation. If the user does not have access, they will see a message indicating that they do not have permission to create invoices.
    </p>

    <h3 className="subheading">Conclusion</h3>
    <p className="indented-paragraph">
      This form allows users to automate the creation of sales invoices for one or more sales orders. It ensures that each invoice is generated based on the correct company configuration, tax codes, and sales order statuses, simplifying the invoicing process for the organization.
    </p>
  </div>
);

export default HELP_AutoCreateInvoiceFromSOPage;
