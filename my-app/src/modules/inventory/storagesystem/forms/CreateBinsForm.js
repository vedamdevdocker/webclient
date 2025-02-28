import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";

export default function CreateBinsForm() {
  const [formData, setFormData] = useState({
    rack_id: "",       // The selected rack_id
    bin_name: "",      // Name of the bin
    description: "",   // Bin description
    capacity: "",      // Bin capacity
    uom_id: "",        // Selected UOM
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [racks, setRacks] = useState([]);  // State to hold rack list
  const [uomList, setUomList] = useState([]); // State to hold UOM list

  // Fetch racks from the API
  useEffect(() => {
    const fetchRacks = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_racks`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setRacks(response.data.rack_list || []);
      } catch (error) {
        logger.error("Error fetching racks", error);
        setError("Failed to load rack data.");
      }
    };

    fetchRacks();
  }, []);

  // Fetch UOMs from the API
  useEffect(() => {
    const fetchUoms = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setUomList(response.data.uom || []); // Assuming the API returns uom field
      } catch (error) {
        logger.error("Error fetching UOMs", error);
        setError("Failed to load UOM data.");
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
        `${API_URL}/create_bin`, // Assuming your endpoint is this
        updatedFormData,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
            UserId: localStorage.getItem("userid"),
          },
        }
      );
      logger.info("Bin created successfully", response.data);
      setSuccessMessage("Bin created successfully.");
      setFormData({
        rack_id: "",
        bin_name: "",
        description: "",
        capacity: "",
        uom_id: "", // Reset UOM field
      });
    } catch (error) {
      logger.error("Error creating bin", error);
      setError("An error occurred while creating the bin. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Bin</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Rack Name (LOV Field) */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="rack_id">Rack Name:</label>
              </div>
              <select
                id="rack_id"
                name="rack_id"
                value={formData.rack_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select Rack</option>
                {racks.map((rack) => (
                  <option key={rack.rack_id} value={rack.rack_id}>
                    {rack.rack_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bin Name */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="bin_name">Bin Name:</label>
              </div>
              <input
                type="text"
                id="bin_name"
                name="bin_name"
                value={formData.bin_name}
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

          {/* UOM Field (LOV) */}
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
                Create Bin
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
