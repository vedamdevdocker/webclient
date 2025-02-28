import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { RECEIPT_STATUS, PO_RECEIPT } from "../../config/config";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
  };
};

export default function CreatePOReceiptForm() {
  const [formData, setFormData] = useState({
    receiving_location_id: "",
    quantity: 0,
    uom_id: "",
    comments: "",
    item_id: "",
    inspect: false,
    transaction_number: "",
    status: "",
    inspection_location_id: null,
    type_short: "",
  });

  const resetFormWhenPOChanges = () => {
    setFormData({
      receiving_location_id: "",
      quantity: 0,
      uom_id: "",
      comments: "",
      item_id: "",
      inspect: false,
      status: "",
      inspection_location_id: null,
      type_short: "",
    });
  };

  const [locations, setLocations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [purchaseOrderHeaders, setPurchaseOrderHeaders] = useState([]);
  const [purchaseOrderLines, setPurchaseOrderLines] = useState([]);
  const [selectedSingleRow, setSelectedSingleRow] = useState("");
  const [itemId, setSelectedItemId] = useState("");
  const [lineId, setSelectedLineId] = useState("");
  // eslint-disable-next-line 
  const [transaction_num, setSelectTransactionNumber] = useState("");  

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  useEffect(() => {
    fetchPurchaseOrderHeaders();
    fetchData();
    setFormData((prevFormData) => ({
      ...prevFormData,
      transaction_number: generateUniqueNumber(), // Set transaction_number using the generated unique number
    }));
    // eslint-disable-next-line
  }, []);

  const generateUniqueNumber = () => {
    const timestamp = Date.now().toString();
    return timestamp.substring(timestamp.length - 5);
  };

  async function fetchData() {
    try {
      const locationsResponse = await axios.get(`${API_URL}/get_locations`, {
        headers: generateHeaders(),
      });
      setLocations(locationsResponse.data.location_list);
      logger.debug(
        `[${new Date().toLocaleTimeString()}] Fetched locations:`,
        locationsResponse.data
      );
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching locations:`,
        error
      );
    }
  }

  async function fetchPurchaseOrderHeaders() {
    try {
      const response = await axios.get(
        `${API_URL}/get_purchase_order_headers?status=${PO_RECEIPT.status}`,
        {
          headers: generateHeaders(),
        }
      );
      setPurchaseOrderHeaders(response.data);
      logger.debug(
        `[${new Date().toLocaleTimeString()}] Fetched purchase order headers:`,
        response.data
      );
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching purchase order headers:`,
        error
      );
    }
  }

  const handleChange = async (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

    if (name === "status" && value === "To Inspect") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        inspect : true,
        receiving_location_id: "", // Clear receiving_location_id
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
      }));
    }

    if (name === "transaction_number") {
      resetFormWhenPOChanges();
      setPurchaseOrderLines([]);
      setSelectedLineId("");
      setSelectedSingleRow("");
      setSelectTransactionNumber(value);
      //logger.debu("purchaseOrderHeaders selected",purchaseOrderHeaders)
      try {
        const response = await axios.get(
          `${API_URL}/get_purchase_order_lines?header_id=${value}&status=${PO_RECEIPT.status}`,
          {
            headers: generateHeaders(),
          }
        );
        setPurchaseOrderLines(response.data);
        logger.debug(
          `[${new Date().toLocaleTimeString()}] Fetched purchase order lines for transaction number:`,
          response.data
        );
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching purchase order lines:`,
          error
        );
      }
    }

    if (name === "item_id") {
      setSelectedLineId(value);
      try {
        const selectedItem = purchaseOrderLines.find(
          (line) => line.line_id.toString() === value.toString()
        );
        logger.debug(
          `[${new Date().toLocaleTimeString()}] Purchase order lines situation after item id selection:`,
          purchaseOrderLines
        );
        logger.debug(
          `[${new Date().toLocaleTimeString()}] Selected item value of item_id:`,
          value
        );
        logger.debug(
          `[${new Date().toLocaleTimeString()}] Selected item:`,
          selectedItem
        );
        setSelectedSingleRow(selectedItem); // Update selectedSingleRow here
        if (selectedItem != null) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            quantity: selectedItem.quantity, // Set quantity
            uom_id: selectedItem.uom_id, // Set uom_id
            abbreviation: selectedItem.abbreviation,
            uom_name: selectedItem.uom_name,
          }));
          setSelectedItemId(selectedItem.item_id);
        } else {
          logger.info(
            `[${new Date().toLocaleTimeString()}] Selected item not found in purchase order lines`
          );
        }
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error updating quantity based on item_id:`,
          error
        );
      }

      const selectedStatus = RECEIPT_STATUS.find(
        (status) => status.name === value
      );
      if (selectedStatus) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          inspect: selectedStatus.toinspect || false,
        }));
      }
      if (name === "status" && value === "To Inspect") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          inspect: true, // Set inspect to true when status is 'To Inspect'
          receiving_location_id: "", // Clear receiving_location_id
        }));
      } else {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
        }));
      }
      
      if (name === "inspection_location_id") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          [name]: value,
          receiving_location_id: value,
        }));
      }

    }

  

    if (name === "inspection_location_id") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value,
        receiving_location_id:value
      }));
    } 
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: checked,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!transaction_num ) {
      setErrorMessage("Transaction number cannot be empty or 0.");
      setSuccessMessage("");
      return;
    }
     // Validate if Inspect is required but not selected or inspection_location_id is not selected
     if (formData.status === 'To Inspect' && (!formData.inspect || !formData.inspection_location_id)) {
      setErrorMessage("Please select inspection location and check Inspect checkbox.");
      setSuccessMessage("");
      return;
    }

    try {
      const po_line_id =  parseInt(lineId, 10)
      const transaction_header_number = parseInt(purchaseOrderHeaders.find(header => header.header_id === parseInt(transaction_num, 10))?.po_num, 10);
      const transaction_number = po_line_id
      const formDataToSend = { ...formData, po_line_id,transaction_number,transaction_header_number};
      formDataToSend.type_short = PO_RECEIPT.short;
      formDataToSend.receipt_name = PO_RECEIPT.name;
      formDataToSend.item_id = itemId; // Set item_id to the selected itemId
      logger.debug("Form Data to be Sent",formDataToSend);
      const response = await axios.post(
        `${API_URL}/create_receipt`,
        formDataToSend,
        {
          headers: generateHeaders(),
        }
      );
      setSuccessMessage("Receipt created successfully!");
      setErrorMessage("");
      resetForm();
      logger.debug(
        `[${new Date().toLocaleTimeString()}] Receipt created successfully:`,
        response.data
      );
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error creating receipt:`,
        error
      );
      setErrorMessage(`Error creating receipt: ${error.message}`);
      setSuccessMessage("");
    }
  };

  const resetAllStates = () => {
    setLocations([]);
    setSuccessMessage("");
    setErrorMessage("");
    setPurchaseOrderHeaders([]);
    setPurchaseOrderLines([]);
    setSelectedSingleRow("");
    setSelectedItemId("");
    setSelectedLineId("");
    setSelectTransactionNumber("");
  };

  const resetForm = () => {
    resetFormWhenPOChanges();
    resetAllStates();
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Purchase Order Receipt</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            {/* Transaction Number field (Display Only) */}
            {/* Transaction Number field (Display Only) */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="transaction_number">PO Number:</label>
                </div>
                <select
                  id="transaction_number"
                  name="transaction_number"
                  value={formData.transaction_number}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select PO Number</option>
                  {purchaseOrderHeaders.map((header) => (
                    <option key={header.header_id} value={header.header_id}>
                      {header.po_num}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Item field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="item_id">Item:</label>
                </div>
                <select
                  id="item_id"
                  name="item_id"
                  value={formData.item_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Item</option>
                  {purchaseOrderLines.map((line) => (
                    <option key={line.line_id} value={line.line_id}>
                      {line.item_code} ({line.item_name})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quantity field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="quantity">Quantity:</label>
                </div>
                <input
                  type="text"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  readOnly // Make the quantity field read-only
                  className="form-control input-field"
                />
              </div>
            </div>
            {/* UOM field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="uom_id">Unit of Measure:</label>
                </div>
                <select
                  id="uom_id"
                  name="uom_id"
                  value={formData.uom_id || ""}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Unit of Measure</option>
                  {selectedSingleRow && (
                    <option value={selectedSingleRow.uom_id}>
                      {`${selectedSingleRow.abbreviation} (${selectedSingleRow.uom_name})`}
                    </option>
                  )}
                </select>
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
                  {RECEIPT_STATUS.map((index) => (
                    <option key={index.name} value={index.name}>
                      {index.sequence} {index.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
           
            {/* Comments field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="comments">Batch & SNo range:</label>
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

             {/* Receiving Location field */}
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="receiving_location_id">
                      Receiving Location:
                    </label>
                  </div>
                  <select
                    id="receiving_location_id"
                    name="receiving_location_id"
                    value={formData.receiving_location_id}
                    onChange={handleChange}
                    className="form-control input-field"
                  >
                    <option value="">Select Location</option>
                    {locations.map((location) => (
                      <option
                        key={location.location_id}
                        value={location.location_id}
                      >
                        {location.location_name} ({location.warehouse_name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            {/* Inspect field */}
            {formData.status === "To Inspect" && (
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="inspect">Inspect:</label>
                  </div>
                  <input
                    type="checkbox"
                    id="inspect"
                    name="inspect"
                    checked={formData.inspect}
                    onChange={handleCheckboxChange}
                    className="form-check-input"
                  />
                </div>
              </div>
            )}
             {formData.status === "To Inspect" && (
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label htmlFor="inspection_location_id">
                      Inspection Location:
                    </label>
                  </div>
                  <select
                    id="inspection_location_id"
                    name="inspection_location_id"
                    value={formData.inspection_location_id}
                    onChange={handleChange}
                    className="form-control input-field"
                  >
                    <option value="">Select Inspection Location</option>
                    {locations.map((location) => (
                      <option
                        key={location.location_id}
                        value={location.location_id}
                      >
                        {location.location_name} ({location.warehouse_name})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            )}

            {/* Submit button */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create Receipt
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>You do not have permission to view this module</div>
        )}
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
