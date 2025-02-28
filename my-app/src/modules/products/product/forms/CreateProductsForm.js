import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import ModulePermissions from "../../../security/modulepermissions/ModulePermissions";
import { ITEM_CODE_PREFIX } from "../config/config";
import logger from "../../../utilities/Logs/logger";

export default function CreateItemForm() {
  const activeItemCodePrefix = ITEM_CODE_PREFIX.find(
    (prefix) => prefix.active
  )?.short_name;

  const [formData, setFormData] = useState({
    item_code: activeItemCodePrefix,
    item_name: "",
    category_id: "",
    manufacturer: "",
    barcode: "",
    stock_quantity: "",
    min_stock_level: "",
    max_stock_level: "",
    reorder_point: "",
    lead_time: "",
    shelf_life: "",
    location: "",
    item_images: [], // Array of images
    notes: "",
    product_type: "",
    default_uom_id: "",
    expiry_date_flag: false,
    expiry_date: "",
    is_serial_controlled: false, // New field added here
  });

  const [uoms, setUOMs] = useState([]);
  const [formDisabled, setFormDisabled] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [categories, setCategories] = useState([]);

  const userPermissions = ModulePermissions({ moduleName: "products" });
  const canViewModule = userPermissions.canViewModule;

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get(`${API_URL}/list_item_categories`, {
          headers: generateHeaders(),
        });
        setCategories(response.data.item_categories);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching categories:`,
          error
        );
      }
    }
    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchUOMs() {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
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

  async function fetchUOMs() {
    try {
      const response = await axios.get(`${API_URL}/list_uoms`, {
        headers: generateHeaders(),
      });
      setUOMs(response.data.uom);
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching uoms:`,
        error
      );
    }
  }

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;

    if (type === "file") {
      if (name === "item_images") {
        setFormData((prevFormData) => ({
          ...prevFormData,
          item_images: [...prevFormData.item_images, ...Array.from(files)],
        }));
      }
    } else if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "number") {
      setFormData({ ...formData, [name]: value === "" ? null : value });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormDisabled(true);

    try {
      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (formData[key] !== null) {
          if (key === "item_images") {
            formData[key].forEach((image, index) => {
              formDataToSend.append(`item_images`, image); // Append images directly
            });
          } else {
            formDataToSend.append(key, formData[key]);
          }
        }
      });

      const response = await axios.post(
        `${API_URL}/create_items`,
        formDataToSend,
        {
          headers: {
            ...generateHeaders(),
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setSuccessMessage(
        `Item created successfully with ID: ${response.data.item_id}`
      );

      setTimeout(() => {
        setSuccessMessage("");
        setFormData({
          item_code: activeItemCodePrefix,
          item_name: "",
          category_id: "",
          manufacturer: "",
          barcode: "",
          stock_quantity: "",
          min_stock_level: "",
          max_stock_level: "",
          reorder_point: "",
          lead_time: "",
          shelf_life: "",
          location: "",
          item_images: [],
          notes: "",
          product_type: "",
          default_uom_id: "",
          expiry_date_flag: false,
          expiry_date: "",
        });
        setFormDisabled(false);
      }, 5000);
    } catch (error) {
      console.error("Error creating item:", error);
      setFormDisabled(false);
    }
  };

  if (!canViewModule) {
    return <p>You do not have permission to view this module.</p>;
  }

  return (
    <div className="child-container menu-container">
      <h2 className="title">Create Item</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSubmit}>
          {/* Item Code (hidden) */}
          <input type="hidden" name="item_code" value={formData.item_code} />

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="item_name">Item Name:</label>
              </div>
              <input
                type="text"
                id="item_name"
                name="item_name"
                value={formData.item_name}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="category_id">Category:</label>
              </div>
              <select
                id="category_id"
                name="category_id"
                value={formData.category_id}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              >
                <option value="">Select Category</option>
                {categories.map((category) => (
                  <option
                    key={category.category_id}
                    value={category.category_id}
                  >
                    {category.category_name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="uom_id">Default UOM:</label>
              </div>
              <select
                id="default_uom_id"
                name="default_uom_id"
                fetchUOMs
                value={formData.default_uom_id}
                onChange={handleChange}
                onFocus={fetchUOMs} // Fetch UOMs when the field is focused
                className="form-control input-field"
                disabled={formDisabled}
              >
                <option value="">Select Default UOM</option>
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
                <label htmlFor="manufacturer">Manufacturer:</label>
              </div>
              <input
                type="text"
                id="manufacturer"
                name="manufacturer"
                value={formData.manufacturer}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="barcode">Barcode:</label>
              </div>
              <input
                type="text"
                id="barcode"
                name="barcode"
                value={formData.barcode}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="stock_quantity">Stock Quantity:</label>
              </div>
              <input
                type="number"
                id="stock_quantity"
                name="stock_quantity"
                value={formData.stock_quantity}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="min_stock_level">Min Stock Level:</label>
              </div>
              <input
                type="number"
                id="min_stock_level"
                name="min_stock_level"
                value={formData.min_stock_level}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="max_stock_level">Max Stock Level:</label>
              </div>
              <input
                type="number"
                id="max_stock_level"
                name="max_stock_level"
                value={formData.max_stock_level}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="reorder_point">Reorder Point:</label>
              </div>
              <input
                type="number"
                id="reorder_point"
                name="reorder_point"
                value={formData.reorder_point}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="lead_time">Lead Time (days):</label>
              </div>
              <input
                type="number"
                id="lead_time"
                name="lead_time"
                value={formData.lead_time}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="shelf_life">Shelf Life:</label>
              </div>
              <input
                type="number"
                id="shelf_life"
                name="shelf_life"
                value={formData.shelf_life}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="location">Location:</label>
              </div>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="item_images">Item Images:</label>
              </div>
              <div className="custom-file">
                <input
                  type="file"
                  id="item_images"
                  name="item_images"
                  onChange={handleChange}
                  className="custom-file-input"
                  multiple
                  disabled={formDisabled}
                />
                {formData.item_images.length > 0 && (
                  <div className="image-previews">
                    {formData.item_images.map((image, index) => (
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
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="notes">Notes:</label>
              </div>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="product_type">Product Type:</label>
              </div>
              <input
                type="text"
                id="product_type"
                name="product_type"
                value={formData.product_type}
                onChange={handleChange}
                className="form-control input-field"
                disabled={formDisabled}
              />
            </div>
          </div>

          {/* Expiry Date Flag checkbox */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="expiry_date_flag">Is Expired:</label>
              </div>
              <input
                type="checkbox"
                id="expiry_date_flag"
                name="expiry_date_flag"
                checked={formData.expiry_date_flag}
                onChange={handleChange}
                disabled={formDisabled}
              />
            </div>
          </div>

          {/* Expiry Date field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="expiry_date">Expiry Date:</label>
              </div>
              <input
                type="date"
                id="expiry_date"
                name="expiry_date"
                value={formData.expiry_date}
                onChange={handleChange}
                className="form-control input-field"
                disabled={!formData.expiry_date_flag || formDisabled} // Disable if expiry date flag is not checked
              />
            </div>
          </div>

          {/* New Is Serial Controlled field */}
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label htmlFor="is_serial_controlled">
                  Is Serial Controlled:
                </label>
              </div>
              <input
                type="checkbox"
                id="is_serial_controlled"
                name="is_serial_controlled"
                checked={formData.is_serial_controlled}
                onChange={handleChange}
                disabled={formDisabled}
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={formDisabled}
              >
                Create Item
              </button>
            </div>
          </div>
        </form>

        {successMessage && (
          <div className="alert alert-success mt-3">{successMessage}</div>
        )}
      </div>
    </div>
  );
}
