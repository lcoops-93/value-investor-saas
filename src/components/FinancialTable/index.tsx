import { Table, Tab, Dimmer, Loader, Segment, Message } from 'semantic-ui-react'
import { FinancialTableType } from '../../utils/enums'
import { QueryResult } from '@apollo/client'

import {balanceSheetGqlToInterface, 
  incomeStatementGqlToInterface, 
  cashFlowGqlToInterface} from "./gqlMappings"

import * as S from "./styles"

interface FinancialTableProps {
  companyDataResponse: QueryResult
}


interface FinTableProps {
  tableType: FinancialTableType,
  companyData: any
}


type gqlToInterfaceType = typeof balanceSheetGqlToInterface | typeof incomeStatementGqlToInterface | typeof cashFlowGqlToInterface | Object

const DisplayTable = ({tableType, companyData}:FinTableProps) => {
  console.log(tableType)
  let tableData:any[] = []
  let gqlToInterface:gqlToInterfaceType = {}

  switch (tableType) {
    case FinancialTableType.BalanceSheet:
      tableData = companyData.balance_sheet
      gqlToInterface = balanceSheetGqlToInterface
      break
    case FinancialTableType.CashFlowStatement:
      tableData = companyData.cash_flow_statement
      gqlToInterface = cashFlowGqlToInterface
      break
    case FinancialTableType.IncomeStatement:
      tableData = companyData.income_statement
      gqlToInterface = incomeStatementGqlToInterface
      break
    default:
      throw new Error()
  }



  return(
    <Table unstackable definition celled>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell />
            {tableData.map((item:any) => {
              const dateYear = item.date.split('-')[0]
              return (<Table.HeaderCell key={dateYear}>
                {dateYear}
              </Table.HeaderCell>)
              })
            }
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {Object.entries(gqlToInterface).map(([gqlKey, rowName]) => {
          return (
            <Table.Row key={rowName}>
              <Table.Cell key={`${rowName}_def`}>{rowName}</Table.Cell>
              {tableData.map((item:any) => {
                const dateYear = item.date.split('-')[0]
                return (<Table.Cell key={`${dateYear}_${gqlKey}`}>
                  {item[gqlKey]}
                </Table.Cell>)
                })
              }
            </Table.Row>
          )
        })
        }
      </Table.Body>
    </Table>
  )
}

function FinancialTable({ companyDataResponse } : FinancialTableProps) {

  if (companyDataResponse.loading)  {
    const loadingPanes = [
      { menuItem: 'Balance Sheet', render: () => <Tab.Pane loading>Fetching Data</Tab.Pane> },
      { menuItem: 'Income Statement', render: () => <Tab.Pane loading>Fetching Data</Tab.Pane> },
      { menuItem: 'Cash Flow Statement', render: () => <Tab.Pane loading>Fetching Data</Tab.Pane> },
    ]
    return(

      <Segment>
        <Dimmer active inverted>
          <Loader inverted/>
        </Dimmer>

        <Tab panes={loadingPanes} />
      </Segment>
    )
  }

  if (companyDataResponse.error)  {
    return(
      <Message negative>
        <Message.Header>We're sorry, we can't find the data right now</Message.Header>
        <p>Try reloading the page</p>
      </Message>
      // <div className="ui negative message">
      //   <i className="close icon"></i>
      //   <div className="header">
      //     We're sorry, we can't find the data right now
      //   </div>
      //   <p>Try reloading the page
      // </p></div>
    )
  }
  
  const companyData = companyDataResponse.data.findCompany.data
  const panes = [
    { menuItem: 'Balance Sheet', render: () => <Tab.Pane>{<DisplayTable tableType={FinancialTableType.BalanceSheet} companyData={companyData}/>}</Tab.Pane> },
    { menuItem: 'Income Statement', render: () => <Tab.Pane>{<DisplayTable tableType={FinancialTableType.IncomeStatement} companyData={companyData}/>}</Tab.Pane> },
    { menuItem: 'Cash Flow Statement', render: () => <Tab.Pane>{<DisplayTable tableType={FinancialTableType.CashFlowStatement} companyData={companyData}/>}</Tab.Pane> },
  ]

  console.log(companyData)
  return (
    <S.Container>
      <Tab panes={panes} />
    </S.Container>

  )
}

export default FinancialTable

