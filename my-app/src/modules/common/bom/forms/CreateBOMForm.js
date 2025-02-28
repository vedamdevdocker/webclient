import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_COMMON_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl.js";
import {
  EFFECTIVE_DATE,
  BOM_ITEM_END_DAYS,
} from "../../setups/config.js";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess.js";
import logger from "../../../utilities/Logs/logger.js";
import "../../../utilities/css/appcss.css";

function CreateBOMForm() {
  const [modelItem, setModelItem] = useState(""); // ModelItem is selected once
  const [firstItemUOM, setFirstItemUOM] = useState(""); // New field for first row UOM
  const [uoms, setUOMs] = useState([]);
  const [bomRows, setBomRows] = useState([
    {
      ParentItem: "",
      ComponentItem: "",
      Quantity: "1.00",
      uom: "1", // Default UOM
      Revision: "A",
      EffectiveDate: "",
      EndDate: "",
      NotesComments: "",
      Level: "1",
    },
  ]);
  const [itemList, setItemList] = useState([]);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_COMMON_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (hasRequiredAccess) {
      fetchItemList();
    }
  }, [hasRequiredAccess]);

  useEffect(() => {
    async function fetchUOMs() {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      try {
        const response = await axios.get(`${API_URL}/list_uoms`, { headers });

        setUOMs(response.data.uom);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching uoms:`,
          error
        );
      }
    }
    fetchUOMs();
  }, []);

  /*async function fetchUOMs() {

    const authToken = localStorage.getItem("token");
    const userid = localStorage.getItem("userid");

    const headers = {
      Authorization: `Bearer ${authToken}`,
      UserId: userid,
    };
    try {
      const response = await axios.get(`${API_URL}/list_uoms`, { headers });
      setUOMs(response.data.uom);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching uoms:`,
        error
      );
    }
  }*/

  const fetchItemList = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };

      const response = await axios.get(`${API_URL}/list_items`, { headers });
      setItemList(response.data.items);
    } catch (error) {
      logger.error("Error fetching item list:", error);
    }
  };

  const handleBOMChange = (index, field, value) => {
    const updatedBOM = [...bomRows];
    updatedBOM[index][field] = value;
    setBomRows(updatedBOM);
  };

  const addBOMRow = () => {
    setBomRows([
      ...bomRows,
      {
        ParentItem: "",
        ComponentItem: "",
        Quantity: "1.00",
        uom: "1", // Default UOM for new row
        Revision: "A",
        EffectiveDate: "",
        EndDate: "",
        NotesComments: "",
        Level: (bomRows.length + 1).toString(),
      },
    ]);
  };

  const removeBOMRow = (index) => {
    const updatedBOM = bomRows.filter((_, i) => i !== index);
    setBomRows(updatedBOM);
  };

  const calculateEffectiveDate = () => {
    return EFFECTIVE_DATE || new Date().toISOString().split("T")[0];
  };

  const calculateEndDate = (effectiveDate) => {
    const endDays = BOM_ITEM_END_DAYS || 3650; // Default to 10 years if BOM_ITEM_END_DAYS is null or empty
    const endDate = new Date(effectiveDate);
    endDate.setDate(endDate.getDate() + parseInt(endDays));
    return endDate.toISOString().split("T")[0];
  };

  const handleSubmit = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const userid = localStorage.getItem("userid");

      // Get effective and end dates for the first row
      const effectiveDate = calculateEffectiveDate();
      const endDate = calculateEndDate(effectiveDate);

      // Create the first row with Level 1
      const firstRow = {
        ModelItem: modelItem,
        ParentItem: modelItem, // ParentItem is same as ModelItem
        ComponentItem: bomRows[0].ParentItem || "", // Use the ComponentItem from the form
        Quantity: bomRows[0].Quantity || "1.00", // Default quantity if not provided
        uom: firstItemUOM || "1", // Use firstItemUOM for the first row
        Revision: "A", // Default revision
        EffectiveDate: effectiveDate,
        EndDate: endDate,
        NotesComments: bomRows[0].NotesComments || "",
        Level: "1", // Level 1 for the first row
      };

      // Create the second row with Level 2
      const secondRow = {
        ModelItem: modelItem,
        ParentItem: bomRows[0].ParentItem, // Use ParentItem from the form
        ComponentItem: bomRows[0].ComponentItem || "", // Use ComponentItem from the form
        Quantity: bomRows[0].Quantity || "1.00", // Default quantity if not provided
        uom: bomRows[0].uom || "1", // Include uom from the form
        Revision: "A", // Default revision
        EffectiveDate: effectiveDate,
        EndDate: endDate,
        NotesComments: bomRows[0].NotesComments || "",
        Level: "2", // Level 2 for the second row
      };

      // Prepare subsequent rows (starting from index 1)
      const subsequentRows = bomRows.slice(1).map((row, index) => {
        const effectiveDate = row.EffectiveDate || calculateEffectiveDate();
        const endDate = row.EndDate || calculateEndDate(effectiveDate);
        return {
          ...row,
          ModelItem: modelItem,
          EffectiveDate: effectiveDate,
          EndDate: endDate,
          Level: (index + 3).toString(), // Start levels from 3 for subsequent rows
        };
      });

      // Prepare the final payload
      const payload = {
        bom: [firstRow, secondRow, ...subsequentRows], // Include both first and second rows followed by subsequent rows
      };

      const headers = {
        Authorization: `Bearer ${authToken}`,
        UserId: userid,
      };
      console.log("Entered paylod ",payload)
      await axios.post(`${API_URL}/create_bom`, payload, { headers });
      alert("BOM submitted successfully");
    } catch (error) {
      logger.error("Error submitting BOM:", error);
      alert("Failed to submit BOM");
    }
  };

  const getFilteredOptions = (index, field) => {
    // Get selected ParentItem and ComponentItem from bomRows to exclude from other dropdowns
    const selectedItems = bomRows
      .flatMap((row) => [row.ParentItem, row.ComponentItem])
      .filter(Boolean);

    const filteredItems = itemList.filter((item) => {
      // Exclude the selected ModelItem
      const isModelItem = item.item_id === modelItem;

      // Exclude selected ParentItems and ComponentItems from the list
      if (field === "ParentItem") {
        const isSelectedInRow = selectedItems.includes(item.item_id);
        return (
          !isModelItem &&
          (!isSelectedInRow || item.item_id === bomRows[index].ParentItem)
        );
      } else if (field === "ComponentItem") {
        const isSelectedInRow = selectedItems.includes(item.item_id);
        return (
          !isModelItem &&
          (!isSelectedInRow || item.item_id === bomRows[index].ComponentItem)
        );
      }
      return true;
    });

    return filteredItems;
  };

  return (
    <div className="child-container form-container">
      <h3>Create BOM</h3>

      {/* Model Item Selection and First Item UOM stacked vertically */}

      <div className="form-group col-md-6 mb-2">
        <div className="form-row">
          <div className="label-container">
            <label
              htmlFor="modelItem"
              style={{ display: "block", textAlign: "left" }}
            >
              Model Item1:
            </label>
          </div>
          <select
            id="modelItem"
            value={modelItem}
            onChange={(e) => setModelItem(e.target.value)}
            className="form-control input-field"
            style={{ width: "auto", minWidth: "150px" }} // Adjust size based on data
          >
            <option value="">Select Model Item</option>
            {itemList.map((item) => (
              <option key={item.item_id} value={item.item_id}>
                {item.item_code} ({item.item_name})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="form-group col-md-6 mb-2">
        <div className="form-row">
          <div className="label-container">
            <label
              htmlFor="firstItemUOM"
              style={{ display: "block", textAlign: "left" }}
            >
              First Item UOM1:
            </label>
          </div>
          <select
            id="firstItemUOM"
            value={firstItemUOM}
            onChange={(e) => setFirstItemUOM(e.target.value)}
            className="form-control input-field"
            style={{ width: "auto", minWidth: "150px" }} // Adjust size based on data
          >
            <option value="">Select First Item UOM</option>
            {uoms.map((uom) => (
              <option key={uom.uom_id} value={uom.uom_id}>
                {uom.uom_name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* BOM Rows Table */}
      <div style={{ width: "30%", textAlign: "left" }}>
        {" "}
        {/* Left-aligned */}
        <table className="table" style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ maxWidth: "150px" }}>Parent Item</th>
              <th style={{ maxWidth: "150px" }}>Component Item</th>
              <th style={{ maxWidth: "100px" }}>Quantity</th>
              <th style={{ maxWidth: "100px" }}>UOM</th>
              <th style={{ maxWidth: "150px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {bomRows.map((row, index) => (
              <tr key={index}>
                <td
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <select
                    id={`parentItem${index}`}
                    value={row.ParentItem}
                    onChange={(e) =>
                      handleBOMChange(index, "ParentItem", e.target.value)
                    }
                    className="form-control input-field"
                  >
                    <option value="">Select Parent Item</option>
                    {getFilteredOptions(index, "ParentItem").map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item_code} ({item.item_name})
                      </option>
                    ))}
                  </select>
                </td>

                <td
                  style={{
                    maxWidth: "150px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <select
                    id={`componentItem${index}`}
                    value={row.ComponentItem}
                    onChange={(e) =>
                      handleBOMChange(index, "ComponentItem", e.target.value)
                    }
                    className="form-control input-field"
                  >
                    <option value="">Select Component Item</option>
                    {getFilteredOptions(index, "ComponentItem").map((item) => (
                      <option key={item.item_id} value={item.item_id}>
                        {item.item_code} ({item.item_name})
                      </option>
                    ))}
                  </select>
                </td>

                <td
                  style={{
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <input
                    type="number"
                    id={`quantity${index}`}
                    value={row.Quantity}
                    onChange={(e) =>
                      handleBOMChange(index, "Quantity", e.target.value)
                    }
                    className="form-control input-field"
                  />
                </td>

                <td
                  style={{
                    maxWidth: "100px",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  <select
                    id={`uom${index}`}
                    value={row.uom}
                    onChange={(e) =>
                      handleBOMChange(index, "uom", e.target.value)
                    }
                    className="form-control input-field"
                  >
                    <option value="">Select UOM</option>
                    {uoms.map((uom) => (
                      <option key={uom.uom_id} value={uom.uom_id}>
                        {uom.uom_name}
                      </option>
                    ))}
                  </select>
                </td>

                <td
                  style={{ maxWidth: "150px", display: "flex", gap: "5px", alignItems: "center" }}
                >
                  <button onClick={() => removeBOMRow(index)}>Delete</button>
                  <button onClick={addBOMRow}>Add</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default CreateBOMForm;
