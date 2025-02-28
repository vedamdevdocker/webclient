import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

// Import LOVs from config.js
import { WH_TEMPRATURE_CONTROL, WH_SECURITY_STATUS, LOC_LOCATION_TYPES } from "../config/config"; // Adjust the path accordingly

export default function CreateLocationsForm() {
  const [formData, setFormData] = useState({
    location_name: "",
    location_type: "",
    description: "",
    capacity: "",
    uom_id: "",  // Add uom_id to the form data
    temperature_controlled: "",
    security_level: "",
    warehouse_id: "", // Assuming warehouse_id is needed
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [uomList, setUomList] = useState([]);  // State to hold UOM list
  const [warehouses, setWarehouses] = useState([]);  // State to hold warehouses list

  // Fetch UOMs from the API
  useEffect(() => {
    const fetchUoms = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUomList(response.data.uom);
      } catch (error) {
        logger.error("Error fetching UOMs", error);
        setError("Failed to load unit of measure options.");
      }
    };

    fetchUoms();
  }, []);

  // Fetch warehouses from the API
  useEffect(() => {
    const fetchWarehouses = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_warehouses`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setWarehouses(response.data.warehouse_list || []);
      } catch (error) {
        logger.error("Error fetching warehouses", error);
        setError("Failed to load warehouses.");
      }
    };

    fetchWarehouses();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If capacity is entered, validate it
    if (formData.capacity && (isNaN(formData.capacity) || parseFloat(formData.capacity) <= 0)) {
      setError("Capacity must be a number greater than 0.");
      return; // Don't submit the form if validation fails
    }

    // If valid, type-cast the capacity to a number before sending to the API
    const updatedFormData = { ...formData, capacity: formData.capacity ? parseFloat(formData.capacity) : "" };

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/create_locations`, // Assuming your endpoint is this
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            UserId: localStorage.getItem("userid"),
          },
        }
      );
      logger.info("Location created successfully", response.data);
      setSuccessMessage("Location created successfully.");
      setFormData({
        location_name: "",
        location_type: "",
        description: "",
        capacity: "",
        uom_id: "", // Reset UOM field
        temperature_controlled: "",
        security_level: "",
        warehouse_id: "", // Reset warehouse_id
      });
    } catch (error) {
      logger.error("Error creating location", error);
      setError("An error occurred while creating the location. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Location</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Location Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="location_name">Location Name:</label>
              </div>
              <input
                type="text"
                id="location_name"
                name="location_name"
                value={formData.location_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Location Type */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="location_type">Location Type:</label>
              </div>
              <select
                id="location_type"
                name="location_type"
                value={formData.location_type}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Location Type</option>
                {LOC_LOCATION_TYPES.map((loc) => (
                  <option key={loc.short_name} value={loc.short_name}>
                    {loc.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Warehouse ID */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="warehouse_id">Warehouse:</label>
              </div>
              <select
                id="warehouse_id"
                name="warehouse_id"
                value={formData.warehouse_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Warehouse</option>
                {warehouses.map((warehouse) => (
                  <option key={warehouse.warehouse_id} value={warehouse.warehouse_id}>
                    {warehouse.warehouse_name}
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

          {/* Capacity */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="capacity">Capacity:</label>
              </div>
              <input
                type="text"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* UOM Field */}
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
                {uomList.map((uom) => (
                  <option key={uom.uom_id} value={uom.uom_id}>
                    {uom.uom_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Temperature Controlled */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="temperature_controlled">Temperature Controlled:</label>
              </div>
              <select
                id="temperature_controlled"
                name="temperature_controlled"
                value={formData.temperature_controlled}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select</option>
                {WH_TEMPRATURE_CONTROL.map((temp, index) => (
                  <option key={index} value={temp.short_name}>
                    {temp.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Security Level */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="security_level">Security Level:</label>
              </div>
              <select
                id="security_level"
                name="security_level"
                value={formData.security_level}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select</option>
                {WH_SECURITY_STATUS.map((sec, index) => (
                  <option key={index} value={sec.short_name}>
                    {sec.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Submit */}
          {loading && <div className="loading-indicator">Creating...</div>}
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Location
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
