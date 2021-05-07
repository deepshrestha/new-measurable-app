import React from "react";

export default function CarbonIntensity({carbonIntensity}) {
  let {color, shadow_color, latest_emissions} = carbonIntensity
  return (
    <>
      <div className="col-md-4 col-xs-12">
        <div className="metric-box carbon-intensity">
          <div className="d-flex align-items-center">
            <ul className="d-flex text-center">
              <li>Current Carbon Intensity</li>
              <li>{latest_emissions} gCO2e/kWh</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
