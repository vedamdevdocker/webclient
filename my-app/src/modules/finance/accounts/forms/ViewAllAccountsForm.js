import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_FINANCE_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewAllAccountsForm() {
  const [accountsList, setAccountsList] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_FINANCE_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
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
    if (!hasRequiredAccess) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_accounts`, {
          headers: generateHeaders(),
        });
        setAccountsList(response.data.accounts_list);
      } catch (error) {
        // Log the error with timestamp
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching accounts:`,
          error
        );
      }
    };

    fetchData();
  }, [hasRequiredAccess]);

  return hasRequiredAccess ? (
    <div className="accounts-container">
      <h2>Accounts List</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            <th>Account ID</th>
            <th>Account Number</th>
            <th>Account Name</th>
            <th>Account Category</th>
            <th>Account Type</th>
            <th>Company Name</th>
            <th>Department Name</th>
            <th>Default Account</th>
            <th>Currency </th>
          </tr>
        </thead>
        <tbody>
          {accountsList.map((account) => (
            <tr key={account.account_id}>
              <td>{account.account_id}</td>
              <td>{account.account_number}</td>
              <td>{account.account_name}</td>
              <td>{account.account_category}</td>
              <td>{account.account_type}</td>
              <td>{account.company_name}</td>
              <td>{account.department_name}</td>
              <td>{account.default_account}</td>
              <td>
                {account.currencycode}({account.currencysymbol})
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div> You do not have permission to view this module </div>
  );
}

export default ViewAllAccountsForm;
