import React from "react";
import "../../modules/utilities/css/appcss.css";

const HELP_CommonPage = () => (
  <div>
    <h2 className="subheading">Common Page Menu</h2>
    <p className="indented-paragraph">
      The `Common Page Menu` provides essential functionalities for managing various business-related data within the system. This includes managing business partners, currencies, tax codes, units of measurement, bill of materials (BOM), legal entities, companies, departments, and more.
    </p>

    <h3 className="subheading">Business Partners</h3>
    <p className="indented-paragraph">
      The Business Partner section allows administrators to manage and view information about business partners with whom the organization interacts. It includes functionalities to list, create, and update business partner details.
    </p>

    <h3 className="subheading">List Business Partners</h3>
    <p className="indented-paragraph">
      The `List Business Partners` option provides a list of all the business partners associated with the organization, making it easy to view and manage their details.
    </p>

    <h3 className="subheading">Create Business Partner</h3>
    <p className="indented-paragraph">
      The `Create Business Partner` functionality allows administrators to add new business partner records into the system, ensuring that all essential business partner information is captured for future transactions.
    </p>

    <h3 className="subheading">UOM (Units of Measurement)</h3>
    <p className="indented-paragraph">
      The `UOM` module helps manage the units of measurement used for products or goods in the system, ensuring that all measurements are consistent and standardized across the platform.
    </p>

    <h3 className="subheading">View UOMs</h3>
    <p className="indented-paragraph">
      The `View UOMs` option allows users to view a list of all units of measurement currently registered in the system, ensuring they can track and manage the different measurement types used across various products and services.
    </p>

    <h3 className="subheading">Create UOMs</h3>
    <p className="indented-paragraph">
      The `Create UOMs` feature allows users to add new units of measurement to the system, which can be applied to various products and goods as needed.
    </p>

    <h3 className="subheading">Tax Code Functions</h3>
    <p className="indented-paragraph">
      The `Tax Code Functions` section is designed for managing tax-related codes within the system. It helps ensure that all transactions adhere to appropriate tax regulations.
    </p>

    <h3 className="subheading">View Tax Codes</h3>
    <p className="indented-paragraph">
      The `View Tax Codes` option provides users with the ability to view and manage all tax codes that have been defined within the system, ensuring that tax rules are applied correctly.
    </p>

    <h3 className="subheading">Create Tax Codes</h3>
    <p className="indented-paragraph">
      The `Create Tax Codes` functionality allows users to add new tax codes to the system, enabling them to configure specific tax rates or rules for various transactions.
    </p>

    <h3 className="subheading">Get Default Tax Codes</h3>
    <p className="indented-paragraph">
      The `Get Default Tax Codes` option allows users to retrieve and apply predefined default tax codes, ensuring consistency across tax calculations.
    </p>

    <h3 className="subheading">Create Default Tax Codes</h3>
    <p className="indented-paragraph">
      The `Create Default Tax Codes` feature allows users to establish and define default tax codes for automatic application to applicable transactions.
    </p>

    <h3 className="subheading">Exchange Rates</h3>
    <p className="indented-paragraph">
      The `Exchange Rates` section enables administrators to manage and track exchange rates between different currencies, ensuring accurate financial transactions across regions.
    </p>

    <h3 className="subheading">View Rates</h3>
    <p className="indented-paragraph">
      The `View Rates` option allows users to view the current exchange rates for various currencies, helping ensure that transactions are processed at the correct conversion rate.
    </p>

    <h3 className="subheading">Create Exchange Rates</h3>
    <p className="indented-paragraph">
      The `Create Exchange Rates` functionality allows administrators to define and update exchange rates between currencies, ensuring that accurate financial conversions are performed.
    </p>

    <h3 className="subheading">Currencies</h3>
    <p className="indented-paragraph">
      The `Currencies` module allows administrators to manage the list of currencies used within the organization, enabling smooth transactions across different regions.
    </p>

    <h3 className="subheading">View Currencies</h3>
    <p className="indented-paragraph">
      The `View Currencies` feature allows users to see all currencies currently available in the system, making it easier to track and manage multi-currency transactions.
    </p>

    <h3 className="subheading">Create Currencies</h3>
    <p className="indented-paragraph">
      The `Create Currencies` option enables administrators to add new currencies to the system, allowing for transactions in newly supported regions or countries.
    </p>

    <h3 className="subheading">BOM (Bill of Materials)</h3>
    <p className="indented-paragraph">
      The `BOM` module is used for managing and defining the bill of materials for products. This includes functionalities to view, create, and update the materials required for manufacturing items.
    </p>

    <h3 className="subheading">Explode BOM</h3>
    <p className="indented-paragraph">
      The `Explode BOM` functionality allows users to break down and view the detailed components that make up a product, providing a clear picture of the materials required.
    </p>

    <h3 className="subheading">View BOM</h3>
    <p className="indented-paragraph">
      The `View BOM` option provides a detailed view of all bill of materials for products, helping users track the specific components required for each product.
    </p>

    <h3 className="subheading">Create BOM</h3>
    <p className="indented-paragraph">
      The `Create BOM` functionality allows administrators to define new bills of materials for products, listing the components necessary for manufacturing or assembly.
    </p>

    <h3 className="subheading">Update BOM</h3>
    <p className="indented-paragraph">
      The `Update BOM` feature enables users to modify existing bills of materials, ensuring that any changes to materials or product specifications are accurately reflected.
    </p>

    <h3 className="subheading">Legal Entities</h3>
    <p className="indented-paragraph">
      The `Legal Entities` section allows administrators to manage legal entities within the organization, which are crucial for financial reporting and compliance.
    </p>

    <h3 className="subheading">View Legal Entities</h3>
    <p className="indented-paragraph">
      The `View Legal Entities` option provides a list of all legal entities registered in the system, making it easier to track and manage each entity’s legal status.
    </p>

    <h3 className="subheading">Create Legal Entity</h3>
    <p className="indented-paragraph">
      The `Create Legal Entity` functionality allows users to add new legal entities to the system, establishing new corporate entities for compliance and financial purposes.
    </p>

    <h3 className="subheading">Group Companies</h3>
    <p className="indented-paragraph">
      The `Group Companies` section enables administrators to manage companies that belong to the same group or holding company, ensuring efficient oversight of multi-company structures.
    </p>

    <h3 className="subheading">View Group Companies</h3>
    <p className="indented-paragraph">
      The `View Group Companies` feature provides a list of all companies within a group, allowing users to track and manage their interrelations and business activities.
    </p>

    <h3 className="subheading">Create Group Company</h3>
    <p className="indented-paragraph">
      The `Create Group Company` option allows users to add new companies to a group, enabling the organization to expand and manage new business units within a single group.
    </p>

    <h3 className="subheading">Companies</h3>
    <p className="indented-paragraph">
      The `Companies` section enables users to manage and view company records, allowing for the efficient tracking of business units within the system.
    </p>

    <h3 className="subheading">View Companies</h3>
    <p className="indented-paragraph">
      The `View Companies` option provides users with a list of all companies in the system, allowing for easy access to company-related information.
    </p>

    <h3 className="subheading">Create Company</h3>
    <p className="indented-paragraph">
      The `Create Company` feature enables users to add new company profiles to the system, ensuring that all company details are captured for operational purposes.
    </p>

    <h3 className="subheading">Update Company</h3>
    <p className="indented-paragraph">
      The `Update Company` functionality allows users to modify existing company details, ensuring that company records remain up-to-date.
    </p>

    <h3 className="subheading">Departments</h3>
    <p className="indented-paragraph">
      The `Departments` section is used for managing and tracking different departments within an organization, helping streamline internal operations.
    </p>

    <h3 className="subheading">View Departments</h3>
    <p className="indented-paragraph">
      The `View Departments` option provides users with a list of all departments in the organization, allowing for efficient management and reporting.
    </p>

    <h3 className="subheading">Create Department</h3>
    <p className="indented-paragraph">
      The `Create Department` feature enables users to establish new departments within the organization, facilitating the proper allocation of resources and responsibilities.
    </p>

    <h3 className="subheading">Update Department</h3>
    <p className="indented-paragraph">
      The `Update Department` functionality allows users to modify department details, ensuring that department structures and roles remain aligned with the organization's goals.
    </p>

  </div>
);

export default HELP_CommonPage;
