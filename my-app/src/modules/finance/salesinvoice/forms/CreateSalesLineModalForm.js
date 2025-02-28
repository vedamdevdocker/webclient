import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { Modal, Button } from "react-bootstrap";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};
const generateSOLineNumber = () => {
  const timestamp = new Date().getTime();
  const timestampSuffix = timestamp % 100000;
  const randomSuffix = Math.floor(Math.random() * 1000);
  const formattedRandomSuffix = String(randomSuffix).padStart(3, "0");
  const generatedPOLineNumber = `${timestampSuffix}${formattedRandomSuffix}`;

  return parseInt(generatedPOLineNumber);
};
const CreateSalesLineModalForm = ({
  showLinesModalWindow,
  headerId,
  currencyId,
  invoiceNumber,
  currencyCode,
  currencySymbol,
  tax_id,
  tax_code,
  tax_rate,
  setTotalSum,
  onClose,
  onSuccess,
}) => {
  const [lines, setLines] = useState([
    {
      line_number: generateSOLineNumber(),
      item_id: "",
      quantity: 0,
      unit_price: 0,
      line_total: 0,
      uom_id: "",
    },
  ]);
  const [successMessage, setSuccessMessage] = useState(null);

  const [items, setItems] = useState([]);
  const [uoms, setUoms] =useState([]);
  const [totalLineAmount, setTotalLineAmount] = useState(0);
  const displayCurrency = currencySymbol ? currencySymbol : currencyCode;

  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      onClose();
    }
  };

  const roundToTwoDecimalPlaces = (value) => {
    return parseFloat(value).toFixed(2);
  };

  const calculateTotalLineAmount = (lines) => {
    const total = lines.reduce((acc, line) => acc + parseFloat(line.line_total), 0);
    setTotalLineAmount(roundToTwoDecimalPlaces(total));
  };
  

  useEffect(() => {

    calculateTotalLineAmount(lines); 
    const fetchItemsList = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(response.data.items)
        return response.data.items;

      } catch (error) {
        console.error("Error fetching items:", error);
        return [];
      }
    };
  
    const fetchUOMsList = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUoms(response.data.uom)
        return response.data.uom;

      } catch (error) {
        console.error("Error fetching UOMs:", error);
        return [];
      }
    };
    fetchItemsList();
    fetchUOMsList();
   // eslint-disable-next-line
  }, [lines]);

  const handleQuantityChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].quantity = value;
    updatedLines[index].line_total = roundToTwoDecimalPlaces(value * updatedLines[index].unit_price);
    setLines(updatedLines);
    calculateTotalSum(updatedLines); // Update total sum
  };
  

  const handleUnitPriceChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].unit_price = value;
    updatedLines[index].line_total = roundToTwoDecimalPlaces(value * updatedLines[index].quantity);
    setLines(updatedLines);
    calculateTotalSum(updatedLines); // Update total sum
  };
  

  const calculateTotalSum = (updatedLines) => {
    const sum = updatedLines.reduce((total, line) => total + parseFloat(line.line_total), 0);
    setTotalSum(roundToTwoDecimalPlaces(sum));
  };
  

  const validateForm = () => {
    const isAnyFieldEmpty = lines.some(
      line =>
        !line.item_id ||
        !line.quantity ||
        !line.unit_price ||
        !line.uom_id
    );
    return !isAnyFieldEmpty;
  };

  const handleCreateInvoiceLine = async () => {
    try {

      if (!validateForm()) {
        alert('Please fill in all fields.');
        return;
      }
  
      const updatedLinesWithHeaderId = lines.map((line) => ({
        ...line,
        header_id: headerId,
        line_total: roundToTwoDecimalPlaces(line.quantity * line.unit_price),
        invoice_number: invoiceNumber,
      }));
  
      console.log("JSON request", updatedLinesWithHeaderId);
  
      const response = await axios.post(
        `${API_URL}/create_sales_invoice_lines`,
        updatedLinesWithHeaderId,
        { headers: generateHeaders() }
      );
  
      if (response.data.success) {
        onClose();
        onSuccess(response);
        setSuccessMessage("Invoice lines created successfully.");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 15000);
        calculateTotalLineAmount(lines);
        setLines([
          {
            line_number: generateSOLineNumber(),
            item_id: "",
            quantity: 0,
            unit_price: 0,
            line_total: 0,
            uom_id: "",
          },
        ]);
      } else {
        console.error("Error creating invoice lines:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating invoice lines:", error);
    }
  };
  
  
  

  const handleClear = (index) => {
    if (lines.length === 1) {
      return;
    }
  
    const updatedLines = [...lines];
    const removedLineTotal = parseFloat(updatedLines[index].line_total); 
    updatedLines.splice(index, 1);
    setLines(updatedLines);
    setTotalLineAmount(roundToTwoDecimalPlaces(totalLineAmount - removedLineTotal));
  };
  

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        line_number: generateSOLineNumber(),
        header_id: "",
        item_id: "",
        quantity: 0,
        unit_price: 0,
        line_total: 0,
        uom_id: "",
      },
    ]);
  };

  return (
    <Modal
      show={showLinesModalWindow}
      className="invoice-line-modal-content"
      size="xl"
      onHide={handleClose}
    >
      <Modal.Header closeButton className="invoice-line-modal-title-custom">
        <Modal.Title>
          Invoice Lines
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
      <div>
          <b>Invoice Number:</b> {invoiceNumber} <br></br>
          <b>Invoice Amount:</b> {totalLineAmount}  {currencyCode} <br></br>
          <b>Tax Rate:</b> {tax_rate} % <br></br>
        </div>
        <div className="invoice-line-table-container">
          <table className="table table-striped">
            <thead className="invoice-line-table-header-custom">
              <tr>
                <th>Line No</th>
                <th>Item ID</th>
                <th>Quantity</th>
                <th>Unit Price ({displayCurrency})</th>
                <th>Line Total ({displayCurrency})</th>
                <th>UOM ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index} className="table-row">
                  <td>{line.line_number}</td>
                  <td>
                    <select
                      value={line.item_id}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].item_id = e.target.value;
                        setLines(updatedLines);
                      }}
                    >
                      <option value="">Select Item</option>
                      {items.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {item.item_code} ({item.item_name})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                  <input
                      type="text"
                      value={line.quantity}
                      onChange={(e) => handleQuantityChange(index, e.target.value)}
                    />
                  </td>
                  <td>
                  <input
                      type="text"
                      value={line.unit_price}
                      onChange={(e) => handleUnitPriceChange(index, e.target.value)}
                    />
                  </td>
                  <td>{roundToTwoDecimalPlaces(line.line_total)}</td>
                  <td>
                    <select
                      value={line.uom_id}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].uom_id = e.target.value;
                        setLines(updatedLines);
                      }}
                    >
                      <option value="">Select UOM</option>
                      {uoms.map((uom) => (
                        <option key={uom.uom_id} value={uom.uom_id}>
                          {uom.abbreviation} ({uom.uom_name})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <button
                      onClick={() => handleClear(index)}
                      disabled={lines.length === 1}
                    >
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <button onClick={handleAddNew}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateInvoiceLine}>
          Create Invoice Lines
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
      {successMessage && (
        <div className="success-message">{successMessage}</div>
      )}
    </Modal>
  );
};

export default CreateSalesLineModalForm;
