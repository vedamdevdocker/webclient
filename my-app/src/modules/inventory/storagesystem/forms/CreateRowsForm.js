import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

export default function CreateRowsForm() {
  const [formData, setFormData] = useState({
    aisle_id: "",  // Added aisle_id field for aisle selection
    row_name: "",
    description: "",
    capacity: "",
    uom_id: "", // Add uom_id to the form data
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [aisleList, setAisleList] = useState([]);  // State to hold aisle list
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
        setUomList(response.data.uom);
      } catch (error) {
        logger.error("Error fetching UOMs", error);
        setError("Failed to load unit of measure options.");
      }
    };

    fetchUoms();
  }, []);

  // Fetch Aisles from the API
  useEffect(() => {
    const fetchAisles = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_aisles`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setAisleList(response.data.aisle_list || []);
      } catch (error) {
        logger.error("Error fetching aisles", error);
        setError("Failed to load aisles.");
      }
    };

    fetchAisles();
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
        `${API_URL}/create_invrow`, // Assuming your endpoint is this
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            UserId: localStorage.getItem("userid"),
          },
        }
      );
      logger.info("Inventory row created successfully", response.data);
      setSuccessMessage("Inventory row created successfully.");
      setFormData({
        aisle_id: "",
        row_name: "",
        description: "",
        capacity: "",
        uom_id: "",
      });
    } catch (error) {
      logger.error("Error creating inventory row", error);
      setError("An error occurred while creating the inventory row. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Inventory Row</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Aisle Name (LOV) */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="aisle_id">Aisle Name:</label>
              </div>
              <select
                id="aisle_id"
                name="aisle_id"
                value={formData.aisle_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Aisle</option>
                {aisleList.map((aisle) => (
                  <option key={aisle.aisle_id} value={aisle.aisle_id}>
                    {aisle.aisle_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Row Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="row_name">Row Name:</label>
              </div>
              <input
                type="text"
                id="row_name"
                name="row_name"
                value={formData.row_name}
                onChange={handleChange}
                className="form-control input-field"
              />
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
                Create Inventory Row
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
