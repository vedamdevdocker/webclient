import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess"; // Import your permission checker

// Import your logger utility here
import logger from "../../../utilities/Logs/logger";

function PartnerSearchForm() {
  const [searchType, setSearchType] = useState("partnerid");
  const [searchInput, setSearchInput] = useState("");
  const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  const handleSearch = (e) => {
    e.preventDefault();

    const searchPath = searchInput
      ? `/partner-results/${searchType}/${searchInput}`
      : "/partner-results";

    if (!hasRequiredAccess) {
      alert("You do not have permission to perform this action.");
      logger.warn(`[${new Date().toLocaleTimeString()}] Permission denied: User does not have access to perform the search. (hasRequiredAccess: ${hasRequiredAccess})`);
      return;
    }

    navigate(searchPath);
    logger.info(`[${new Date().toLocaleTimeString()}] Search initiated with searchType: ${searchType}, searchInput: ${searchInput}, hasRequiredAccess: ${hasRequiredAccess}`);
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Partner Search</h2>
      <div className="child-container form-container">
        {hasRequiredAccess ? (
          <form onSubmit={handleSearch}>
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="searchType">Search By:</label>
                </div>
                <select
                  id="searchType"
                  value={searchType}
                  onChange={(e) => setSearchType(e.target.value)}
                  className="form-control input-field"
                >
                  <option value="partnerid">Partner ID</option>
                  <option value="partnername">Partner Name</option>
                </select>
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label htmlFor="searchInput">Search Input:</label>
                </div>
                <input
                  type="text"
                  id="searchInput"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="form-control input-field"
                />
              </div>
            </div>

            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <button type="submit" className="btn btn-primary">
                  Search
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

export default PartnerSearchForm;
