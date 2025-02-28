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

const UpdateSOLineModalForm = ({
  showLinesModalWindow,
  headerId,
  currencyId,
  sonumber,
  currencyCode,
  currencySymbol,
  tax_id,
  tax_code,
  tax_rate,
  setTotalSum,
  headerStatus,
  setSOTotal,
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
      notes: "", // Ensure notes field is initialized      
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
    if (!Array.isArray(lines)) {
      console.error("Expected an array of lines");
      return 0;
    }

    const total = lines.reduce((acc, line) => acc + parseFloat(line.line_total), 0);
    setTotalLineAmount(total.toFixed(2)); // Convert to string with two decimal places
    setSOTotal(total.toFixed(2));
  };

  useEffect(() => {
    const fetchSOLines = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_sales_order_lines`, {
          headers: generateHeaders(),
          params: { header_id: headerId },
        });

        const linesData = response.data || [];
        const formattedLines = linesData.map((line) => ({
          line_id: line.line_id,
          item_id: line.item_id,
          quantity: parseFloat(line.quantity),
          unit_price: parseFloat(line.unit_price),
          line_total: parseFloat(line.line_total),
          uom_id: line.uom_id,
          line_number: line.so_lnum,
          notes: line.notes || "", // Ensure notes are handled          
          isModified: false,
        }));
        setLines(formattedLines);
        calculateTotalLineAmount(formattedLines);
      } catch (error) {
        console.error("Error fetching SO lines:", error);
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

    fetchSOLines();
    fetchItemsList();
    fetchUOMsList();
     // eslint-disable-next-line 
  }, [headerId]);

  useEffect(() => {
    const hasNewLines = lines.some((line) => !line.line_id);
    setHasNewLines(hasNewLines);
    const hasChanges = lines.some((line) => line.line_id && line.isModified);
    setHasChanges(hasChanges);
  }, [lines]);

  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      setLines([
        {
          line_number: generateSOLineNumber(),
          item_id: "",
          quantity: 0,
          unit_price: 0,
          line_total: 0,
          uom_id: "",
          notes: "", // Ensure notes field is reset          
        },
      ]);
      onClose();
    }
  };

  const handleQuantityChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].quantity = value;
    updatedLines[index].line_total = value * updatedLines[index].unit_price;
    updatedLines[index].isModified = true;
    setLines(updatedLines);
    calculateTotalLineAmount(updatedLines);
  };

  const handleUnitPriceChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].unit_price = value;
    updatedLines[index].line_total = value * updatedLines[index].quantity;
    updatedLines[index].isModified = true;
    setLines(updatedLines);
    calculateTotalLineAmount(updatedLines);
  };

  const handleNotesChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].notes = value;
    updatedLines[index].isModified = true;
    setLines(updatedLines);
  };  

  const handleSubmit = async () => {
    setIsSubmitting(true);
    try {
      // Filter out unchanged lines and get only modified or new lines
      const linesToUpdate = lines.filter(line => line.isModified || !line.line_id);
  
      const requestBody = {
        header_id: Number(headerId),
        lines: linesToUpdate.map((line) => {
          const sanitizedLine = {
            quantity: Number(line.quantity),
            unit_price: Number(line.unit_price),
            line_total: Number(line.line_total),
            tax_id: Number(tax_id),
            notes: line.notes || "", // Replace undefined with an empty string
            uom_id: Number(line.uom_id),
            status: headerStatus,
            item_id: Number(line.item_id),
          };
          if (line.line_id) {
            // For existing lines with line_id
            return {
              ...sanitizedLine,
              line_id: Number(line.line_id),
            };
          } else {
            // For new lines without line_id
            return {
              ...sanitizedLine,
              so_lnum: Number(line.line_number),
            };
          }
        }),
      };
  
      console.log("Request Body ", requestBody);
  
      const response = await axios.put(
        `${API_URL}/update_sales_order_lines`,
        requestBody,
        { headers: generateHeaders() }
      );
  
      if (response.data.success) {
        onSuccess(response);
        setSuccessMessage("SO lines updated successfully.");
        setTimeout(() => {
          setSuccessMessage(null);
        }, 15000);
        // Clear isModified flag for updated lines
        const updatedLinesWithFlagCleared = lines.map((line) => ({
          ...line,
          isModified: false,
        }));
        setLines(updatedLinesWithFlagCleared);
      } else {
        console.error("Error updating SO lines:", response.data.message);
      }
  
      onClose();
    } catch (error) {
      console.error("Error submitting lines:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = async (index) => {
    if (lines.length === 1) {
      return;
    }
  
    const lineToDelete = lines[index];
  
    if (lineToDelete.line_id) {
      const confirmation = window.confirm("Are you sure you want to delete this line from Database?");
      if (!confirmation) {
        return;
      }
  
      try {
        const response = await axios.delete(`${API_URL}/delete_sales_order_lines`, {
          headers: generateHeaders(),
          data: {
            header_id: headerId, // Use headerId instead of lineToDelete.header_id
            line_ids: [lineToDelete.line_id], // Use line_ids as an array
          },
        });
  
        if (response.data.success) {
          const updatedLines = [...lines];
          updatedLines.splice(index, 1);
          setLines(updatedLines);
          setTotalLineAmount((prevTotal) => (prevTotal - lineToDelete.line_total).toFixed(2));
          // setSOTotal((prevTotal) => (prevTotal - lineToDelete.line_total).toFixed(2));
        } else {
          console.error("Error deleting SO line:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting SO line:", error);
      }
    } else {
      const updatedLines = [...lines];
      const removedLineTotal = updatedLines[index].line_total;
      updatedLines.splice(index, 1);
      setLines(updatedLines);
      setTotalLineAmount((prevTotal) => (prevTotal - removedLineTotal).toFixed(2));
      // setSOTotal((prevTotal) => (prevTotal - removedLineTotal).toFixed(2));
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
        <Modal.Title>SO Lines </Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div>
          <b>SO Number:</b> {sonumber} <br></br>
          <b>SO Amount:</b> {totalLineAmount} {currencyCode} <br></br>
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
                <th>Notes</th>
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
                        const updatedLines = lines.map((line, idx) => {
                          if (idx === index) {
                            return {
                              ...line,
                              uom_id: e.target.value,
                              isModified: true, // Ensure this line is marked as modified
                            };
                          }
                          return line;
                        });
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
                    <input
                      type="text"
                      value={line.notes}
                      onChange={(e) =>
                        handleNotesChange(index, e.target.value)
                      }
                    />
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

export default UpdateSOLineModalForm;
