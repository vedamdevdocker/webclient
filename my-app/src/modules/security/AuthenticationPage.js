import React, { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "../utilities/css/appcss.css";
import axios from "axios";
import { API_URL } from "../admin/setups/ConstDecl";
import { SUPER_USERS_COUNT, APPLICATION_NAME } from "../admin/setups/ConstDecl";

import RotatingImage from "../utilities/RotatingImage";
import LoginForm from "./accessmgmt/authtoolkit/forms/LoginForm";
import UserName from "./accessmgmt/authtoolkit/UserName";
import Logout from "./accessmgmt/authtoolkit/Logout";
import useToken from "./accessmgmt/authtoolkit/useToken";
import TokenExpirationChecker from "./accessmgmt/authtoolkit/TokenExpirationChecker";
import HomePage from "../application/HomePage";
import ViewAllEmployeesPage from "../employee/ViewAllEmployeesPage";
import AdminPage from "../admin/AdminPage";
import ViewEmailsPage from "../utilities/ViewEmailsPage";
import EmployeePage from "../employee/EmployeePage";
import CreateEmployeePage from "../employee/CreateEmployeePage";
import UserRolesPage from "./UserRolesPage";
import RegisterUserPage from "./accessmgmt/authtoolkit/RegisterUserPage";
import UsersListPage from "./accessmgmt/authtoolkit/UsersListPage";
import ListUserPermissions from "./modulepermissions/ListUserPermissions";
import GrantPermissions from "./modulepermissions/GrantPermissions";
import AssignUserModules from "./modulepermissions/AssignUserModules";
import LoadModulestoDB from "./modulepermissions/LoadModulestoDB";
import PurchasePage from "../purchase/PurchasePage";
import ViewBOMExplodePage from "../common/bom/ViewBOMExplodePage";
import ViewBOMModelPage from "../common/bom/ViewBOMModelPage";
import ProductsPage from "../products/ProductsPage";
import ViewAllProductsPage from "../products/product/ViewAllProductsPage";
import CommonPage from "../common/CommonPage";
import ViewAllUOMsPage from "../common/uoms/ViewAllUOMsPage";
import ViewAllCurrenciesPage from "../common/currencies/ViewAllCurrenciesPage";
import ViewAllExchangeRatesPage from "../common/exchangerates/ViewAllExchangeRatesPage";

import ViewAllTaxCodesPage from "../common/taxcodes/ViewAllTaxCodesPage";
import CreateTaxPage from "../common/taxcodes/CreateTaxPage";

import SearchDefaultTaxCodesPage from "../common/taxcodes/SearchDefaultTaxCodesPage";
import CreateDefaultTaxCodesPage from "../common/taxcodes/CreateDefaultTaxCodesPage";
import SearchDefaultTaxCodesResultsForm from "../common/taxcodes//forms/SearchDefaultTaxCodesResultsForm";


import ViewAllProdCatPage from "../products/productcategories/ViewAllProdCatPage";
import PermissionsContext from "./modulepermissions/PermissionsContext";
import CurrenciesPage from "../common/currencies/CurrenciesPage";
import TaxCodesPage from "../common/taxcodes/TaxCodesPage";
import ExchangeRatesPage from "../common/exchangerates/ExchangeRatesPage";

import UOMPage from "../common/uoms/UOMPage";
import BOMPage from "../common/bom/BOMPage";
import CreateProdCatPage from "../products/productcategories/CreateProdCatPage";
import CreateProductsPage from "../products/product/CreateProductsPage";
import PartnerResults from "../common/businesspartner/forms/PartnerResults";
import PartnerSearchPage from "../common/businesspartner/PartnerSearchPage";
import CreatePartnerPage from "../common/businesspartner/CreatePartnerPage";
import CreateUISetupsPage from "../admin/CreateUISetupsPage";
import UISetupsSearchPage from "../admin/UISetupsSearchPage";
import ShowAllUISetupsForm from "../admin/forms/ShowAllUISetupsForm";
import CreateDBSetupsPage from "../admin/CreateDBSetupsPage";
import DBSetupsSearchPage from "../admin/DBSetupsSearchPage";
import ViewAllLegalEntities from "../common/legalentity/ViewAllLegalEntities";
import LegalEntityPage from "../common/legalentity/LegalEntityPage";
import CreateLegalEntityPage from "../common/legalentity/CreateLegalEntityPage";
import ViewAllGroupCompaniesPage from "../common/groupcompany/ViewAllGroupCompaniesPage";
import GroupCompaniesPage from "../common/groupcompany/GroupCompaniesPage";
import CreateGroupCompaniesPage from "../common/groupcompany/CreateGroupCompaniesPage";
import ViewAllCompaniesPage from "../common/company/ViewAllCompaniesPage";
import CompaniesPage from "../common/company/CompaniesPage";
import CreateCompaniesPage from "../common/company/CreateCompaniesPage";

import ViewAllDepartmentsPage from "../common/department/ViewAllDepartmentsPage";
import DepartmentsPage from "../common/department/DepartmentsPage";
import CreateDepartmentsPage from "../common/department/CreateDepartmentsPage";

import FinancePage from "../finance/FinancePage";
import ViewAllAccountsPage from "../finance/accounts/ViewAllAccountsPage";
import CreateAccountPage from "../finance/accounts/CreateAccountPage";

import SearchDefaultAccountsPage from "../finance/accounts/SearchDefaultAccountsPage";
import SearchDefaultAccountsResultsForm from "../finance/accounts/forms/SearchDefaultAccountsResultsForm";

import InventoryPage from "../inventory/InventoryPage";


import ViewAllReceiptsPage from "../inventory/receipts/ViewAllReceiptsPage";
import CreateReceiptPage from "../inventory/receipts/CreateReceiptPage";
import CreatePOReceiptPage from "../inventory/receipts/CreatePOReceiptPage";

import ViewAllItemInventoriesPage from "../inventory/transactions/ViewAllItemInventoriesPage";
import SearchItemInventoryPage from "../inventory/transactions/SearchItemInventoryPage";

import ViewAllInspectionsPage from "../inventory/transactions/ViewAllInspectionsPage";
import UpdateInspectionPage from "../inventory/transactions/UpdateInspectionPage";

import PutAwayPage from "../inventory/transactions/PutAwayPage";

import ModifyUserPage from "./accessmgmt/authtoolkit/ModifyUserPage";

import UOMConversionPage from "../inventory/handling/UOMConversionPage";
import MoveInventoryPage from "../inventory/handling/MoveInventoryPage";
import ItemUOMConsolidationPage from "../inventory/handling/ItemUOMConsolidationPage";

import ViewAllPurchaseOrdersPage from "../purchase/purchaseorders/ViewAllPurchaseOrdersPage";
import PurchaseOrdersSearchPage from "../purchase/purchaseorders/PurchaseOrdersSearchPage";
import FindPOToUpdatePage from "../purchase/purchaseorders/FindPOToUpdatePage";
import UpdatePurchaseOrderHeaderPage from "../purchase/purchaseorders/UpdatePurchaseOrderHeaderPage";
import CreatePOPage from "../purchase/purchaseorders/CreatePOPage";
import CreateJournalPage from "../finance/journal/CreateJournalPage";
import CreateDefaultAccountsPage from "../finance/accounts/CreateDefaultAccountsPage";

import AutoCreateJournalPage from "../finance/journal/AutoCreateJournalPage";

import CreatePurchasePage from "../finance/purchaseinvoice/CreatePurchasePage";
import CreateSalesPage from "../finance/salesinvoice/CreateSalesPage";

import SearchPurchaseInvoicePage from "../finance/purchaseinvoice/SearchPurchaseInvoicePage";
import SearchPOInvoiceToUpdatePage from "../finance/purchaseinvoice/SearchPOInvoiceToUpdatePage";
import UpdatePOInvoiceHeaderPage from "../finance/purchaseinvoice/UpdatePOInvoiceHeaderPage";
import UpdateSOInvoiceHeaderPage from "../finance/salesinvoice/UpdateSOInvoiceHeaderPage";

import PurchaseInvoiceResultsForm from "../finance/purchaseinvoice/forms/PurchaseInvoiceResultsForm";
import AutoPOInvoiceCreationPage from "../finance/purchaseinvoice/AutoPOInvoiceCreationPage";
import SearchSOInvoiceToUpdatePage from "../finance/salesinvoice/SearchSOInvoiceToUpdatePage";

import SearchSalesInvoicePage from "../finance/salesinvoice/SearchSalesInvoicePage";
import SalesInvoiceResultsForm from "../finance/salesinvoice/forms/SalesInvoiceResultsForm";
import AutoCreateInvoiceFromSOPage from "../finance/salesinvoice/AutoCreateInvoiceFromSOPage";

import SalesPage from "../sales/SalesPage";
import CreateSOPage from "../sales/salesorders/CreateSOPage";
import SalesOrdersSearchPage from "../sales/salesorders/SalesOrdersSearchPage";
import ViewAllSalesOrdersPage from "../sales/salesorders/ViewAllSalesOrdersPage";
import UpdateSalesOrderHeaderPage from "../sales/salesorders/UpdateSalesOrderHeaderPage";
import FindSOToUpdatePage from "../sales/salesorders/FindSOToUpdatePage";

import SearchJournalPage from "../finance/journal/SearchJournalPage";
import JournalResultsForm from "../finance/journal/forms/JournalResultsForm";

import FindJounralToUpdatePage from "../finance/journal/FindJounralToUpdatePage";
import UpdateJournalHeaderPage from "../finance/journal/UpdateJournalHeaderPage";

import PickReleasePage from "../inventory/handling/PickReleasePage";

import CreateUOMPage from "../common/uoms/CreateUOMPage";

import CreateExchangeRatesPage from "../common/exchangerates/CreateExchangeRatesPage";
import CreateCurrenciesPage from "../common/currencies/CreateCurrenciesPage";

import CreateBOMPage from "../common/bom/CreateBOMPage";
import UpdateBOMPage from "../common/bom/UpdateBOMPage";

import CreateWarehousesPage from "../inventory/storagesystem/CreateWarehousesPage";
import CreateLocationsPage from "../inventory/storagesystem/CreateLocationsPage";
import CreateZonesPage from "../inventory/storagesystem/CreateZonesPage";
import CreateAislesPage from "../inventory/storagesystem/CreateAislesPage";
import CreateRowsPage from "../inventory/storagesystem/CreateRowsPage";
import CreateRacksPage from "../inventory/storagesystem/CreateRacksPage";
import CreateBinsPage from "../inventory/storagesystem/CreateBinsPage";
import ViewAllBinsPage from "../inventory/storagesystem/ViewAllBinsPage";

import ViewAllDesignationsPage from "../employee/ViewAllDesignationsPage";
import CreateDesignationsPage from "../employee/CreateDesignationsPage";

import FindDepartmentToUpdatePage from "../common/department/FindDepartmentToUpdatePage";
import UpdateDepartmentPage from "../common/department/UpdateDepartmentPage";

import FindCompanyToUpdatePage from "../common/company/FindCompanyToUpdatePage";
import UpdateCompanyPage from "../common/company/UpdateCompanyPage";
import CompanyDefaultAccPage from "../finance/accounts/CompanyDefaultAccPage";

import logger from "../utilities/Logs/logger"; // Import your logger module here

function AuthenticationPage() {
  const { token, removeToken, setToken } = useToken();
  const [userid, setuserid] = useState("");
  const [userPermissions, setUserPermissions] = useState([]);
  const [name, setName] = useState("");
  const [linstance, setLinstance] = useState("");
  const [emp_img, setImage] = useState("");
  const [refresh_token, setRefreshToken] = useState("");
  //const [journalResults, setJournalResults] = useState([]);

  const nameWithSpace = name + "\u00a0";
  const useridWithSpace = userid + "\u00a0";

  const handleLoginSuccess = (
    userid,
    username,
    token,
    refresh_token,
    name,
    instance,
    emp_img,
  ) => {
    setToken(token);
    setuserid(userid);
    setName(name);
    setImage(emp_img);
    setRefreshToken(refresh_token);
    setLinstance(instance);

    // Log successful login
    logger.info(
      `[${new Date().toLocaleTimeString()}] User logged in: ${username}`
    );
  };

  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");

    const fetchUserPermissions = async () => {
      if (token) {
        try {
          let filteredPermissions;
          if (parseInt(storedUserId) < parseInt(SUPER_USERS_COUNT)) {
            const modulesResponse = await axios.get(`${API_URL}/list_modules`, {
              headers: {
                Authorization: `Bearer ${token}`, // Authorization header added here for super users
              },
            });

            const allModules = modulesResponse.data.modules;
            filteredPermissions = allModules.flatMap((module) => ({
              delete_permission: true,
              id: Math.random(),
              module: module.folder_name,
              read_permission: true,
              update_permission: true,
              user_id: storedUserId,
              userid: storedUserId,
            }));
          } else {
            const response = await axios.get(
              `${API_URL}/list_user_permissions`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            filteredPermissions = response.data.user_module_permissions
              .filter(
                (permission) =>
                  parseInt(permission.user_id) === parseInt(storedUserId)
              )
              .map((permission) => ({
                ...permission,
                userid: storedUserId,
              }));
          }
          setUserPermissions(filteredPermissions);

          // Log user permissions retrieval
          logger.info(
            `[${new Date().toLocaleTimeString()}] User permissions retrieved for User ID: ${storedUserId}`
          );
        } catch (error) {
          console.error("Error fetching user permissions:", error);
        }
      }
    };

    const storedEmpname = localStorage.getItem("name");
    if (storedEmpname) {
      setName(storedEmpname);
    }

    const storedEmppic = localStorage.getItem("emp_img");
    if (storedEmppic) {
      setImage(storedEmppic);
    }

    const storedRefreshToken = localStorage.getItem("refresh_token");
    if (storedRefreshToken) {
      setRefreshToken(storedRefreshToken);
    }

    fetchUserPermissions();

    // Log component rendering
    logger.info(
      `[${new Date().toLocaleTimeString()}] AuthenticationPage component rendered.`
    );
  }, [token, userid, name, emp_img, refresh_token]);
  return (
    <BrowserRouter>
      {!token ? (
        <div className="page-container center-container">
          <h1 className="title">{APPLICATION_NAME}</h1>
          <LoginForm onLoginSuccess={handleLoginSuccess} />
          <div className="rotating-image-container">
            <RotatingImage />
          </div>
        </div>
      ) : (
        <PermissionsContext.Provider value={userPermissions}>
          <TokenExpirationChecker />
          <header className="logout_page-container">
            <div className="left-header">
              <UserName
                username={nameWithSpace}
                userid={useridWithSpace}
                linstance={linstance}
                emp_img={emp_img}
              />
            </div>
            <div className="left-header">
              <Link to="/" className="home-link">Home</Link>
            </div>
            <div className="right-header">
              <Logout token={removeToken} />{" "}
              {/* Pass the navigate function to Logout */}
            </div>
          </header>
          <Routes>
            <Route path="/Login" element={<LoginForm />} />
            <Route path="/" element={<HomePage />} />

            <Route path="/employee-functions" element={<EmployeePage />} />
            <Route path="/list-employees" element={<ViewAllEmployeesPage />} />

            <Route path="/create-employee" element={<CreateEmployeePage />} />
            <Route path="/user-functions" element={<UserRolesPage />} />
            <Route path="/list-users" element={<UsersListPage />} />
            <Route
              path="/list-user-permissions"
              element={<ListUserPermissions />}
            />
            <Route path="/register-user" element={<RegisterUserPage />} />
            <Route path="/create-permissions" element={<GrantPermissions />} />
            <Route
              path="/assign-user-modules"
              element={<AssignUserModules />}
            />
            <Route path="/common-module" element={<CommonPage />} />

            <Route path="/currencies-page" element={<CurrenciesPage />} />
            <Route path="/taxcodes-page" element={<TaxCodesPage />} />
            <Route path="/exchangerates-page" element={<ExchangeRatesPage />} />
            <Route path="/uom-page" element={<UOMPage />} />

            <Route path="/bom-page" element={<BOMPage />} />
            <Route path="/create-bom" element={<CreateBOMPage />} />

            <Route path="/update-bom" element={<UpdateBOMPage />} />

            <Route path="/bom-explosion" element={<ViewBOMExplodePage />} />
            <Route path="/bom" element={<ViewBOMModelPage />} />
            <Route path="/list-uoms" element={<ViewAllUOMsPage />} />

            <Route path="/create-uom" element={<CreateUOMPage />} />

            <Route path="/legal-entities" element={<LegalEntityPage />} />
            <Route
              path="/get-legal-entities"
              element={<ViewAllLegalEntities />}
            />
            <Route
              path="/create-legalentity"
              element={<CreateLegalEntityPage />}
            />
            <Route path="/group-companies" element={<GroupCompaniesPage />} />
            <Route
              path="/get-group-companies"
              element={<ViewAllGroupCompaniesPage />}
            />
            <Route
              path="/create-group-company"
              element={<CreateGroupCompaniesPage />}
            />

            <Route path="/companies" element={<CompaniesPage />} />
            <Route path="/get-companies" element={<ViewAllCompaniesPage />} />
            <Route path="/create-company" element={<CreateCompaniesPage />} />

            <Route path="/departments" element={<DepartmentsPage />} />
            <Route
              path="/get-departments"
              element={<ViewAllDepartmentsPage />}
            />
            <Route
              path="/create-department"
              element={<CreateDepartmentsPage />}
            />

            <Route
              path="/list-currencies"
              element={<ViewAllCurrenciesPage />}
            />
            <Route path="/list-tax-codes" element={<ViewAllTaxCodesPage />} />
            <Route path="/create-tax-codes" element={<CreateTaxPage />} />
            <Route
              path="/list-exchange-rates"
              element={<ViewAllExchangeRatesPage />}
            />
            <Route
              path="/list-product-categories"
              element={<ViewAllProdCatPage />}
            />
            <Route path="/admin-module" element={<AdminPage />} />

            <Route path="/load-all-modules" element={<LoadModulestoDB />} />
            <Route path="/view-emails-function" element={<ViewEmailsPage />} />

            <Route path="/create-ui-setups" element={<CreateUISetupsPage />} />

            <Route path="/create-db-setups" element={<CreateDBSetupsPage />} />

            <Route
              path="/list_ui_config_data/:searchType/:searchInput"
              element={<ShowAllUISetupsForm />}
            />
            <Route
              path="/list_ui_config_data"
              element={<ShowAllUISetupsForm />}
            />

            <Route path="/list-ui-setups" element={<UISetupsSearchPage />} />

            <Route path="/list-db-setups" element={<DBSetupsSearchPage />} />

            <Route path="/list-products" element={<ViewAllProductsPage />} />

            <Route
              path="/create-item-category"
              element={<CreateProdCatPage />}
            />

            <Route
              path="/create-items"
              element={<CreateProductsPage />}
            />

            <Route path="/products-module" element={<ProductsPage />} />
            <Route path="/purchase-module" element={<PurchasePage />} />

            <Route path="/sales-module" element={<SalesPage />} />

            <Route
              path="/partner-results/:searchType/:searchInput"
              element={<PartnerResults />}
            />
            <Route path="/partner-results" element={<PartnerResults />} />
            <Route
              path="/list-businesspartners"
              element={<PartnerSearchPage />}
            />

            <Route
              path="/create-businesspartner"
              element={<CreatePartnerPage />}
            />

            <Route path="/finance-module" element={<FinancePage />} />
            <Route path="/get-accounts" element={<ViewAllAccountsPage />} />
            <Route path="/create-account" element={<CreateAccountPage />} />

            <Route path="/inventory-module" element={<InventoryPage />} />
            <Route path="/get-bins" element={<ViewAllBinsPage />} />

            <Route path="/get-receipts" element={<ViewAllReceiptsPage />} />
            <Route
              path="/misllenious-receipt"
              element={<CreateReceiptPage />}
            />

            <Route
              path="/get-item-transactions"
              element={<ViewAllItemInventoriesPage />}
            />
            <Route
              path="/search-item-transactions"
              element={<SearchItemInventoryPage />}
            />

            <Route
              path="/get-inspections"
              element={<ViewAllInspectionsPage />}
            />
            <Route
              path="/update-inspection"
              element={<UpdateInspectionPage />}
            />

            <Route path="/perform-putaway" element={<PutAwayPage />} />

            <Route path="/modify-user" element={<ModifyUserPage />} />

            <Route
              path="/item-inventory-conversion"
              element={<UOMConversionPage />}
            />
            <Route path="/move-inventory" element={<MoveInventoryPage />} />

            <Route
              path="/item-transaction-consolidation"
              element={<ItemUOMConsolidationPage />}
            />

            <Route path="/get-journals" element={<SearchJournalPage />} />
            <Route
              path="/get-journal-results/:journalParameters"
              element={<JournalResultsForm />}
            />
            <Route
              path="/get-journal-results"
              element={<JournalResultsForm />}
            />
            <Route path="/create-journal" element={<CreateJournalPage />} />

            <Route
              path="/create-purchase-invoice"
              element={<CreatePurchasePage />}
            />
            <Route path="/create-sales-invoice" element={<CreateSalesPage />} />
            <Route
              path="/search-purchase-invoices"
              element={<SearchPurchaseInvoicePage />}
            />
            <Route
              path="/update-purchase-invoices"
              element={<SearchPOInvoiceToUpdatePage />}
            />

            <Route
              path="/get-purchase-invoices/:PurchaseParameters"
              element={<PurchaseInvoiceResultsForm />}
            />
            <Route
              path="/get-purchase-invoices"
              element={<PurchaseInvoiceResultsForm />}
            />

            <Route
              path="/update-po-invoice-headers/:PurchaseParameters"
              element={<UpdatePOInvoiceHeaderPage />}
            />

            <Route
              path="/update-so-invoice-headers/:SalesParameters"
              element={<UpdateSOInvoiceHeaderPage />}
            />

            <Route
              path="/search-sales-invoices"
              element={<SearchSalesInvoicePage />}
            />
            <Route
              path="/get-sales-invoices/:SalesParameters"
              element={<SalesInvoiceResultsForm />}
            />
            <Route
              path="/get-sales-invoices"
              element={<SalesInvoiceResultsForm />}
            />
            <Route
              path="/update-sales-invoices"
              element={<SearchSOInvoiceToUpdatePage />}
            />

            <Route
              path="/purchase-order-results/:searchInput"
              element={<ViewAllPurchaseOrdersPage />}
            />
            <Route
              path="/purchase-order-results"
              element={<ViewAllPurchaseOrdersPage />}
            />

            <Route
              path="/update-purchase-order-headers/:POParameters"
              element={<UpdatePurchaseOrderHeaderPage />}
            />

            <Route
              path="/get-purchase-orders"
              element={<PurchaseOrdersSearchPage />}
            />

            <Route
              path="/purchase-order-receipt"
              element={<CreatePOReceiptPage />}
            />

            <Route path="/create-purchase-order" element={<CreatePOPage />} />

            <Route path="/create-sales-order" element={<CreateSOPage />} />
            <Route
              path="/get-sales-orders"
              element={<SalesOrdersSearchPage />}
            />

            <Route
              path="/sales-order-results/:searchInput"
              element={<ViewAllSalesOrdersPage />}
            />
            <Route
              path="/sales-order-results"
              element={<ViewAllSalesOrdersPage />}
            />

            <Route
              path="/update-sales-order-headers/:SOParameters"
              element={<UpdateSalesOrderHeaderPage />}
            />

            <Route
              path="/update-sales-order"
              element={<FindSOToUpdatePage />}
            />

            <Route
              path="/update-purchase-order"
              element={<FindPOToUpdatePage />}
            />

            <Route path="/pick-release" element={<PickReleasePage />} />

            <Route
              path="/create-currencies"
              element={<CreateCurrenciesPage />}
            />

            <Route
              path="/create-exchange-rates"
              element={<CreateExchangeRatesPage />}
            />

            <Route
              path="/auto-create-invoices"
              element={<AutoCreateInvoiceFromSOPage />}
            />

            <Route
              path="/auto-create-purchase-invoices"
              element={<AutoPOInvoiceCreationPage />}
            />

            <Route
              path="/auto-create-Journals"
              element={<AutoCreateJournalPage />}
            />
            <Route
              path="/update-journal-header/:JournalParameters"
              element={<UpdateJournalHeaderPage />}
            />

            <Route
              path="/update-journal"
              element={<FindJounralToUpdatePage />}
            />

            <Route
              path="/search-default-accounts"
              element={<SearchDefaultAccountsPage />}
            />
            <Route
              path="/get-default-accounts/:Parameters"
              element={<SearchDefaultAccountsResultsForm />}
            />
            <Route
              path="/get-default-accounts"
              element={<SearchDefaultAccountsResultsForm />}
            />
            <Route
              path="/create-default-accounts"
              element={<CreateDefaultAccountsPage />}
            />

            <Route
              path="/search-default-taxcodes"
              element={<SearchDefaultTaxCodesPage />}
            />

            <Route
              path="/get-default-tax-codes/:Parameters"
              element={<SearchDefaultTaxCodesResultsForm />}
            />
            <Route
              path="/get-default-tax-codes"
              element={<SearchDefaultTaxCodesResultsForm />}
            />

            <Route
              path="/create-default-taxcodes"
              element={<CreateDefaultTaxCodesPage />}
            />

            <Route
              path="/create-warehouses"
              element={<CreateWarehousesPage />}
            />

            <Route
              path="/create-locations"
              element={<CreateLocationsPage />} />


            <Route
              path="/create-zones"
              element={<CreateZonesPage />} />



            <Route
              path="/create-aisles"
              element={<CreateAislesPage />} />

            <Route
              path="/create-rows"
              element={<CreateRowsPage />} />

            <Route
              path="/create-racks"
              element={<CreateRacksPage />} />

            <Route
              path="/create-bins"
              element={<CreateBinsPage />} />

            <Route
              path="/designations"
              element={<ViewAllDesignationsPage />} />

            <Route
              path="/create-designations"
              element={<CreateDesignationsPage />} />


            <Route
              path="/update-department"
              element={<UpdateDepartmentPage />}
            />

            <Route
              path="/update-departments"
              element={<FindDepartmentToUpdatePage />}
            />

            <Route
              path="/update-company"
              element={<UpdateCompanyPage />}
            />

            <Route
              path="/update-companies"
              element={<FindCompanyToUpdatePage />}
            />


            <Route
              path="/company-default-accounts"
              element={<CompanyDefaultAccPage />}
            />




          </Routes>
        </PermissionsContext.Provider>
      )}
    </BrowserRouter>
  );
}

export default AuthenticationPage;
