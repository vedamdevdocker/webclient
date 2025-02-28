import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_UPDATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import {
  RECEIPT_STATUS,
  PUT_AWAY_TRANSACTIONS_TYPES,
  INSPECTION_STATUS,
} from "../../config/config";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your permission checker
import logger from "../../../utilities/Logs/logger";

function PutAwayForm() {
  // Define your initial form data for specific fields
  const [formData, setFormData] = useState({
    transactionType: "",
    transactionNumber: null,
    selectedBin: "",
    selectedRack: "",
    selectedRow: "",
    selectedAisle: "",
    selectedZone: "",
    selectedLocation: "",
    selectedNewLocation: "",
    selectedWarehouse: "",
    additionalInfo: "",
    quantity: "",
    uom_name: "",
    item_name: "",
  });

  const [transactionType, setTransactionType] = useState("");

  const [trasnactionsList, setTransactionsList] = useState([]);
  const [transactionNumber, settransactionNumber] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  const [selectedRack, setSelectedRack] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  // eslint-disable-next-line
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedNewLocation, setSelectedNewLocation] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");
  const [additionalInfo, setAdditionalInfo] = useState("");
  const [binList, setBinList] = useState([]); // Add this line
  const [rackList, setRackList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [aisleList, setAisleList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const resetFormData = () => {
    setFormData({
      transactionType: "",
      transactionNumber: "",
      selectedBin: "",
      selectedRack: "",
      selectedRow: "",
      selectedAisle: "",
      selectedZone: "",
      selectedLocation: "",
      selectedNewLocation: "",
      selectedWarehouse: "",
      additionalInfo: "",
      quantity: "",
      uom_name: "",
      item_name: "",
    });
    setSelectedBin(""); // Reset selectedBin state
    setSelectedRack("");
    setSelectedRow("");
    setSelectedAisle("");
    setSelectedZone("");
    setSelectedNewLocation("");
    setSelectedWarehouse("");
  };

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_UPDATE_ACCESS
  );
  const handleTransactionTypeChange = async (event) => {
    // Reset the selected receipt and receipts list when the transaction type changes
    settransactionNumber(null);
    setTransactionsList([]);
    resetFormData();

    const newTransactionType = event.target.value;
    setTransactionType(newTransactionType);

    // Fetch receipts only if the transaction type is "Receipts"
    if (newTransactionType === "Receipts") {
      await fetchReceiptsForPutAway(newTransactionType);
    }
    if (newTransactionType === "Inspections") {
      await fetchInspectionsForPutAway(newTransactionType);
    }
  };

  const fetchReceiptsForPutAway = async (transactionType) => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const statusParam = RECEIPT_STATUS.filter((status) => status.toputaway)
        .map((status) => status.name)
        .join(",");

      console.log("Whaat are the receipts to fetch ",statusParam)

      const response = await axios.get(
        `${API_URL}/get_receipts_to_putaway?status_param=${statusParam}`,
        { headers }
      );

      setTransactionsList(response.data.receipts_list);
    } catch (error) {
      logger.error("Error fetching receipts for put away:", error);
      alert("Error fetching receipts for put away");
    }
  };

  const fetchInspectionsForPutAway = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const statusParam = INSPECTION_STATUS.filter((status) => status.toputaway)
        .map((status) => status.name)
        .join(",");

      const response = await axios.get(
        `${API_URL}/get_open_inspections?status_param=${statusParam}`,
        { headers }
      );

      //setInspectionsList(response.data.inspections_list);
      setTransactionsList(response.data.inspections_list);
    } catch (error) {
      logger.error("Error fetching Inspections for put away:", error);
      alert("Error fetching Inspections for put away");
    }
  };

  const handleTransactionNoChange = async (event) => {
    const transactionNumberId = event.target.value;

    // Check if the transaction type is "Receipts"
    if (transactionType === "Receipts") {
      const transaction = trasnactionsList.find(
        (transaction) =>
          transaction.receipt_id === parseInt(transactionNumberId)
      );

      settransactionNumber(transaction);

      try {
        const authToken = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");

        const headers = {
          Authorization: `Bearer ${authToken}`,
          UserId: userid,
        };

        const response = await axios.get(
          `${API_URL}/get_receipts_to_putaway?receipt_id_param=${transactionNumberId}&transaction_number_param=${transaction.transaction_number}`,
          { headers }
        );

        // Update form data with additional details
        const additionalDetails = response.data.receipts_list[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          item_id: additionalDetails.item_id,
          selectedLocation: additionalDetails.location_name,
          item_name:
            additionalDetails.item_name +
            "( " +
            additionalDetails.item_code +
            " )",
          quantity: additionalDetails.quantity,
          uom_name: additionalDetails.uom_name,
          additionalInfo: additionalDetails.comments,
        }));
      } catch (error) {
        logger.error("Error fetching additional details for receipt:", error);
        alert("Error fetching additional details for receipt");
      }
    }

    // Check if the transaction type is "Receipts"
    if (transactionType === "Inspections") {
      const transaction = trasnactionsList.find(
        (transaction) =>
          transaction.inspection_id === parseInt(transactionNumberId)
      );

      settransactionNumber(transaction);

      try {
        const authToken = localStorage.getItem("token");
        const userid = localStorage.getItem("userid");

        const headers = {
          Authorization: `Bearer ${authToken}`,
          UserId: userid,
        };
        const response = await axios.get(
          `${API_URL}/get_inspections?inpection_id_param=${transactionNumberId}&transaction_number_param=${transaction.transaction_number}`,
          { headers }
        );

        // Update form data with additional details
        const additionalDetails = response.data.inspections_list[0];
        setFormData((prevFormData) => ({
          ...prevFormData,
          item_id: additionalDetails.item_id,
          selectedLocation: additionalDetails.location_name,
          item_name:
            additionalDetails.item_name +
            "( " +
            additionalDetails.item_code +
            " )",
          quantity: additionalDetails.accepted_quantity,
          uom_name: additionalDetails.uom_name,
          additionalInfo: additionalDetails.comments,
        }));
      } catch (error) {
        logger.error(
          "Error fetching additional details for inspection:",
          error
        );
        alert("Error fetching additional details for inspection");
      }
    }
  };

  const handleFormSubmit = async (event) => {

    setSuccessMessage("");
    setErrorMessage("");
    try {
      event.preventDefault();
      if (!transactionNumber) {
        // Handle the case where no receipt is selected
        console.error("No receipt selected");
        return;
      }
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");
      logger.debug(
        `[${new Date().toLocaleTimeString()}] Form data : ${formData}`
      );
      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      let additionalInfoValue = "";
      let trasnactionSource = "";
      if (transactionType === "Receipts") {
        //transactionNumber.quantity = transactionNumber.quantity;
        trasnactionSource = transactionNumber.receipt_id;
        additionalInfoValue = additionalInfo
          ? `${additionalInfo} - ${transactionNumber.transaction_number} - ${transactionNumber.receipt_name} - ${transactionNumber.receipt_id}`
          : `${transactionNumber.transaction_number} - ${transactionNumber.receipt_name} - ${transactionNumber.receipt_id}`;
      }
      if (transactionType === "Inspections") {
        transactionNumber.quantity = transactionNumber.accepted_quantity;
        trasnactionSource = transactionNumber.inspection_id;
        additionalInfoValue = additionalInfo
          ? `${additionalInfo} - ${transactionNumber.transaction_number} - ${transactionNumber.inspection_name} - ${transactionNumber.inspection_id}`
          : `${transactionNumber.transaction_number} - ${transactionNumber.inspection_name} - ${transactionNumber.inspection_id}`;
      }

      const putAwayData = {
        quantity: transactionNumber.quantity || null,
        item_id: parseInt(transactionNumber.item_id, 10) || null,
        // inventory_id: parseInt(transactionNumber.inventory_id, 10) || null,
        uom_id: parseInt(transactionNumber.uom_id, 10) || null,
        transaction_id:
          parseInt(transactionNumber.transaction_number, 10) || null,
        transaction_type: transactionType || null,
        bin_id: parseInt(selectedBin, 10) || null,
        rack_id: parseInt(selectedRack, 10) || null,
        row_id: parseInt(selectedRow, 10) || null,
        aisle_id: parseInt(selectedAisle, 10) || null,
        zone_id: parseInt(selectedZone, 10) || null,
        location_id: parseInt(selectedNewLocation, 10) || null,
        warehouse_id: parseInt(selectedWarehouse, 10) || null,
        transaction_source_id: parseInt(trasnactionSource, 10) || null,
        additional_info: additionalInfoValue || null,
      };

      // Send a POST request to the put_away_inventory API
      const response = await axios.post(
        `${API_URL}/put_away_inventory`,
        putAwayData,
        {
          headers,
        }
      );

      logger.debug(response);

      const target_status = RECEIPT_STATUS.filter((status) => status.putaway)
        .map((status) => status.name)
        .join(",");

      let updateStatusData = "";
      if (transactionType === "Receipts") {
        updateStatusData = {
          transaction_id: transactionNumber.receipt_id, // Use inspection_id or receipt_id based on transactionType
          transaction_type: transactionType,
          target_status: target_status,
        };
      }
      if (transactionType === "Inspections") {
        updateStatusData = {
          transaction_id: transactionNumber.inspection_id, // Use inspection_id or receipt_id based on transactionType
          transaction_type: transactionType,
          target_status: target_status,
        };
      }

      const updateStatusResponse = await axios.put(
        `${API_URL}/update_transaction_status`,
        updateStatusData,
        {
          headers,
        }
      );

      logger.debug(updateStatusResponse);
      resetFormData();
      setSuccessMessage("Succes : The PutAway is successful");
      settransactionNumber(null);
      setTransactionType(null);
    } catch (error) {
      logger.error("Error inserting item inventory:", error);
      setErrorMessage("Error : Unable to Perform PutAway ");
      // Handle error
    }
  };

  const fetchRacks = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_racks`, { headers });
      setRackList(response.data.rack_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching racks:`,
        error
      );
      alert("Error fetching racks");
    }
  };
  const fetchBins = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_bins`, { headers });
      setBinList(response.data.bin_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching bins:`,
        error
      );
      alert("Error fetching bins");
    }
  };

  const fetchRows = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_invrows`, { headers });
      setRowList(response.data.invrows_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching rows:`,
        error
      );
      alert("Error fetching rows");
    }
  };

  const fetchAisles = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_aisles`, { headers });
      setAisleList(response.data.aisle_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching aisles:`,
        error
      );
      alert("Error fetching aisles");
    }
  };

  const fetchZones = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_zones`, { headers });
      setZoneList(response.data.zone_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching zones:`,
        error
      );
      alert("Error fetching zones");
    }
  };

  const fetchLocations = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_locations`, { headers });
      setLocationList(response.data.location_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching locations:`,
        error
      );
      alert("Error fetching locations");
    }
  };

  const fetchWarehouses = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/get_warehouses`, {
        headers,
      });
      setWarehouseList(response.data.warehouse_list);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching warehouses:`,
        error
      );
      alert("Error fetching warehouses");
    }
  };

  useEffect(() => {
    if (!hasRequiredAccess) {
      // Optionally, handle the case where access is not granted
      setSuccessMessage("");
      setErrorMessage("");
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Access denied to Put Away component.`
      );
      return;
    }

    if (transactionType === "Receipts") {
      fetchReceiptsForPutAway(transactionType);
    }
    if (transactionType === "Inspections") {
      //setSelectedBin(null);
      fetchInspectionsForPutAway(transactionType);
    }
    fetchBins(); // Fetch bins when the component mounts
    fetchRacks(); // Fetch racks when the component mounts
    fetchRows(); // Fetch racks when the component mounts
    fetchAisles(); // Fetch racks when the component mounts
    fetchZones(); // Fetch racks when the component mounts
    fetchLocations(); // Fetch racks when the component mounts
    fetchWarehouses(); // Fetch racks when the component mounts
  }, [hasRequiredAccess, transactionType, selectedBin]);

  const handleRackChange = (event) => {
    setSelectedRack(event.target.value);
  };

  const handleRowChange = (event) => {
    setSelectedRow(event.target.value);
  };
  const handleAisleChange = (event) => {
    setSelectedAisle(event.target.value);
  };
  const handleZoneChange = (event) => {
    setSelectedZone(event.target.value);
  };
  // eslint-disable-next-line
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const handleNewLocationChange = (event) => {
    setSelectedNewLocation(event.target.value);
  };
  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };
  const handleBinChange = (event) => {
    setSelectedBin(event.target.value);
  };
  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };

  return (
    <div className="child-container menu-container">
      <h2>Put Away Inventory Form</h2>
      <div className="child-container form-container">
        <form onSubmit={handleFormSubmit}>
          {/* ... (existing form fields) */}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="transactionType">Transaction Type:</label>
              </div>
              <select
                id="transactionType"
                value={transactionType}
                onChange={handleTransactionTypeChange}
                className="form-control input-field"
              >
                <option value="">Select a transaction type</option>
                {PUT_AWAY_TRANSACTIONS_TYPES.map((type) => (
                  <option key={type.name} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="transactionNumber">Transaction No :</label>
              </div>
              <select
                id="transactionNumber"
                value={
                  transactionType === "Receipts"
                    ? transactionNumber?.receipt_id || ""
                    : transactionType === "Inspections"
                    ? transactionNumber?.inspection_id || ""
                    : ""
                }
                onChange={handleTransactionNoChange}
                className="form-control input-field"
              >
                <option value="">Select a transaction</option>
                {trasnactionsList.map((transaction) => (
                  <option
                    key={transaction.receipt_id || transaction.inspection_id}
                    value={transaction.receipt_id || transaction.inspection_id}
                  >
                    {transaction.transaction_number && transactionType ? (
                      <>
                        {transaction.transaction_number} -{" "}
                        {
                          transaction[
                            `${transactionType.toLowerCase().slice(0, -1)}_name`
                          ]
                        }{" "}
                        - {transaction.receipt_id || transaction.inspection_id}
                      </>
                    ) : (
                      "N/A"
                    )}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="item_name">Item :</label>
              </div>
              <input
                type="text"
                id="item_name"
                value={formData.item_name}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedLocation">Location :</label>
              </div>
              <input
                type="text"
                id="selectedLocation"
                value={formData.selectedLocation}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="quantity">Quantity :</label>
              </div>
              <input
                type="text"
                id="quantity"
                value={formData.quantity}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="uom_name">UOM :</label>
              </div>
              <input
                type="text"
                id="uom_name"
                value={formData.uom_name}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="additionalInfo">Additional Info:</label>
              </div>
              <input
                type="text"
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleAdditionalInfoChange}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

          {/* ... (existing form fields) */}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedBin">Target Bin :</label>
              </div>
              <select
                id="selectedBin"
                value={selectedBin}
                onChange={handleBinChange}
                className="form-control input-field"
              >
                <option value="">Select a bin</option>
                {binList.map((bin) => (
                  <option key={bin.bin_id} value={bin.bin_id}>
                    {bin.bin_name} - {bin.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRack">Target Rack :</label>
              </div>
              <select
                id="selectedRack"
                value={selectedRack}
                onChange={handleRackChange}
                className="form-control input-field"
              >
                <option value="">Select a Rack</option>
                {rackList.map((rack) => (
                  <option key={rack.rack_id} value={rack.rack_id}>
                    {rack.rack_name} - {rack.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRow">Target Row :</label>
              </div>
              <select
                id="selectedRow"
                value={selectedRow}
                onChange={handleRowChange}
                className="form-control input-field"
              >
                <option value="">Select a Row</option>
                {rowList.map((row) => (
                  <option key={row.row_id} value={row.row_id}>
                    {row.row_name} - {row.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedAisle">Target aisle :</label>
              </div>
              <select
                id="selectedAisle"
                value={selectedAisle}
                onChange={handleAisleChange}
                className="form-control input-field"
              >
                <option value="">Select a Aisle</option>
                {aisleList.map((aisle) => (
                  <option key={aisle.aisle_id} value={aisle.aisle_id}>
                    {aisle.aisle_name} - {aisle.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedZone">Target Zone :</label>
              </div>
              <select
                id="selectedZone"
                value={selectedZone}
                onChange={handleZoneChange}
                className="form-control input-field"
              >
                <option value="">Select a Zone</option>
                {zoneList.map((zone) => (
                  <option key={zone.zone_id} value={zone.zone_id}>
                    {zone.zone_name} - {zone.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedNewLocation">Target Location :</label>
              </div>
              <select
                id="selectedNewLocation"
                value={selectedNewLocation}
                onChange={handleNewLocationChange}
                className="form-control input-field"
              >
                <option value="">Select a new Location</option>
                {locationList.map((location) => (
                  <option
                    key={location.location_id}
                    value={location.location_id}
                  >
                    {location.location_name} - {location.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedWarehouse">Target Warehouse:</label>
              </div>
              <select
                id="selectedWarehouse"
                value={selectedWarehouse}
                onChange={handleWarehouseChange}
                className="form-control input-field"
              >
                <option value="">Select a Warehouse</option>
                {warehouseList.map((warehouse) => (
                  <option
                    key={warehouse.warehouse_id}
                    value={warehouse.warehouse_id}
                  >
                    {warehouse.warehouse_name} - {warehouse.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit button */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Put Away
              </button>
            </div>
          </div>
          {/* Display success message if exists */}
          {successMessage && (
            <div className="alert alert-success" role="alert">
              {successMessage}
            </div>
          )}

          {/* Display error message if exists */}
          {errorMessage && (
            <div className="alert alert-danger" role="alert">
              {errorMessage}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}

export default PutAwayForm;
