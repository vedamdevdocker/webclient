import React from "react";
import "../utilities/css/appcss.css";
import RotatingImage from "./RotatingImage";
import BottomContainer from "./BottomContainer";
import DocumentationContainer from "./DocumentationContainer";
import AIChatForm from "./forms/AIChatForm";
import logger from "./Logs/logger";

function AIChatPage() {
    logger.info(`[${new Date().toLocaleTimeString()}] Loading ChatForm.`); // Info log message

    // Define the list of components to render
    const componentsToRender = [AIChatForm];
    const helpComponentsToRender = ["AIChatPage"];

    return (
        <div className="page-container">
            <h1 className="title">AI Chat</h1>

            <div className="parent-container">
                {componentsToRender.map((Component, index) => (
                    <React.Fragment key={index}>
                        <Component />
                    </React.Fragment>
                ))}
                <DocumentationContainer componentNames={helpComponentsToRender} />
            </div>
            <RotatingImage />
            <BottomContainer />
        </div>
    );
}

export default AIChatPage;
