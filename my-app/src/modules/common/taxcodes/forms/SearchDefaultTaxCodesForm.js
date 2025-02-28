import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";
import { API_URL } from "../../../admin/setups/ConstDecl"; // Adjust this import based on your project structure

function SearchDefaultTaxCodesForm() {
  const [headerList, setHeaderList] = useState([]);
  const [selectedHeaderId, setSelectedHeaderId] = useState("");
  const navigate = useNavigate();

  // Fetch tax headers from API
  const fetchHeaders = useCallback(async () => {
    try {
      const response = await axios.get(
        `${API_URL}/get_default_tax_headers`,
        {
          headers: generateHeaders(),
        }
      );
      setHeaderList(response.data.default_tax_headers);
    } catch (error) {
      console.error("Error fetching tax headers:", error);
      logger.error("Error fetching tax headers:", error);
    }
  }, []);

  // Fetch headers when the component loads
  useEffect(() => {
    fetchHeaders();
  }, [fetchHeaders]);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleHeaderIdChange = (e) => {
    const selectedHeaderId = parseInt(e.target.value.trim(), 10);
    setSelectedHeaderId(selectedHeaderId);
  };

  const handleButtonClick = () => {
    try {
      let requestUrl = selectedHeaderId ? `header_id=${selectedHeaderId}` : "";
      console.log("Parameter to be sent in requestUrl", requestUrl);
      navigate(`/get-default-tax-codes/${requestUrl}`);
    } catch (error) {
      logger.error("Error navigating to tax codes:", error);
      alert("Error navigating to tax codes");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Search Company Default Tax Codes</h2>
      <div className="child-container form-container">
        {/* Header ID Select */}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="headerId">Tax Header:</label>
            </div>
            <select
              id="headerId"
              onChange={handleHeaderIdChange}
              className="form-control input-field"
            >
              <option value="">Select a Tax Header</option>
              {headerList.map((header) => (
                <option key={header.header_id} value={header.header_id}>
                  {header.description}
                </option>
              ))}
            </select>
          </div>
        </div>
        {/* End of Header ID Select */}

        {/* Search Button */}
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <button
              type="button"
              onClick={handleButtonClick}
              className="btn btn-primary"
            >
              Search
            </button>
          </div>
        </div>
        {/* End of Search Button */}
      </div>
    </div>
  );
}

export default SearchDefaultTaxCodesForm;
