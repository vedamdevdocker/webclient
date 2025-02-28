import React, { useState, useEffect } from "react";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_CREATE_ACCESS,
} from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

export default function CreateGroupCompanyForm() {
  const [formData, setFormData] = useState({
    legal_entity_id: "",
    name: "",
    description: "",
  });

  const [legalEntities, setLegalEntities] = useState([]);
  const [loadingLegalEntities, setLoadingLegalEntities] = useState(true);

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

  const handleLegalEntityChange = (e) => {
    const selectedLegalEntity = legalEntities.find(
      (entity) => entity.id === parseInt(e.target.value, 10)
    );
  
    if (selectedLegalEntity) {
      setFormData((prevFormData) => ({
        ...prevFormData,
        legal_entity_id: selectedLegalEntity.id,
      }));
    }
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        `${API_URL}/create_group_company`,
        formData,
        { headers: generateHeaders() }
      );

      logger.info(
        `[${new Date().toLocaleTimeString()}] Group company created successfully`,
        response.data
      );
      setSuccessMessage("Group company created successfully");
      setFormData({
        legal_entity_id: "",
        name: "",
        description: "",
      });
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error creating group company`,
        error
      );
      setError(
        "An error occurred while creating the group company. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchLegalEntities = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_legal_entity`, {
          headers: generateHeaders(),
        });
        setLegalEntities(response.data.legal_entity_list);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching legal entities:`,
          error
        );
      } finally {
        setLoadingLegalEntities(false);
      }
    };

    fetchLegalEntities();
  }, []);

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Group Company</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSubmit}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="name">Group Company Name:</label>
                </div>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
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
                  <label htmlFor="legal_entity">Legal Entity:</label>
                </div>
                <select
                  id="legal_entity"
                  name="legal_entity"
                  value={formData.legal_entity_id}
                  onChange={handleLegalEntityChange}
                  className="form-control input-field"
                >
                  <option value="" disabled>
                    Select Legal Entity
                  </option>
                  {loadingLegalEntities ? (
                    <option value="" disabled>
                      Loading Legal Entities...
                    </option>
                  ) : (
                    legalEntities.map((entity) => (
                      <option key={entity.id} value={entity.id}>
                        {entity.name}
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
                  Create Group Company
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
