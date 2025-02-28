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
  const generatedSOLineNumber = `${timestampSuffix}${formattedRandomSuffix}`;

  return parseInt(generatedSOLineNumber);
};
const UpdateSalesLineModalForm = ({
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
  setInvoiceTotal,
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
  const [uoms, setUoms] = useState([]);
  const [totalLineAmount, setTotalLineAmount] = useState(0);
  const [hasNewLines, setHasNewLines] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const displayCurrency = currencySymbol ? currencySymbol : currencyCode;

  const calculateTotalLineAmount = (lines) => {
    const total = lines.reduce(
      (acc, line) => acc + parseFloat(line.line_total),
      0
    );
    setTotalLineAmount(total.toFixed(2)); // Convert to string with two decimal places
    setInvoiceTotal(total.toFixed(2));
  };

  useEffect(() => {
    const fetchInvoiceLines = async () => {
      try {
        console.log("What is the Invoice number sent ", headerId);
        const response = await axios.get(
          `${API_URL}/get_sales_invoice_lines?header_id=${headerId}`,
          {
            headers: generateHeaders(),
          }
        );
        setLines(response.data.sales_invoice_lines);
        console.log(response.data.sales_invoice_lines);
        calculateTotalLineAmount(response.data.sales_invoice_lines);
      } catch (error) {
        console.error("Error fetching invoice lines:", error);
      }
    };

    const fetchItemsList = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(response.data.items);
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    const fetchUOMsList = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUoms(response.data.uom);
      } catch (error) {
        console.error("Error fetching UOMs:", error);
      }
    };

    fetchInvoiceLines();
    fetchItemsList();
    fetchUOMsList();
    // eslint-disable-next-line 
  }, []);

  useEffect(() => {
    const hasNewLines = lines.some((line) => !line.line_id);
    setHasNewLines(hasNewLines);
    // Check for changes in existing lines
    const hasChanges = lines.some((line) => line.line_id && line.isModified);
    setHasChanges(hasChanges);
  }, [lines]);

  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      // Reset the lines state
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
      onClose();
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].quantity = value;
    updatedLines[index].line_total = value * updatedLines[index].unit_price;
    updatedLines[index].isModified = true; // Mark line as modified
    setLines(updatedLines);
    calculateTotalLineAmount(updatedLines); // Update total amount
  };

  const handleUnitPriceChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].unit_price = value;
    updatedLines[index].line_total = value * updatedLines[index].quantity;
    updatedLines[index].isModified = true; // Mark line as modified
    setLines(updatedLines);
    calculateTotalLineAmount(updatedLines); // Update total amount
  };

  /*const calculateTotalSum = (updatedLines) => {
    const sum = updatedLines.reduce(
      (total, line) => total + line.line_total,
      0
    );
    setTotalSum(sum);
  };

  const validateForm = () => {
    const isAnyFieldEmpty = lines.some(
      (line) =>
        !line.item_id || !line.quantity || !line.unit_price || !line.uom_id
    );
    return !isAnyFieldEmpty;
  };*/

  const handleSubmit = async () => {
    setIsSubmitting(true); // Set submitting state to true
    try {
      const newLines = lines.filter((line) => !line.line_id);
      const updatedLines = lines.filter(
        (line) => line.line_id && line.isModified
      );

      const isNewLinesValid = newLines.every(
        (line) =>
          line.item_id && line.quantity && line.unit_price && line.uom_id
      );

      // Validation check for updated lines (optional if needed)
      // const areUpdatedLinesValid = updatedLines.every(...);

      if (!isNewLinesValid /* || !areUpdatedLinesValid */) {
        alert("Please fill in all fields for the new line(s).");
        return;
      }

      if (newLines.length === 0 && updatedLines.length === 0) {
        alert("No changes to submit.");
        return;
      }

      if (newLines.length > 0) {
        const updatedLinesWithHeaderId = newLines.map((line) => ({
          ...line,
          line_total: line.quantity * line.unit_price,
          invoice_number: invoiceNumber,
        }));

        const createResponse = await axios.post(
          `${API_URL}//create_sales_invoice_lines`,
          updatedLinesWithHeaderId,
          { headers: generateHeaders() }
        );

        if (createResponse.data.success) {
          onSuccess(createResponse);
          setSuccessMessage("Invoice lines created successfully.");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 15000);
          const createdLines = Array.isArray(createResponse.data.created_lines)
            ? createResponse.data.created_lines
            : [];
          setLines([...lines, ...createdLines]);
        } else {
          console.error(
            "Error creating invoice lines:",
            createResponse.data.message
          );
        }
      }

      if (updatedLines.length > 0) {
        const requestBody = {
          header_id: headerId,
          lines: updatedLines,
        };

        const updateResponse = await axios.put(
          `${API_URL}/update_sales_invoice_lines`,
          requestBody,
          { headers: generateHeaders() }
        );

        if (updateResponse.data.success) {
          onSuccess(updateResponse);
          setSuccessMessage("Invoice lines updated successfully.");
          setTimeout(() => {
            setSuccessMessage(null);
          }, 15000);
          const updatedLinesWithFlagCleared = lines.map((line) => ({
            ...line,
            isModified: false,
          }));
          setLines(updatedLinesWithFlagCleared);
        } else {
          console.error(
            "Error updating invoice lines:",
            updateResponse.data.message
          );
        }
      }

      onClose();
    } catch (error) {
      console.error("Error submitting lines:", error);
    } finally {
      setIsSubmitting(false); // Set submitting state back to false regardless of success or failure
    }
  };

  const handleClear = async (index) => {
    if (lines.length === 1) {
      return;
    }

    const lineToDelete = lines[index];

    if (lineToDelete.line_id) {
      const confirmation = window.confirm(
        "Are you sure you want to delete this line from Database?"
      );
      if (!confirmation) {
        return;
      }

      try {
        const response = await axios.delete(
          `${API_URL}/delete_sales_invoice_lines`,
          {
            headers: generateHeaders(),
            data: {
              header_id: lineToDelete.header_id,
              line_id: lineToDelete.line_id,
            },
          }
        );

        if (response.data.success) {
          // If deletion is successful, remove the line from state
          const updatedLines = [...lines];
          updatedLines.splice(index, 1);
          setLines(updatedLines);
          setTotalLineAmount(totalLineAmount - lineToDelete.line_total);
          setInvoiceTotal(totalLineAmount - lineToDelete.line_total);
        } else {
          console.error("Error deleting invoice line:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting invoice line:", error);
      }
    } else {
      // If the line doesn't have line_id, remove it directly from state
      const updatedLines = [...lines];
      const removedLineTotal = updatedLines[index].line_total;
      updatedLines.splice(index, 1);
      setLines(updatedLines);
      setTotalLineAmount(totalLineAmount - removedLineTotal);
      setInvoiceTotal(totalLineAmount - removedLineTotal);
    }
  };

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        line_number: generateSOLineNumber(),
        item_id: "",
        quantity: 0,
        unit_price: 0,
        line_total: 0,
        uom_id: "",
        header_id: headerId, // Assign the header_id for the new line
        invoice_number: invoiceNumber, // Assign the invoice_number for the new line
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
        <Modal.Title>Invoice Lines</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div>
          <b>Invoice Number:</b> {invoiceNumber} <br></br>
          <b>Invoice Amount:</b> {totalLineAmount} {currencyCode} <br></br>
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
                      onChange={(e) =>
                        handleQuantityChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.unit_price}
                      onChange={(e) =>
                        handleUnitPriceChange(index, e.target.value)
                      }
                    />
                  </td>
                  <td>{String(line.line_total)}</td>

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
        <Button
          variant="primary"
          onClick={handleSubmit}
          disabled={(!hasNewLines && !hasChanges) || isSubmitting} // Added parentheses
        >
          {isSubmitting ? "Submitting..." : "Submit"}
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

export default UpdateSalesLineModalForm;
