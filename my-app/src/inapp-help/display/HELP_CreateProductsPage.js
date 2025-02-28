import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CreateProductsPage = () => (
  <div>
    <h2 className="subheading">Create Item Form</h2>
    <p className="indented-paragraph">
      The `Create Item Form` component allows you to add new items to the inventory system. It includes fields for item details such as the item code, name, category, manufacturer, stock levels, and more.
    </p>

    <h3 className="subheading">Item Details</h3>
    <p className="indented-paragraph">
      Enter the basic information about the item, including the name, category, manufacturer, and barcode. You can also specify the default unit of measure (UOM), stock quantities, and location for the item.
    </p>

    <h3 className="subheading">Stock Information</h3>
    <p className="indented-paragraph">
      The form allows you to set stock parameters such as the current stock quantity, minimum stock level, maximum stock level, reorder point, and lead time.
    </p>

    <h3 className="subheading">Item Images</h3>
    <p className="indented-paragraph">
      You can upload multiple images of the item to provide visual references. Simply select the images from your device and they will be displayed as previews.
    </p>

    <h3 className="subheading">Expiry Date & Serial Control</h3>
    <p className="indented-paragraph">
      If the item has an expiry date, you can check the "Is Expired" checkbox and provide an expiry date. Additionally, you can enable serial control for items that require tracking individual serial numbers.
    </p>

    <h3 className="subheading">Product Type and Notes</h3>
    <p className="indented-paragraph">
      Specify the product type and add any relevant notes that may assist with managing the item.
    </p>

    <h3 className="subheading">Submission</h3>
    <p className="indented-paragraph">
      Once all information is filled out, submit the form to create the item in the system. A success message will be displayed upon successful submission.
    </p>
  </div>
);

export default HELP_CreateProductsPage;
