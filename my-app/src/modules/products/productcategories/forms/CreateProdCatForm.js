import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import logger from "../../../utilities/Logs/logger";

export default function CreateProdCatForm() {
  const [formData, setFormData] = useState({
    category_name: "",
    uom_id: "",
    description: "",
    images: [], // Array of images
    is_active: true,
    tax_information: "",
  });

  const userPermissions = ModulePermissions({ moduleName: "products" }); // Fetch user permissions
  const [uoms, setUOMs] = useState([]);

  useEffect(() => {
    async function fetchUOMs() {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        setUOMs(response.data.uom);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching UOMs:`,
          error
        );
      }
    }

    fetchUOMs();
  }, []);

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleChange = (e) => {
    if (e.target.name === "images") {
      setFormData((prevFormData) => ({
        ...prevFormData,
        images: [...prevFormData.images, ...Array.from(e.target.files)],
      }));
    } else if (e.target.type === "checkbox") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else if (e.target.name === "tax_information") {
      const numericValue = parseFloat(e.target.value);
      if (!isNaN(numericValue) || e.target.value === "") {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("category_name", formData.category_name);
      formDataToSend.append("uom_id", formData.uom_id);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("is_active", formData.is_active ? 1 : 0);
      formDataToSend.append("tax_information", formData.tax_information);

      formData.images.forEach((image, index) => {
        formDataToSend.append(`images`, image);
      });

      console.log("Form data to send ",formDataToSend)

      const response = await axios.post(
        `${API_URL}/create_item_category`,
        formDataToSend,
        {
          headers: generateHeaders(),
        }
      );
      console.log(response.data);

      setFormData({
        category_name: "",
        uom_id: "",
        description: "",
        images: [],
        is_active: true,
        tax_information: "",
      });
    } catch (error) {
      console.error("Error creating item category:", error);
    }
  };

  const canViewModule = userPermissions.canViewModule;

  if (!canViewModule) {
    return <div>You do not have permission to view this module.</div>;
  }

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Item Category</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="category_name">Category Name:</label>
              </div>
              <input
                type="text"
                id="category_name"
                name="category_name"
                value={formData.category_name}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="uom_id">Default UOM:</label>
              </div>
              <select
                id="uom_id"
                name="uom_id"
                value={formData.uom_id}
                onChange={handleChange}
                className="form-control input-field"
              >
                <option value="">Select UOM</option>
                {uoms.map((uom) => (
                  <option key={uom.uom_id} value={uom.uom_id}>
                    {uom.abbreviation}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="description">Description:</label>
              </div>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="is_active">Active:</label>
              </div>
              <input
                type="checkbox"
                id="is_active"
                name="is_active"
                checked={formData.is_active}
                onChange={handleChange}
              />
              <label htmlFor="is_active" className="checkbox-label">
                {formData.is_active ? "Active" : "Inactive"}
              </label>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="tax_information">Tax Information:</label>
              </div>
              <input
                type="text"
                id="tax_information"
                name="tax_information"
                value={formData.tax_information}
                onChange={handleChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="images">Images:</label>
              </div>
              <div className="custom-file-upload">
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={handleChange}
                  className="file-input"
                />
                <label htmlFor="images" className="file-label">
                  Select Images
                </label>
              </div>
              {/* Preview selected images */}
              {formData.images.length > 0 && (
                <div className="image-previews">
                  {formData.images.map((image, index) => (
                    <img
                      key={index}
                      src={URL.createObjectURL(image)}
                      alt={`Selected file preview ${index + 1}`}
                      className="selected-pic"
                    />
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button type="submit" className="btn btn-primary">
                Create Item Category
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
