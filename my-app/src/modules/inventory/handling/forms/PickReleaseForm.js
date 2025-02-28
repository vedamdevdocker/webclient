import React, { useState } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import { PICK_RELEASE_PROCESS_PARAMETERS } from "../../config/config"; // Update the path to your config file

export default function PickReleaseForm() {
  // Define initial form data state
  const initialFormData = {
    sales_orders: [],
    look_only_inventory_ids: [],
    sales_order_status: [], // Add this line to include sales_order_status
  };

  const [formData, setFormData] = useState(initialFormData);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value.split(","),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const requestData = { ...formData };
  
      // Add static fields from PICK_RELEASE_PROCESS_PARAMETERS
      PICK_RELEASE_PROCESS_PARAMETERS.forEach((param) => {
        if (param.field_name === "sales_order_status") {
          requestData[param.field_name] = param.value; // Ensure it's an array
          console.log(PICK_RELEASE_PROCESS_PARAMETERS.find(param => param.field_name === "sales_order_status").value);
        } else {
          requestData[param.field_name] = param.value;
        }
      });
  
      console.log("Request Data:", requestData); // Verify request data
  
      const response = await axios.post(`${API_URL}/pick_release`, requestData, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          UserId: localStorage.getItem("userid"),
        },
      });
      console.log("Pick Release response", response);
      setSuccessMessage(`Pick release completed with the response: ${response.data.message}`);
      setErrorMessage("");

      // Reset form data
      setFormData(initialFormData);

    } catch (error) {
      setSuccessMessage("");
      setErrorMessage(`Error: ${error.response ? error.response.data : error.message}`);
    }
  };
  

  return (
    <div className="child-container menu-container">
      <h2 className="title">Pick Release Form</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="sales_orders">Sales Orders:</label>
              </div>
              <input
                type="text"
                id="sales_orders"
                name="sales_orders"
                value={formData.sales_orders.join(",")}
                onChange={handleChange}
                className="form-control input-field"
                placeholder="Enter sales orders, separated by commas"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="look_only_inventory_ids">Look Only Inventory IDs:</label>
              </div>
              <input
                type="text"
                id="look_only_inventory_ids"
                name="look_only_inventory_ids"
                value={formData.look_only_inventory_ids.join(",")}
                onChange={handleChange}
                className="form-control input-field"
                placeholder="Enter inventory IDs, separated by commas"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">Submit</button>
            </div>
          </div>
        </form>

        {successMessage && (
          <div className="success-message">{successMessage}</div>
        )}

        {errorMessage && <div className="error-message">{errorMessage}</div>}
      </div>
    </div>
  );
}
