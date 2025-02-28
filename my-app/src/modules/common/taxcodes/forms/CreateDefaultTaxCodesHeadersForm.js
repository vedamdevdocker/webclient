import React, { useState } from "react";
import axios from "axios";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CreateDefaultTaxCodesForm from "./CreateDefaultTaxCodesForm";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");
  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function CreateDefaultTaxCodesHeadersForm() {
  const [description, setDescription] = useState("");
  const [successMessage, setSuccessMessage] = useState(null);
  const [showModalWindow, setShowModal] = useState(false);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const handleSuccessModalClose = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    setDescription(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!description.trim()) {
      // Handle empty description case
      alert("Description is required and cannot be empty.");
      return;
    }

    try {
      const response = await axios.post(
        `${API_URL}/create_default_tax_headers`,
        { description },
        { headers: generateHeaders() }
      );

      if (response.status === 201) {
        setSuccessMessage({
          header_id: response.data.header_id,
          message: response.data.message,
        });
        setShowModal(true);
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Internal Server Error";
      alert(errorMessage);
    } finally {
      setDescription("");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Default Tax Header</h2>

      {hasRequiredAccess ? (
        <div className="child-container form-container">
          <form onSubmit={handleSubmit}>
            {/* Description Input */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="description">Description:</label>
                </div>
                <input
                  type="text"
                  id="description"
                  name="description"
                  value={description}
                  onChange={handleChange}
                  className="form-control input-field"
                  required
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Default Tax Header
                </button>
              </div>
            </div>
          </form>

          {successMessage && showModalWindow && (
            <div>
              <CreateDefaultTaxCodesForm
                showModalWindow={showModalWindow}
                headerId={successMessage.header_id}
                onClose={handleSuccessModalClose}
              />
            </div>
          )}
        </div>
      ) : (
        <div>
          You do not have permission to create a default tax header.
        </div>
      )}
    </div>
  );
}
