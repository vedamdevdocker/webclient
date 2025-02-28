import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal, Button } from "react-bootstrap";
import { API_URL } from "../../../admin/setups/ConstDecl";  // Adjust the import based on your file structure

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

const CreateDefaultTaxCodesForm = ({ showModalWindow, headerId, onClose }) => {
  const [lines, setLines] = useState([
    {
      header_id: headerId,
      tax_id: 0,
      tax_type: "",
      description: "",
    },
  ]);
  const [taxCodesList, setTaxCodesList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");  // Added state for error messages

  useEffect(() => {
    const fetchTaxCodesList = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_tax_codes`, {
          headers: generateHeaders(),
        });
        setTaxCodesList(response.data.taxes || []);
      } catch (error) {
        console.error("Error fetching tax codes:", error);
      }
    };

    fetchTaxCodesList();
  }, []);

  const handleCreateDefaultTaxCodes = async () => {
    try {
      // Filter out lines where tax_id is 0 (i.e., no tax_id selected)
      const validLines = lines.filter(line => line.tax_id !== 0);

      if (validLines.length === 0) {
        setErrorMessage("No valid lines to submit. Please select a tax ID.");
        return;
      }

      const updatedLines = validLines.map((line) => ({
        header_id: line.header_id,
        tax_id: line.tax_id,
        tax_type: line.tax_type,
        description: line.description,
      }));
  
      const response = await axios.post(
        `${API_URL}/create_default_tax_codes`,
        updatedLines,
        { headers: generateHeaders() }
      );
  
      if (response.status === 200 && response.data.results[0].message) {
        setSuccessMessage(response.data.results[0].message);
        setErrorMessage("");  // Clear any previous error message
  
        // Display the message for 10 seconds, then close the message
        setTimeout(() => {
          setSuccessMessage("");  // Clear success message after 10 seconds
          onClose();
        }, 1000);  // 1000 milliseconds = 10 seconds
      } else {
        setErrorMessage("An error occurred.");  // Show error message for non-200 status
        setSuccessMessage("");  // Clear any previous success message
      }
    } catch (error) {
      console.error("Error creating default tax codes:", error);
      setErrorMessage("Error creating default tax codes.");
      setSuccessMessage("");  // Clear any previous success message
    }
  };

  const handleClear = (index) => {
    if (lines.length === 1) return;
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
    setErrorMessage("");  // Clear error message on removal
  };

  const handleAddNew = () => {
    // Check for duplicate tax_type in the existing lines
    const taxTypes = lines.map(line => line.tax_type.trim().toLowerCase());
    const hasDuplicate = taxTypes.includes("");

    if (hasDuplicate) {
      setErrorMessage("Cannot add a new row with an empty tax type.");
      return;
    }

    // Add a new line if no duplicate
    setLines([
      ...lines,
      {
        header_id: headerId,
        tax_id: 0,
        tax_type: "",
        description: "",
      },
    ]);
    setErrorMessage("");  // Clear error message on successful addition
  };

  const handleTaxIdChange = (e, index) => {
    const selectedTaxId = parseInt(e.target.value);
    const selectedTax = taxCodesList.find(tax => tax.tax_id === selectedTaxId);

    if (selectedTax) {
      const duplicateTaxType = lines.some(
        line => line.tax_type.toLowerCase() === selectedTax.tax_type.toLowerCase()
      );

      if (duplicateTaxType) {
        setErrorMessage(`Tax type "${selectedTax.tax_type}" is already added. Please select a different tax.`);
        return;
      }

      const updatedLines = [...lines];
      updatedLines[index] = {
        ...updatedLines[index],
        tax_id: selectedTax.tax_id,
        tax_type: selectedTax.tax_type,
        description: selectedTax.tax_description,
      };
      setLines(updatedLines);
      setErrorMessage("");  // Clear any previous error message
    }
  };

  return (
    <Modal
      show={showModalWindow}
      className="tax-line-modal-content"
      size="xl"
      onHide={onClose}
    >
      <Modal.Header closeButton className="tax-line-modal-title-custom">
        <Modal.Title>Create Default Tax Codes</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="tax-line-table-container">
          <table className="table table-striped">
            <thead className="tax-line-table-header-custom">
              <tr>
                <th className="tax-id">Tax ID</th>
                <th className="tax-type">Tax Type</th>
                <th className="description">Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index} className="table-row">
                  <td>
                    <select
                      value={line.tax_id}
                      onChange={(e) => handleTaxIdChange(e, index)}
                    >
                      <option value={0}>Select Tax ID</option>
                      {taxCodesList.map((tax) => (
                        <option key={tax.tax_id} value={tax.tax_id}>
                          {`${tax.tax_id} (${tax.tax_code})`}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.tax_type}
                      readOnly
                      disabled
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.description}
                      readOnly
                      disabled
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
                <td colSpan="4">
                  <button onClick={handleAddNew}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateDefaultTaxCodes}>
          Create Default Tax Codes
        </Button>
        <Button variant="primary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
      {errorMessage && <div className="error-message">{errorMessage}</div>}
      {successMessage && <div className="success-message">{successMessage}</div>}
    </Modal>
  );
};

export default CreateDefaultTaxCodesForm;
