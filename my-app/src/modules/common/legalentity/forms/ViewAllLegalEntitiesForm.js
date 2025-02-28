import React, { useEffect, useState } from "react";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import axios from "axios";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewAllLegalEntitiesForm() {
  const [legalEntities, setLegalEntities] = useState([]);
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
        const response = await axios.get(`${API_URL}/get_legal_entity`, {
          headers: generateHeaders(),
        });
        setLegalEntities(response.data.legal_entity_list);
        setLoading(false); // Set loading to false once data is fetched
        // Log a success message
        logger.info(`[${new Date().toLocaleTimeString()}] Legal entity data fetched successfully.`);

      } catch (error) {
        // Log an error message
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching legal entities:`, error);
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
      <h1 className="title">Legal Entities</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Name</th>
              <th>Registration Number</th>
              <th>Address</th>
              <th>Contact Email</th>
              <th>Contact Phone</th>
              <th>About</th>
            </tr>
          </thead>
          <tbody>
            {legalEntities?.map((entity) => (
              <tr key={entity.id} className="table-row">
                <td>{entity.id}</td>
                <td>{entity.name}</td>
                <td>{entity.registration_number}</td>
                <td>{entity.address}</td>
                <td>{entity.contact_email}</td>
                <td>{entity.contact_phone}</td>
                <td>{entity.about}</td>
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

export default ViewAllLegalEntitiesForm;
