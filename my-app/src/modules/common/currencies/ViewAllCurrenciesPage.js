//import React, { useEffect } from "react";
import ViewAllCurrenciesForm from "./forms/ViewAllCurrenciesForm";
import RotatingImage from "../../utilities/RotatingImage";
import BottomContainer from "../../utilities/BottomContainer";

// Import your logger utility here
//import logger from "../../utilities/Logs/logger";

export default function ViewAllCurrenciesPage() {
  // Log tokens, userId, and other constants when the component is loaded
  //logger.info(`[${new Date().toLocaleTimeString()}] Entered in ViewAllCurrencies Page`);  

  return (
    <div className="page-container">
      <h1 className="title">Currencies</h1>
      <ViewAllCurrenciesForm />

      <BottomContainer />
            
      <RotatingImage />
    </div>
  );
}
