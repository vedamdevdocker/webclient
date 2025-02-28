import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_ViewBOMPage = () => (
  <div>
    <h2 className="subheading">View BOM Model Page</h2>
    <p className="indented-paragraph">
      The View BOM Model Page provides a centralized interface for exploring Bill of Materials (BOM) data. It consists of two main components: the BOM Form and the BOM Results Page.
    </p>

    <h3 className="subheading">BOM Form</h3>
    <p className="indented-paragraph">
      The BOM Form allows you to query BOM data based on specified parameters. You can choose to view BOM data by item codes or descriptions. Enter the required details, click the "BOM" button, and the results will be displayed on the BOM Results Page.
      <span className="help-example">Example: Select an item code, click the "BOM" button, and view the exploded BOM data.</span>
    </p>

    <h3 className="subheading">BOM Results Page</h3>
    <p className="indented-paragraph">
      The BOM Results Page displays the exploded BOM data in a tabular format. It includes information such as model items, levels, parent items, component items, quantities, and more. If no data is available, a documentation container is shown with additional information.
      <span className="help-example">Example: Explore the hierarchical structure of BOM data with details on each level and component.</span>
    </p>


  </div>
);

export default HELP_ViewBOMPage;
