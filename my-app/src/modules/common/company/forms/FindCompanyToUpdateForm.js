import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import logger from "../../../utilities/Logs/logger";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import "../../../utilities/css/appcss.css";

function FindCompanyToUpdateForm() {
  const [companyId, setCompanyId] = useState(""); // This will hold the selected company ID
  const [companies, setCompanies] = useState([]); // To store fetched companies
  const [error, setError] = useState(""); // To handle errors
  const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  // Fetch companies from API
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_companies`, {
          headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`,
            "UserId": localStorage.getItem("userid")
          }
        });
        setCompanies(response.data.company_list);
      } catch (error) {
        console.error("Error fetching companies", error);
        setError("Failed to load companies.");
      }
    };

    fetchCompanies();
  }, []);

  const handleCompanyChange = (e) => {
    setCompanyId(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      if (!companyId) {
        setError("Please select a company.");
        return;
      }

      // Navigate to the update form with companyId in hidden state
      navigate(`/update-company`, {
        state: { companyId }, // Send companyId as hidden state
      });
    } catch (error) {
      logger.error("Error navigating to company update form:", error);
      alert("Error navigating to update company form.");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Find Company</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">

          {/* Company LOV */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="company_id">Select Company</label>
              </div>
              <select
                id="company_id"
                value={companyId}
                onChange={handleCompanyChange}
                className="form-control input-field"
              >
                <option value="">--Select Company--</option>
                {companies.map((company) => (
                  <option key={company.company_id} value={company.company_id}>
                    {company.company_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Error message */}
          {error && <div className="error-message">{error}</div>}

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button onClick={handleButtonClick} className="btn btn-primary">
                Update Company
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default FindCompanyToUpdateForm;
