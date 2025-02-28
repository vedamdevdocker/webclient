import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button, Table, Dropdown } from "react-bootstrap";

export default function SearchDefaultAccountsResultsForm() {
  const { Parameters } = useParams();
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [accountsData, setAccountsData] = useState([]);
  const [accountsList, setAccountsList] = useState([]); // Store accounts list for LOV
  const [showAccountsModal, setShowAccountsModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);  // State for new Edit modal
  const [HeaderName, setHeaderName] = useState("");
  const [selectedAccounts, setSelectedAccounts] = useState([]);  // Store the accounts to be edited
  const [addedLines, setAddedLines] = useState([]);  // Store newly added lines
  const [headerIDIns, setHeaderIdToInsert] = useState([]);  // Store newly added lines

  const hasRequiredAccess = CheckModuleAccess("FINANCE", "VIEW");

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  // Fetch data for default account headers
  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_URL}/get_default_account_headers`;

        if (Parameters) {
          const queryParams = new URLSearchParams(Parameters);
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        setResultData(response.data.default_account_headers);

        setError(null);
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched Sales data successfully`, response.data.default_account_headers);
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching Sales data`, error);
      }
    };

    fetchData();
  }, [Parameters, hasRequiredAccess]);

  // Fetch accounts for LOV dropdown
  const fetchAccountsList = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_accounts`, {
        headers: generateHeaders(),
      });

      setAccountsList(response.data.accounts_list);
    } catch (error) {
      setError("An error occurred while fetching account data.");
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching accounts list for LOV`, error);
    }
  };

  useEffect(() => {
    fetchAccountsList();  // Load accounts list on component mount
    // eslint-disable-next-line
  }, []);

  // General fetch for accounts (View or Edit mode)
  const fetchAccounts = async (headerId, header_name, mode) => {
    try {
      const response = await axios.get(`${API_URL}/get_default_accounts?header_id=${headerId}`, {
        headers: generateHeaders(),
      });

      setAccountsData(response.data.default_accounts_list);
      setHeaderName(header_name);

      if (mode === "view") {
        setShowAccountsModal(true);
      } else if (mode === "edit") {
        setSelectedAccounts(response.data.default_accounts_list);
        setHeaderIdToInsert(headerId)
        setAddedLines([]); // Clear any previously added lines
        setShowEditModal(true);
      }
    } catch (error) {
      setError("An error occurred while fetching accounts data.");
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching accounts data`, error);
    }
  };


  // Handle account selection from LOV dropdown
  const handleAccountSelection = (index, selectedAccount) => {
    const updatedAccounts = [...selectedAccounts];
    updatedAccounts[index].account_id = selectedAccount.account_id;
    updatedAccounts[index].account_name = selectedAccount.account_name;
    updatedAccounts[index].account_type = selectedAccount.account_type;
    setSelectedAccounts(updatedAccounts);
  };

  const handleRemoveLine = async (index) => {
    const accountToDelete = selectedAccounts[index];

    // Confirm if the user is sure they want to delete
    if (window.confirm("Are you sure you want to delete this record?")) {
      try {
        const headerId = accountToDelete.header_id;
        const lineId = accountToDelete.line_id;

        const data = [
          {
            header_id: headerId,
            line_id: lineId,
          }
        ];

        const url = `${API_URL}/delete_default_accounts`;  // API endpoint

        const response = await axios.delete(url, {
          headers: generateHeaders(),
          data: data,  // Data sent in the body of the DELETE request
        });

        // On success, remove the account from the selectedAccounts state
        const updatedAccounts = selectedAccounts.filter((_, i) => i !== index);
        setSelectedAccounts(updatedAccounts);

        // Log the response or handle any additional success actions
        logger.info("Account removed successfully", response);
      } catch (error) {
        setError("Error removing the account.");
        logger.error("Error removing the account", error);
      }
    }
  };

  const handleAddNewLine = () => {
    const newLine = {
      line_id: Math.random().toString(36).substring(7), // Example random line ID
      account_id: "",
      account_name: "",
      account_type: "",
      current_balance: 0,
    };
    setSelectedAccounts([...selectedAccounts, newLine]);
    setAddedLines([...addedLines, newLine]);  // Track newly added lines
  };

  const handleSave = async () => {
    try {
      // Only save the newly added lines
      const dataToInsert = addedLines.map(account => ({
        header_id: headerIDIns,
        account_id: account.account_id,
        account_type: account.account_type,
        description: account.account_name  // Using account_name for description
      }));

      console.log("Added lines", dataToInsert)

      if (dataToInsert.length > 0) {
        const response = await axios.post(`${API_URL}/create_default_account`, dataToInsert, {
          headers: generateHeaders(),
        });

        setShowEditModal(false);
        setAddedLines([]); // Clear added lines after successful insert
        logger.info("Accounts inserted successfully", response);
      }
    } catch (error) {
      setError("An error occurred while inserting the accounts.");
      logger.error("Error inserting accounts", error);
    }
  };

  // Handle confirmation and deletion of an account line
  const handleDeleteConfirmation = (index) => {
    const confirmed = window.confirm("Are you sure you want to delete this row?");
    if (confirmed) {
      handleRemoveLine(index);
    }
  };

  const handleUpdateLine = async (index) => {
    const accountToUpdate = selectedAccounts[index];

    // Confirm if the user is sure they want to update this record
    const confirmed = window.confirm("Are you sure you want to update this record?");

    if (confirmed) {
      try {
        // Gather data for the update request
        const dataToUpdate = {
          header_id: accountToUpdate.header_id,
          line_id: accountToUpdate.line_id,
          account_id: accountToUpdate.account_id,
          account_type: accountToUpdate.account_type,
          description: accountToUpdate.account_name  // Assuming account_name is used for description
        };

        console.log("DAta to update", dataToUpdate)

        const url = `${API_URL}/update_default_accounts`;  // API endpoint

        // Make API request to update the account
        const response = await axios.put(url, [dataToUpdate], {
          headers: generateHeaders(),
        });

        // On success, update the state with the new data (if necessary)
        const updatedAccounts = [...selectedAccounts];
        updatedAccounts[index] = { ...updatedAccounts[index], ...dataToUpdate };  // Update the specific account
        setSelectedAccounts(updatedAccounts);

        // Log success or handle any additional success actions
        logger.info("Account updated successfully", response);
      } catch (error) {
        setError("An error occurred while updating the account.");
        logger.error("Error updating the account", error);
      }
    }
  };



  return (
    <div>
      <h1>Default Journal Headers</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-small">
        <thead className="jo-line-table-header-custom">
          <tr>
            <th>Header ID</th>
            <th>Header Name</th>
            <th>Accounts</th>
          </tr>
        </thead>
        <tbody>
          {resultData.map((header) => (
            <tr key={header.header_id} className="table-row">
              <td>{header.header_id}</td>
              <td>{header.header_name}</td>
              <td>
                <button onClick={() => fetchAccounts(header.header_id, header.header_name, "view")}>
                  View
                </button>
                <button onClick={() => fetchAccounts(header.header_id, header.header_name, "edit")}>
                  Modify
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Existing Modal for View Mode */}
      <Modal show={showAccountsModal} onHide={() => setShowAccountsModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Accounts for {HeaderName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Default Account Header:</b> {HeaderName} <br />
          </div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Account ID</th>
                <th>Account Name</th>
                <th>Account Number</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {accountsData.map((account, index) => (
                <tr key={index}>
                  <td>{account.account_id}</td>
                  <td>{account.account_name}</td>
                  <td>{account.account_number}</td>
                  <td>{account.account_type}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAccountsModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* New Modal for Edit Mode */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="md">
        <Modal.Header closeButton>
          <Modal.Title>Edit Accounts for {HeaderName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <b>Account Header Name:</b> {HeaderName} <br />
          </div>

          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Line ID</th>
                <th>Account</th>
              </tr>
            </thead>
            <tbody>
              {selectedAccounts.map((account, index) => (
                <tr key={account.line_id}>
                  <td>{account.line_id}</td>
                  <td>
                    <Dropdown>
                      <Dropdown.Toggle variant="success" id="dropdown-basic">
                        {account.account_name || "Select Account"}
                      </Dropdown.Toggle>
                      <Dropdown.Menu>
                        {accountsList.map((accountItem, idx) => (
                          <Dropdown.Item
                            key={accountItem.account_id}
                            onClick={() => handleAccountSelection(index, accountItem)}
                          >
                            {accountItem.account_name} ({accountItem.account_type})
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  </td>
                  <td>
                    <button onClick={() => handleUpdateLine(index)}>update</button>
                  </td>
                  <td>
                    <button onClick={() => handleDeleteConfirmation(index)}>Remove</button>
                  </td>
                </tr>
              ))}
              <tr>
                <td colSpan="7">
                  <button onClick={handleAddNewLine}>Add Line</button>
                </td>
              </tr>
            </tbody>
          </Table>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={handleSave}
            disabled={addedLines.length === 0} // Disable Save if no new rows are added
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
