import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

// ... (your existing imports)

export default function UOMConversionForm() {
  const [formData, setFormData] = useState({
    input_inventory_id: "",
    input_transaction_id: "",
    input_item_id: "",
    input_transaction_type: "",
    input_source_uom_id: "",
    input_target_uom_id: "",
  });

  const [items, setItems] = useState([]);
  const [transactionIds, setTransactionIds] = useState([]);
  const [filteredTransactionTypes, setFilteredTransactionTypes] = useState();
  const [uoms, setUoms] = useState([]);
  const [targetUoms, setTargetUoms] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [quantity, setQuantity] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const fetchData = async () => {
    try {
      // Fetch items
      const itemsResponse = await axios.get(`${API_URL}/get_item_inventory?status=No`, {
        headers: generateHeaders(),
      });
      setItems(itemsResponse.data.item_inventory_list);

      // Fetch UOMs
      const uomsResponse = await axios.get(`${API_URL}/list_uoms`, {
        headers: generateHeaders(),
      });
      //setUoms(uomsResponse.data.uom);

      // Fetch target UOMs
      setTargetUoms(uomsResponse.data.uom);
    } catch (error) {
      logger.error(`Error fetching data:`, error);
    }
  };

  useEffect(() => {
    
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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

    // Update form data based on the field type

    const intValue = [
      "input_item_id",
      "input_inventory_id",
      "input_transaction_id",
      "input_source_uom_id",
      "input_target_uom_id",
    ];
    const updatedValue = intValue.includes(name) ? parseInt(value, 10) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));

    if (name === "input_item_id") {
      const selectedItemId = parseInt(value, 10);

      const filteredItems = items.filter(
        (item) => item.item_id === selectedItemId
      );

      const filteredTransactionTypes = Array.from(
        new Set(
          filteredItems.flatMap((item) =>
            item.transaction_type ? [item.transaction_type] : []
          )
        )
      );

      // Update transactionIds in the state
      setFilteredTransactionTypes(filteredTransactionTypes);
    }
    if (name === "input_inventory_id") {
      
      const transactionId = e.target.options[
        e.target.selectedIndex
      ].getAttribute("data-transaction-id");

      console.log(parseInt(value, 10));
      setFormData((prevFormData) => ({
        ...prevFormData,
        input_transaction_id: transactionId, // Reset inventory ID when changing item
      }));

      const filteredItems = items.filter(
        (item) =>
          item.item_id === parseInt(formData.input_item_id, 10) &&
          item.inventory_id === parseInt(value, 10) &&
          item.transaction_type === formData.input_transaction_type &&
          item.transaction_id === parseInt(transactionId, 10)
      );
      setUoms(filteredItems);
      if (filteredItems) {
        setFormData((prevFormData) => ({
          ...prevFormData,
          input_source_uom_id: "",
        }));
      }
    }

    if (name === "input_source_uom_id") {
      // Fetch UOMs based on the selected source UOM
      try {
        const uomResponse = await axios.get(
          `${API_URL}/list_uoms?find_uom_id=${value}`,
          {
            headers: generateHeaders(),
          }
        );
        setTargetUoms(uomResponse.data.uom);
      } catch (error) {
        console.error("Error fetching UOMs:", error);
      }
    }

    if (name === "input_inventory_id") {
      const filteredItems = items.filter(
        (item) =>
          item.item_id === parseInt(formData.input_item_id, 10) &&
          item.inventory_id === parseInt(value, 10) &&
          item.transaction_type === formData.input_transaction_type
      );
      setQuantity(filteredItems[0].quantity)

    }
  };


  const handleTransactionTypeChange = (e) => {
    const { value } = e.target;
  
    // Filter items based on the selected item_id and transaction type
    const filteredItems = items.filter(
      (item) =>
        item.item_id === parseInt(formData.input_item_id, 10) &&
        item.transaction_type === value
    );
  
    // Create a Set of unique combinations of (transaction_id, inventory_id)
    const uniqueTransactionInventorySet = new Set(
      filteredItems.map((item) => `${item.transaction_id}_${item.inventory_id}`)
    );
  
    // Convert the Set back to an array of objects
    const uniqueTransactionInventoryArray = Array.from(uniqueTransactionInventorySet).map(
      (uniqueKey) => {
        const [transaction_id, inventory_id] = uniqueKey.split('_');
        return { transaction_id: parseInt(transaction_id, 10), inventory_id: parseInt(inventory_id, 10) };
      }
    );
  
    console.log('Unique Transaction and Inventory combinations', uniqueTransactionInventoryArray);
  
    // Update transactionIds in the state
    setTransactionIds(uniqueTransactionInventoryArray);
  
    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      input_transaction_type: value,
      input_transaction_id: "", // Reset transaction ID when changing transaction type
    }));
  };
  

  const handleTargetUOMChange = (e) => {
    const { value } = e.target;

    // Update form data
    setFormData((prevFormData) => ({
      ...prevFormData,
      input_target_uom_id: value,
    }));
  };

  const handleButtonClick = async () => {
    try {
      // Explicitly convert id fields to numbers
      const formDataWithIntIds = {
        ...formData,
        input_item_id: parseInt(formData.input_item_id, 10),
        input_inventory_id: parseInt(formData.input_inventory_id, 10),
        input_transaction_id: parseInt(formData.input_transaction_id, 10),
        input_source_uom_id: parseInt(formData.input_source_uom_id, 10),
        input_target_uom_id: parseInt(formData.input_target_uom_id, 10),
      };

      console.log(formDataWithIntIds);

      const response = await axios.post(
        `${API_URL}/pack_or_unpack`,
        formDataWithIntIds,
        {
          headers: generateHeaders(),
        }
      );

      console.log(response.data);
      setSuccessMessage(response.data);
      setErrorMessage("");
      setQuantity("");

      // Reset the form after a successful API call
      resetForm();
      
      fetchData();
    } catch (error) {
      console.error("Error calling pack_or_unpack API:", error);
  
      // Extract and set the specific error message from the API response
      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(`Error calling pack_or_unpack API: ${error.message}`);
      }
  
      setSuccessMessage("");
    }
  };

  const resetForm = () => {
    // Reset form data
    setFormData({
      input_inventory_id: "",
      input_transaction_id: "",
      input_item_id: "",
      input_transaction_type: "",
      input_source_uom_id: "",
      input_target_uom_id: "",
    });

    // Reset other state variables if needed
    setTransactionIds([]);
    setUoms([]);
    setFilteredTransactionTypes([]);
    // ... any other state variables you want to reset
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Inventory Transaction UOM Conversion</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form>
            {/* Item field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="input_item_id">Item:</label>
                </div>
                <select
                  id="input_item_id"
                  name="input_item_id"
                  value={formData.input_item_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Item</option>
                  {Array.from(new Set(items.map((item) => item.item_id))).map(
                    (item_id) => {
                      const selectedItem = items.find(
                        (item) => item.item_id === item_id
                      );
                      return (
                        <option
                          key={selectedItem.item_id}
                          value={selectedItem.item_id}
                        >
                          {selectedItem.item_code} - {selectedItem.item_name}
                        </option>
                      );
                    }
                  )}
                </select>
              </div>
            </div>

            {/* Transaction Type field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="input_transaction_type">
                    Transaction Type:
                  </label>
                </div>
                <select
                  id="input_transaction_type"
                  name="input_transaction_type"
                  value={formData.input_transaction_type}
                  onChange={handleTransactionTypeChange}
                  className="form-control input-field"
                >
                  <option key="" value="">
                    Select Transaction Type
                  </option>
                  {filteredTransactionTypes &&
                  filteredTransactionTypes.length > 0 ? (
                    filteredTransactionTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))
                  ) : (
                    <option value="">No transaction types available</option>
                  )}
                </select>
              </div>
            </div>

            {/* Transaction ID field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="input_inventory_id">Inventory ID:</label>
                </div>
                <select
                  id="input_inventory_id"
                  name="input_inventory_id"
                  value={formData.input_inventory_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Inventory ID</option>
                  {transactionIds && transactionIds.length > 0 ? (
                    transactionIds.map((type, index) => (
                      <option
                        key={index}
                        value={type.inventory_id}
                        data-transaction-id={type.transaction_id}
                      >
                        {type.inventory_id && type.transaction_id
                          ? `${type.inventory_id} - ${type.transaction_id}`
                          : "Invalid Option"}
                      </option>
                    ))
                  ) : (
                    <option value="">No Inventory is available</option>
                  )}
                </select>
              </div>
            </div>
            {/* Quantity display field */}

            <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedLocation">Quantity:</label>
              </div>
              <input
                type="text"
                id="input_quantity"
                value={quantity}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

            {/* Source UOM field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="input_source_uom_id">Source UOM:</label>
                </div>
                <select
                  id="input_source_uom_id"
                  name="input_source_uom_id"
                  value={formData.input_source_uom_id}
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option value="">Select Source UOM</option>
                  {uoms.map((uom) => (
                    <option key={uom.uom_id} value={uom.uom_id}>
                      {uom.uom_abbreviation} - {uom.uom_name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Target UOM field */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="input_target_uom_id">Target UOM:</label>
                </div>
                <select
                  id="input_target_uom_id"
                  name="input_target_uom_id"
                  value={formData.input_target_uom_id}
                  onChange={handleTargetUOMChange}
                  className="form-control input-field"
                >
                  <option value="">Select Target UOM</option>
                  {targetUoms &&
                    targetUoms.map((uom) => (
                      <option key={uom.uom_id} value={uom.uom_id}>
                        {uom.abbreviation} - {uom.uom_name}
                      </option>
                    ))}
                </select>
              </div>
            </div>

            {/* Button to call the POST API */}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleButtonClick}
                >
                  Convert
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
