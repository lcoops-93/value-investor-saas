import {FormDataType, ChartDisplayInformationType} from '../DcfTools/dcfToolsTypes'
import { memo } from 'react';
import {  Statistic } from 'semantic-ui-react'

import * as S from "./styles";

interface DcfDisplayResultProps {
  dcfData: ChartDisplayInformationType,
  formData: FormDataType,
}

var SI_SYMBOL = ["", "k", "M", "B", "T", "e15", "Ee18"];

function currencyFormatter(number:number){

    // what tier? (determines SI symbol)
    var tier = Math.log10(Math.abs(number)) / 3 | 0;

    // if zero, we don't need a suffix
    if(tier === 0) return number;

    // get suffix and determine scale
    var suffix = SI_SYMBOL[tier];
    var scale = Math.pow(10, tier * 3);

    // scale the number
    var scaled = number / scale;

    // format number and add suffix
    return "$" + scaled.toFixed(1) + suffix;
}

const DcfDisplayResult = ({dcfData, formData}:DcfDisplayResultProps) => {
  const values = dcfData.displayedChartData.values
  const presentIndex = dcfData.presentYearIndex
  const discountRate = formData.discountRate/100.0
  const terminalGrowth = formData.terminalGrowth/100.0

  let cashFlowSum = 0.0
  for (let i = presentIndex+1; i < values.length; i++) {
    const yearsInFuture = i-presentIndex
    const discountFactor = 1.0/Math.pow((1.0+discountRate), yearsInFuture)
    
    cashFlowSum += discountFactor*values[i]

    // console.log(`i ${i}`)
    // console.log(`yearsInFuture ${yearsInFuture}`)
    // console.log(`discountFactor ${discountFactor}`)
    // console.log(`cashFlowSum ${cashFlowSum}`)
  }

  const terminalFactor = (1 + terminalGrowth) / (discountRate-terminalGrowth)
  let terminalValue = terminalFactor < 0 ? Infinity : values[values.length-1] * terminalFactor
  terminalValue = terminalValue/Math.pow((1.0+discountRate), values.length-1-presentIndex)

  const intrinsicValue = cashFlowSum + terminalValue

  // const displayDecimalPlaces = 2;
  const cashFlowDisplay = isFinite(cashFlowSum) ? currencyFormatter(cashFlowSum) : cashFlowSum.toString()
  const terminalValueDisplay = isFinite(terminalValue) ? currencyFormatter(terminalValue) : terminalValue.toString()
  const intrinsicValueDisplay = isFinite(intrinsicValue) ? currencyFormatter(intrinsicValue) : intrinsicValue.toString()


  return (
      <S.Container>
        <Statistic.Group widths='three'>
          <Statistic>
            <Statistic.Value>{cashFlowDisplay}</Statistic.Value>
            <Statistic.Label>Cash Flows</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{terminalValueDisplay}</Statistic.Value>
            <Statistic.Label>Terminal Value</Statistic.Label>
          </Statistic>

          <Statistic>
            <Statistic.Value>{intrinsicValueDisplay}</Statistic.Value>
            <Statistic.Label>Intrinsic Value</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </S.Container>

  )
}

export default memo(DcfDisplayResult)