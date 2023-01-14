import { Dimmer, Loader, Segment, Message, Grid, Image } from 'semantic-ui-react'
import DcfChart from '../DcfChart'
import DcfForm from '../DcfForm'
import DcfDisplayResult from '../DcfDisplayResult'
import { QueryResult } from '@apollo/client'
import { useState, useEffect, useCallback } from 'react';
import {FormDataType, ChartDataType, ChartDisplayInformationType} from './dcfToolsTypes'

import placeholderImage from '../../tsxImages/paragraph.png';


import * as S from "./styles";

interface DcfToolsProps {
  companyDataResponse: QueryResult
  ticker: string
}

interface CalculateChartDisplayProps {
  fixedChartData: ChartDataType,
  validatedFormData: FormDataType,
}

// const loadingFakeChartData = {
//   dates: ["2017", "2018", "2019", "2020"],
//   values: [1e6, 1.5e6, 2.5e6, 3e6],
// }
// interface ChartInformationType {
//   chartDisplayReturn: CalculateChartDisplayReturn,
//   loaded: boolean,
// }

const calculateChartDisplayData = (props:CalculateChartDisplayProps): ChartDisplayInformationType|null=> {
  const {fixedChartData, validatedFormData} = props
  const pastYearsToDisplay = 10

  const displayedChartData = {dates:fixedChartData.dates.slice(-pastYearsToDisplay), values:fixedChartData.values.slice(-pastYearsToDisplay)}

  if (displayedChartData.dates.length === 0){
    console.log("Shouldn't have arrays of length 0 in Chart")
    return null
  }
  for (let i = 0; i < validatedFormData.yearsToForcast; i++) {
    let nextDate = (parseInt(displayedChartData.dates[displayedChartData.dates.length-1])+1).toString()
    let nextVal = displayedChartData.values[displayedChartData.values.length-1] * (1.0 + validatedFormData.cagr/100.0)
    nextVal = Math.ceil((nextVal+1)/1000)*1000

    displayedChartData.dates.push(nextDate)
    displayedChartData.values.push(nextVal)
  }

  return {displayedChartData, presentYearIndex:(displayedChartData.dates.length - 1 - validatedFormData.yearsToForcast)}
}


const DcfTools = ({companyDataResponse, ticker}:DcfToolsProps) => {
  const [validatedFormData, setValidatedFormData] = useState({ cagr: 0, yearsToForcast: 0, discountRate: 0, terminalGrowth: 0, initialised: false})
  const [chartInformation, setChartInformation] = useState<null | ChartDisplayInformationType>(null)
  const [errorCalculatingData, setErrorCalculatingData] = useState(false)
  const [fixedChartData, setFixedChartData] = useState<null | ChartDataType>(null)
  const [dcfCalculationInformation, setDcfCalculationInformation] = useState<null | ChartDisplayInformationType>(null)

  if (!companyDataResponse.loading && !companyDataResponse.error && (fixedChartData === null)){
    setFixedChartData({
      dates: companyDataResponse.data.findCompany.data.cash_flow_statement.map((item:any) => (item.date.split('-')[0])).reverse(),
      values: companyDataResponse.data.findCompany.data.cash_flow_statement.map((item:any) => item.freeCashFlow).reverse()
    })
  }

  useEffect(() => {
    console.log("Calculating Display")
    if (fixedChartData === null){
      return
    }
    const ret = calculateChartDisplayData({
      fixedChartData : fixedChartData,
      validatedFormData
    })
    if (ret === null){
      setErrorCalculatingData(true)
    }
    else{
      setErrorCalculatingData(false)
      setChartInformation(ret)
      setDcfCalculationInformation(ret)
    }
  }, [validatedFormData, fixedChartData])

  const validDataSubmittedCallback = (formData:FormDataType) => {
    setValidatedFormData(formData)
  }

  const changeDataCallback = useCallback((newCalculationInfo:ChartDisplayInformationType) => {
    setDcfCalculationInformation(newCalculationInfo)
  }, [])


  const graphDataError = (errorCalculatingData || companyDataResponse.error)
  const graphDataLoading = (companyDataResponse.loading || (chartInformation === null) || (dcfCalculationInformation === null))
  
  return(
    <S.Container className="DCFTools">
      <S.FormContainer>
        <Grid textAlign='center' centered stackable columns={2}>
          <Grid.Column textAlign='center'>
            <S.FormHeader>
            <h2>{ticker} DCF Analysis</h2>
            <S.HintStyle>
              Hint: try dragging the purple bars after clicking 'calculate'
            </S.HintStyle>
            
            </S.FormHeader>
          </Grid.Column>
          <Grid.Column>
            <DcfForm onSubmitCallback={validDataSubmittedCallback}/>
          </Grid.Column>
        </Grid>
      </S.FormContainer>
      
      {graphDataError && 
        <Message negative>
          <Message.Header>We're sorry, we can't find the data for this company right now</Message.Header>
          <p>Try a different company</p>
        </Message>
      }

      {!graphDataError && graphDataLoading && 
        <Segment>
          <Dimmer active inverted>
            <Loader inverted/>
          </Dimmer>
          <Image src={placeholderImage} />
          <Image src={placeholderImage} />
          <Image src={placeholderImage} />
        </Segment>
      }

      {!graphDataError && !graphDataLoading && 
        <div>
          <DcfChart chartData={(chartInformation!.displayedChartData)!} PresentYearIndex={chartInformation!.presentYearIndex} changeDataCallback={changeDataCallback}/>

          {dcfCalculationInformation && <DcfDisplayResult dcfData={dcfCalculationInformation} formData={validatedFormData}/>}
        </div>

      }
    </S.Container>
  )
}

export default DcfTools