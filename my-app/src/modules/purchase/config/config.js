export const PO_ORDER_STATUS = [
  { name: "Draft", short_name: "DRAFT", sequence: 10, toupdated: true },
  { name: "Pending Approval", short_name: "PENDING", sequence: 20, toupdated: true },
  { name: "Approved", short_name: "APPROVED", sequence: 30, toputaway: true, autoinvoice: true },
  { name: "Sent to Vendor", short_name: "SENT", sequence: 40, toinspect: true },
  { name: "Partial Receipt", short_name: "PARTIAL", sequence: 50, toputaway: true },
  { name: "Received", short_name: "Received", sequence: 60, putaway: true, autoinvoice: true },
  { name: "To Inspect", short_name: "TOINSPECT", sequence: 62, putaway: true },
  { name: "Inspected", short_name: "INSPECTED", sequence: 65, putaway: true },
  { name: "Invoiced", short_name: "INVOICED", sequence: 70, toputaway: true },
  { name: "Payment Processing", short_name: "PAYMENT", sequence: 80, putaway: true },
  { name: "Paid", short_name: "PAID", sequence: 90, putaway: true },
  { name: "Closed", short_name: "CLOSED", sequence: 100 }
];

export const UPDATABLE_PO_ORDER_STATUS = [
  { name: "Draft", short_name: "DRAFT", sequence: 10, toupdated: true },
  { name: "Pending Approval", short_name: "PENDING", sequence: 20, toupdated: true },
  { name: "Approved", short_name: "APPROVED", sequence: 30, toputaway: true },
  { name: "Sent to Vendor", short_name: "SENT", sequence: 40, toinspect: true },
  { name: "Partial Receipt", short_name: "PARTIAL", sequence: 50, toputaway: true },
  { name: "Received", short_name: "RECEIVED", sequence: 60, putaway: true },
  { name: "To Inspect", short_name: "TOINSPECT", sequence: 62, putaway: true },
  { name: "Inspected", short_name: "INSPECTED", sequence: 65, putaway: true },
  { name: "Invoiced", short_name: "INVOICED", sequence: 70, toputaway: true },
  { name: "Payment Processing", short_name: "PAYMENT", sequence: 80, putaway: true },
  { name: "Paid", short_name: "PAID", sequence: 90, putaway: true },
  { name: "Closed", short_name: "CLOSED", sequence: 100 }
];


export const PO_SEQUENCE_PREFIX = 200

