import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your permission checker

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";
// ... (existing imports)

function SearchItemInventoryForm({ updateSearchItemInventory }) {
  const [itemCode, setItemCode] = useState("");
  const [FoundInventory, setFoundInventory] = useState([]);
  const [itemList, setItemList] = useState([]);
  const [binList, setBinList] = useState([]); // Add this line
  const [rackList, setRackList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [aisleList, setAisleList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [additionalInfo, setAdditionalInfo] = useState("");

  // ... (existing state and useEffect)

  const [transactionNumber, setTransactionNumber] = useState("");
  const [selectedBin, setSelectedBin] = useState("");
  const [selectedRack, setSelectedRack] = useState("");

  const [selectedRow, setSelectedRow] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

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
  const handleLocationChange = (event) => {
    setSelectedLocation(event.target.value);
  };
  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
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

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      // Optionally, handle the case where access is not granted
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Access denied to Search item component.`
      );
      return;
    }

    fetchItemList();
    fetchBins(); // Fetch bins when the component mounts
    fetchRacks(); // Fetch racks when the component mounts
    fetchRows(); // Fetch racks when the component mounts
    fetchAisles(); // Fetch racks when the component mounts
    fetchZones(); // Fetch racks when the component mounts
    fetchLocations(); // Fetch racks when the component mounts
    fetchWarehouses(); // Fetch racks when the component mounts
  }, [hasRequiredAccess]);

  const fetchItemList = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/list_items`, { headers });
      setItemList(response.data.items);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching item lists:`,
        error
      );
      alert("Error fetching item lists");
    }
  };

  const handleTransactionNumberChange = (event) => {
    setTransactionNumber(event.target.value);
  };
  const handleAdditionalInfoChange = (event) => {
    setAdditionalInfo(event.target.value);
  };
  const handleItemCodeChange = (event) => {
    setItemCode(event.target.value);
  };
  const handleBinChange = (event) => {
    setSelectedBin(event.target.value);
  };

  const handleFoundInventory = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const params = {
        item_code: itemCode || null,
        transaction_id: transactionNumber || null,
        bin_name: selectedBin || null, // Include bin_name only if selectedBin is not null
        rack_name: selectedRack || null,
        row_name: selectedRow || null,
        aisle_name: selectedAisle || null,
        zone_name: selectedZone || null,
        location_name: selectedLocation || null,
        warehouse_name: selectedWarehouse || null,
        additional_info: additionalInfo || null,
      };

      // Remove null values from the params object
      Object.keys(params).forEach(
        (key) => params[key] === null && delete params[key]
      );

      const response = await axios.get(`${API_URL}/get_item_inventory`, {
        headers,
        params,
      });
      console.log("The Response", response.data.item_inventory_list);
      if (response.data.item_inventory_list) {
        updateSearchItemInventory(response.data.item_inventory_list);
      } else {
        logger.warn(
          `[${new Date().toLocaleTimeString()}] No data available for Item: ${itemCode}`
        );
        updateSearchItemInventory([]);
        alert("No data available for the Item.");
      }
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching item inventory:`,
        error
      );
      setFoundInventory([]);
      alert("Error fetching item inventory");
    }
  };

  return (
    <div>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          {/* ... (existing JSX) */}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="transactionNumber">Transaction Number:</label>
              </div>
              <input
                type="text"
                id="transactionNumber"
                value={transactionNumber}
                onChange={handleTransactionNumberChange}
                className="form-control input-field"
              />
            </div>
          </div>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="itemCode">Item:</label>
              </div>
              <select
                id="itemCode"
                value={itemCode}
                onChange={handleItemCodeChange}
                className="form-control input-field"
              >
                <option value="">Select an item code</option>
                {itemList.map((item) => (
                  <option key={item.item_id} value={item.item_code}>
                    {item.item_code} - {item.item_name} - {item.item_id}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedBin">Select Bin:</label>
              </div>
              <select
                id="selectedBin"
                value={selectedBin}
                onChange={handleBinChange}
                className="form-control input-field"
              >
                <option value="">Select a bin</option>
                {binList.map((bin) => (
                  <option key={bin.bin_id} value={bin.bin_name}>
                    {bin.bin_name} - {bin.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRack">Select Rack:</label>
              </div>
              <select
                id="selectedRack"
                value={selectedRack}
                onChange={handleRackChange}
                className="form-control input-field"
              >
                <option value="">Select a Rack</option>
                {rackList.map((rack) => (
                  <option key={rack.rack_id} value={rack.rack_name}>
                    {rack.rack_name} - {rack.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRack">Select Row:</label>
              </div>
              <select
                id="selectedRack"
                value={selectedRow}
                onChange={handleRowChange}
                className="form-control input-field"
              >
                <option value="">Select a Row</option>
                {rowList.map((row) => (
                  <option key={row.row_id} value={row.row_name}>
                    {row.row_name} - {row.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRack">Select aisle:</label>
              </div>
              <select
                id="selectedRack"
                value={selectedAisle}
                onChange={handleAisleChange}
                className="form-control input-field"
              >
                <option value="">Select a Aisle</option>
                {aisleList.map((aisle) => (
                  <option key={aisle.aisle_id} value={aisle.aisle_name}>
                    {aisle.aisle_name} - {aisle.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRack">Select Zone:</label>
              </div>
              <select
                id="selectedRack"
                value={selectedZone}
                onChange={handleZoneChange}
                className="form-control input-field"
              >
                <option value="">Select a Zone</option>
                {zoneList.map((zone) => (
                  <option key={zone.zone_id} value={zone.zone_name}>
                    {zone.zone_name} - {zone.description}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="selectedRack">Select Location:</label>
              </div>
              <select
                id="selectedRack"
                value={selectedLocation}
                onChange={handleLocationChange}
                className="form-control input-field"
              >
                <option value="">Select a Location</option>
                {locationList.map((location) => (
                  <option
                    key={location.location_id}
                    value={location.location_name}
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
                <label htmlFor="selectedRack">Select Warehouse:</label>
              </div>
              <select
                id="selectedRack"
                value={selectedWarehouse}
                onChange={handleWarehouseChange}
                className="form-control input-field"
              >
                <option value="">Select a Warehouse</option>
                {warehouseList.map((warehouse) => (
                  <option
                    key={warehouse.warehouse_id}
                    value={warehouse.warehouse_name}
                  >
                    {warehouse.warehouse_name} - {warehouse.description}
                  </option>
                ))}
              </select>
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
                value={additionalInfo}
                onChange={handleAdditionalInfoChange}
                className="form-control input-field"
                readOnly
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button
                onClick={handleFoundInventory}
                className="btn btn-primary"
              >
                Find Inventory
              </button>
            </div>
          </div>

          <table className="table table-striped table-bordered">
            {/* Render table headers here */}
            <tbody>
              {FoundInventory.map((item, index) => (
                <tr key={index} className="table-row">
                  {/* Render table row data here */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default SearchItemInventoryForm;
