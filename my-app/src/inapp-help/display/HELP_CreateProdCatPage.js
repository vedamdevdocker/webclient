import "../../modules/utilities/css/appcss.css";
import React from "react";

const HELP_CreateProdCatPage = () => (
  <div>
    <h2 className="subheading">Create Item Category</h2>
    <p className="indented-paragraph">
      The `CreateProdCatForm` component allows you to create new item categories in the system.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      This form contains various fields for entering item category information:
    </p>
    <ul>
      <li>
        <strong>Category Name:</strong> Enter the name of the category.
        <span className="help-example">Example: Electronics</span>
      </li>
      <li>
        <strong>Default UOM (Unit of Measure):</strong> Select the default unit of measure for items in this category.
        <span className="help-example">Example: Pieces</span>
      </li>
      <li>
        <strong>Description:</strong> Provide a description for the item category.
        <span className="help-example">Example: A category for electronic devices and components.</span>
      </li>
      <li>
        <strong>Active:</strong> Check this box to mark the category as active; uncheck it to mark as inactive.
        <span className="help-example">Example: Active (checked)</span>
      </li>
      <li>
        <strong>Tax Information:</strong> Enter any tax-related information for the item category.
        <span className="help-example">Example: VAT: 7%</span>
      </li>
      <li>
        <strong>Image:</strong> Upload an image related to the item category (JPG, PNG, GIF).
        <span className="help-example">Example: category_image.jpg</span>
      </li>
    </ul>

    <h3 className="subheading">Submit Button</h3>
    <p className="indented-paragraph">
      Click the "Create Item Category" button to create a new item category with the provided information.
    </p>

    <h3 className="subheading">Access Permissions</h3>
    <p className="indented-paragraph">
      Your access to this module is determined by your user role and permissions. If you do not have the necessary access, you will see a message indicating that you do not have permission to view this module.
      <span className="help-example">Example: You do not have permission to view this module</span>
    </p>
  </div>
);

export default HELP_CreateProdCatPage;
