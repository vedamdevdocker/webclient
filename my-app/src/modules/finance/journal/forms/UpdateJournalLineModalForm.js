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

const generateJournalLineNumber = () => {
  const timestamp = new Date().getTime();
  const timestampSuffix = timestamp % 100000;
  const randomSuffix = Math.floor(Math.random() * 1000);
  const formattedRandomSuffix = String(randomSuffix).padStart(3, "0");
  const generatedJournalLineNumber = `${timestampSuffix}${formattedRandomSuffix}`;

  return parseInt(generatedJournalLineNumber);
};
const calculateTotalDebitCredit = (lines) => {
  if (!Array.isArray(lines)) {
    console.error("Expected an array of lines");
    return { debitTotal: 0, creditTotal: 0 };
  }

  const debitTotal = lines.reduce(
    (acc, line) => acc + parseFloat(line.debit || 0),
    0
  );
  const creditTotal = lines.reduce(
    (acc, line) => acc + parseFloat(line.credit || 0),
    0
  );

  return {
    debitTotal, // Return as number
    creditTotal, // Return as number
  };
};

const UpdateJournalLineModalForm = ({
  show,
  onClose,
  onUpdateSuccess,
  journalHeader,
  selectedCompany,
  selectedDepartment,
  currency_id,
  currencyname,
  currencysymbol,
}) => {
  const [lines, setLines] = useState([
    {
      line_number: generateJournalLineNumber(),
      account_id: "",
      account_category: "",
      account_type: "",
      debit: 0,
      credit: 0,
      status: "Approved",
    },
  ]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [accounts, setAccounts] = useState([]);
  const [totalLineAmount, setTotalLineAmount] = useState(0);
  const [hasNewLines, setHasNewLines] = useState(false);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [debitTotal, setDebitTotal] = useState(0);
  const [creditTotal, setCreditTotal] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [shouldProceed, setShouldProceed] = useState(false);

  const displayCurrency = currencysymbol ? currencysymbol : currencyname;

  const calculateTotalLineAmount = (lines) => {
    if (!Array.isArray(lines)) {
      console.error("Expected an array of lines");
      return 0;
    }

    const total = lines.reduce(
      (acc, line) =>
        acc + parseFloat(line.debit || 0) - parseFloat(line.credit || 0),
      0
    );
    setTotalLineAmount(total.toFixed(2)); // Convert to string with two decimal places
  };

  useEffect(() => {
    const fetchJournalLines = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_journal_lines`, {
          headers: generateHeaders(),
          params: { header_id: journalHeader },
        });

        const linesData = response.data.journal_lines_list || [];
        const formattedLines = linesData.map((line) => ({
          line_id: line.line_id,
          account_id: line.account_id,
          account_category: line.account_category, // added
          account_type: line.account_type, // added
          debit: parseFloat(line.debit),
          credit: parseFloat(line.credit),
          line_number: line.line_number,
          status: line.status,
          isModified: false,
        }));
        setLines(formattedLines);

        const { debitTotal, creditTotal } =
          calculateTotalDebitCredit(formattedLines);
        setDebitTotal(debitTotal);
        setCreditTotal(creditTotal);
        setTotalLineAmount(debitTotal); // Assuming total line amount is the sum of debits and credits
      } catch (error) {
        console.error("Error fetching journal lines:", error);
      }
    };

    fetchJournalLines();
    fetchAccountsList();
    // eslint-disable-next-line
  }, [journalHeader]);

  const fetchAccountsList = async () => {
    try {
      const response = await axios.get(`${API_URL}/get_accounts`, {
        headers: generateHeaders(),
        params: {
          company_id: selectedCompany,
          department_id: selectedDepartment,
          currency_id: currency_id,
        },
      });
      setAccounts(response.data.accounts_list);
    } catch (error) {
      console.error("Error fetching accounts:", error);
    }
  };

  useEffect(() => {
    const hasNewLines = lines.some((line) => !line.line_id);
    setHasNewLines(hasNewLines);

    const hasChanges = lines.some((line) => line.isModified);
    setHasChanges(hasChanges);

    const { debitTotal, creditTotal } = calculateTotalDebitCredit(lines);
    setDebitTotal(debitTotal);
    setCreditTotal(creditTotal);
    calculateTotalLineAmount(lines);
  }, [lines]); // Recalculate on

  const handleClose = () => {
    const confirmation = window.confirm("Are you sure you want to close?");
    if (confirmation) {
      setLines([
        {
          line_number: generateJournalLineNumber(),
          account_id: "",
          debit: 0,
          credit: 0,
          status: "Approved",
        },
      ]);
      onClose();
    }
  };

  const handleDebitChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].debit = value;
    updatedLines[index].isModified = true;
    setLines(updatedLines);
    calculateTotalLineAmount(updatedLines);
  };

  const handleCreditChange = (index, value) => {
    const updatedLines = [...lines];
    updatedLines[index].credit = value;
    updatedLines[index].isModified = true;
    setLines(updatedLines);
    calculateTotalLineAmount(updatedLines);
  };

  const handleSubmit = () => {
    const { debitTotal, creditTotal } = calculateTotalDebitCredit(lines);

    if (debitTotal !== creditTotal) {
      // Show confirmation modal if totals are not equal
      setShowConfirmation(true);
    } else {
      // Proceed with submission if totals are balanced
      submitLines();
    }
  };

  const submitLines = async () => {
    setIsSubmitting(true);
    try {
      const newLines = lines.filter((line) => !line.line_id);
      const updatedLines = lines.filter(
        (line) => line.line_id && line.isModified
      );

      // Process new lines
      if (newLines.length > 0) {
        const createRequestBody = newLines.map((line) => ({
          line_number: line.line_number,
          header_id: journalHeader,
          account_id: line.account_id,
          debit: line.debit,
          credit: line.credit,
          status: line.status,
        }));

        const createResponse = await axios.post(
          `${API_URL}/create_journal_line`,
          createRequestBody,
          { headers: generateHeaders() }
        );

        console.log(
          "New journal lines created successfully:",
          createResponse.message
        );
      }

      if (updatedLines.length > 0) {
        const updateRequestBody = updatedLines.map((line) => ({
          header_id: journalHeader,
          line_id: line.line_id,
          account_id: line.account_id,
          debit: line.debit,
          credit: line.credit,
          status: line.status,
        }));

        const updateResponse = await axios.put(
          `${API_URL}/update_journal_line`,
          updateRequestBody,
          { headers: generateHeaders() }
        );

        console.log("Journal lines updated successfully:", updateResponse);
      }

      setSuccessMessage("Journal lines processed successfully");
      onUpdateSuccess("Journal lines processed successfully");
      onClose();
      setTimeout(() => {
        setSuccessMessage(null);
      }, 15000);
    } catch (error) {
      console.error("Error submitting lines:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClear = async (index) => {
    if (lines.length === 1) {
      // Prevent deletion if it's the only line
      return;
    }

    const lineToDelete = lines[index];

    if (lineToDelete.line_id) {
      // Confirm deletion with the user
      const confirmation = window.confirm(
        "Are you sure you want to delete this line from Database?"
      );
      if (!confirmation) {
        return;
      }

      try {
        const response = await axios.delete(`${API_URL}/delete_journal_line`, {
          headers: generateHeaders(),
          data: {
            header_id: journalHeader,
            line_id: lineToDelete.line_id,
          },
        });

        if (response.data.success) {
          const updatedLines = [...lines];
          updatedLines.splice(index, 1); // Remove the line from the state
          setLines(updatedLines);

          // Update the total line amount after deletion
          const removedLineTotal = lineToDelete.debit - lineToDelete.credit;
          setTotalLineAmount((prevTotal) =>
            (prevTotal - removedLineTotal).toFixed(2)
          );

          // Show success message
          setSuccessMessage(response.data.message);
          setTimeout(() => {
            setSuccessMessage(null);
          }, 15000);
        } else {
          console.error("Error deleting journal line:", response.data.message);
        }
      } catch (error) {
        console.error("Error deleting journal line:", error);
      }
    } else {
      // Handle cases where the line does not have a line_id (i.e., it's new and not yet saved)
      const updatedLines = [...lines];
      const removedLineTotal =
        updatedLines[index].debit - updatedLines[index].credit;
      updatedLines.splice(index, 1); // Remove the line from the state
      setLines(updatedLines);
      setTotalLineAmount((prevTotal) =>
        (prevTotal - removedLineTotal).toFixed(2)
      );
    }
  };

  const handleAddNew = () => {
    setLines([
      ...lines,
      {
        line_number: generateJournalLineNumber(),
        account_id: "",
        account_name: "",
        account_category: "",
        debit: 0,
        credit: 0,
        status: "Approved",
        header_id: journalHeader,
      },
    ]);
  };

  const handleAccountChange = (index, accountId) => {
    const updatedLines = [...lines];
    const selectedAccount = accounts.find(
      (account) => account.account_id === parseInt(accountId, 10)
    );

    if (selectedAccount) {
      updatedLines[index].account_id = accountId;
      updatedLines[index].account_category = selectedAccount.account_category;
      updatedLines[index].account_type = selectedAccount.account_type;
      updatedLines[index].isModified = true; // Mark line as modified
    }

    setLines(updatedLines);
  };

  return (
    <Modal
      show={show}
      className="invoice-line-modal-content"
      size="xl"
      onHide={handleClose}
    >
      <Modal.Header closeButton className="invoice-line-modal-title-custom">
        <Modal.Title>Journal Lines</Modal.Title>
      </Modal.Header>
      <Modal.Body className="modal-body-scrollable">
        <div>
          <b>Journal Header:</b> {journalHeader} <br />
          <b>Total Amount:</b> {totalLineAmount} {currencyname} <br />
        </div>
        <div className="invoice-line-table-container">
          <table className="table table-striped">
            <thead className="invoice-line-table-header-custom">
              <tr>
                <th>Line No</th>
                <th>Account</th>
                <th>Account Category</th>
                <th>Debit ({displayCurrency})</th>
                <th>Credit ({displayCurrency})</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((line, index) => (
                <tr key={index}>
                  <td>{line.line_number}</td>
                  <td>
                    <select
                      value={line.account_id}
                      onChange={(e) =>
                        handleAccountChange(index, e.target.value)
                      }
                    >
                      <option value="">Select Account</option>
                      {accounts.map((account) => (
                        <option
                          key={account.account_id}
                          value={account.account_id}
                        >
                          {account.account_number} ({account.account_name})
                        </option>
                      ))}
                    </select>
                  </td>
                  <td>{line.account_category}</td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={line.debit}
                      onChange={(e) =>
                        handleDebitChange(index, parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <input
                      type="number"
                      className="form-control"
                      value={line.credit}
                      onChange={(e) =>
                        handleCreditChange(index, parseFloat(e.target.value))
                      }
                    />
                  </td>
                  <td>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleClear(index)}
                      disabled={isSubmitting}
                    >
                      Clear
                    </button>
                  </td>
                </tr>
              ))}
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td
                  className={
                    parseFloat(debitTotal) !== parseFloat(creditTotal)
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {debitTotal.toFixed(2)}
                </td>
                <td
                  className={
                    parseFloat(creditTotal) !== parseFloat(debitTotal)
                      ? "text-danger"
                      : "text-success"
                  }
                >
                  {creditTotal.toFixed(2)}
                </td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
        {successMessage && (
          <div className="alert alert-success" role="alert">
            {successMessage}
          </div>
        )}
        <div className="d-flex justify-content-between">
          <Button
            variant="primary"
            onClick={handleAddNew}
            disabled={isSubmitting}
          >
            Add New Line
          </Button>
          <Button
            variant="success"
            onClick={handleSubmit}
            disabled={isSubmitting || (!hasNewLines && !hasChanges)}
          >
            {isSubmitting ? "Saving..." : "Save"}
          </Button>
        </div>
      </Modal.Body>

      {/* Confirmation Modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Save</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          The total debit and credit amounts are not equal. Are you sure you
          want to proceed with saving?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmation(false)}
          >
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              setShowConfirmation(false);
              submitLines();
            }}
          >
            Proceed
          </Button>
        </Modal.Footer>
      </Modal>
    </Modal>
  );
};

export default UpdateJournalLineModalForm;
