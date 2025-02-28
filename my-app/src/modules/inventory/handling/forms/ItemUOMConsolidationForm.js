import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import { UOM_CONVERSION_TYPES } from "../../config/config"; // Update the path to your config file
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

export default function ItemUOMConsolidationForm() {
  const [formData, setFormData] = useState({
    input_item_id: "",
    input_transaction_id: "", // Removed LOV, now just a form field
    input_source_uom_id: "",
    input_transaction_type: "",
    input_target_uom_id: "",
    input_warehouse_id: "",
    input_location_id: "",
    input_zone_id: "",
    input_aisle_id: "",
    input_row_id: "",
    input_rack_id: "",
    input_bin_id: "",
  });

  const [items, setItems] = useState([]);
  const [uoms, setUoms] = useState([]);
  const [targetUoms, setTargetUoms] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [binList, setBinList] = useState([]); // Add this line
  const [rackList, setRackList] = useState([]);
  const [rowList, setRowList] = useState([]);
  const [aisleList, setAisleList] = useState([]);
  const [zoneList, setZoneList] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [warehouseList, setWarehouseList] = useState([]);
  const [selectedBin, setSelectedBin] = useState(null);
  const [selectedRack, setSelectedRack] = useState("");
  const [selectedRow, setSelectedRow] = useState("");
  const [selectedAisle, setSelectedAisle] = useState("");
  const [selectedZone, setSelectedZone] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("");
  const [selectedWarehouse, setSelectedWarehouse] = useState("");

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
      // setUoms(uomsResponse.data.uom);

      // Fetch target UOMs
      setTargetUoms(uomsResponse.data.uom);
    } catch (error) {
      logger.error(`Error fetching data:`, error);
    }
  };

  useEffect(() => {
    fetchData();
    fetchBins(); // Fetch bins when the component mounts
    fetchRacks(); // Fetch racks when the component mounts
    fetchRows(); // Fetch racks when the component mounts
    fetchAisles(); // Fetch racks when the component mounts
    fetchZones(); // Fetch racks when the component mounts
    fetchLocations(); // Fetch racks when the component mounts
    fetchWarehouses(); // Fetch racks when the component mounts
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

    const intValue = [
      "input_item_id",
      "input_source_uom_id",
      "input_target_uom_id",
      "input_warehouse_id",
      "input_location_id",
      "input_zone_id",
      "input_aisle_id",
      "input_row_id",
      "input_rack_id",
      "input_bin_id",
    ];
    const updatedValue = intValue.includes(name) ? parseInt(value, 10) : value;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: updatedValue,
    }));

    if (name === "input_item_id") {
      try {
        // Fetch item details based on the selected item_id
        const itemResponse = await axios.get(
          `${API_URL}/get_item_inventory?item_id=${value}`,
          {
            headers: generateHeaders(),
          }
        );

        // Extract and filter unique UOMs from the response
        const uniqueUOMs = Array.from(
          new Map(
            itemResponse.data.item_inventory_list.map((item) => [
              `${item.uom_abbreviation}-${item.uom_name}`,
              {
                uom_id: item.uom_id,
                uom_abbreviation: `${item.uom_abbreviation} (${item.uom_name})`,
              },
            ])
          ).values()
        );

        // Set source UOMs based on the unique UOMs array
        setUoms(uniqueUOMs);
      } catch (error) {
        logger.error(`Error fetching item details:`, error);
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
    // ... (existing code)
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
      const formDataWithIntIds = {
        ...formData,
        input_item_id: parseInt(formData.input_item_id, 10),
        input_source_uom_id: parseInt(formData.input_source_uom_id, 10),
        input_target_uom_id: parseInt(formData.input_target_uom_id, 10),
        input_bin_id: parseInt(selectedBin,10) || null,
        input_rack_id: parseInt(selectedRack, 10) || null,
        input_row_id: parseInt(selectedRow, 10) || null,
        input_aisle_id: parseInt(selectedAisle, 10) || null,
        input_zone_id: parseInt(selectedZone, 10) || null,
        input_location_id: parseInt(selectedLocation, 10) || null,
        input_warehouse_id: parseInt(selectedWarehouse, 10) || null,
      };

      // Set the dynamic transaction_id based on date and time
      const uniqueTransactionId = Math.floor(Math.random() * 10000000);
      formDataWithIntIds.input_transaction_id = uniqueTransactionId;
      
      console.log(formDataWithIntIds);

      if (
        formData.input_bin_id === null &&
        formData.input_rack_id === null &&
        formData.input_row_id === null &&
        formData.input_aisle_id === null &&
        formData.input_zone_id === null &&
        formData.input_location_id === null &&
        formData.input_warehouse_id === null
      ) {
        setErrorMessage("At least one field must have a value.");
        return;
      }

      const response = await axios.post(
        `${API_URL}/bulk_pack_or_unpack`,
        formDataWithIntIds,
        {
          headers: generateHeaders(),
        }
      );

      console.log(response.data);
      setSuccessMessage(response.data);
      setErrorMessage("");

      resetForm();
      fetchData();
    } catch (error) {
      console.error("Error calling bulk_pack_or_unpack API:", error);

      if (error.response && error.response.data) {
        setErrorMessage(error.response.data);
      } else {
        setErrorMessage(
          `Error calling bulk_pack_or_unpack API: ${error.message}`
        );
      }

      setSuccessMessage("");
    }
  };

  const resetForm = () => {
    setFormData({
      input_item_id: "",
      input_transaction_id: "",
      input_source_uom_id: "",
      input_transaction_type: "",
      input_target_uom_id: "",
      input_warehouse_id: "",
      input_location_id: "",
      input_zone_id: "",
      input_aisle_id: "",
      input_row_id: "",
      input_rack_id: "",
      input_bin_id: "",
    });

    setUoms([]);
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
  const handleWarehouseChange = (event) => {
    setSelectedWarehouse(event.target.value);
  };
  const handleBinChange = (event) => {
    setSelectedBin(event.target.value);
  };
  return (
    <div className="child-container menu-container">
      <h2 className="title">Inventory Item UOM Conversion</h2>
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
                  onChange={handleChange}
                  className="form-control input-field"
                >
                  <option key="" value="">
                    Select Transaction Type
                  </option>
                  {UOM_CONVERSION_TYPES.map((type, index) => (
                    <option key={index} value={type.name}>
                      {type.name}
                    </option>
                  ))}
                </select>
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
                      {uom.uom_abbreviation}
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
                <label htmlFor="selectedLocation">Location :</label>
              </div>
              <select
                id="selectedLocation"
                value={selectedLocation}
                onChange={handleLocationChange}
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
