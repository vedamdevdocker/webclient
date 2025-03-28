import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl"; // Update API URL accordingly
import logger from "../../../utilities/Logs/logger";

export default function CreateRacksForm() {
  const [formData, setFormData] = useState({
    row_id: "",  // Added row_id for row selection
    rack_name: "",
    description: "",
    capacity: "",
    uom_id: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [rowList, setRowList] = useState([]);  // State to hold row list
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

  // Fetch Rows from the API
  useEffect(() => {
    const fetchRows = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_invrows`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRowList(response.data.invrows_list || []);
      } catch (error) {
        logger.error("Error fetching rows", error);
        setError("Failed to load rows.");
      }
    };

    fetchRows();
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
        `${API_URL}/create_rack`, // Assuming your endpoint is this
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            UserId: localStorage.getItem("userid"),
          },
        }
      );
      logger.info("Rack created successfully", response.data);
      setSuccessMessage("Rack created successfully.");
      setFormData({
        row_id: "",
        rack_name: "",
        description: "",
        capacity: "",
        uom_id: "",
      });
    } catch (error) {
      logger.error("Error creating rack", error);
      setError("An error occurred while creating the rack. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Rack</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Row Name (LOV) */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="row_id">Row Name:</label>
              </div>
              <select
                id="row_id"
                name="row_id"
                value={formData.row_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Row</option>
                {rowList.map((row) => (
                  <option key={row.row_id} value={row.row_id}>
                    {row.row_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Rack Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="rack_name">Rack Name:</label>
              </div>
              <input
                type="text"
                id="rack_name"
                name="rack_name"
                value={formData.rack_name}
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
                Create Rack
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
