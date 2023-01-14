
export interface FormDataType {
  cagr: number,
  yearsToForcast: number,
  discountRate: number,
  terminalGrowth: number,
  initialised: boolean,
}
export interface ChartDataType {
  dates: string[],
  values: number[],
}

export interface ChartDisplayInformationType {
  displayedChartData: ChartDataType,
  presentYearIndex: number,
}
