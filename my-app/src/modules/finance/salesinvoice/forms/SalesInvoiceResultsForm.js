import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button } from "react-bootstrap"; // Import the Modal and Button components

export default function SalesInvoiceResultsForm() {
  const { SalesParameters } = useParams();
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [SalesInvoiceLines, setSalesInvoiceLines] = useState([]);
  const [SalesInvoiceDistributions, setSalesInvoiceDistributions] = useState(
    []
  );
  const [showLinesModalWindow, setShowLinesModalWindow] = useState(false);
  const [showDistributionModalWindow, setShowDistributionModalWindow] =
    useState(false);
  const [currencyCode, setCurrencyCode] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState(false);
  const [invoiceTotal, setInvoiceTotal] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_URL}/get_so_invoices`;

        if (SalesParameters) {
          const queryParams = new URLSearchParams(SalesParameters);
          apiUrl += `?${queryParams.toString()}`;
        }
        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });
        setResultData(response.data.sales_invoice_headers);
        setError(null);
        logger.info(`[${new Date().toLocaleTimeString()}] The URL`, apiUrl);
        logger.info(
          `[${new Date().toLocaleTimeString()}] Fetched Sales data successfully`,
          response.data.sales_invoice_headers
        );
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching Sales data`,
          error
        );
      }
    };

    fetchData();
  }, [SalesParameters, hasRequiredAccess]);

  const fetchSalesInvoiceLines = async (
    headerId,
    currencycode,
    totalamount,
    invoice_number
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_sales_invoice_lines?header_id=${headerId}`,
        {
          headers: generateHeaders(),
        }
      );
      setSalesInvoiceLines(response.data.sales_invoice_lines);
      setCurrencyCode(currencycode);
      setInvoiceTotal(totalamount);
      setInvoiceNumber(invoice_number);

      setShowLinesModalWindow(true);
    } catch (error) {
      setError("An error occurred while fetching Sales lines.");
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching Sales lines`,
        error
      );
    }
  };

  const fetchSalesInvoiceDistributions = async (
    headerId,
    currencycode,
    totalamount,
    invoice_number,
    currencysymbol
  ) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_sales_invoice_distributions?header_id=${headerId}`,
        {
          headers: generateHeaders(),
        }
      );
      setSalesInvoiceDistributions(response.data.sales_invoice_accounts);
      setCurrencyCode(currencycode);
      setInvoiceTotal(totalamount);
      setInvoiceNumber(invoice_number);
      setCurrencySymbol(currencysymbol);

      setShowDistributionModalWindow(true);
    } catch (error) {
      setError("An error occurred while fetching Sales Distributions.");
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching Sales Distributions`,
        error
      );
    }
  };

  return (
    <div>
      <h1>Sales Invoice Headers</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead className="jo-line-table-header-custom">
            <tr>
              <th>Invoice No</th>
              <th>Department</th>
              <th>Currency</th>
              <th>Invoice Amount</th>
              <th>Tax</th>
              <th>Business Partner</th>
              <th>Invoice Date</th>
              <th>Due Date</th>
              <th>Payment Terms</th>
              <th>Status</th>
              <th>Lines</th>
              <th>Distributions</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((pi, index) => (
              <tr key={index} className="table-row">
                <td key={pi.invoice_number}>{pi.invoice_number}</td>
                <td key={pi.department_id}>{pi.department_name}</td>
                <td key={pi.currency_id}>{pi.currencycode}</td>
                <td key={pi.totalamount}>{pi.totalamount}</td>
                <td key={pi.tax_id}>{pi.tax_id}</td>
                <td key={pi.partnerid}>{pi.partnername}</td>
                <td key={pi.invoicedate}>{pi.invoicedate}</td>
                <td key={pi.payment_duedate}>{pi.payment_duedate}</td>
                <td key={pi.payment_terms}>{pi.payment_terms}</td>
                <td key={pi.status}>{pi.status}</td>
                <td>
                  <button
                    onClick={() =>
                      fetchSalesInvoiceLines(
                        pi.header_id,
                        pi.currencycode,
                        pi.totalamount,
                        pi.invoice_number
                      )
                    }
                  >
                    Lines
                  </button>
                </td>
                <td>
                  <button
                    onClick={() =>
                      fetchSalesInvoiceDistributions(
                        pi.header_id,
                        pi.currencycode,
                        pi.totalamount,
                        pi.invoice_number,
                        pi.currencysymbol
                      )
                    }
                  >
                    Distribution
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        show={showLinesModalWindow}
        onHide={() => setShowLinesModalWindow(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Sales Invoice Lines</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Invoice Number:</b> {invoiceNumber} <br />
            <b>Invoice Amount:</b> {invoiceTotal} {currencyCode} <br />
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Line No</th>
                <th>Item ID</th>
                <th>Quantity</th>
                <th>Unit Price ({currencyCode})</th>
                <th>Line Total ({currencyCode})</th>
                <th>UOM ID</th>
              </tr>
            </thead>
            <tbody>
              {SalesInvoiceLines.map((line, index) => (
                <tr key={index}>
                  <td key={line.line_number}>{line.line_number}</td>
                  <td key={line.item_id}>{line.item_code}</td>
                  <td key={line.quantity}>{line.quantity}</td>
                  <td key={line.unit_price}>{line.unit_price}</td>
                  <td key={line.line_total}>{line.line_total}</td>
                  <td key={line.uom_id}>{line.uom_name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowLinesModalWindow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
        show={showDistributionModalWindow}
        onHide={() => setShowDistributionModalWindow(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Invoice Distributions</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Invoice Number:</b> {invoiceNumber} <br />
            <b>Invoice Amount:</b> {invoiceTotal} {currencyCode} <br />
          </div>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Line No</th>
                <th>Is Tax Line</th>
                <th>Account</th>
                <th>Category</th> {/* Added Category column */}
                <th>Type</th> {/* Added Type column */}
                <th>Debit ({currencySymbol})</th>
                <th>Credit ({currencySymbol})</th>
              </tr>
            </thead>
            <tbody>
              {SalesInvoiceDistributions.map((line, index) => (
                <tr key={index}>
                  <td key={line.line_number}>{line.line_number}</td>
                  <td key={line.is_tax_line}>
                    {line.is_tax_line === 1 ? "True" : ""}
                  </td>
                  <td key={line.account_id}>{line.account_number}</td>
                  <td key={line.account_category}>
                    {line.account_category}
                  </td>{" "}
                  {/* Added Category data */}
                  <td key={line.account_type}>{line.account_type}</td>{" "}
                  {/* Added Type data */}
                  <td key={line.debitamount}>{line.debitamount}</td>
                  <td key={line.creditamount}>{line.creditamount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDistributionModalWindow(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
