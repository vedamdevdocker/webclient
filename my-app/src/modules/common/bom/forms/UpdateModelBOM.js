import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl.js";
import logger from "../../../utilities/Logs/logger.js";
import "../../../utilities/css/appcss.css";

const ModalComponent = ({ data, onClose, onFieldChange }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3>Edit BOM Data</h3>
        <div className="modal-body">
          {data && data.length > 0 ? (
            <table className="table">
              <thead>
                <tr>
                  <th>Parent Item</th>
                  <th>Component Item</th>
                  <th>Quantity</th>
                  <th>UOM</th>
                  <th>Revision</th>
                  <th>Effective Date</th>
                  <th>End Date</th>
                  <th>Notes/Comments</th>
                  <th>Level</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <input
                        type="text"
                        value={item.ParentItem_code}
                        onChange={(e) => onFieldChange(e, index, "ParentItem")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.ComponentItem_code}
                        onChange={(e) => onFieldChange(e, index, "ComponentItem")}
                      />
                    </td>
                    <td>
                      <input
                        type="number"
                        value={item.Quantity}
                        onChange={(e) => onFieldChange(e, index, "Quantity")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.uom_abbr}
                        onChange={(e) => onFieldChange(e, index, "uom")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.Revision}
                        onChange={(e) => onFieldChange(e, index, "Revision")}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={item.EffectiveDate}
                        onChange={(e) => onFieldChange(e, index, "EffectiveDate")}
                      />
                    </td>
                    <td>
                      <input
                        type="date"
                        value={item.EndDate}
                        onChange={(e) => onFieldChange(e, index, "EndDate")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.NotesComments}
                        onChange={(e) => onFieldChange(e, index, "NotesComments")}
                      />
                    </td>
                    <td>
                      <input
                        type="text"
                        value={item.Level}
                        onChange={(e) => onFieldChange(e, index, "Level")}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No data available</p>
          )}
        </div>

        <div className="modal-footer">
          <button onClick={onClose}>Close</button>
          <button type="submit">Submit</button>
        </div>
      </div>
    </div>
  );
};


function UpdateModelBOM() {
  const [modelItem, setModelItem] = useState(""); // ModelItem is selected once
  const [bomList, setBomList] = useState([]); // Holds the BOM List fetched from the API
  const [modalData, setModalData] = useState([]); // Data to pass to Modal
  const [showModal, setShowModal] = useState(false); // Modal state

  useEffect(() => {
    // Fetch BOM list for ModelItem selection on component mount
    async function fetchBOMList() {
      try {
        const authToken = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.get(`${API_URL}/list_bom`, { headers });
        setBomList(response.data.bom_list);
      } catch (error) {
        logger.error("Error fetching BOM list:", error);
      }
    }
    fetchBOMList();
  }, []);

  // Function to filter out unique ModelItems
  const getUniqueItems = (list) => {
    const uniqueItems = [];
    const seenItems = new Set();

    list.forEach((item) => {
      if (!seenItems.has(item.ModelItem)) {
        uniqueItems.push(item);
        seenItems.add(item.ModelItem);
      }
    });

    return uniqueItems;
  };

  const openModalAndFetchData = async () => {
    if (modelItem) {
      try {
        const authToken = localStorage.getItem("token");
        const headers = {
          Authorization: `Bearer ${authToken}`,
        };
        const response = await axios.get(`${API_URL}/list_bom?model_item=${modelItem}`, { headers });
        
        // Check if the bom_list is present in the response
        if (response.data && response.data.bom_list) {
          setModalData(response.data.bom_list); // Set the bom_list data to modalData
          setShowModal(true); // Show modal
        } else {
          logger.error("No BOM data found for the selected model item.");
        }
      } catch (error) {
        logger.error("Error fetching list items:", error);
      }
    } else {
      alert("Please select a Model Item first.");
    }
  };
  

  const closeModal = () => {
    setShowModal(false); // Close modal
  };

  // Function to handle changes in the editable fields of modal
  const handleFieldChange = (event, index, field) => {
    const newData = [...modalData];
    newData[index][field] = event.target.value;
    setModalData(newData); // Update the modal data state
  };

  return (
    <div className="child-container form-container">
      <div className="form-group col-md-6 mb-2">
        <div className="form-row">
          <div className="label-container">
            <label
              htmlFor="modelItem"
              style={{ display: "block", textAlign: "left" }}
            >
              Model Item:
            </label>
          </div>

          {/* Dropdown for unique Model Items */}
          <select
            id="modelItem"
            value={modelItem}
            onChange={(e) => setModelItem(e.target.value)}
            className="form-control input-field"
            style={{ width: "auto", minWidth: "150px" }}
          >
            <option value="">Select Model Item</option>
            {getUniqueItems(bomList).map((item) => (
              <option key={item.ModelItem} value={item.ModelItem}>
                {item.ModelItem_code} ({item.ModelItem_name})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Button to trigger the modal and fetch data */}
      <button onClick={openModalAndFetchData}>Show Modal and Fetch Data</button>

      {/* Modal */}
      {showModal && (
        <ModalComponent
          data={modalData}
          onClose={closeModal}
          onFieldChange={handleFieldChange} // Pass the field change handler
        />
      )}
    </div>
  );
}

export default UpdateModelBOM;
