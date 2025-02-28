import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
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

const CreateSOLinesModal = ({
  showModalwindow,
  headerId,
  poNumber,
  currencyId,
  taxId,
  hdr_status,
  onClose,
  onSuccess,
}) => {

 const [lines, setLines] = useState([
    {
      so_lnum: generateSOLineNumber(),
      header_id: headerId,
      item_id: "",
      quantity: "",
      uom_id: "", 
      unit_price: "",
      line_total: 0,
      notes: "",
      status: hdr_status,
    },
  ]);

  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const itemsResponse = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(itemsResponse.data.items);

        const uomsResponse = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUoms(uomsResponse.data.uom);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const handleInputChange = (e, index, field) => {
    const updatedLines = [...lines];
    updatedLines[index][field] = e.target.value;

    if (e.target.name === "quantity" || e.target.name === "unit_price") {
      updatedLines[index].line_total =
        updatedLines[index].quantity * updatedLines[index].unit_price;
    }

    setLines(updatedLines);
  };

  const handleClear = (index) => {
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        so_lnum: generateSOLineNumber(),
        header_id: headerId,
        item_id: "",
        quantity: "",
        uom_id: "", 
        unit_price: "",
        line_total: 0,
        notes: "",
        status: hdr_status,
      },
    ]);
  };

  const handleCreateLines = async () => {
    console.log("Input lines ", lines);

    try {
      const response = await axios.post(
        `${API_URL}/create_sales_order_line`,
        {
          sales_order_lines: lines.map((line) => ({
            ...line,
            header_id: headerId,
          })),
        },
        {
          headers: generateHeaders(),
        }
      );

      if (response.data.success) {
        onClose();
        onSuccess(response);
      } else {
        console.error(
          "Error creating sales order lines:",
          response.data.message
        );
      }
    } catch (error) {
      console.error("Error creating sales order lines:", error);
    }
  };

  return (
    <Modal
      show={showModalwindow}
      onHide={onClose}
      className="po-line-modal-content"
      size="xl"
    >
      <Modal.Header closeButton className="po-line-modal-title-custom">
        <Modal.Title>
          Create Sales Order Lines for SO Number ({poNumber})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="po-line-table-container" style={{ textAlign: "center" }}>
          <table className="po-line-table">
            <thead className="po-line-table-header-custom">
              <tr>
                <th>Line No</th>
                <th>Item</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Total</th>
                <th>UOM</th>
                <th>Notes</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr
                  key={index}
                  className={
                    index % 2 === 0
                      ? "po-line-table-row-custom-even"
                      : "po-line-table-row-custom-odd"
                  }
                >
                  <td>{line.so_lnum}</td>
                  <td>
                    <select
                      value={line.item_id}
                      onChange={(e) => handleInputChange(e, index, "item_id")}
                    >
                      <option value="">Select Item</option>
                      {items.map((item) => (
                        <option key={item.item_id} value={item.item_id}>
                          {`${item.item_code} (${item.item_name})`}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      name="quantity"
                      value={line.quantity}
                      onChange={(e) => handleInputChange(e, index, "quantity")}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      name="unit_price"
                      value={line.unit_price}
                      onChange={(e) =>
                        handleInputChange(e, index, "unit_price")
                      }
                    />
                  </td>
                  <td>{line.line_total}</td>
                  <td>
                    <select
                      value={line.uom_id}
                      onChange={(e) => handleInputChange(e, index, "uom_id")}
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
                      onChange={(e) => handleInputChange(e, index, "notes")}
                    />
                  </td>
                  <td>
                    <div className="po-line-button-container">
                      <button onClick={() => handleClear(index)}>Remove</button>
                    </div>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="8">
                  <button onClick={handleAddNew}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleCreateLines}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CreateSOLinesModal;
