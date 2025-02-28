import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

export default function CreateAislesForm() {
  const [formData, setFormData] = useState({
    aisle_name: "",
    description: "",
    capacity: "",
    uom_id: "",  // Add uom_id to the form data
    zone_id: "",  // Add zone_id to the form data
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [uomList, setUomList] = useState([]);  // State to hold UOM list
  const [zones, setZones] = useState([]);  // State to hold zones list

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

  // Fetch Zones from the API (assuming you have an endpoint for zones)
  useEffect(() => {
    const fetchZones = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_zones`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setZones(response.data.zone_list || []);
      } catch (error) {
        logger.error("Error fetching zones", error);
        setError("Failed to load zones.");
      }
    };

    fetchZones();
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
        `${API_URL}/create_aisle`, // Change endpoint to create_aisle
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            UserId: localStorage.getItem("userid"),
          },
        }
      );
      logger.info("Aisle created successfully", response.data);
      setSuccessMessage("Aisle created successfully.");
      setFormData({
        aisle_name: "",
        description: "",
        capacity: "",
        uom_id: "", // Reset UOM field
        zone_id: "", // Reset zone_id
      });
    } catch (error) {
      logger.error("Error creating aisle", error);
      setError("An error occurred while creating the aisle. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Aisle</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Aisle Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="aisle_name">Aisle Name:</label>
              </div>
              <input
                type="text"
                id="aisle_name"
                name="aisle_name"
                value={formData.aisle_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          {/* Zone ID */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="zone_id">Zone:</label>
              </div>
              <select
                id="zone_id"
                name="zone_id"
                value={formData.zone_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Zone</option>
                {zones.map((zone) => (
                  <option key={zone.zone_id} value={zone.zone_id}>
                    {zone.zone_name}
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

          {/* Submit */}
          {loading && <div className="loading-indicator">Creating...</div>}
          {error && <div className="error-message">{error}</div>}
          {successMessage && <div className="success-message">{successMessage}</div>}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Aisle
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
