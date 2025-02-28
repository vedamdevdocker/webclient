import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

export default function CreateUOMForm() {
  const [formData, setFormData] = useState({
    uom_name: "",
    abbreviation: "",
    conversion_factor: "", // Default value is an empty string initially
    base_unit: "", // Will hold the selected uom_id
  });

  const [uoms, setUoms] = useState([]);
  const [loadingUoms, setLoadingUoms] = useState(true);
  const [isBaseUnit, setIsBaseUnit] = useState(false); // Checkbox state
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_CREATE_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");
    return {
      Authorization: `Bearer ${token}`,
      UserId: userid,
    };
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleUomChange = (e) => {
    const selectedUomId = parseInt(e.target.value, 10);
    setFormData((prevFormData) => ({
      ...prevFormData,
      base_unit: isNaN(selectedUomId) ? "" : selectedUomId,
    }));
  };

  const handleBaseUnitChange = (e) => {
    const isChecked = e.target.checked;
    setIsBaseUnit(isChecked);

    if (isChecked) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        conversion_factor: "1", // Set conversion_factor to 1 when base unit is selected
        base_unit: "", // Clear base_unit if checkbox is selected
      }));
    } else {
      setFormData((prevFormData) => ({
        ...prevFormData,
        conversion_factor: "", // Clear conversion_factor when checkbox is unchecked
        base_unit: "", // Clear base unit
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Validation: Check if conversion_factor is required and base_unit is selected
    if (!isBaseUnit) {
      if (!formData.conversion_factor) {
        setError("Conversion Factor is required if Base Unit is not selected.");
        setLoading(false);
        return;
      }

      const conversionFactorValue = parseFloat(formData.conversion_factor);
      if (conversionFactorValue <= 1) {
        setError("Conversion Factor must be greater than 1 if Base Unit is not selected.");
        setLoading(false);
        return;
      }

      if (!formData.base_unit) {
        setError("You must select a Base Unit if the Base Unit checkbox is not selected.");
        setLoading(false);
        return;
      }
    }

    // Prepare data to send
    const dataToSend = {
      ...formData,
      decimal_places: "0", // Set decimal_places to 0
    };

    if (isBaseUnit) {
      delete dataToSend.base_unit; // Exclude base_unit if base unit checkbox is selected
    }

    try {
      const response = await axios.post(
        `${API_URL}/create_uom`,
        dataToSend,
        { headers: generateHeaders() }
      );

      logger.info(
        `[${new Date().toLocaleTimeString()}] UOM created successfully`,
        response.data
      );
      setSuccessMessage("UOM created successfully");
      setFormData({
        uom_name: "",
        abbreviation: "",
        conversion_factor: "", // Reset to default when form is cleared
        base_unit: "",
      });
      setIsBaseUnit(false); // Reset checkbox
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error creating UOM`,
        error
      );
      setError("An error occurred while creating the UOM. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchUoms = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUoms(response.data.uom);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching UOMs:`,
          error
        );
      } finally {
        setLoadingUoms(false);
      }
    };

    fetchUoms();
  }, []);

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create UOM</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="uom_name">UOM Name:</label>
                </div>
                <input
                  type="text"
                  id="uom_name"
                  name="uom_name"
                  value={formData.uom_name}
                  onChange={handleChange}
                  className="form-control input-field"
                />
                <input
                  type="checkbox"
                  id="isBaseUnit"
                  name="isBaseUnit"
                  checked={isBaseUnit}
                  onChange={handleBaseUnitChange}
                  className="ml-2"
                />
                <label htmlFor="isBaseUnit" className="ml-2">
                  Base Unit
                </label>
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="abbreviation">Abbreviation:</label>
                </div>
                <input
                  type="text"
                  id="abbreviation"
                  name="abbreviation"
                  value={formData.abbreviation}
                  onChange={handleChange}
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="conversion_factor">Conversion Factor:</label>
                </div>
                <input
                  type="text"
                  id="conversion_factor"
                  name="conversion_factor"
                  value={formData.conversion_factor}
                  onChange={handleChange}
                  disabled={isBaseUnit} // Disable if Base Unit is selected
                  className="form-control input-field"
                />
              </div>
            </div>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="base_unit">Base Unit:</label>
                </div>
                <select
                  id="base_unit"
                  name="base_unit"
                  value={formData.base_unit}
                  onChange={handleUomChange}
                  disabled={isBaseUnit} // Disable if Base Unit is selected
                  className="form-control input-field"
                >
                  <option value="">Select Base Unit</option>
                  {loadingUoms ? (
                    <option value="" disabled>
                      Loading UOMs...
                    </option>
                  ) : (
                    uoms.map((uom) => (
                      <option key={uom.uom_id} value={uom.uom_id}>
                        {uom.uom_name}
                      </option>
                    ))
                  )}
                </select>
              </div>
            </div>

            {loading && <div className="loading-indicator">Creating...</div>}
            {error && <div className="error-message">{error}</div>}
            {successMessage && (
              <div className="success-message">{successMessage}</div>
            )}
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Create UOM
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div>You do not have permission to view this module</div>
        )}
      </div>
    </div>
  );
}
