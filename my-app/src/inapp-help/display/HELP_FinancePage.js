import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_FinancePage = () => (
  <div>
    <h2 className="subheading">Finance Module</h2>
    <p className="indented-paragraph">
      In this module, you can create, update, delete, and manage all kinds of financial transactions within the application.
    </p>

    <h4 className="subheading">Accounts</h4>
    <p className="indented-paragraph">
      The `Accounts` section allows users to manage all aspects of accounts in the system, including creating new accounts, deleting or updating existing accounts, and retrieving account information.
    </p>

    <h3 className="subheading">Create Account</h3>
    <p className="indented-paragraph">
      The `Create Account` option allows users to create a new account in the system. This includes specifying account details such as account type, name, and other related information.
    </p>

    <h3 className="subheading">Delete Account</h3>
    <p className="indented-paragraph">
      The `Delete Account` option enables users to delete an existing account from the system. Be cautious as deleting an account will remove all associated data.
    </p>

    <h3 className="subheading">Update Account</h3>
    <p className="indented-paragraph">
      The `Update Account` option allows users to modify details of an existing account, such as changing account settings or updating account information to reflect any changes in the business.
    </p>

    <h3 className="subheading">Get Accounts</h3>
    <p className="indented-paragraph">
      The `Get Accounts` option provides users with a list of all existing accounts in the system. This allows users to view, manage, and track their accounts effectively.
    </p>

    <h3 className="subheading">Get Default Accounts</h3>
    <p className="indented-paragraph">
      The `Get Default Accounts` option allows users to view the default set of accounts that are preconfigured in the system. These accounts serve as a starting point for financial record-keeping.
    </p>

    <h3 className="subheading">Create Default Accounts</h3>
    <p className="indented-paragraph">
      The `Create Default Accounts` option enables users to create a set of default accounts for the system. These accounts can be used as templates for various financial transactions.
    </p>

    <h3 className="subheading">Company Default Accounts</h3>
    <p className="indented-paragraph">
      The `Company Default Accounts` option allows users to configure and manage the default accounts that apply across the entire company. These accounts are foundational for the financial structure of the business.
    </p>

    <h4 className="subheading">Journals</h4>
    <p className="indented-paragraph">
      The `Journals` section allows users to create, delete, update, and manage journal entries, which track the financial transactions made by the company.
    </p>

    <h3 className="subheading">Create Journal</h3>
    <p className="indented-paragraph">
      The `Create Journal` option enables users to create a new journal entry, which records a financial transaction within the system.
    </p>

    <h3 className="subheading">Delete Journal</h3>
    <p className="indented-paragraph">
      The `Delete Journal` option allows users to remove a journal entry from the system. Deleting a journal entry should be done carefully, as it permanently removes the transaction record.
    </p>

    <h3 className="subheading">Update Journal</h3>
    <p className="indented-paragraph">
      The `Update Journal` option lets users modify the details of an existing journal entry, such as correcting transaction details or adjusting the amounts recorded.
    </p>

    <h3 className="subheading">Get Journals</h3>
    <p className="indented-paragraph">
      The `Get Journals` option provides users with a list of all journal entries in the system, allowing users to track and review financial transactions.
    </p>

    <h3 className="subheading">Auto Create Journal</h3>
    <p className="indented-paragraph">
      The `Auto Create Journal` option automatically generates journal entries based on predefined rules or triggers, simplifying the process of financial record-keeping.
    </p>

    <h4 className="subheading">Purchase Invoices</h4>
    <p className="indented-paragraph">
      The `Purchase Invoices` section handles the creation, deletion, and updating of purchase invoices for managing purchases and expenses in the business.
    </p>

    <h3 className="subheading">New Purchase Invoice</h3>
    <p className="indented-paragraph">
      The `New Purchase Invoice` option allows users to create a new purchase invoice to record the details of a purchase transaction.
    </p>

    <h3 className="subheading">Delete Purchase Invoice</h3>
    <p className="indented-paragraph">
      The `Delete Purchase Invoice` option enables users to remove a purchase invoice that was previously created in the system. This action will delete all related details.
    </p>

    <h3 className="subheading">Update Purchase Invoice</h3>
    <p className="indented-paragraph">
      The `Update Purchase Invoice` option allows users to edit the details of an existing purchase invoice, such as modifying the invoice amount or updating vendor information.
    </p>

    <h3 className="subheading">Get Purchase Invoices</h3>
    <p className="indented-paragraph">
      The `Get Purchase Invoices` option provides users with a list of all purchase invoices, allowing them to view and track all purchasing transactions.
    </p>

    <h3 className="subheading">Auto Create Purchase Invoice</h3>
    <p className="indented-paragraph">
      The `Auto Create Purchase Invoice` option automatically generates purchase invoices based on predefined criteria, streamlining the invoicing process for regular purchases.
    </p>

    <h4 className="subheading">Sales Invoices</h4>
    <p className="indented-paragraph">
      The `Sales Invoices` section is responsible for managing invoices related to sales transactions, including creating, deleting, updating, and viewing sales invoices.
    </p>

    <h3 className="subheading">New Sales Invoice</h3>
    <p className="indented-paragraph">
      The `New Sales Invoice` option allows users to create a new sales invoice to record the details of a sale made to a customer.
    </p>

    <h3 className="subheading">Delete Sales Invoice</h3>
    <p className="indented-paragraph">
      The `Delete Sales Invoice` option enables users to remove an existing sales invoice from the system. Once deleted, the invoice and its related data will be permanently removed.
    </p>

    <h3 className="subheading">Update Sales Invoice</h3>
    <p className="indented-paragraph">
      The `Update Sales Invoice` option allows users to modify the details of an existing sales invoice, such as updating item quantities or adjusting amounts.
    </p>

    <h3 className="subheading">Get Sales Invoices</h3>
    <p className="indented-paragraph">
      The `Get Sales Invoices` option provides users with a list of all sales invoices, helping users to track and manage the sales transactions in the system.
    </p>

    <h3 className="subheading">Auto Create Sales Invoice</h3>
    <p className="indented-paragraph">
      The `Auto Create Sales Invoice` option automatically generates sales invoices based on predefined sales records or conditions, simplifying the invoicing process.
    </p>
  </div>
);

export default HELP_FinancePage;
