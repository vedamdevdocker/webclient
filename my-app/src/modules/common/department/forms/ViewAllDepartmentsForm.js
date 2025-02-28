import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_COMMON_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

function ViewAllDepartmentsForm() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
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
    logger.info(`[${new Date().toLocaleTimeString()}] Has Required Access: ${hasRequiredAccess}`);

    if (!hasRequiredAccess) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_departments`, {
          headers: generateHeaders(),
        });
        setDepartments(response.data.department_list);
        setLoading(false);
        logger.info(`[${new Date().toLocaleTimeString()}] Department data fetched successfully.`);

      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching departments:`, error);
        setLoading(false);
      }
    };

    fetchData();

  }, [hasRequiredAccess]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="child-container form-container">
      <h1 className="title">Departments</h1>
      {hasRequiredAccess ? (
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th>ID</th>
              <th>Department Name</th>
              <th>Description</th>
              <th>Manager Name</th>
              <th>Default Account Group</th>
              <th>Company Name</th>
            </tr>
          </thead>
          <tbody>
            {departments?.map((department) => (
              <tr key={department.id} className="table-row">
                <td>{department.id}</td>
                <td>{department.department_name}</td>
                <td>{department.description}</td>
                <td>{department.manager_name}</td>
                <td>{department.default_account_header_name}</td>
                <td>{department.company_name}</td>
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

export default ViewAllDepartmentsForm;
