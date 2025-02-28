import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL, BACKEND_PRODUCT_MODULE_NAME, MODULE_LEVEL_VIEW_ACCESS } from "../../../admin/setups/ConstDecl";
import "../../../utilities/css/appcss.css";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal } from "react-bootstrap"; // Importing Modal from react-bootstrap

function ViewAllProductsForm() {
  const [items, setItems] = useState([]);
  const [categoryMap, setCategoryMap] = useState({});
  const [uomAbbreviations, setUomAbbreviations] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState(null);
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [modalItemName, setModalItemName] = useState("");
  const [modalItemId, setModalItemId] = useState("");

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_PRODUCT_MODULE_NAME,
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
    if (!hasRequiredAccess) return;

    const fetchData = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_items`, {
          headers: generateHeaders(),
        });
        setItems(response.data.items);
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched items data.`);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching items:`, error);
      }
    };

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
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched UOM abbreviations.`);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching UOM abbreviations:`, error);
      }
    };

    const fetchCategoryNames = async () => {
      try {
        const response = await axios.get(`${API_URL}/list_item_categories`, {
          headers: generateHeaders(),
        });
        const categories = response.data.item_categories;
        const categoryMapData = {};
        categories.forEach((category) => {
          categoryMapData[category.category_id] = category.category_name;
        });
        setCategoryMap(categoryMapData);
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched category names.`);
      } catch (error) {
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching category names:`, error);
      }
    };

    fetchData();
    fetchUomAbbreviations();
    fetchCategoryNames();
  }, [hasRequiredAccess]);

  const fetchItemImages = async (itemId) => {
    try {
      const response = await axios.get(`${API_URL}/get_item_images?item_id=${itemId}`, {
        headers: generateHeaders(),
      });
      const imageList = response.data.images;
      if (imageList && imageList.length > 0) {
        setImages(imageList);
        setCurrentImageIndex(0);
        setModalImage(`data:image/jpeg;base64,${imageList[0].image}`);
      } else {
        console.warn(`No images found for item ${itemId}`);
        setImages([]);
      }
    } catch (error) {
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching images for item ${itemId}:`, error);
    }
  };

  const handleImageError = (e, itemName) => {
    console.error(`[${new Date().toLocaleTimeString()}] Error loading image for item ${itemName}:`, e);
    e.target.onerror = null;
    e.target.src = "/path/to/placeholder/image";
  };

  const handleImageClick = async (item) => {
    setModalItemName(item.item_name);
    setModalItemId(item.item_id);
    await fetchItemImages(item.item_id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalImage(null);
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

  return (
    hasRequiredAccess ? (
      <div className="child-container form-container">
        <table className="table table-striped table-bordered">
          <thead>
            <tr className="table-header">
              <th className="table-header">Item Code</th>
              <th>Product</th>
              <th>Category</th>
              <th>Manufacturer</th>
              <th>UOM</th>
              <th>Product Type</th>
              <th>Serial Controlled ?</th>
              <th>Images</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.item_id} className="table-row">
                <td>{item.item_code}</td>
                <td>{item.item_name}</td>
                <td>{categoryMap[item.category_id] || "Unknown Category"}</td>
                <td>{item.manufacturer}</td>
                <td>{uomAbbreviations[item.default_uom_id] || "Unknown UOM"}</td>
                <td>{item.product_type}</td>
                <td>{item.is_serial_controlled === 0 ? 'False' : 'True'}</td>
                <td>
                  {item.item_image ? (
                    <img
                      src={`data:image/jpeg;base64,${item.item_image}`}
                      alt={`Item ${item.item_name}`}
                      className="item-image"
                      onClick={() => handleImageClick(item)}
                      onError={(e) => handleImageError(e, item.item_name)}
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
            <Modal.Title>{modalItemName} (ID: {modalItemId})</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {modalImage ? (
              <img
                src={modalImage}
                alt={`Item ${modalItemName}`}
                style={{ width: "100%", cursor: "pointer" }}
                onClick={handleImageClickInModal}
                onError={(e) => handleImageError(e, modalItemName)}
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
    )
  );
}

export default ViewAllProductsForm;
