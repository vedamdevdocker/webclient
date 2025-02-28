import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_UpdatePOInvoiceHeaderPage = () => (
  <div>
    <h2 className="subheading">Purchase Invoice Update</h2>
    <p className="indented-paragraph">
      This page allows users to update a purchase invoice by selecting relevant information such as Company, Department, Currency, Tax, Partner, Invoice Date, Due Date, Payment Terms, and Status. The form ensures that all required fields are selected before submission.
    </p>

    <h3 className="subheading">Company, Department, Currency, and Tax</h3>
    <p className="indented-paragraph">
      Users must select a Company, Department, Currency, and Tax associated with the invoice. These are required fields to ensure the correct setup for the purchase invoice.
    </p>

    <h3 className="subheading">Partner and Payment Details</h3>
    <p className="indented-paragraph">
      The user can choose the relevant Partner for the invoice and enter the Invoice Date, Payment Due Date, and Payment Terms, which are crucial for invoicing and payment processing.
    </p>

    <h3 className="subheading">Invoice Status</h3>
    <p className="indented-paragraph">
      The Status dropdown allows the user to select the current status of the invoice. This helps in tracking the invoice's progress in the system.
    </p>

    <h3 className="subheading">Actions: Lines and Distributions</h3>
    <p className="indented-paragraph">
      After filling out the form, users can add or update the purchase invoice lines and distributions using the 'Lines' and 'Distributions' buttons. These buttons open modal windows that allow users to enter or modify the specific line items and distribution details.
    </p>

    <h3 className="subheading">Form Submission</h3>
    <p className="indented-paragraph">
      Once all the required fields are completed, the user can submit the form. After submission, a success or error message will be displayed based on the outcome. The form will be disabled to prevent further changes once it has been successfully submitted.
    </p>

    <h3 className="subheading">Error Handling</h3>
    <p className="indented-paragraph">
      If there are any errors in the form (such as missing or incorrect data), an error message will be displayed to help guide the user in correcting the issue.
    </p>
  </div>
);

export default HELP_UpdatePOInvoiceHeaderPage;
