// Load environment variables from the .env file
//import dotenv from 'dotenv';
//dotenv.config(); // This will read from your .env file and populate process.env

// Data generated from the apiUrl http://localhost:8010/list_ui_config_data
//export const API_URL = "http://localhost:8012";
//export const FRONTEND_URL = "http://localhost:3000";
//export const SMTP_URL = "http://localhost:5000";
//export const SMTP_EML = "smtp_server@flexerp.com";
//export const APPLICATION_NAME = "TradeTrackr";
//export const APPLICATION_LEVEL = "Production"  //Test, Production, Development

//export const API_URL = process.env.APP_SERVER_HOST_URL;
//export const FRONTEND_URL = process.env.WEB_CLIENT_HOST_URL;
//export const SMTP_URL = process.env.SMTP_HOST_URL;
//export const SMTP_EML = process.env.SMTP_EMAIL_ID;
//export const APPLICATION_NAME = process.env.APPLICATION_NAME;
//export const APPLICATION_LEVEL = process.env.APPLICATION_LEVEL;;

//export const API_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_APP_SERVER_HOST}:${process.env.REACT_APP_APP_SERVER_PORT}`;
//export const FRONTEND_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_WEB_CLIENT_HOST}:${process.env.REACT_APP_WEB_CLIENT_PORT}`;
//export const SMTP_URL = `${process.env.REACT_APP_PROTOCOL}://${process.env.REACT_APP_SMTP_HOST}:${process.env.REACT_APP_SMTP_PORT}`;


const appConfig = {
  applicationName: process.env.REACT_APP_APPLICATION_NAME,
  applicationLevel: process.env.REACT_APP_APPLICATION_LEVEL,
  webClientHost: process.env.REACT_APP_WEB_CLIENT_HOST,
  webClientPort: process.env.REACT_APP_WEB_CLIENT_PORT,
  webClientProtocol: process.env.REACT_APP_WEB_CLIENT_PROTOCOL,
  smtpHost: process.env.REACT_APP_SMTP_HOST,
  smtpPort: process.env.REACT_APP_SMTP_PORT,
  smtpEmail: process.env.REACT_APP_SMTP_EMAIL,
  appServerHost: process.env.REACT_APP_BACKEND_SERVER_HOST,
  appServerPort: process.env.REACT_APP_BACKEND_SERVER_PORT,
  appServerProtocol: process.env.REACT_APP_BACKEND_SERVER_PROTOCOL
};

// Assuming you already have the appConfig object

export const API_URL = `${appConfig.appServerProtocol}://${appConfig.appServerHost}:${parseInt(appConfig.appServerPort)}`;
//export const API_URL = `${appConfig.appServerProtocol}://${appConfig.appServerHost}`;
export const FRONTEND_URL = `${appConfig.webClientProtocol}://${appConfig.webClientHost}:${parseInt(appConfig.webClientPort)}`;
export const SMTP_URL = `${appConfig.smtpProtocol}://${appConfig.smtpHost}:${parseInt(appConfig.smtpPort)}`;
export const SMTP_EML = appConfig.smtpEmail;
export const APPLICATION_NAME = appConfig.applicationName;
export const APPLICATION_LEVEL = appConfig.applicationLevel;

console.log("In Constant declations the API_URL", { API_URL })
console.log("API config file ", appConfig)
export const SUPER_USERS_COUNT = 100;
export const TOKEN_EXPIRATION_CHECK_FREQUENCY = 600;  // For 10 min we need to set 600000 milli seconds
export const MODULE_LEVEL_VIEW_ACCESS = "canViewModule";
export const MODULE_LEVEL_CREATE_ACCESS = "canCreateModule";
export const MODULE_LEVEL_DELETE_ACCESS = "canDeleteModule";
export const MODULE_LEVEL_UPDATE_ACCESS = "canUpdateModule";
export const BACKEND_PRODUCT_MODULE_NAME = "products";
export const BACKEND_EMPLOYEE_MODULE_NAME = "employee";
export const BACKEND_SECURITY_MODULE_NAME = "security";
export const BACKEND_ADMIN_MODULE_NAME = "admin";
export const BACKEND_COMMON_MODULE_NAME = "common";
export const BACKEND_INVENTORY_MODULE_NAME = "inventory";
export const BACKEND_PURCHASE_MODULE_NAME = "purchase";
export const BACKEND_SALES_MODULE_NAME = "sales";
export const BACKEND_FINANCE_MODULE_NAME = "finance";
export const BACKEND_UTLITIES_MODULE_NAME = "utilities";
export const IS_INAPP_HELP_NEEDED = true;
export const IS_ACCESS_CONTROLLED_BY_REFRESH_TOKEN = false;

export const USER_STATUS = [
  { status: "Active", short_name: "ACTIVE", sequence: 10 },
  { status: "Expired", short_name: "EXPIRED", sequence: 20 },
];

export const ENV_INSTANCES = [
  { instance: "instance0", company: "Company_0", disname: "ALPHA", status: "Active", sequence: 1 },
  { instance: "instance1", company: "Company_0", disname: "BETA", status: "Active", sequence: 2 },
  { instance: "instance2", company: "Company_0", disname: "GAMA", status: "Active", sequence: 3 },
  { instance: "instance3", company: "Company_0", disname: "DELTA", status: "Active", sequence: 4 },
];

