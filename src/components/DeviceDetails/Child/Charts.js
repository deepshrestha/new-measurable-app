import React from "react";
import { Chart, Bar, Line } from "react-chartjs-2";

export default function Charts({ barChart, lineChart1, lineChart2 }) {
  Chart.defaults.font.size = 10;

  //console.log("barChart", barChart);

  let {
    accumulatedWattsGraphPlotExist,
    graphData,
    nowUserTimeZoneDateMonthDayYearFormatted,
  } = barChart.data;
  let {
    device_activePower: barChart_device_activePower,
    device_kiloWattHours: barChart_device_kiloWattHours,
    device_timestamp: barChart_device_timestamp,
  } = graphData;

  let {
    device_timestamp: linechart1_device_timestamp,
    channel1_activePower: linechart1_channel1_activePower,
    channel2_activePower: linechart1_channel2_activePower,
    xAxis_labels: linechart1_xAxis_labels,
    series: linechart1_series,
    title: linechart1_title,
  } = lineChart1;

  let {
    device_timestamp: linechart2_device_timestamp,
    channel1_activePower: linechart2_channel1_activePower,
    channel2_activePower: linechart2_channel2_activePower,
    xAxis_labels: linechart2_xAxis_labels,
    series: linechart2_series,
    title: linechart2_title,
  } = lineChart2;

  /* console.log(
    "linechart2_device_timestamp", linechart2_device_timestamp,
    "linechart2_channel1_activePower", linechart2_channel1_activePower,
    "linechart2_channel2_activePower", linechart2_channel2_activePower,
    "linechart2_xAxis_labels", linechart2_xAxis_labels,
    "linechart2_series", linechart2_series,
    "linechart2_title", linechart2_title
  ); */

  const barChartOptions = {
    plugins: {
      legend: false,
    },
    animation: true,
  };

  const lineChartOptions = {
    maintainAspectRatio: true,
    animation: true,
    plugins: {
      legend: {
        labels: {
          // Legend font size
          font: {
            size: 12,
            //style: 'italic'
          },
        },
      },
    },
  }

  const barChartData = {
    labels: barChart_device_timestamp,
    datasets: [
      {
        barPercentage: 0.5,
        data: barChart_device_kiloWattHours,
        backgroundColor: ["#FF8C2E"],
      },
    ],
  };

  const lineChartData1 = {
    labels: linechart1_xAxis_labels,
    datasets: [
      {
        label: linechart1_series[0].label,
        data: linechart1_series[0].data,
        borderColor: [linechart1_series[0].borderColor],
        backgroundColor: [linechart1_series[0].backgroundColor],
      },
      {
        label: linechart1_series[1].label,
        data: linechart1_series[1].data,
        borderColor: [linechart1_series[1].borderColor],
        backgroundColor: [linechart1_series[1].backgroundColor],
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  const lineChartData2 = {
    labels: linechart2_xAxis_labels,
    datasets: [
      {
        label: linechart2_series[0].label,
        data: linechart2_series[0].data,
        borderColor: [linechart2_series[0].borderColor],
        backgroundColor: [linechart2_series[0].backgroundColor],
      },
      {
        label: linechart2_series[1].label,
        data: linechart2_series[1].data,
        borderColor: [linechart2_series[1].borderColor],
        backgroundColor: [linechart2_series[1].backgroundColor],
      },
    ],
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };

  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="metric-box chart">
            <p className="text-left">Energy(Wh) - {nowUserTimeZoneDateMonthDayYearFormatted}</p>
            <Bar
              data={barChartData}
              width={400}
              height={55}
              options={barChartOptions}
            />
          </div>

          <div className="metric-box chart">
            <p className="text-left">{linechart1_title}</p>
            <Line
              data={lineChartData1}
              width={400}
              height={60}
              options={lineChartOptions}
            />
          </div>

          <div className="metric-box chart">
            <p className="text-left">{linechart2_title}</p>
            <Line
              data={lineChartData2}
              width={400}
              height={60}
              options={lineChartOptions}
            />
          </div>
        </div>
      </div>
    </>
  );
}
