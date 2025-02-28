import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewAllCurrenciesForm() {
  const [currencies, setCurrencies] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME, // Replace with your module name constant
    MODULE_LEVEL_VIEW_ACCESS // Replace with your access level constant
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  useEffect(() => {
    // Log the value of hasRequiredAccess
    logger.info(
      `[${new Date().toLocaleTimeString()}] Has Required Access: ${hasRequiredAccess}`
    );

    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }
    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_currencies`, {
          headers: generateHeaders(),
        });
        setCurrencies(response.data.currencies);
        setLoading(false);
        logger.info(
          `[${new Date().toLocaleTimeString()}] Currencies data fetched successfully`
        );
      } catch (error) {
        logger.error("Error fetching currencies:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [hasRequiredAccess]); // Empty dependency array to mimic componentDidMount behavior

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="child-container form-container">
      {hasRequiredAccess ? (
        <>
          <h1 className="title">List of Currencies</h1>
          <table className="table table-striped table-bordered">
            <thead>
              <tr className="table-header">
                <th>Currency ID</th>
                <th className="table-header">Currency Code</th>
                <th>Currency Name</th>
                <th>Currency Symbol</th>
              </tr>
            </thead>
            <tbody>
              {currencies.map((currency) => (
                <tr key={currency.currency_id} className="table-row">
                  <td> {currency.currency_id}</td>
                  <td>{currency.currencycode}</td>
                  <td>{currency.currencyname}</td>
                  <td>{currency.currencysymbol}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div>You do not have permission to view this module</div>
      )}
    </div>
  );
}

export default ViewAllCurrenciesForm;
