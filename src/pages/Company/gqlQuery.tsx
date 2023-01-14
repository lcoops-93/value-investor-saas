import { gql } from '@apollo/client'

const FULL_COMPANY_DATA = gql`
query getCompanyData($ticker: String!) {
  findCompany(ticker: $ticker) {
    data {
      company_info {
        symbol
        companyName
        currency
        exchangeShortName
        industry
        sector
      }
      
      balance_sheet {
        date
        cashAndCashEquivalents
        shortTermInvestments
        cashAndShortTermInvestments
        netReceivables
        inventory
        otherCurrentAssets
        totalCurrentAssets
        propertyPlantEquipmentNet
        goodwill
        intangibleAssets
        goodwillAndIntangibleAssets
        longTermInvestments
        taxAssets
        otherNonCurrentAssets
        totalNonCurrentAssets
        otherAssets
        totalAssets
        accountPayables
        shortTermDebt
        taxPayables
        deferredRevenue
        otherCurrentLiabilities
        totalCurrentLiabilities
        longTermDebt
        deferredRevenueNonCurrent
        deferredTaxLiabilitiesNonCurrent
        otherNonCurrentLiabilities
        totalNonCurrentLiabilities
        otherLiabilities
        totalLiabilities
        commonStock
        retainedEarnings
        accumulatedOtherComprehensiveIncomeLoss
        othertotalStockholdersEquity
        totalStockholdersEquity
        totalLiabilitiesAndStockholdersEquity
        totalInvestments
        totalDebt
        netDebt
      }

      cash_flow_statement {
        date
        netIncome
        depreciationAndAmortization
        deferredIncomeTax
        stockBasedCompensation
        changeInWorkingCapital
        accountsReceivables
        inventory
        accountsPayables
        otherWorkingCapital
        otherNonCashItems
        netCashProvidedByOperatingActivities
        investmentsInPropertyPlantAndEquipment
        acquisitionsNet
        purchasesOfInvestments
        salesMaturitiesOfInvestments
        otherInvestingActivites
        netCashUsedForInvestingActivites
        debtRepayment
        commonStockIssued
        commonStockRepurchased
        dividendsPaid
        otherFinancingActivites
        netCashUsedProvidedByFinancingActivities
        effectOfForexChangesOnCash
        netChangeInCash
        cashAtEndOfPeriod
        cashAtBeginningOfPeriod
        operatingCashFlow
        capitalExpenditure
        freeCashFlow
      }

      income_statement {
        date
        revenue
        costOfRevenue
        grossProfit
        grossProfitRatio
        researchAndDevelopmentExpenses
        generalAndAdministrativeExpenses
        sellingAndMarketingExpenses
        otherExpenses
        operatingExpenses
        costAndExpenses
        interestExpense
        depreciationAndAmortization
        ebitda
        ebitdaratio
        operatingIncome
        operatingIncomeRatio
        totalOtherIncomeExpensesNet
        incomeBeforeTax
        incomeBeforeTaxRatio
        incomeTaxExpense
        netIncome
        netIncomeRatio
        eps
        epsdiluted
        weightedAverageShsOut
        weightedAverageShsOutDil
      }
    }
  }
}
`

const SHORT_COMPANY_DATA = gql`
query getShortCompanyData($ticker: String!) {
  findCompany(ticker: $ticker) {
    data {
      company_info {
        symbol
      }
      
      balance_sheet {
        date
        totalCurrentAssets
        totalNonCurrentAssets
        totalCurrentLiabilities
        totalNonCurrentLiabilities
        totalLiabilities
        totalStockholdersEquity
        totalDebt
      }

      cash_flow_statement {
        date
      }

      income_statement {
        date
      }
    }
  }
}
`

export {FULL_COMPANY_DATA, SHORT_COMPANY_DATA} 