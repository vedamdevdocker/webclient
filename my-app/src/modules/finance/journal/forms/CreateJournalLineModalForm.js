import React, { useState, useEffect } from 'react';
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

const generateJOLineNumber = () => {
  const timestamp = new Date().getTime();
  const timestampSuffix = timestamp % 100000;
  const randomSuffix = Math.floor(Math.random() * 1000);
  const formattedRandomSuffix = String(randomSuffix).padStart(3, "0");
  const generatedJOLineNumber = `${timestampSuffix}${formattedRandomSuffix}`;

  return parseInt(generatedJOLineNumber);
};

const CreateJournalLineModalForm = ({
  showModalWindow,
  headerId,
  companyId,
  departmentId,
  journalNumber,
  status,
  currencyId,
  currencyCode,
  currencySymbol,
  onClose,
  onSuccess,
}) => {
  const [lines, setLines] = useState([
    {
      line_number: generateJOLineNumber(),
      header_id: headerId,
      account_id: 0,
      debit: 0.0,
      credit: 0.0,
      line_total: 0.0,
    },
  ]);
  const [accountsList, setAccountsList] = useState([]); // State to store accounts list
  const [successMessage, setSuccessMessage] = useState("");
  const displayCurrency = currencySymbol ? currencySymbol : currencyCode;

  // eslint-disable-next-line
  useEffect(() => {
    fetchAccountsList(); // Fetch accounts list when component mounts
      // eslint-disable-next-line
  }, []);


 
const fetchAccountsList = async () => {
  try {
    const response = await axios.get(`${API_URL}/get_accounts`, {
      headers: generateHeaders(),
      params: {
        company_id: companyId,
        department_id: departmentId,
        currency_id: currencyId
      }
    });
    setAccountsList(response.data.accounts_list);
  } catch (error) {
    console.error("Error fetching accounts:", error);
  }
};

  
  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      onClose();
    }
  };





  const handleCreateJournalLine = async () => {
    try {
      // Convert debit and credit values to float type numbers
      const updatedLines = lines.map((line) => ({
        ...line,
        debit: parseFloat(line.debit),
        credit: parseFloat(line.credit),
        status: status, // Include status in the updatedLines
      }));

      // Calculate the sum of debit and credit values
      const sumDebit = updatedLines.reduce((acc, line) => acc + line.debit, 0);
      const sumCredit = updatedLines.reduce(
        (acc, line) => acc + line.credit,
        0
      );

      // Validate if sum of debit equals sum of credit
      if (sumDebit !== sumCredit) {
        const confirmation = window.confirm(
          "Sum of debit does not equal sum of credit. Do you want to proceed with creating an unbalanced journal entry?"
        );
        if (!confirmation) return; // If No is pressed, do not proceed
      }

      // If validation passes, make the API call
      const response = await axios.post(
        `${API_URL}/create_journal_line`,
        updatedLines, // Pass updatedLines array directly as the request data
        {
          headers: generateHeaders(),
        }
      );

      if (response.data.success) {
        onClose();
        onSuccess(response);
        setSuccessMessage(response.data.message);
      } else {
        console.error("Error creating journal line:", response.data.message);
      }
    } catch (error) {
      console.error("Error creating journal line:", error);
    }
  };

  const handleClear = (index) => {
    // Check if there is only one line left
    if (lines.length === 1) {
      return; // Do not remove the line
    }

    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        line_number: generateJOLineNumber(),
        header_id: headerId,
        account_id: 0,
        debit: 0.0,
        credit: 0.0,
        line_total: 0.0,
      },
    ]);
  };

  return (
    <Modal
      show={showModalWindow}
      className="journal-line-modal-content"
      size="xl"
      onHide={handleClose}
    >
      <Modal.Header closeButton className="journal-line-modal-title-custom">
        <Modal.Title>
          Journal Lines for the Journal {journalNumber} ({currencyCode})
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="journal-line-table-container">
          <table className="table table-striped">
            <thead className="jo-line-table-header-custom">
              <tr>
                <th>Line No</th>
                <th className="account-id">Account ID</th>
                <th className="debit">Debit ({displayCurrency})</th>
                <th className="credit">Credit ({displayCurrency})</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index} className="table-row">
                  <td>{line.line_number}</td>
                  <td>
                    <select
                      value={line.account_id}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].account_id = e.target.value;
                        setLines(updatedLines);
                      }}
                    >
                      <option value={0}>Select Account</option>
                      {accountsList.map((account) => (
                        <option
                          key={account.account_id}
                          value={account.account_id}
                        >
                          {`${account.account_number} (${account.account_type})`}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.debit}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].debit = e.target.value;
                        setLines(updatedLines);
                      }}
                    />
                  </td>
                  <td>
                    <input
                      type="text"
                      value={line.credit}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].credit = e.target.value;
                        setLines(updatedLines);
                      }}
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
                <td colSpan="5">
                  <button onClick={handleAddNew}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateJournalLine}>
          Create Journal Line
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

export default CreateJournalLineModalForm;
