import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

function FindJounralToUpdateForm() {
  const [journalNumber, setJournalNumber] = useState("");
  const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  const handleJournalNumberChange = (e) => {
    setJournalNumber(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const requestUrl = [
        journalNumber && `journal_number=${journalNumber}`
      ].filter(Boolean).join("&");

      navigate(`/update-journal-header/${requestUrl}`);
    } catch (error) {
      logger.error("Error updating Journal :", error);
      alert("Error updating Journal");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Find Journal</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="journal_number">Journal Number</label>
              </div>
              <input
                type="text"
                id="journal_number"
                value={journalNumber}
                onChange={handleJournalNumberChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button onClick={handleButtonClick} className="btn btn-primary">
                Update Journal
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

export default FindJounralToUpdateForm;
