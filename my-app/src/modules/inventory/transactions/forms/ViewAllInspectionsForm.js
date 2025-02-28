import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, MODULE_LEVEL_VIEW_ACCESS, BACKEND_INVENTORY_MODULE_NAME } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";

const generateHeaders = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userid");

  return {
    Authorization: `Bearer ${token}`,
    UserId: userId,
    // Add other headers if needed
  };
};

function ViewAllInspections() {
  const [inspectionsList, setInspectionsList] = useState([]);
  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_INVENTORY_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      return;
    }

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/get_inspections`, {
          headers: generateHeaders(),
          params: {
            // Add any additional query parameters if needed
          },
        });
        setInspectionsList(response.data.inspections_list);

        // Log success message
        logger.info("Inspections fetched successfully:", response.data.inspections_list);
      } catch (error) {
        // Log error message
        logger.error("Error fetching inspections:", error);

        // Handle error as needed
      }
    };

    fetchData();
  }, [hasRequiredAccess]);

  return (
    <div className="inspections-container">
      {hasRequiredAccess ? (
        <>
          <h2>Inspections List</h2>
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Inspection ID</th>
                <th>Inspection Name</th>
                <th>Transaction Number</th>
                <th>Transaction header</th>                              
                <th>Item Code</th>
                <th>Item Name</th>
                <th>uom</th>  
                <th>Transaction Quantity</th>                           
                <th>Accepted Quantity</th>
                <th>Rejected Quantity</th>
                <th>Transaction Type</th>
                <th>Status</th>
                {/* Add more headers based on your inspections_list structure */}
              </tr>
            </thead>
            <tbody>
              {inspectionsList.map((inspection) => (
                <tr key={inspection.inspection_id}>
                  <td>{inspection.inspection_id}</td>
                  <td>{inspection.inspection_name}</td>
                  <td>{inspection.transaction_number}</td>
                  <td>{inspection.transaction_header_number}</td>                  
                  <td>{inspection.item_code}</td>
                  <td>{inspection.item_name}</td>
                  <td>{inspection.uom_name}</td>
                  <td>{inspection.transaction_quantity}</td>                                    
                  <td>{inspection.accepted_quantity}</td>
                  <td>{inspection.rejected_quantity}</td>
                  <td>{inspection.transaction_type}</td>
                  <td>{inspection.status}</td>
                  {/* Add more table data cells as needed */}
                </tr>
              ))}
            </tbody>
          </table>
        </>
      ) : (
        <div> You do not have permission to view this module </div>
      )}
    </div>
  );
}

export default ViewAllInspections;
