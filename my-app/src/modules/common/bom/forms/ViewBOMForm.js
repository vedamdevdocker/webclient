import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import Modal from "react-modal";
import "../../../utilities/css/appcss.css";

function ViewBOMForm({
  updateExplodedBOM,
  bomByDescriptions,
  setBOMByDescriptions,
}) {
  const [ModelItem, setModelItem] = useState("");
  const [ModelItemCode, setModelItemCode] = useState("");
  const [ModelItemDescription, setModelItemDescription] = useState("");
  const [itemList, setItemList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filteredBOM, setFilteredBOM] = useState([]); // State for filtered BOM

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (!hasRequiredAccess) {
      logger.warn(
        `[${new Date().toLocaleTimeString()}] Access denied to View BOM component.`
      );
      return;
    }

    fetchItemList();
  }, [hasRequiredAccess, bomByDescriptions]);

  const fetchItemList = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/list_bom`, { headers });
      setItemList(response.data.bom_list);
      setLoading(false);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching item lists:`,
        error
      );
      setError(error);
      setLoading(false);
    }
  };

  const handleModelItemCodeChange = (event) => {
    const selectedCode = event.target.value;
    setModelItemCode(selectedCode);
  
    const selectedModelItem = itemList.find(
      (item) => item.ModelItem_code === selectedCode
    );
    
    if (selectedModelItem) {
      setModelItem(selectedModelItem.ModelItem);
      setModelItemDescription(selectedModelItem.ModelItem_name);
    } else {
      // Reset if no matching item is found
      setModelItem("");
      setModelItemDescription("");
    }
  };

  const handleCheckboxChange = () => {
    setBOMByDescriptions(!bomByDescriptions);
    console.log("Checkbox state:", !bomByDescriptions);
  };

  const handleBOM = async () => {
    if (!ModelItemCode) {
      logger.warn(
        `[${new Date().toLocaleTimeString()}] No Model code selected.`
      );
      alert("Please select a Model");
      return;
    }

    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/list_bom`, {
        headers,
        params: {
          model_item: ModelItem,
        },
      });

      console.log("Before sending to upDateExplodeBOM ", bomByDescriptions);
      if (response.data.bom_list) {
        updateExplodedBOM(response.data.bom_list);
      } else {
        logger.warn(
          `[${new Date().toLocaleTimeString()}] No data available for Item: ${ModelItem}`
        );
        updateExplodedBOM([]);
        alert("No data available for the Model.");
      }
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching BOM data:`,
        error
      );
      alert("Error in BOM");
    }
  };

  const uniqueItemList = Array.from(
    new Set(
      bomByDescriptions
        ? itemList.map((item) => item.ModelItem_name)
        : itemList.map((item) => item.ModelItem_code)
    )
  ).map((modelItem) =>
    bomByDescriptions
      ? itemList.find((item) => item.ModelItem_name === modelItem)
      : itemList.find((item) => item.ModelItem_code === modelItem)
  );

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // Set to keep track of visited items and prevent infinite loops
  const visitedItems = new Set();

  // Function to render the tree for the selected ModelItem
  const renderTree = (parentItemCode, level = 0) => {
    if (visitedItems.has(parentItemCode)) {
      return null; // Prevent recursion if the parent item is already visited
    }
  
    visitedItems.add(parentItemCode); // Mark as visited
  
    // Find components matching the current parent item
    const children = filteredBOM.filter(
      (child) => child.ParentItem_code === parentItemCode
    );

    console.log("Children to -->", children);
    console.log("ParentItemCode to -->", parentItemCode);
  
    return (
      <ul key={parentItemCode}>
        {children.map((child) => (
          <li
            key={child.ComponentItem_code}
            className={`level-${level + 1}`}
            style={{ paddingLeft: `${level * 20}px` }}
          >
            <span>
              {child.ComponentItem_name}{" "}
              <small className="model-item-code">
                ({child.ComponentItem_code})
              </small>{" "}
              ({child.Quantity} - {child.uom_abbr})
            </span>
            {renderTree(child.ComponentItem_code, level + 1)}
          </li>
        ))}
      </ul>
    );
  };


  // Handle showing the BOM tree for the selected ModelItem
  const handleShowTree = () => {
    visitedItems.clear();
  
    // Filter BOM for the selected ModelItemCode only
    const filteredBOMList = itemList.filter(
      (item) => item.ModelItem_code === ModelItemCode
    );
  
    if (filteredBOMList.length > 0) {
      setFilteredBOM(filteredBOMList); // Set filteredBOM based on selected item
      openModal();
    } else {
      alert("No BOM tree data found for the selected item.");
    }
  };

  if (!hasRequiredAccess) {
    return <div>You do not have permission to view this module</div>;
  }

  return (
    <div className="child-container menu-container">
      <div className="child-container form-container">
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <label>
              BOM by descriptions
              <input
                type="checkbox"
                checked={bomByDescriptions}
                onChange={handleCheckboxChange}
              />
            </label>
          </div>
        </div>
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <div className="label-container">
              <label htmlFor="ModelItemCode">Model Item Code:</label>
            </div>
            <select
              id="ModelItemCode"
              value={ModelItemCode}
              onChange={handleModelItemCodeChange}
              className="form-control input-field"
            >
              {loading ? (
                <option value="" disabled>
                  Loading...
                </option>
              ) : error ? (
                <option value="" disabled>
                  Error loading items
                </option>
              ) : uniqueItemList.length === 0 ? (
                <option value="" disabled>
                  No items available
                </option>
              ) : (
                <>
                  <option value="">Select Model Item Code</option>
                  {uniqueItemList.map((item) => (
                    <option
                      key={
                        bomByDescriptions
                          ? item.ModelItem_name
                          : item.ModelItem_code
                      }
                      value={item.ModelItem_code}
                    >
                      {bomByDescriptions
                        ? item.ModelItem_name
                        : item.ModelItem_code}
                    </option>
                  ))}
                </>
              )}
            </select>
          </div>
        </div>
        <div className="form-group col-md-6 mb-2">
          <div className="form-row">
            <button onClick={handleBOM} className="btn btn-primary">
              BOM
            </button>
            <button onClick={handleShowTree} className="btn btn-secondary">
              Show BOM Tree
            </button>
          </div>
        </div>
      </div>
      {/* Modal to display the BOM tree structure */}
      <Modal isOpen={isModalOpen} onRequestClose={closeModal}>
        <h2 className="model-item-description">
          {ModelItemDescription}{" "}
          <small className="model-item-code"> ({ModelItemCode})</small> <br />
        </h2>

        <div>
          {ModelItemCode && filteredBOM.length > 0 ? (
            renderTree(ModelItemCode) // Render tree only for the selected ModelItemCode
          ) : (
            <p>No BOM tree available for the selected item.</p>
          )}
        </div>
        <button onClick={closeModal}>Close</button>
      </Modal>
    </div>
  );
}

export default ViewBOMForm;
