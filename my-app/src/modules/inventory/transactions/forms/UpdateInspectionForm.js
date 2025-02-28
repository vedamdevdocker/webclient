import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_UPDATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import { INSPECTION_STATUS } from "../../config/config";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

export default function UpdateInspectionForm() {
  const [formData, setFormData] = useState({
    transaction_type: "",
    transaction_number: "",
    item_code: "",
    location_name: "",
    accepted_quantity: "",
    rejected_quantity: "",
    uom_name: "",
    inspection_name: "", // Add this line
    status: "", // Add this line
    comments: "", // Add this line
    rejected_qty_details: "", // Add this line
    accepted_qty_details: "", // Add this line
    transaction_quantity: "", // Add this line
  });

  const [transactionTypes, setTransactionTypes] = useState([]);
  const [transactionNumbers, setTransactionNumbers] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedInspection, setSelectedInspection] = useState(null);
  const toinspect = INSPECTION_STATUS.filter((status) => status.toinspect);
  
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_UPDATE_ACCESS
  );

  useEffect(() => {

    if (!hasRequiredAccess) {
      return;
    }
    async function fetchData() {
      try {
        const transactionTypesResponse = await axios.get(
          `${API_URL}/get_inspections`,
          {
            headers: generateHeaders(),
          }
        );

        // Log transaction types response
        logger.info("Transaction Types Response:", transactionTypesResponse);

        const uniqueTransactionTypesSet = new Set();
        const uniqueTransactionTypes =
          transactionTypesResponse.data.inspections_list
            .filter((inspection) => {
              if (!uniqueTransactionTypesSet.has(inspection.transaction_type)) {
                uniqueTransactionTypesSet.add(inspection.transaction_type);
                return true;
              }
              return false;
            })
            .map((inspection) => inspection.transaction_type);
        // Log unique transaction types
        logger.info("Unique Types Response:", uniqueTransactionTypes);

        setTransactionTypes(uniqueTransactionTypes);
      } catch (error) {
        logger.error(`Error fetching data:`, error);
      }
    }

    const fetchTransactionNumbers = async () => {
      try {
        // Log status parameter and selected transaction type
        logger.info("Status Parameter", toinspect.map(status => status.name));
        logger.info("Transaction Type selected", formData.transaction_type);

        const transactionNumbersResponse = await axios.get(
          `${API_URL}/get_open_inspections`,
          {
            headers: generateHeaders(),
            params: {
              transaction_type_param: `'${formData.transaction_type}'`,
              status_param: toinspect.map(status => status.name).join(),
            },
          }
        );

        // Log updated transaction numbers
        const updatedTransactionNumbers =
          transactionNumbersResponse.data.inspections_list.map(
            (inspection) => inspection.transaction_number
          );
        logger.info("Updated Transaction Numbers:", updatedTransactionNumbers);

        setTransactionNumbers(updatedTransactionNumbers);
      } catch (error) {
        // Log error fetching transaction numbers
        logger.error(`Error fetching transaction numbers: ${error.message}`);
      }
    };

    fetchData();
    if (formData.transaction_type) {
      fetchTransactionNumbers();
    }
    // eslint-disable-next-line
  }, [formData.transaction_type]);

  // ... (rest of the code)

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleChange = async (e) => {
    const { name, value } = e.target;

    // Check if transaction_type is changing
    if (name === "transaction_type") {
      // Reset all form fields when transaction_type changes
      setFormData({
        transaction_type: value,
        transaction_number: "",
        item_code: "",
        location_name: "",
        accepted_quantity: "",
        rejected_quantity: "",
        uom_name: "",
        inspection_name: "",
        status: "",
        comments: "",
        rejected_qty_details: "",
        accepted_qty_details: "",
        transaction_quantity: "",
      });
      // Clear selected inspection after resetting the form
      setSelectedInspection(null);
    } else {
      // Update the form data for the changed field
      setFormData((prevData) => ({ ...prevData, [name]: value }));
    }

    // Fetch transaction numbers based on the selected transaction type
    if (name === "transaction_type") {
      // Log status parameter and selected transaction type
      logger.info("Status Parameter", toinspect.map(status => status.name));
      logger.info("Transaction Type selected", formData.transaction_type);
      try {
        const transactionNumbersResponse = await axios.get(
          `${API_URL}/get_open_inspections`,
          {
            headers: generateHeaders(),
            params: {
              transaction_type_param: `'${formData.transaction_type}'`,
              status_param: toinspect.map(status => status.name).join(), // Assuming toInspect is a variable containing the status parameter
            },
          }
        );

        // Get the list of transaction numbers for the selected type
        const updatedTransactionNumbers =
          transactionNumbersResponse.data.inspections_list.map(
            (inspection) => inspection.transaction_number
          );
        logger.info("Updated Transaction Numbers:", updatedTransactionNumbers);
        console.log("Updated Transaction Numbers:", updatedTransactionNumbers);

        setTransactionNumbers(updatedTransactionNumbers);
      } catch (error) {
        // Log error fetching transaction numbers
        logger.error(`Error fetching transaction numbers: ${error.message}`);
      }
    }

    // Fetch details based on the selected transaction number
    if (name === "transaction_number") {
      try {
        const selectedInspectionResponse = await axios.get(
          `${API_URL}/get_inspections`,
          {
            headers: generateHeaders(),
            params: {
              transaction_type_param: formData.transaction_type,
              transaction_number_param: value,
            },
          }
        );

        const selectedInspectionData =
          selectedInspectionResponse.data.inspections_list[0];

        // Log selected inspection details
        logger.info("Selected Inspection Details:", selectedInspectionData);
        console.log("Selected Inspection Details:", selectedInspectionData);
        console.log("Selected Inspection Details:", selectedInspectionData.status);

        // Update form fields with the obtained values
        setFormData((prevData) => ({
          ...prevData,
          accepted_quantity: selectedInspectionData.accepted_quantity,
          rejected_quantity: selectedInspectionData.rejected_quantity,
          inspection_name: selectedInspectionData.inspection_name,
          transaction_quantity: selectedInspectionData.transaction_quantity,
          status: selectedInspectionData.status,
          comments: selectedInspectionData.comments,
          rejected_qty_details: selectedInspectionData.rejected_qty_details,
          accepted_qty_details: selectedInspectionData.accepted_qty_details,
          // Add other fields as needed
        }));

        // Set the selected inspection for other purposes, if needed
        setSelectedInspection(selectedInspectionData);
      } catch (error) {
        // Log error fetching inspection details
        logger.error(`Error fetching inspection details: ${error.message}`);
        setErrorMessage(`Error fetching inspection details: ${error.message}`);
      }
    }

    // ... (rest of the code)
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Parse accepted and rejected quantities as numbers
      const acceptedQuantity = parseFloat(formData.accepted_quantity);
      const rejectedQuantity = parseFloat(formData.rejected_quantity);

      const updateRequest = {
        inspection_id: selectedInspection.inspection_id,
        item_id: selectedInspection.item_id,
        transaction_type: formData.transaction_type,
        transaction_number: parseInt(formData.transaction_number),
        inspection_location_id: selectedInspection.inspection_location_id,
        inspection_name: formData.inspection_name,
        accepted_quantity: isNaN(acceptedQuantity) ? 0 : acceptedQuantity,
        rejected_quantity: isNaN(rejectedQuantity) ? 0 : rejectedQuantity,
        transaction_quantity: parseFloat(formData.transaction_quantity) || 0,
        status: formData.status,
        accepted_qty_details: formData.accepted_qty_details,
        rejected_qty_details: formData.rejected_qty_details,
        comments: formData.comments,
        transaction_header_number: parseInt(selectedInspection.transaction_header_number),
        // updated_by: 1201
      };

      // Log update request
      logger.info("Update Request:", updateRequest);
      console.log("Update Request:", updateRequest);

      // Call the PUT API to update inspection
      const response = await axios.put(
        `${API_URL}/update_inspection`,
        updateRequest,
        {
          headers: generateHeaders(),
        }
      );

      // Log response data
      logger.info("Update Inspection Response:", response.data);

      setSuccessMessage("Inspection updated successfully!");
      setErrorMessage("");

      // Reset form data
      setFormData({
        transaction_type: "",
        transaction_number: "",
        item_code: "",
        location_name: "",
        accepted_quantity: "",
        rejected_quantity: "",
        uom_name: "",
        inspection_name: "", // Add this line
        status: "", // Add this line
        comments: "", // Add this line
        rejected_qty_details: "", // Add this line
        accepted_qty_details: "", // Add this line
        trasaction_quantity: "", // Fixed typo in this line
      });

      // Clear selected inspection after submission
      setSelectedInspection(null);
    } catch (error) {
      // Log error updating inspection
      logger.error("Error updating inspection:", error);
      setErrorMessage(`Error updating inspection: ${error.message}`);
      setSuccessMessage("");
    }
  };
  return (
    <div className="child-container menu-container">
      <h2 className="title">Perform Inspection</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Transaction Type field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="transaction_type">Transaction Type:</label>
              </div>
              <select
                id="transaction_type"
                name="transaction_type"
                value={formData.transaction_type}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Transaction Type</option>
                {transactionTypes.map((inspection) => (
                  <option key={inspection} value={inspection}>
                    {inspection}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Transaction Number field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="transaction_number">Transaction Number:</label>
              </div>
              <select
                id="transaction_number"
                name="transaction_number"
                value={formData.transaction_number}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Transaction Number</option>
                {transactionNumbers.map((number) => (
                  <option key={number} value={number}>
                    {number}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Inspection Name field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="inspection_name">Inspection Name:</label>
              </div>
              <input
                type="text"
                id="inspection_name"
                name="inspection_name"
                value={formData.inspection_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Item Code (Item ID) field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="item_code">Item Code </label>
              </div>
              <input
                type="text"
                id="item_code"
                name="item_code"
                defaultValue={selectedInspection?.item_code || ""}
                readOnly
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Location Name (Inspection Location ID) field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="location_name">Location Name:</label>
              </div>
              <input
                type="text"
                id="location_name"
                name="location_name"
                defaultValue={selectedInspection?.location_name || ""}
                readOnly
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Transaction Quantity field field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="transaction_quantity">Transaction Qty:</label>
              </div>
              <input
                type="text"
                id="transaction_quantity"
                name="transaction_quantity"
                defaultValue={selectedInspection?.transaction_quantity || ""}
                readOnly
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Accepted Quantity field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="accepted_quantity">Accepted Quantity:</label>
              </div>
              <input
                type="text"
                id="accepted_quantity"
                name="accepted_quantity"
                value={formData.accepted_quantity}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Rejected Quantity field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="rejected_quantity">Rejected Quantity:</label>
              </div>
              <input
                type="text"
                id="rejected_quantity"
                name="rejected_quantity"
                value={formData.rejected_quantity}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Status field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="status">Status:</label>
              </div>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Status</option>
                {INSPECTION_STATUS.map((status) => (
                  <option key={status.short_name} value={status.name}>
                    {status.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* UOM Name field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="uom_name">Unit of Measure:</label>
              </div>
              <input
                type="text"
                id="uom_name"
                name="uom_name"
                value={selectedInspection?.uom_name || ""}
                readOnly
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Accepted Quantity Details field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="accepted_qty_details">
                  Accepted Quantity Details:
                </label>
              </div>
              <input
                type="text"
                id="accepted_qty_details"
                name="accepted_qty_details"
                value={formData.accepted_qty_details}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Rejected Quantity Details field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="rejected_qty_details">
                  Rejected Quantity Details:
                </label>
              </div>
              <input
                type="text"
                id="rejected_qty_details"
                name="rejected_qty_details"
                value={formData.rejected_qty_details}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Comments field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="comments">Batch No & Others :</label>
              </div>
              <input
                type="text"
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>
          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Update Inspection
              </button>
            </div>
          </div>
        </form>

        {/* Display success message */}
        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {/* Display error message */}
        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}
