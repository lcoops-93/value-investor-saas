import React from 'react';
import {Bar} from 'react-chartjs-2';
import 'chartjs-plugin-dragdata'

let gPresentYearIndex = 0
let gChangeDataCallback=null
let gDates = null
let gValues = null

var SI_SYMBOL = ["", "k", "M", "B", "T", "e15", "Ee18"];
function currencyFormatter(number){

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

const dragDataPlugin = {
  dragData: {
    round: -3,
    magnet: {
        to: Math.round // to: (value) => value + 5
    },
    onDragStart: function(e, element, index) {
      
      if (index <= gPresentYearIndex) {
        // this would prohibit dragging the first datapoint in the first
        // dataset entirely
        return false
      }

    },
    onDragEnd: function(e, datasetIndex, index, value) {
      // you may use this callback to store the final datapoint value
      // (after dragging) in a database, or update other UI elements that
      // dependent on it
      if (gChangeDataCallback === null || gDates === null || gValues === null){
        return
      }


      gValues[index] = value

      gChangeDataCallback({displayedChartData:{dates:gDates, values:gValues}, presentYearIndex:gPresentYearIndex})
    },
  }
}

const DcfChart = ({chartData, PresentYearIndex, changeDataCallback}) => {
  gDates = chartData.dates
  gValues = chartData.values
  gPresentYearIndex = PresentYearIndex
  gChangeDataCallback = changeDataCallback
  const state = {
    labels: gDates,
    datasets: [{
      label: 'Free Cash Flow',
      data: gValues,
      backgroundColor: gValues.map((_val, index) => index<=PresentYearIndex ? "" : "rgba(46, 24, 106, 0.6)"), 
      fill: false,
      tension: 0.4,
      borderWidth: 1,
      pointHitRadius: 25
    }]
  }

  if (gDates.length !== gValues.length){
    console.log("Error: dates and values do not match up!")
    return (
      <div className="InteractableDCF"></div>
    )
  }

  return (
    <div className="InteractableDCF">
      <Bar
        data={state} 
        options={{
          plugins: dragDataPlugin,
          scales: {
            y: {
              ticks: {
                callback: currencyFormatter
              }
            },
            x: {
              grid: {
                display: false
              }
            }
          }
        }}
      />
    </div>
  )
}

export default DcfChart
