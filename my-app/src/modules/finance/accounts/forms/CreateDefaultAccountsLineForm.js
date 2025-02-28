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

const CreateDefaultAccountsLineForm = ({
  showModalWindow,
  headerId,
  companyId,
  currencyId,
  currencyCode,
  currencySymbol,
  onClose,
}) => {
  const [lines, setLines] = useState([
    {
      header_id: headerId,
      account_id: 0,
      description: "", // Using description for account_name
    },
  ]);
  const [accountsList, setAccountsList] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
  
    const fetchAccountsList = async () => {
      try {
        // Create a params object to hold query parameters
        const params = {};
        
        // Add companyId and/or currencyId to the params object if they are not empty
        if (companyId) {
          params.company_id = companyId;
        }
        if (currencyId) {
          params.currency_id = currencyId;
        }
  
        // Make the API call with the params object
        const response = await axios.get(`${API_URL}/get_accounts`, {
          headers: generateHeaders(),
          params: params, // Pass the params object to axios
        });
  
        // If your backend returns filtered results, you don't need further filtering here
        setAccountsList(response.data.accounts_list);
        
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };
  
    fetchAccountsList();
  }, [companyId, currencyId]); // Fetch accounts when companyId or currencyId changes
  

  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      onClose();
    }
  };

  const handleCreateDefaultAccount = async () => {
    try {
      const updatedLines = lines.map((line) => ({
        header_id: line.header_id,
        account_id: line.account_id,
        account_type: line.account_type,
        description: line.description,
      }));
  
  
      const response = await axios.post(
        `${API_URL}/create_default_account`,
        updatedLines,
        { headers: generateHeaders() }
      );
  
      if (response.data.message) {
        // Check if the response contains the message key
        onClose();
        setSuccessMessage(response.data.message);
      } else {
        console.error("Unexpected response format:", response.data);
      }
    } catch (error) {
      console.error("Error creating default account:", error);
    }
  };
  
  

  const handleClear = (index) => {
    if (lines.length === 1) return;
    const updatedLines = [...lines];
    updatedLines.splice(index, 1);
    setLines(updatedLines);
  };

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        header_id: headerId,
        account_id: 0,
        description: "",
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
        <Modal.Title>Create Default Account Lines</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="currency-info">
          <p><strong>Currency Code:</strong> {currencyCode} ({currencySymbol})</p>
        </div>
        <div className="journal-line-table-container">
          <table className="table table-striped">
            <thead className="jo-line-table-header-custom">
              <tr>
                <th className="account-id">Account ID</th>
                <th className="description">Description</th>
                <th className="actions">Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index} className="table-row">
                  <td>
                    <select
                      value={line.account_id}
                      onChange={(e) => {
                        const selectedAccount = accountsList.find(
                          (account) => account.account_id === parseInt(e.target.value)
                        );
                        if (selectedAccount) {
                          const updatedLines = [...lines];
                          updatedLines[index] = {
                            ...updatedLines[index],
                            account_id: selectedAccount.account_id,
                            account_type: selectedAccount.account_type,
                            description: selectedAccount.account_name,
                          };
                          setLines(updatedLines);
                        }
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
                      value={line.description}
                      onChange={(e) => {
                        const updatedLines = [...lines];
                        updatedLines[index].description = e.target.value;
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
                <td colSpan="3">
                  <button onClick={handleAddNew}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCreateDefaultAccount}>
          Create Default Accounts
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

export default CreateDefaultAccountsLineForm;
