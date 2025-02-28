import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { API_URL } from "../../../admin/setups/ConstDecl";
import CheckModuleAccess from "../../../security/modulepermissions/CheckModuleAccess";
import logger from "../../../utilities/Logs/logger";
import { Modal, Button } from "react-bootstrap";

export default function SearchDefaultTaxCodesResultsForm() {
  const { Parameters } = useParams();
  const [resultData, setResultData] = useState([]);
  const [error, setError] = useState(null);
  const [taxCodesData, setTaxCodesData] = useState([]);
  const [showTaxCodesModal, setShowTaxCodesModal] = useState(false);
  const [headerName, setHeaderName] = useState("");

  const hasRequiredAccess = CheckModuleAccess("FINANCE", "VIEW");

  const generateHeaders = () => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userid");

    return {
      Authorization: `Bearer ${token}`,
      UserId: userId,
    };
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = `${API_URL}/get_default_tax_headers`;
        console.log("Received Inforation in Parameters for ", Parameters);
        if (Parameters) {
          const queryParams = new URLSearchParams(Parameters);
          apiUrl += `?${queryParams.toString()}`;
        }

        const response = await axios.get(apiUrl, {
          headers: generateHeaders(),
        });

        setResultData(response.data.default_tax_headers);
        setError(null);
        logger.info(`[${new Date().toLocaleTimeString()}] Fetched tax headers successfully`, response.data.default_tax_headers);
      } catch (error) {
        setError("An error occurred while fetching data.");
        logger.error(`[${new Date().toLocaleTimeString()}] Error fetching tax headers`, error);
      }
    };

    fetchData();
  }, [Parameters, hasRequiredAccess]);

  const fetchTaxCodesData = async (headerId, header_name) => {
    try {
      const response = await axios.get(`${API_URL}/get_default_tax_codes?header_id=${headerId}`, {
        headers: generateHeaders(),
      });

      setTaxCodesData(response.data.default_tax_codes);
      setHeaderName(header_name);
      setShowTaxCodesModal(true);
    } catch (error) {
      setError("An error occurred while fetching tax codes data.");
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching tax codes data`, error);
    }
  };

  return (
    <div>
      <h1>Company Default Tax Configurations</h1>
      {error ? (
        <p>{error}</p>
      ) : (
        <table className="table table-striped">
          <thead className="jo-line-table-header-custom">
            <tr>
              <th>Header ID</th>
              <th>Header Name</th>
              <th>Tax Codes</th>
            </tr>
          </thead>
          <tbody>
            {resultData.map((header, index) => (
              <tr key={index} className="table-row">
                <td>{header.header_id}</td>
                <td>{header.description}</td>
                <td>
                  <button
                    onClick={() => fetchTaxCodesData(header.header_id, header.header_name)}
                  >
                    View Tax Codes
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <Modal
        show={showTaxCodesModal}
        onHide={() => setShowTaxCodesModal(false)}
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>Tax Codes for {headerName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Tax ID</th>
                <th>Description</th>
                <th>Tax Type</th>
              </tr>
            </thead>
            <tbody>
              {taxCodesData.map((taxCode, index) => (
                <tr key={index}>
                  <td>{taxCode.tax_id}</td>
                  <td>{taxCode.description}</td>
                  <td>{taxCode.tax_type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowTaxCodesModal(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
