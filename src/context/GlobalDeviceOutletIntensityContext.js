import React, { createContext } from "react";
import { useHttpDeviceOutletIntensity } from "../hooks/useHttpDeviceOutletIntensity";

export const DeviceOutletIntensityContext = createContext();

const GlobalDeviceOutletIntensityContext = ({ children }) => {
  const [
    {
      httpDeviceStatusValue,
      httpDeviceOutlet,
      httpCarbonIntensity,
      httpBarChart,
      httpLineChart1,
      httpLineChart2,
    },
    setFilter,
  ] = useHttpDeviceOutletIntensity();

  /* console.log(
    httpDeviceStatusValue,
    httpDeviceOutlet,
    httpCarbonIntensity,
    httpBarChart,
    httpLineChart1,
    httpLineChart2
  ); */

  return (
    <DeviceOutletIntensityContext.Provider
      value={[
        {
          httpDeviceStatusValue,
          httpDeviceOutlet,
          httpCarbonIntensity,
          httpBarChart,
          httpLineChart1,
          httpLineChart2,
        },
        setFilter,
      ]}
    >
      {children}
    </DeviceOutletIntensityContext.Provider>
  );
};

export default GlobalDeviceOutletIntensityContext;
