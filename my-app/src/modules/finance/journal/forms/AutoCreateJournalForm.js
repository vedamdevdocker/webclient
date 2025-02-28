import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  JOURNAL_TYPES,
  JOURNAL_STATUS,
  SALES_INVOICE_STATUS,
  PURCHASE_INVOICE_STATUS,
} from "../../config/config";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";



const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function AutoCreateJournalForm() {
  const [formData, setFormData] = useState({
    journal_category: "",
    journal_type: "",
    description: "",
    journal_status: "",
    invoice_status: "",
    invoices: "",
    invoice_target_status: "",
  });

  const [journalCategory, setJournalCategory] = useState("");
  const [journalStatusOptions, setJournalStatusOptions] = useState([]);
  const [invoiceStatusOptions, setInvoiceStatusOptions] = useState([]);
  const [invoiceTargetStatusOptions, setInvoiceTargetStatusOptions] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  useEffect(() => {
    setJournalStatusOptions(JOURNAL_STATUS.filter(status => status.display));

    if (journalCategory === "Sales") {
      setInvoiceStatusOptions(SALES_INVOICE_STATUS.filter(status => status.display));
      setInvoiceTargetStatusOptions(SALES_INVOICE_STATUS.filter(status => status.autojournal));
    } else if (journalCategory === "Purchase") {
      setInvoiceStatusOptions(PURCHASE_INVOICE_STATUS.filter(status => status.display));
      setInvoiceTargetStatusOptions(PURCHASE_INVOICE_STATUS.filter(status => status.autojournal));
    } else {
      setInvoiceStatusOptions([]);
      setInvoiceTargetStatusOptions([]);
    }
  }, [journalCategory]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (name === "journal_category") {
      const selectedCategory = JOURNAL_TYPES.find(type => type.name === value);
      if (selectedCategory) {
        setJournalCategory(selectedCategory.name);
        setFormData({ ...formData, journal_category: selectedCategory.name, journal_type: selectedCategory.code });
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Convert empty input to an empty array
    const invoicesArray = formData.invoices
        .split(",")
        .map((num) => num.trim())
        .filter((num) => num !== "");

    // Confirmation dialog if invoicesArray is empty
    if (invoicesArray.length === 0) {
        const userConfirmed = window.confirm(
            "Are you sure you want to create a journal without any invoices?"
        );
        if (!userConfirmed) {
            return;  // Exit if the user clicks "No"
        }
    }

    const requestData = {
        ...formData,
        invoices: invoicesArray,
    };

    console.log("Request data before calling API", requestData);

    try {
        const response = await axios.post(`${API_URL}/auto_create_journal`, requestData, {
            headers: generateHeaders()
        });
        console.log(response.data);
        // Reset form data upon successful submission
        resetForm();
    } catch (error) {
        console.error("Error creating journal:", error);
    }
};


  const resetForm = () => {
    setFormData({
      journal_category: "",
      journal_type: "",
      description: "",
      journal_status: "",
      invoice_status: "",
      invoices: "",
      invoice_target_status: "",
    });
    setJournalCategory("");
    setJournalStatusOptions(JOURNAL_STATUS.filter(status => status.display));
    setInvoiceStatusOptions([]);
    setInvoiceTargetStatusOptions([]);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Auto create Journal</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            {/* Journal Category */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="journal_category">Journal Category:</label>
                </div>
                <select
                  id="journal_category"
                  name="journal_category"
                  value={formData.journal_category}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Journal Category</option>
                  {JOURNAL_TYPES.map((type) => (
                    <option key={type.code} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Description */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="description">Description:</label>
                </div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Journal Status */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="journal_status">Journal Status:</label>
                </div>
                <select
                  id="journal_status"
                  name="journal_status"
                  value={formData.journal_status}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Journal Status</option>
                  {journalStatusOptions.map((status) => (
                    <option key={status.code} value={status.code}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Invoice Status */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="invoice_status">Invoice Status:</label>
                </div>
                <select
                  id="invoice_status"
                  name="invoice_status"
                  value={formData.invoice_status}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Invoice Status</option>
                  {invoiceStatusOptions.map((status) => (
                    <option key={status.code} value={status.code}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* invoices */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="invoices">Invoices:</label>
                </div>
                <input
                  type="text"
                  id="invoices"
                  name="invoices"
                  value={formData.invoices}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            {/* Invoice Target Status */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="invoice_target_status">Invoice Target Status:</label>
                </div>
                <select
                  id="invoice_target_status"
                  name="invoice_target_status"
                  value={formData.invoice_target_status}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Invoice Target Status</option>
                  {invoiceTargetStatusOptions.map((status) => (
                    <option key={status.code} value={status.code}>
                      {status.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      ) : (
        <div>You do not have permission to create a journal.</div>
      )}
    </div>
  );
}
