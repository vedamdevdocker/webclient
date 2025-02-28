export const BUSINESS_PARTNERT_STATUS = [
  { name: "Active", short_name: "ACTIVE", sequence: 10 },
  { name: "Expired", short_name: "EXPIRED", sequence: 20 },
  { name: "Pending", short_name: "PENDING", sequence: 30 },
];


export const TAX_TYPES = [
  { name: "Income Tax", code: "INCOME_TAX", description: "Tax levied on income.", sequence: 10, display: true },
  { name: "Sales Tax", code: "SALES_TAX", description: "Tax levied on sales of goods and services.", sequence: 20, display: true },
  { name: "Property Tax", code: "PROPERTY_TAX", description: "Tax levied on property ownership.", sequence: 30, display: true },
  { name: "Corporate Tax", code: "CORPORATE_TAX", description: "Tax levied on corporate profits.", sequence: 40, display: true },
  { name: "Capital Gains Tax", code: "CAPITAL_GAINS_TAX", description: "Tax on the profit from the sale of assets.", sequence: 50, display: true },
  { name: "Value Added Tax", code: "VAT", description: "Tax on the value added at each stage of production.", sequence: 60, display: true },
  { name: "Excise Tax", code: "EXCISE_TAX", description: "Tax on specific goods like alcohol or tobacco.", sequence: 70, display: true },
  { name: "Goods and Services Tax", code: "GST", description: "Tax on goods and services, typically replacing multiple indirect taxes.", sequence: 75, display: true },
  { name: "Inheritance Tax", code: "INHERITANCE_TAX", description: "Tax on assets inherited from deceased persons.", sequence: 80, display: true },
  { name: "Customs Duty", code: "CUSTOMS_DUTY", description: "Tax on imports and exports.", sequence: 90, display: true },
  { name: "Payroll Tax", code: "PAYROLL_TAX", description: "Tax on wages and salaries paid by employers.", sequence: 100, display: true }
];

export const TAX_AUTHORITIES = [
  { name: "Internal Revenue Service", code: "IRS", description: "Federal tax authority in the United States.", sequence: 10, display: true },
  { name: "Canada Revenue Agency", code: "CRA", description: "Federal tax authority in Canada.", sequence: 20, display: true },
  { name: "HM Revenue & Customs", code: "HMRC", description: "Tax authority in the United Kingdom.", sequence: 30, display: true },
  { name: "Australian Taxation Office", code: "ATO", description: "Tax authority in Australia.", sequence: 40, display: true },
  { name: "Inland Revenue Department", code: "IRD", description: "Tax authority in New Zealand.", sequence: 50, display: true },
  { name: "Central Board of Direct Taxes", code: "CBDT", description: "Direct tax authority in India.", sequence: 60, display: true },
  { name: "Central Board of Indirect Taxes and Customs", code: "CBIC", description: "Indirect tax authority in India.", sequence: 70, display: true },
  { name: "South African Revenue Service", code: "SARS", description: "Tax authority in South Africa.", sequence: 80, display: true },
  { name: "Federal Tax Service", code: "FTS", description: "Tax authority in Russia.", sequence: 90, display: true },
  { name: "Federal Public Revenue Administration", code: "AFIP", description: "Tax authority in Argentina.", sequence: 100, display: true }
];

export const TAX_JURISDICTIONS = [
  { name: "Federal", code: "FEDERAL", description: "National level tax jurisdiction.", sequence: 10, display: true },
  { name: "State", code: "STATE", description: "State or regional level tax jurisdiction.", sequence: 20, display: true },
  { name: "County", code: "COUNTY", description: "County or district level tax jurisdiction.", sequence: 30, display: true },
  { name: "City", code: "CITY", description: "Municipal or city level tax jurisdiction.", sequence: 40, display: true },
  { name: "Provincial", code: "PROVINCIAL", description: "Provincial level tax jurisdiction, common in countries like Canada.", sequence: 50, display: true },
  { name: "Local", code: "LOCAL", description: "Local jurisdiction covering smaller areas like towns or villages.", sequence: 60, display: true },
  { name: "Special Economic Zone", code: "SEZ", description: "Jurisdiction with special tax rules to encourage economic activity.", sequence: 70, display: true },
  { name: "International", code: "INTERNATIONAL", description: "Jurisdictional authority spanning multiple countries, such as the European Union.", sequence: 80, display: true },
  { name: "Metropolitan", code: "METROPOLITAN", description: "Jurisdiction for large urban areas that might span multiple local governments.", sequence: 90, display: true },
  { name: "Territorial", code: "TERRITORIAL", description: "Jurisdiction for territories that might have distinct tax rules from the main country.", sequence: 100, display: true }
];

export const TAX_APPLICABILITY = [
  { name: "Applicable", code: "APPLICABLE", description: "Tax applies under standard circumstances.", sequence: 10, display: true },
  { name: "Exempt", code: "EXEMPT", description: "Tax does not apply due to exemptions.", sequence: 20, display: true },
  { name: "Zero-Rated", code: "ZERO_RATED", description: "Tax rate is 0%, but the item is taxable.", sequence: 30, display: true },
  { name: "Taxable", code: "TAXABLE", description: "Item or transaction is subject to tax.", sequence: 40, display: true },
  { name: "Non-Taxable", code: "NON_TAXABLE", description: "Item or transaction is not subject to tax.", sequence: 50, display: true },
  { name: "Reduced Rate", code: "REDUCED_RATE", description: "Tax applies at a reduced rate.", sequence: 60, display: true },
  { name: "Deferred", code: "DEFERRED", description: "Tax payment is deferred to a later date.", sequence: 70, display: true },
  { name: "Not Applicable", code: "NOT_APPLICABLE", description: "Tax does not apply in this case.", sequence: 80, display: true },
  { name: "Partially Exempt", code: "PARTIALLY_EXEMPT", description: "Only part of the transaction is exempt from tax.", sequence: 90, display: true },
  { name: "Reverse Charge", code: "REVERSE_CHARGE", description: "The tax is paid by the buyer instead of the seller.", sequence: 100, display: true }
];

export const TAX_REPORTING_CODES = [
  { name: "Standard Reporting", code: "STANDARD_REPORTING", description: "Regular tax reporting code used for standard transactions.", sequence: 10, display: true },
  { name: "Reduced Rate Reporting", code: "REDUCED_RATE_REPORTING", description: "Reporting code used when a reduced tax rate applies.", sequence: 20, display: true },
  { name: "Exempt Reporting", code: "EXEMPT_REPORTING", description: "Reporting code used for exempt transactions.", sequence: 30, display: true },
  { name: "Zero-Rated Reporting", code: "ZERO_RATED_REPORTING", description: "Reporting code for transactions taxed at a 0% rate.", sequence: 40, display: true },
  { name: "Deferred Reporting", code: "DEFERRED_REPORTING", description: "Reporting code used for deferred tax transactions.", sequence: 50, display: true },
  { name: "Reverse Charge Reporting", code: "REVERSE_CHARGE_REPORTING", description: "Reporting code for transactions where the buyer is liable for the tax.", sequence: 60, display: true },
  { name: "Non-Taxable Reporting", code: "NON_TAXABLE_REPORTING", description: "Reporting code used for non-taxable transactions.", sequence: 70, display: true },
  { name: "Partially Exempt Reporting", code: "PARTIALLY_EXEMPT_REPORTING", description: "Reporting code for transactions that are partially exempt from tax.", sequence: 80, display: true },
  { name: "Not Applicable Reporting", code: "NOT_APPLICABLE_REPORTING", description: "Reporting code used when tax reporting is not applicable.", sequence: 90, display: true },
  { name: "Special Scheme Reporting", code: "SPECIAL_SCHEME_REPORTING", description: "Reporting code for special tax schemes or arrangements.", sequence: 100, display: true }
];

export const EFFECTIVE_DATE = '2024-01-01'; // Alternatively one can enter null or '' empty string
export const BOM_ITEM_END_DAYS = 365; // Alternatively one can enter null or '' empty string


