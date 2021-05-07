import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export const useHttpDeviceOutletIntensity = () => {
  const history = useHistory();
  const { deviceId } = history.location.state;
  //console.log(deviceId)
  const [
    {
      httpDeviceStatusValue,
      httpDeviceOutlet,
      httpCarbonIntensity,
      httpBarChart,
      httpLineChart1,
      httpLineChart2,
    },
    setData,
  ] = useState({
    httpDeviceStatusValue: {
      values: {},
    },
    httpDeviceOutlet: {
      device: {},
    },
    httpCarbonIntensity: {},
    httpBarChart: {
      data: {
        accumulatedWattsGraphPlotExist: false,
        graphData: {
          device_activePower: [],
          device_kiloWattHours: [],
          device_timestamp: [],
        },
        nowUserTimeZoneDateMonthDayYearFormatted: '',
      },
    },
    httpLineChart1: {
      /* device_timestamp: [],
      channel1_activePower: [],
      channel2_activePower: [], */
      xAxis_labels: [],
      series: [
        {
          label: '',
          data: [],
          borderColor: '',
          backgroundColor: '',
        },
        {
          label: '',
          data: [],
          borderColor: '',
          backgroundColor: '',
        },
      ],
      title: '',
    },
    httpLineChart2: {
      xAxis_labels: [],
      series: [
        {
          label: '',
          data: [],
          borderColor: '',
          backgroundColor: '',
        },
        {
          label: '',
          data: [],
          borderColor: '',
          backgroundColor: '',
        },
      ],
      title: '',
    },
  });

  const fetchOutletData = async () => {
    const [
      responseDeviceStatusValue,
      responseDeviceOutlet,
      responseCarbonIntensity,
      responseBarChart,
      responseLineChart1,
      responseLineChart2,
    ] = await Promise.all([
      fetch("http://www.json-generator.com/api/json/get/bVVQMnFmUO?indent=2"),
      fetch("http://www.json-generator.com/api/json/get/cffoiWBZLm?indent=2"),
      fetch("http://www.json-generator.com/api/json/get/bUxxRZovVK?indent=2"),
      fetch("http://www.json-generator.com/api/json/get/cpNLZyYJsO?indent=2"),
      fetch("http://www.json-generator.com/api/json/get/cfqkBbCmgi?indent=2"),
      fetch("http://www.json-generator.com/api/json/get/bUxCsdCnQO?indent=2"),
    ]);

    const httpDeviceStatusValue = await responseDeviceStatusValue.json();
    const httpDeviceOutlet = await responseDeviceOutlet.json();
    const httpCarbonIntensity = await responseCarbonIntensity.json();
    const httpBarChart = await responseBarChart.json();
    const httpLineChart1 = await responseLineChart1.json();
    const httpLineChart2 = await responseLineChart2.json();

    return [
      httpDeviceStatusValue,
      httpDeviceOutlet,
      httpCarbonIntensity,
      httpBarChart,
      httpLineChart1,
      httpLineChart2,
    ];
  };

  useEffect(() => {
    fetchOutletData()
      .then(
        ([
          httpDeviceStatusValue,
          httpDeviceOutlet,
          httpCarbonIntensity,
          httpBarChart,
          httpLineChart1,
          httpLineChart2,
        ]) => {
          setData({
            httpDeviceStatusValue,
            httpDeviceOutlet,
            httpCarbonIntensity,
            httpBarChart,
            httpLineChart1,
            httpLineChart2,
          });
        }
      )
      .catch((err) => {
        Promise.reject(err);
      });
  }, []);

  /* console.log(
    "useHttp",
    httpDeviceStatusValue,
    httpDeviceOutlet,
    httpCarbonIntensity,
    httpBarChart,
    httpLineChart1,
    httpLineChart2
  ); */

  return [
    {
      httpDeviceStatusValue,
      httpDeviceOutlet,
      httpCarbonIntensity,
      httpBarChart,
      httpLineChart1,
      httpLineChart2,
    },
    setData,
  ];
};
