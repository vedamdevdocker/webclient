const HELP_ViewBOMExplodePage = () => (
  <div>
    <h2 className="subheading">Explode BOM Form</h2>
    <p className="indented-paragraph">
      The `ViewExplodeBOMForm` component allows you to perform BOM (Bill of Materials) explosion by selecting an item and specifying the required quantity. The exploded BOM results will be displayed in a table.
    </p>

    <h3 className="subheading">Form Fields</h3>
    <p className="indented-paragraph">
      This form contains the following fields:
    </p>
    <ul>
      <li>
        <strong>Item:</strong> Select the item for which you want to explode the BOM. You can choose from a list of available items.
        <span className="help-example">Example: Select "Product XYZ" from the list.</span>
      </li>
      <li>
        <strong>Quantity:</strong> Enter the required quantity for the selected item. The quantity should be a positive number.
        <span className="help-example">Example: Enter "10" for a quantity of 10 units.</span>
      </li>
    </ul>

    <h3 className="subheading">Explode BOM</h3>
    <p className="indented-paragraph">
      Click the "Explode BOM" button to initiate the BOM explosion process. The exploded BOM results will be displayed in a table.
      <span className="help-example">Example: After selecting "Product XYZ" and entering a quantity of "10," click the "Explode BOM" button to see the exploded BOM results.</span>
    </p>

    <h3 className="subheading">Access Permissions</h3>
    <p className="indented-paragraph">
      Your access to this module is determined by your user role and permissions. If you do not have the necessary access, you will see a message indicating that you do not have permission to view this module.
      <span className="help-example">Example: If you do not have permission, you will see a message indicating that you do not have access to this module.</span>
    </p>
  </div>
);

export default HELP_ViewBOMExplodePage;