import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button } from "react-bootstrap";
import withAccessControl from "../../../security/modulepermissions/AccessControlWrapper";
import "../../../utilities/css/appcss.css";

export default withAccessControl("FINANCE", "CREATE")(UpdateCompanyConfigForm);

function UpdateCompanyConfigForm() {
  const [formData, setFormData] = useState({
    companyId: "",
    salesInvoiceConfig: {
      soOrderStatusFilter: ["PICKED", "PARTPICKED", "APPROVED"],
      soNewStatus: "INVOICED",
      invoiceStatus: "DRAFT",
      accountTypes: {
        Debit: [
          { accountType: "Accounts Receivable", category: "Normal", distributionPercentage: 50 }
        ],
        Credit: [
          { accountType: "Loans Payable", category: "Normal", distributionPercentage: 50 }
        ]
      }
    },
    purchaseInvoiceConfig: {
      invoiceStatus: "DRAFT",
      poNewStatus: "INVOICED",
      poOrderStatusFilter: ["APPROVED", "RECEIVED"],
      paymentTerms: "NET 20",
      accountTypes: {
        Debit: [
          { accountType: "Utilities Expense", category: "Normal", distributionPercentage: 50 }
        ],
        Credit: [
          { accountType: "Accounts Payable", category: "Normal", distributionPercentage: 50 }
        ]
      }
    }
  });

  const [companies, setCompanies] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleClose = () => setShowSuccessModal(false);
  const handleShow = () => setShowSuccessModal(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${API_URL}/get_companies`);
        setCompanies(response.data.company_list);
      } catch (error) {
        logger.error("Error fetching companies:", error);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAccountChange = (type, index, key, value) => {
    const updatedData = { ...formData };
    updatedData.salesInvoiceConfig.accountTypes[type][index][key] = value;
    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // eslint-disable-next-line 
      const response = await axios.post(
        `${API_URL}/update_company_config`,
        formData
      );
      setSuccessMessage("Configuration updated successfully!");
      setErrorMessage("");
      handleShow();
    } catch (error) {
      setErrorMessage(`Error updating configuration: ${error.message}`);
      setSuccessMessage("");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Update Company Configuration</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Company field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="companyId">Company:</label>
              </div>
              <select
                id="companyId"
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Company</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sales Invoice Configuration */}
          <h3>Sales Invoice Configuration</h3>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <label>SO Order Status Filter:</label>
              <input
                type="text"
                name="soOrderStatusFilter"
                value={formData.salesInvoiceConfig.soOrderStatusFilter.join(", ")}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Account Types - Debit */}
          <div>
            <h4>Debit Account Types</h4>
            {formData.salesInvoiceConfig.accountTypes.Debit.map((account, index) => (
              <div key={index}>
                <input
                  type="text"
                  placeholder="Account Type"
                  value={account.accountType}
                  onChange={(e) => handleAccountChange("Debit", index, "accountType", e.target.value)}
                  className="form-control input-field"
                />
                <input
                  type="text"
                  placeholder="Category"
                  value={account.category}
                  onChange={(e) => handleAccountChange("Debit", index, "category", e.target.value)}
                  className="form-control input-field"
                />
                <input
                  type="number"
                  placeholder="Distribution Percentage"
                  value={account.distributionPercentage}
                  onChange={(e) => handleAccountChange("Debit", index, "distributionPercentage", e.target.value)}
                  className="form-control input-field"
                />
              </div>
            ))}
          </div>

          {/* Submit */}
          <div className="form-group col-md-6 mb-2">
            <button type="submit" className="btn btn-primary">
              Update Configuration
            </button>
          </div>
        </form>
      </div>

      {/* Success Message */}
      {successMessage && <div className="success-message">{successMessage}</div>}

      {/* Error Message */}
      {errorMessage && <div className="error-message">{errorMessage}</div>}

      {/* Success Modal */}
      <Modal show={showSuccessModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>{successMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
