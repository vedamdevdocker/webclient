import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

// Import LOVs from config.js
import { WH_TEMPRATURE_CONTROL, WH_SECURITY_STATUS } from "../config/config"; // Update the path accordingly

export default function CreateWarehouseForm() {
  const [formData, setFormData] = useState({
    warehouse_name: "",
    description: "",
    address_line1: "",
    address_line2: "",
    city: "",
    state: "",
    postal_code: "",
    country: "",
    capacity: "",
    uom_id: "",  // Add uom_id to the form data
    temperature_controlled: "",
    security_level: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [uomList, setUomList] = useState([]);  // State to hold UOM list

  // Fetch UOMs from the API
  useEffect(() => {
    const fetchUoms = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUomList(response.data.uom);  // Update state with UOM data
      } catch (error) {
        logger.error("Error fetching UOMs", error);
        setError("Failed to load unit of measure options.");
      }
    };

    fetchUoms();
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
        `${API_URL}/create_warehouse`,
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            UserId: localStorage.getItem("userid"),
          },
        }
      );
      logger.info("Warehouse created successfully", response.data);
      setSuccessMessage("Warehouse created successfully.");
      setFormData({
        warehouse_name: "",
        description: "",
        address_line1: "",
        address_line2: "",
        city: "",
        state: "",
        postal_code: "",
        country: "",
        capacity: "",
        uom_id: "", // Reset UOM field
        temperature_controlled: "",
        security_level: "",
      });
    } catch (error) {
      logger.error("Error creating warehouse", error);
      setError("An error occurred while creating the warehouse. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Warehouse</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="warehouse_name">Warehouse Name:</label>
              </div>
              <input
                type="text"
                id="warehouse_name"
                name="warehouse_name"
                value={formData.warehouse_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

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

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="address_line1">Address Line 1:</label>
              </div>
              <input
                type="text"
                id="address_line1"
                name="address_line1"
                value={formData.address_line1}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="address_line2">Address Line 2:</label>
              </div>
              <input
                type="text"
                id="address_line2"
                name="address_line2"
                value={formData.address_line2}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="city">City:</label>
              </div>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="state">State:</label>
              </div>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="postal_code">Postal Code:</label>
              </div>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="country">Country:</label>
              </div>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

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


          {/* New UOM Field */}
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

          {loading && <div className="loading-indicator">Creating...</div>}
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Warehouse
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
