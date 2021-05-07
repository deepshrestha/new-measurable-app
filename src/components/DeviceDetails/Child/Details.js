import React, { useState, useEffect } from "react";

export default function Details({ deviceOutlet }) {
  //console.log("Details", deviceOutlet.device);
  const [defaultOption, setDefaultOption] = useState("Select Action");
  const [deviceGroup, setDeviceGroup] = useState([]);

  useEffect(() => {
    let deviceKeyOptions = [
      {
        key: "device-status",
        value: "Device Status",
      },
      {
        key: "device-status-sync",
        value: "Device Status Sync",
      },
      {
        key: "update-firmware",
        value: "Update firmware",
      },
    ];
    setDeviceGroup(deviceKeyOptions);
  }, []);

  const onChangeHandler = (event) => {
    event.preventDefault();
    //console.log(event.target.value)
    const { value } = event.target;
    setDefaultOption(value);
  };
  const {
    device_number,
    name,
    type,
    location_builder,
    last_seen,
  } = deviceOutlet.device;
  return (
    <>
      <div className="row">
        <div className="col-sm-12">
          <div className="d-flex align-items-center justify-content-end actions">
            <select
              value={defaultOption}
              id="select-action"
              onChange={onChangeHandler}
            >
              <option value="Select Action" disabled={true}>
                Select Action
              </option>
              <optgroup label="Device">
                {deviceGroup.map((item, index) => {
                  //console.log(item.key, item.value)
                  return (
                    <option key={index} value={item.key}>
                      {item.value}
                    </option>
                  );
                })}
              </optgroup>
            </select>
            {/* <select name="" id="">
              <option>Select Action</option>
              <optgroup label="Device">
                <option value="">Device Status</option>
                <option value="">Device Status Sync</option>
                <option value="">Update Firmware</option>
              </optgroup>
            </select> */}

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
              <div className="col-sm-9">{device_number}</div>
            </div>

            <div className="row">
              <div className="col-sm-3">Name</div>
              <div className="col-sm-9">{name}</div>
            </div>

            <div className="row">
              <div className="col-sm-3">Type</div>
              <div className="col-sm-9">{type}</div>
            </div>

            <div className="row">
              <div className="col-sm-3">Location</div>
              <div className="col-sm-9">
                {location_builder !== "" ? location_builder : "__"}
              </div>
            </div>

            <div className="row">
              <div className="col-sm-3">Last seen</div>
              <div className="col-sm-9">{last_seen}</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
