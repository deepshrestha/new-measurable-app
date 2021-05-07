import React from "react";

const DeviceDetails = (props) => {
  //console.log(props)
  return (

        <div className="inner-content device-details-metrics">
          <h1>dan_staging_1 - dan_staging_1 Details</h1>

          <div className="row d-flex">
            <div className="col-md-4 col-xs-12">
              <div className="metric-box on-off-controls">
                <h5 className="text-center">On/Off Control</h5>
                <div className="text-center">
                  <span>All Outlets</span>
                  <label className="toggle">
                    <input type="checkbox" />
                    <span></span>
                  </label>
                </div>
                <div className="d-flex justify-content-between">
                  <div className="outlet-side text-center">
                    <span>Left Outlet</span>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>

                  <div className="outlet-side text-center">
                    <span>Right Outlet</span>
                    <label className="toggle">
                      <input type="checkbox" />
                      <span></span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-xs-12">
              <div className="metric-box carbon-intensity">
                <div className="d-flex align-items-center">
                  <ul className="d-flex text-center">
                    <li>Current Carbon Intensity</li>
                    <li>205 gCO2e/kWh</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="col-md-4 col-xs-12">
              <div className="metric-box download-data">
                <div className="d-flex align-items-center">
                  <div className="text-center">
                    <a href="#" className="btn btn-primary">Download Data</a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="clearfix">&nbsp;</div>

          <div className="row">
            <div className="col-sm-12">
              <div className="metric-box chart">
                <p className="text-left">Energy(Wh) - Apr 29, 2021</p>
                <canvas id="barChart" width="400" height="50"></canvas>
              </div>

              <div className="metric-box chart">
                <p className="text-left">Power (Watts) 08:00 - 09:00</p>
                <canvas id="lineChart" width="400" height="50"></canvas>
              </div>

              <div className="metric-box chart">
                <p className="text-left">Power (Watts) 08:50 - 08:59</p>
                <canvas id="lineChart1" width="400" height="50"></canvas>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6 col-sm-10 col-md-offset-3 col-sm-offset-1">
              <div className="metric-box">
                <div className="row">
                  <div className="col-md-6 col-sm-12 outlet-status">
                    <h3>Left Outlet</h3>
                    <div className="d-flex align-items-center">
                      <p>Status</p>
                      <p>Off</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Power (Watts)</p>
                      <p>0</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Current</p>
                      <p>0</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Energy (Wh) current hour</p>
                      <p>0.02</p>
                    </div>
                  </div>

                  <div className="col-md-6 col-sm-12 outlet-status">
                    <h3>Right Outlet</h3>
                    <div className="d-flex align-items-center">
                      <p>Status</p>
                      <p>On</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Power (Watts)</p>
                      <p>3.59</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Current</p>
                      <p>0.02</p>
                    </div>
                    <div className="d-flex align-items-center">
                      <p>Energy (Wh) current hour</p>
                      <p>3.14</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-sm-12">
              <div className="d-flex align-items-center justify-content-end actions">
                <select name="" id="">
                  <option>Select Action</option>
                  <optgroup label="Device">
                    <option value="">Device Status</option>
                    <option value="">Device Status Sync</option>
                    <option value="">Update Firmware</option>
                  </optgroup>
                </select>

                <button className="btn btn-primary" disabled>
                  <i data-icon="play" className="icon"></i>
                </button>
                <button className="btn btn-secondary">
                  <i data-icon="trash" className="icon"></i>
                </button>
                <a href="#" className="btn btn-primary">
                  <i data-icon="edit" className="icon"></i>
                </a>
              </div>

              <div className="metric-box device-details">
                <div className="row">
                  <div className="col-sm-3">Device ID*</div>
                  <div className="col-sm-9">dan_staging_1</div>
                </div>

                <div className="row">
                  <div className="col-sm-3">Name</div>
                  <div className="col-sm-9">dan_staging_1</div>
                </div>

                <div className="row">
                  <div className="col-sm-3">Type</div>
                  <div className="col-sm-9">m.e Power Socket Dual</div>
                </div>

                <div className="row">
                  <div className="col-sm-3">Location</div>
                  <div className="col-sm-9">__</div>
                </div>

                <div className="row">
                  <div className="col-sm-3">Last seen</div>
                  <div className="col-sm-9">29-04-2021 08:57:15</div>
                </div>
              </div>
            </div>
          </div>

        </div>
  );
};

export default DeviceDetails;
