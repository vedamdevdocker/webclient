import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { RECEIPT_STATUS, MISLLENIOUS_RECEIPT } from "../../config/config";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

export default function CreateReceiptForm() {
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

  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [locations, setLocations] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch items
        const itemsResponse = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(itemsResponse.data.items);

        // Fetch UOMs
        const uomsResponse = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUoms(uomsResponse.data.uom);

        // Fetch locations
        const locationsResponse = await axios.get(`${API_URL}/get_locations`, {
          headers: generateHeaders(),
        });
        setLocations(locationsResponse.data.location_list);
      } catch (error) {
        logger.error(`Error fetching data:`, error);
      }
    }

    fetchData();
  }, []);

  const generateUniqueNumber = () => {
    const timestamp = Date.now().toString();
    return timestamp.substring(timestamp.length - 5);
  };

  useEffect(() => {
    // Generate a unique 5-digit number using timestamp for transaction_number
    setFormData((prevFormData) => ({
      ...prevFormData,
      transaction_number: generateUniqueNumber(), // Set transaction_number using the generated unique number
    }));
  }, []); // Run once on component mount

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === "checkbox" ? checked : value,
    }));

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

    if (
      !formData.transaction_number ||
      parseInt(formData.transaction_number) === 0
    ) {
      setErrorMessage("Transaction number cannot be empty or 0.");
      setSuccessMessage("");
      return;
    }

    // Validate if Inspect is required but not selected or inspection_location_id is not selected
    if (
      formData.status === "To Inspect" &&
      (!formData.inspect || !formData.inspection_location_id)
    ) {
      setErrorMessage(
        "Please select inspection location and check Inspect checkbox."
      );
      setSuccessMessage("");
      return;
    }
    
    try {
      const transaction_header_number = parseInt(formData.transaction_number);
      const transaction_number = parseInt(formData.transaction_number);
      const formDataToSend = {
        ...formData,
        transaction_number,
        transaction_header_number,
      };
      formDataToSend.type_short = MISLLENIOUS_RECEIPT.short;
      formDataToSend.receipt_name = MISLLENIOUS_RECEIPT.name; // Set receipt_name based on MISLLENIOUS_RECEIPT

      const response = await axios.post(
        `${API_URL}/create_receipt`,
        formDataToSend,
        {
          headers: generateHeaders(),
        }
      );

      setSuccessMessage("Receipt created successfully!");
      setErrorMessage("");
      logger.debug("Response data ",response.data);
      resetForm();
    } catch (error) {
      console.error("Error creating receipt:", error);
      setErrorMessage(`Error creating receipt: ${error.message}`);
      setSuccessMessage("");
    }
  };

  const resetForm = () => {
    setFormData({
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
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Misllenious Receipt</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            {/* Transaction Number field (Display Only) */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label
                    htmlFor="transaction_number"
                    style={{ fontWeight: "bold" }}
                  >
                    Receipt Number:{" "}
                    <span style={{ color: "blue" }}>
                      {formData.transaction_number}
                    </span>
                  </label>
                </div>
                {/* Rest of your code */}
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
                  {items.map((item) => (
                    <option key={item.item_id} value={item.item_id}>
                      {item.item_code} ({item.item_name})
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
                  onChange={handleChange}
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
                  value={formData.uom_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select UOM</option>
                  {uoms.map((uom) => (
                    <option key={uom.uom_id} value={uom.uom_id}>
                      {uom.abbreviation} ({uom.uom_name})
                    </option>
                  ))}
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

            {formData.inspect && (
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
