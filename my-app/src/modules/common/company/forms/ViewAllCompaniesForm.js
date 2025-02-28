import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewAllCompaniesForm() {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);

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
    // Log the value of hasRequiredAccess
    logger.info(`[${new Date().toLocaleTimeString()}] Has Required Access: ${hasRequiredAccess}`);

    if (!hasRequiredAccess) {
      return; // Do not fetch data if access is not granted
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_companies`, {
          headers: generateHeaders(),
        });
        setCompanies(response.data.company_list);
        setLoading(false); // Set loading to false once data is fetched
        // Log a success message
        logger.info(`[${new Date().toLocaleTimeString()}] Company data fetched successfully.`);

      } catch (error) {
        // Log an error message
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching companies:`, error);
        setLoading(false); // Set loading to false on error        
      }
    };

    fetchData();

  }, [hasRequiredAccess]); // Include hasRequiredAccess in the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="child-container form-container">
      <h1 className="title">Companies</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Company</th>
              <th>Group Company </th>
              <th>Local Currency</th>
              <th>Home Currency</th>
              <th>Reporting Currency</th>
              <th>Default Account Group</th>
              <th>Default Tax Group</th>
            </tr>
          </thead>
          <tbody>
            {companies?.map((company) => (
              <tr key={company.company_id} className="table-row">
                <td>{company.company_id}</td>
                <td>{company.company_name}</td>
                <td>{company.group_company_name}</td>
                <td>{company.local_currency_code}({company.local_currency_symbol})</td>
                <td>{company.home_currency_code}({company.home_currency_symbol})</td>
                <td>{company.reporting_currency_code}({company.reporting_currency_symbol})</td>
                <td>{company.default_account_header_name}</td>                  
                <td>{company.company_tax_codes_description}</td>                
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}

export default ViewAllCompaniesForm;
