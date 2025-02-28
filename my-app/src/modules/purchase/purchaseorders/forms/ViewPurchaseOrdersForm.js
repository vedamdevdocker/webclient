import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";  // Import useLocation
import { API_URL, MODULE_LEVEL_VIEW_ACCESS, BACKEND_PURCHASE_MODULE_NAME } from "../../../admin/setups/ConstDecl";
import { Modal, Button } from "react-bootstrap";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    'Authorization': `Bearer ${token}`,
    'UserId': userId,
  };
};

function ViewPurchaseOrdersForm() {
  const [purchaseOrdersList, setPurchaseOrdersList] = useState([]);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [purchaseOrderLines, setPurchaseOrderLines] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [noLinesData, setNoLinesData] = useState(false);
  const [currencySymbol, setCurrencySymbol] = useState(false);
  const [modalSize, setModalSize] = useState("lg");

  const location = useLocation();  // Get the current location

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_PURCHASE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  function formatDate(dateString) {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
    const formattedDate = new Date(dateString).toLocaleDateString(undefined, options);
    return formattedDate;
  }

  useEffect(() => {
    if (!hasRequiredAccess) {
      return;
    }
  
    try {
      let apiUrl = `${API_URL}/get_purchase_order_headers`;
  
      // Extract search parameters from the URL
      const queryParams = new URLSearchParams(location.search);
      console.log(queryParams.get('param_header_id'), queryParams.get('param_po_num'));
  
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_header_id');
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_po_num');
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_tax_id');
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_currency_id');
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_supplier_id');
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_department_id');
      apiUrl = addQueryParam(apiUrl, queryParams, 'param_company_id');
  
      console.log("URL", apiUrl);
  
      const fetchData = async () => {
        try {
          const response = await axios.get(apiUrl, {
            headers: generateHeaders(),
          });
          setPurchaseOrdersList(response.data || []);
        } catch (error) {
          logger.error(`[${new Date().toLocaleTimeString()}] Error fetching purchase orders:`, error);
        }
      };
  
      fetchData();
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching purchase orders:`, error);
    }
  }, [hasRequiredAccess, location.search]);

const addQueryParam = (apiUrl, queryParams, paramName) => {
  const paramValue = queryParams.get(paramName);
  if (paramValue) {
    // Remove the "param_" prefix
    const trimmedParamName = paramName.replace(/^param_/, '');
    apiUrl += apiUrl.includes('?') ? `&${trimmedParamName}=${paramValue}` : `?${trimmedParamName}=${paramValue}`;
  }
  return apiUrl;
};
    
  
  

  const handleOrderSelection = async (orderId) => {
    try {
      console.log(orderId);
      const response = await axios.get(`${API_URL}/get_purchase_order_lines`, {
        headers: generateHeaders(),
        params: { header_id: orderId },
      });
  
      setPurchaseOrderLines(response.data || []);
      setSelectedOrderId(orderId);
  
      // Open the modal regardless of data
      setIsModalOpen(true);
  
      // Check if there is no data
      if (!response.data || response.data.length === 0) {
        setNoLinesData(true);
      } else {
        // If there is data, reset noLinesData state
        setNoLinesData(false);
      }
  
      // Pass the currencycode to the state
      const order = purchaseOrdersList.find((order) => order.header_id === orderId);
      console.log("ORDER N",order)
      setCurrencySymbol(order.currencysymbol);

      const numLines = response.data.length || 0;
      if (numLines > 10) {
        // If there are more than 10 lines, set a larger size
        setModalSize("xl");
      } else {
        // Otherwise, use the default size (lg)
        setModalSize("lg");
      }
  
    } catch (error) {
      // Check for 404 status explicitly
      if (error.response && error.response.status === 404) {
        setNoLinesData(true);
        setIsModalOpen(true);
      } else {
        // Handle other errors
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching purchase order lines:`, error);
      }
    }
  };
  
  
  

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    hasRequiredAccess ? (
      <div className="purchase-orders-container">
        <h2>Purchase Orders List</h2>
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>PO Number</th>
              <th>Department</th>
              <th>Status</th>
              <th>Supplier Name</th>
              <th>PO total</th>   
              <th>Currency Code</th>      
              <th>Tax Code</th>      
              <th>Created Date</th>   
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {purchaseOrdersList.map((order) => (
              <tr key={order.header_id}>
                <td>{order.po_num}</td>
                <td>{order.department_name}</td>
                <td>{order.status}</td>
                <td>{order.partnername}</td>
                <td>{order.total_amount}</td>                
                <td>{order.currencycode}</td>
                <td>{order.tax_code}</td>
                <td>{formatDate(order.created_at)}</td>
                <td>
                  <Button variant="primary" onClick={() => handleOrderSelection(order.header_id)}>
                    Order Lines
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        
        <Modal show={isModalOpen} onHide={closeModal} size={modalSize}>
      <Modal.Header closeButton>
        <Modal.Title>
          {noLinesData
            ? "No Lines Data Available"
            : `Purchase Order Lines for Order ID: ${selectedOrderId}`}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {noLinesData ? (
          <p>No Purchase order lines present for this Order.</p>
        ) : (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Line No</th>
                <th>Item Name</th>
                <th>Quantity</th>
                <th>Unit Price</th>
                <th>Line Total</th>
                <th>Tax Code</th>              
                {/* Add other columns as needed */}
              </tr>
            </thead>
            <tbody>
              {purchaseOrderLines.map((line) => (
                <tr key={line.line_id}>
                  <td>{line.po_lnum}</td>
                  <td>{line.item_name}({line.item_code})</td>
                  <td>{line.quantity}</td>
                  <td>{line.unit_price}({currencySymbol})</td>
                  <td>{line.line_total}({currencySymbol})</td>                 
                  <td>{line.tax_code}</td>                                  
                  {/* Add other columns as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
      </div>
    ) : (
      <div> You do not have permission to view this module </div>
    )
  );
}

export default ViewPurchaseOrdersForm;
