// Grouped configuration objects by company ID
export const COMPANY_CONFIG = {
  3001: {
    AUTO_SALES_INVOICE_CONFIG: {
      so_order_status_filter: ["PICKED", "PARTPICKED", "APPROVED"],
      so_new_status: "INVOICED",
      invoice_status: "DRAFT",
      account_types: {
        Debit: [
          {
            account_type: "Accounts Receivable",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Retained Earnings",
            category: "Normal",
            distribution_percentage: 50,
          },
        ],
        Credit: [
          {
            account_type: "Loans Payable",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Rent Expense",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Tax Payable",
            category: "Tax",
            tax_type: "VAT",
            distribution_percentage: 100,
          }
        ],
      },
    },
    AUTO_PURCHASE_INVOICE_CONFIG: {
      invoice_status: "DRAFT",
      po_new_status: "INVOICED",
      po_order_status_filter: ["APPROVED", "Received"],
      payment_terms: "NET 20",
      account_types: {
        Credit: [
          {
            account_type: "Accounts Payable",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Accounts Payable Internal",
            category: "Normal",
            distribution_percentage: 50,
          },
        ],
        Debit: [
          {
            account_type: "Inventory",
            category: "Normal",
            distribution_percentage: 100,
          },
          {
            account_type: "Inventory Tax",
            category: "Tax",
            tax_type: "VAT",
            distribution_percentage: 50,
          }
        ],
      },
    },
  },
  3017: {
    AUTO_SALES_INVOICE_CONFIG: {
      so_order_status_filter: ["PICKED", "PARTPICKED", "APPROVED"],
      so_new_status: "INVOICED",
      invoice_status: "DRAFT",
      account_types: {
        Debit: [
          {
            account_type: "Accounts Receivable",
            category: "Normal",
            distribution_percentage: 100,
          },
        ],
        Credit: [
          {
            account_type: "Cash",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Sales",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Tax Payable",
            category: "Tax",
            tax_type: "GST",
            distribution_percentage: 100,
          },
        ],
      },
    },
    AUTO_PURCHASE_INVOICE_CONFIG: {
      invoice_status: "DRAFT",
      po_new_status: "INVOICED",
      po_order_status_filter: ["APPROVED", "RECEIVED"],
      payment_terms: "NET 20",
      account_types: {
        Credit: [
          {
            account_type: "Purchase",
            category: "Normal",
            distribution_percentage: 100,
          },
        ],
        Debit: [
          {
            account_type: "Cash",
            category: "Normal",
            distribution_percentage: 100,
          },
          {
            account_type: "Tax Payable",
            category: "Tax",
            tax_type: "GST",
            distribution_percentage: 100,
          },
        ],
      },
    },
  },
  3007: {
    AUTO_SALES_INVOICE_CONFIG: {
      so_order_status_filter: ["PICKED", "PARTPICKED", "APPROVED"],
      so_new_status: "INVOICED",
      invoice_status: "DRAFT",
      account_types: {
        Debit: [
          {
            account_type: "Accounts Receivable",
            category: "Normal",
            distribution_percentage: 100,
          },
        ],
        Credit: [
          {
            account_type: "Cash",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Cost of Goods Sold",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Tax Payable",
            category: "Tax",
            tax_type: "GST",
            distribution_percentage: 100,
          },
        ],
      },
    },
    AUTO_PURCHASE_INVOICE_CONFIG: {
      invoice_status: "DRAFT",
      po_new_status: "INVOICED",
      po_order_status_filter: ["APPROVED", "RECEIVED"],
      payment_terms: "NET 20",
      account_types: {
        Credit: [
          {
            account_type: "Accounts Payable",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Inventory",
            category: "Normal",
            distribution_percentage: 50,
          },
        ],
        Debit: [
          {
            account_type: "Utilities Expense",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Retained Earnings",
            category: "Normal",
            distribution_percentage: 50,
          },
          {
            account_type: "Tax Payable",
            category: "Tax",
            tax_type: "GST",
            distribution_percentage: 50,
          }
        ],
      },
    },
  },
};
