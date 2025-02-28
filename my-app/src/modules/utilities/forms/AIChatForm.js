import React, { useState, useRef, useEffect } from "react";
import axios from "axios";

import {
  API_URL,
  BACKEND_UTLITIES_MODULE_NAME,
  MODULE_LEVEL_VIEW_ACCESS,
} from "../../admin/setups/ConstDecl";
import logger from "../../utilities/Logs/logger";
import CheckModuleAccess from "../../security/modulepermissions/CheckModuleAccess";
import "../../utilities/css/appcss.css";

export default function AIChatForm() {
  const [chatHistory, setChatHistory] = useState(""); // Stores full conversation
  const [inputText, setInputText] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBoxRef = useRef(null);
  const inputRef = useRef(null); // Reference for input field

  const hasRequiredAccess = CheckModuleAccess(
    BACKEND_UTLITIES_MODULE_NAME,
    MODULE_LEVEL_VIEW_ACCESS
  );

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatHistory]);

  const handleChange = (e) => {
    setInputText(e.target.value);
    logger.debug(`[${new Date().toLocaleTimeString()}] Input changed: ${e.target.value}`);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!inputText.trim()) return; // Ignore empty submissions
    setLoading(true);

    if (!hasRequiredAccess) {
      logger.warn(`[${new Date().toLocaleTimeString()}] User does not have access to submit the form.`);
      setChatHistory((prev) => prev + "\n\nAI: You do not have permission to access this module.");
      setLoading(false);
      return;
    }

    const username = localStorage.getItem("username") || "You"; // Fetch username, fallback to "You"
    const userMessage = `\n\n${username}: ${inputText}`;

    try {
      const token = localStorage.getItem("token");
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };

      const formData = { prompt: inputText };

      const response = await axios.post(`${API_URL}/generate_response`, formData, { headers });

      logger.info(`[${new Date().toLocaleTimeString()}] AI response received: ${response.data.response}`);

      setChatHistory((prev) => prev + userMessage + `\n\nAI: ${response.data.response}`);
    } catch (error) {
      const errorMessage =
        error.response && error.response.data.error.code === "insufficient_quota"
          ? "API quota exceeded. Please check your plan and billing details."
          : "Error fetching response. Please try again.";
      setChatHistory((prev) => prev + userMessage + `\n\nAI: ${errorMessage}`);
      logger.error(`[${new Date().toLocaleTimeString()}] Error fetching AI response:`, error);
    }

    setInputText(""); // Clear input field
    setLoading(false);

    // Auto-focus back to input field
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="child-container form-container">
      {hasRequiredAccess ? (
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column" }}>
          {/* Input and Button at the Top */}
          <div className="input-container" style={{ display: "flex", width: "100%", marginBottom: "10px" }}>
            <input
              type="text"
              id="prompt"
              name="prompt"
              value={inputText}
              onChange={handleChange}
              ref={inputRef} // Set reference to input field
              className="form-control input-field"
              placeholder="Type your message..."
              disabled={loading}
              style={{ flex: 1, marginRight: "10px" }}
            />
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? "Generating..." : "Send"}
            </button>
          </div>

          {/* Chat History (Now Below) */}
          <div
            ref={chatBoxRef}
            className="form-control input-field"
            style={{
              width: "100%",
              height: "300px",
              resize: "none",
              overflowY: "auto",
              padding: "10px",
              backgroundColor: "#f8f9fa",
              borderRadius: "5px",
              whiteSpace: "pre-wrap",
            }}
            readOnly
          >
            {chatHistory || "Your conversation will appear here..."}
          </div>
        </form>
      ) : (
        <div>You do not have permission to access this module.</div>
      )}
    </div>
  );
}
