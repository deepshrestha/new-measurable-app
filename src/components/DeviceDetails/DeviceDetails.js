import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import CarbonIntensity from "./Child/CarbonIntensity";
import Charts from "./Child/Charts";
import Details from "./Child/Details";
import DownloadData from "./Child/DownloadData";
import OnOffControl from "./Child/OnOffControl";
import Outlet from "./Child/Outlet";
//import { useHttpDeviceOutletIntensity } from "./../../hooks/useHttpDeviceOutletIntensity";
import { DeviceOutletIntensityContext } from "./../../context/GlobalDeviceOutletIntensityContext";

const DeviceDetails = (props) => {
  //console.log(props);
  const history = useHistory();
  const { deviceId, deviceName, deviceNumber } = history.location.state;

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
  ] = useContext(DeviceOutletIntensityContext);

  /* const [
    { httpDeviceStatusValue, httpDeviceOutlet, httpCarbonIntensity },
    setFilter,
  ] = useHttpDeviceOutletIntensity(deviceId); */

  //console.log(httpBarChart, httpLineChart1, httpLineChart2);

  return (
    <div className="user-dashboard">
      <div className="inner-content device-details-metrics">
        <h1>
          {deviceId} - {deviceNumber} - {deviceName} Details
        </h1>
        <div className="row d-flex">
          {/* on/off control */}
          <OnOffControl statusValue={httpDeviceStatusValue} />
          {/* end on/off control */}

          {/* current Carbon intensity */}
          <CarbonIntensity carbonIntensity={httpCarbonIntensity} />
          {/* end current carbon intensity */}

          {/* download data */}
          <DownloadData />
          {/* end download data */}
        </div>
        <div className="clearfix">&nbsp;</div>

        {/* charts */}
        <Charts
          barChart={httpBarChart}
          lineChart1={httpLineChart1}
          lineChart2={httpLineChart2}
        />
        {/* end of charts */}

        {/* outlet status */}
        <Outlet deviceOutlet={httpDeviceOutlet} />
        {/* end of outlet status */}

        {/* device details */}
        <Details deviceOutlet={httpDeviceOutlet} />
        {/* end of device details */}
      </div>
    </div>
  );
};

export default DeviceDetails;
