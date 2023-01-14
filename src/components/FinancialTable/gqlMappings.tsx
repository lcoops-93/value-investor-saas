
const balanceSheetGqlToInterface = {
  totalCurrentAssets : "Current Assets",
  totalNonCurrentAssets : "Non Current Assets",
  totalCurrentLiabilities : "Current Liabilities",
  totalNonCurrentLiabilities : "Non Current Liabilities",
  totalLiabilities : "Total Liabilities",
  totalStockholdersEquity : "Stockholders Equity"
}

const incomeStatementGqlToInterface = {
  revenue: "Revenue",
  costOfRevenue: "Cost of Revenue",
  grossProfit: "Gross Profit",
  researchAndDevelopmentExpenses: "R&D Expenses",
  generalAndAdministrativeExpenses: "General & Admin Expenses",
  sellingAndMarketingExpenses: "Selling & Marketing Expenses",
  operatingExpenses: "Total Operating Expenses",
  operatingIncome: "Operating Income",
  totalOtherIncomeExpensesNet: "Other Income Expenses",
  incomeTaxExpense: "Income Tax Expenses",
  netIncome:  "Net Income"
}

const cashFlowGqlToInterface = {
  netCashProvidedByOperatingActivities: "Operating Cash Flow",
  netCashUsedForInvestingActivites: "Investing Cash Flow",
  netCashUsedProvidedByFinancingActivities: "Financing Cash Flow",
  cashAtEndOfPeriod: "End Cash Position",
  capitalExpenditure: "Capital Expenditure",
  freeCashFlow: "Free Cash Flow"
}



export {balanceSheetGqlToInterface, incomeStatementGqlToInterface, cashFlowGqlToInterface}