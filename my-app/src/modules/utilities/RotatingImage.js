import React, { useState, useEffect } from "react";
import logger from "../utilities/Logs/logger"; // Import your logger module here
import amethystImage from "./images/amethyst-purple.JPG";
import { Button, Modal } from "react-bootstrap"; // Import Modal from React Bootstrap
import AIChatForm from "./forms/AIChatForm"; // Import AIChatForm component

export default function RotatingImage() {
  const [rotationAngle, setRotationAngle] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status

  useEffect(() => {
    logger.info(`[${new Date().toLocaleTimeString()}] RotatingImage is rendered.`);

    // Check if the user is logged in (username exists in localStorage)
    const username = localStorage.getItem("username");
    setIsLoggedIn(!!username); // Convert to boolean (true if username exists)

    const rotateImage = () => {
      setRotationAngle((prevAngle) => prevAngle + 1);
    };

    const rotationInterval = setInterval(rotateImage, 10);

    return () => {
      logger.info(`[${new Date().toLocaleTimeString()}] RotatingImage is unmounted.`);
      clearInterval(rotationInterval);
    };
  }, []);

  return (
    <div className="rotating-image-container">
      {/* Show button only if the user is logged in */}
      {isLoggedIn && (
        <Button variant="primary" onClick={() => setShowModal(true)} className="rotate-button">
          Open AI Chat
        </Button>
      )}

      <div className="rotating-image">
        <img
          src={amethystImage}
          alt="Rotating"
          style={{
            transform: `rotate(${rotationAngle}deg)`,
            width: "20%",
            height: "auto",
          }}
        />
      </div>

      {/* Large Modal for AI Chat Form */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg" aria-labelledby="contained-modal-title-vcenter" centered>
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ maxHeight: "70vh", overflowY: "auto" }}>
          <AIChatForm />
        </Modal.Body>
      </Modal>
    </div>
  );
}

