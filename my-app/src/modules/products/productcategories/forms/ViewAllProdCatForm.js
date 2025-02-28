import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  API_URL,
  BACKEND_PRODUCT_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal } from "react-bootstrap"; // You need to install react-bootstrap for modal functionality

function ViewAllProdCatForm() {
  const [categoryMap, setCategoryMap] = useState([]);
  const [uomAbbreviations, setUomAbbreviations] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [modalCategoryName, setModalCategoryName] = useState("");
  const [modalCategoryId, setModalCategoryId] = useState("");
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_PRODUCT_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  useEffect(() => {
    if (!hasRequiredAccess) return;

    const fetchUomAbbreviations = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_uoms`, {
          headers: generateHeaders(),
        });
        const uomList = response.data.uom;
        const uomAbbreviationMap = {};
        uomList.forEach((uom) => {
          uomAbbreviationMap[uom.uom_id] = uom.abbreviation;
        });
        setUomAbbreviations(uomAbbreviationMap);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching UOM abbreviations:`,
          error
        );
      }
    };

    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_item_categories`, {
          headers: generateHeaders(),
        });
        setCategoryMap(response.data.item_categories);
      } catch (error) {
        logger.error(
          `[${new Date().toLocaleTimeString()}] Error fetching category names:`,
          error
        );
      }
    };

    fetchUomAbbreviations();
    fetchCategoryNames();
  }, [hasRequiredAccess]);

  const fetchCategoryImages = async (categoryId) => {
    try {
      const response = await axios.get(
        `${API_URL}/get_category_images?category_id=${categoryId}`,
        {
          headers: generateHeaders(),
        }
      );
      const imageList = response.data.images;
      if (imageList && imageList.length > 0) {
        setImages(imageList);
        setCurrentImageIndex(0);
      } else {
        console.warn(`No images found for category ${categoryId}`);
        setImages([]); // Reset images if none found
      }
    } catch (error) {
      logger.error(
        `[${new Date().toLocaleTimeString()}] Error fetching images for category ${categoryId}:`,
        error
      );
    }
  };

  const handleImageError = (e, categoryName) => {
    console.error(
      `[${new Date().toLocaleTimeString()}] Error loading image for category ${categoryName}:`,
      e
    );
    e.target.onerror = null;  // Prevents infinite loop if the placeholder image also fails to load
    e.target.src = "/path/to/placeholder/image";
  };

  const handleImageClick = async (category) => {
    setModalCategoryName(category.category_name);
    setModalCategoryId(category.category_id);
    setModalImage(`data:image/jpeg;base64,${category.image}`);
    await fetchCategoryImages(category.category_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
    setModalCategoryName("");
    setModalCategoryId("");
    setImages([]);
    setCurrentImageIndex(0);
  };

  const handleImageClickInModal = () => {
    if (images.length > 0) {
      const nextIndex = (currentImageIndex + 1) % images.length;
      setCurrentImageIndex(nextIndex);
      setModalImage(`data:image/jpeg;base64,${images[nextIndex].image}`);
    }
  };

  return hasRequiredAccess ? (
    <div className="child-container form-container">
      <table className="table table-striped table-bordered">
        <thead>
          <tr className="table-header">
            <th>Category ID</th>
            <th>Category Name</th>
            <th>Description</th>
            <th>Is Active</th>
            <th>Tax Information</th>
            <th>Default UOM</th>
            <th>Image</th>
          </tr>
        </thead>
        <tbody>
          {categoryMap.map((category) => (
            <tr key={category.category_id} className="table-row">
              <td>{category.category_id}</td>
              <td>{category.category_name}</td>
              <td>{category.description}</td>
              <td>{category.is_active ? "Active" : "Inactive"}</td>
              <td>{category.tax_information}</td>
              <td>{uomAbbreviations[category.default_uom] || "Unknown UOM"}</td>
              <td>
                {category.image ? (
                  <img
                    src={`data:image/jpeg;base64,${category.image}`}
                    alt={category.category_name}
                    className="item-image"
                    onClick={() => handleImageClick(category)}
                    onError={(e) => handleImageError(e, category.category_name)}
                    style={{ width: "50px", height: "50px", cursor: "pointer" }}
                  />
                ) : (
                  // eslint-disable-next-line
                  <img
                    src="/path/to/placeholder/image"
                    alt="No Image Available"
                    className="item-image"
                    style={{ width: "50px", height: "50px" }}
                  />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <Modal show={isModalOpen} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalCategoryName} (ID: {modalCategoryId})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalImage ? (
            <img
              src={modalImage}
              alt="Category"
              style={{ width: "100%", cursor: "pointer" }}
              onClick={handleImageClickInModal}
              onError={(e) => handleImageError(e, modalCategoryName)}
            />
          ) : (
            <p>No image available</p>
          )}
        </Modal.Body>

        <Modal.Footer>
          <button onClick={handleCloseModal} className="btn btn-secondary">
            Close
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  ) : (
    <div>You do not have permission to view this module</div>
  );
}

export default ViewAllProdCatForm;
