import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  BACKEND_INVENTORY_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import "../../../utilities/css/appcss.css";
import logger from "../../../utilities/Logs/logger";

function FindPOToUpdateForm() {
  const [purchaseOrderNumber, setPurchaseOrderNumber] = useState("");
  const [requestForQuotationId, setRequestForQuotationId] = useState("");
  const navigate = useNavigate();

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  const handlePurchaseOrderNumberChange = (e) => {
    setPurchaseOrderNumber(e.target.value);
  };

  const handleRequestForQuotationIdChange = (e) => {
    setRequestForQuotationId(e.target.value);
  };

  const handleButtonClick = async () => {
    try {
      const requestUrl = [
        purchaseOrderNumber && `po_num=${purchaseOrderNumber}`,
        requestForQuotationId && `rfq_header_id=${requestForQuotationId}`
      ].filter(Boolean).join("&");

      navigate(`/update-purchase-order-headers/${requestUrl}`);
    } catch (error) {
      logger.error("Error updating Purchase Order headers:", error);
      alert("Error updating Purchase Order headers");
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Find Purchase Order</h2>
      {hasRequiredAccess ? (
        <div className="child-container form-container">
          
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="po_num">Purchase Order No</label>
              </div>
              <input
                type="text"
                id="po_num"
                value={purchaseOrderNumber}
                onChange={handlePurchaseOrderNumberChange}
                className="form-control input-field"
              />
            </div>
          </div>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="rfq_header_id">Request for Quotation ID</label>
              </div>
              <input
                type="text"
                id="rfq_header_id"
                value={requestForQuotationId}
                onChange={handleRequestForQuotationIdChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button onClick={handleButtonClick} className="btn btn-primary">
                Update Purchase Order
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

export default FindPOToUpdateForm;
