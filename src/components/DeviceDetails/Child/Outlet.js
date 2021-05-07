import React, { useState } from "react";

export default function Outlet({ deviceOutlet }) {
  //console.log("Outlet", deviceOutlet.device);
  const {
    ch1_status,
    ch1_watts,
    ch1_amps,
    ch1_wh,
    ch2_status,
    ch2_watts,
    ch2_amps,
    ch2_wh,
  } = deviceOutlet.device;

  return (
    <div className="row">
      <div className="col-md-6 col-sm-10 col-md-offset-3 col-sm-offset-1">
        <div className="metric-box">
          <div className="row">
            {/* left outlet */}
            <div className="col-md-6 col-sm-12 outlet-status">
              <h3>Left Outlet</h3>
              <div className="d-flex align-items-center">
                <p>Status</p>
                <p>{ch1_status == 0 ? "Off" : "On"}</p>
              </div>
              <div className="d-flex align-items-center">
                <p>Power (Watts)</p>
                <p>{ch1_watts}</p>
              </div>
              <div className="d-flex align-items-center">
                <p>Current</p>
                <p>{ch1_amps}</p>
              </div>
              <div className="d-flex align-items-center">
                <p>Energy (Wh) current hour</p>
                <p>{ch1_wh}</p>
              </div>
            </div>
            {/* end of left outlet */}

            {/* right outlet */}
            <div className="col-md-6 col-sm-12 outlet-status">
              <h3>Right Outlet</h3>
              <div className="d-flex align-items-center">
                <p>Status</p>
                <p>{ch2_status == 0 ? "Off" : "On"}</p>
              </div>
              <div className="d-flex align-items-center">
                <p>Power (Watts)</p>
                <p>{ch2_watts}</p>
              </div>
              <div className="d-flex align-items-center">
                <p>Current</p>
                <p>{ch2_amps}</p>
              </div>
              <div className="d-flex align-items-center">
                <p>Energy (Wh) current hour</p>
                <p>{ch2_wh}</p>
              </div>
            </div>
            {/* end of right outlet */}
          </div>
        </div>
      </div>
    </div>
  );
}
