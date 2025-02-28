import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger"; // Import your logger utility here

function ViewAllExchangeRatesForm() {
  const [exchangeRates, setExchangeRates] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      'Authorization': `Bearer ${token}`,
      'UserId': userId,
      // Add other headers if needed
    };
  };

  useEffect(() => {
    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    // Log tokens, userId, and the current module when fetching data with time
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");
    logger.info(`[${new Date().toLocaleTimeString()}] Token: ${token}, UserId: ${userId}, Module: ViewAllExchangeRatesForm`);

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_exchange_rates`, {
          headers: generateHeaders(),
        });
        setExchangeRates(response.data.exchangerates);
      } catch (error) {
        console.error(`[${new Date().toLocaleTimeString()}] Error fetching exchange rates:`, error);
      }
    };

    fetchData();

  }, [hasRequiredAccess]); // Include hasRequiredAccess in the dependency array

  return (
    <div className="child-container form-container">
      <h1 className="title">List of Exchange Rates</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>Rate ID</th>
              <th>From Currency</th>
              <th>To Currency</th>
              <th>Exchange Rate</th>
              <th>Valid From</th>
              <th>Valid to</th>
              <th>Status</th>
              <th>Version</th>
            </tr>
          </thead>
          <tbody>
            {exchangeRates.map((rate) => (
              <tr key={`${rate.exchange_rate_id}`} className="table-row">
                <td>{rate.exchange_rate_id}</td>
                <td>{rate.from_currency_code}</td>
                <td>{rate.to_currency_code}</td>
                <td>{rate.exchangerate}</td>
                <td>{rate.valid_from}</td>
                <td>{rate.valid_to}</td>
                <td>{rate.status}</td>                                                
                <td>{rate.version}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default ViewAllExchangeRatesForm;
