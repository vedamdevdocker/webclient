import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewAllGroupCompaniesForm() {
  const [groupCompanies, setGroupCompanies] = useState([]);
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
        const response = await axios.get(`${API_URL}/get_group_companies`, {
          headers: generateHeaders(),
        });
        setGroupCompanies(response.data.group_company_list);
        setLoading(false); // Set loading to false once data is fetched
        // Log a success message
        logger.info(`[${new Date().toLocaleTimeString()}] Group company data fetched successfully.`);

      } catch (error) {
        // Log an error message
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching group companies:`, error);
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
      <h1 className="title">Group Companies</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Name</th>
              <th>Description</th>
              <th>Legal Entity name</th>
              <th>Created At</th>
              <th>Updated At</th>
            </tr>
          </thead>
          <tbody>
            {groupCompanies?.map((company) => (
              <tr key={company.id} className="table-row">
                <td>{company.id}</td>
                <td>{company.group_company_name}</td>
                <td>{company.description}</td>
                <td>{company.legal_entity_name}</td>
                <td>{company.created_at}</td>
                <td>{company.updated_at}</td>
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

export default ViewAllGroupCompaniesForm;
