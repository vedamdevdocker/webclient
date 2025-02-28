import React, { useState, useEffect } from 'react';
import { API_URL } from "../../../admin/setups/ConstDecl";
import logger from "../../../utilities/Logs/logger";
import axios from 'axios';

const CreateZoneForm = () => {
  const [locations, setLocations] = useState([]);
  const [formData, setFormData] = useState({
    location_id: '',
    zone_name: '',
    description: '',
    capacity: '',
    uom_id: '',  // Add UOM field to form data
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState(null);
  const [uomList, setUomList] = useState([]);  // State to hold UOM list

  // Fetch locations and UOM data when the component is mounted
  useEffect(() => {
    const fetchLocationsAndUom = async () => {
      try {
        const locationsResponse = await axios.get(`${API_URL}/get_locations`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setLocations(locationsResponse.data.location_list);

        // Fetch UOM data (assume this API endpoint returns UOM list)
        const uomResponse = await axios.get(`${API_URL}/list_uoms`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          }
        });
        setUomList(uomResponse.data.uom);  // Populate UOM list
        setLoading(false);
      } catch (err) {
        setError('Failed to load locations or UOMs');
        setLoading(false);
        logger.error('Error fetching locations or UOMs:', err);
      }
    };

    fetchLocationsAndUom();
  }, []); // Only run once when the component mounts

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If capacity is entered, validate it
    if (formData.capacity && (isNaN(formData.capacity) || parseFloat(formData.capacity) <= 0)) {
      setError("Capacity must be a number greater than 0.");
      return; // Don't submit the form if validation fails
    }

    // If valid, type-cast the capacity to a number before sending to the API
    const updatedFormData = {
      ...formData,
      capacity: formData.capacity ? parseFloat(formData.capacity) : ""
    };

    setLoading(true);
    setError(null); // Clear any previous error messages

    try {
      // Send data to the backend API to create the zone
      const response = await axios.post(`${API_URL}/create_zones`, updatedFormData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          UserId: localStorage.getItem("userid"),
        },
      });
      logger.info("Zone created successfully", response.data);
      setSuccessMessage("Zone created successfully.");

      // Reset the form only after a successful submission
      setFormData({
        location_id: "",
        zone_name: "",
        description: "",
        capacity: "",
        uom_id: "",
      });
    } catch (err) {
      logger.error('Error creating zone:', err);
      const errorMessage = err.response?.data?.error || 'Error creating zone';
      setError(errorMessage);  // Display error if API call fails
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Zone</h2>
      <div className="child-container form-container">
        {loading ? (
          <p>Loading locations and UOMs...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="zone_name">Zone Name:</label>
                </div>
                <input
                  type="text"
                  id="zone_name"
                  name="zone_name"
                  value={formData.zone_name}
                  onChange={handleInputChange}
                  className="form-control input-field"
                  required
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
                  onChange={handleInputChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="location_id">Location:</label>
                </div>
                <select
                  id="location_id"
                  name="location_id"
                  value={formData.location_id}
                  onChange={handleInputChange}
                  className="form-control input-field"
                  required
                >
                  <option value="">Select Location</option>
                  {locations.map((location) => (
                    <option key={location.location_id} value={location.location_id}>
                      {location.location_name}
                    </option>
                  ))}
                </select>
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
                  onChange={handleInputChange}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="uom_id">Unit of Measure:</label>
                </div>
                <select
                  id="uom_id"
                  name="uom_id"
                  value={formData.uom_id}
                  onChange={handleInputChange}
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
              <button type="submit" className="btn btn-primary">
                Create Zone
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default CreateZoneForm;
