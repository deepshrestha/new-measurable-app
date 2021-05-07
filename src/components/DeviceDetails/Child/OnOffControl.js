import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import Modals from "./Modals";
import { DeviceOutletIntensityContext } from "./../../../context/GlobalDeviceOutletIntensityContext";

export default function OnOffControl({ statusValue }) {
  //console.log("OnOffControl", statusValue.values);
  let { value0, value1, value2 } = statusValue.values;

  const history = useHistory();
  const { deviceId } = history.location.state;

  const [askConfirmation, setAskConfirmation] = useState({
    event: {},
    openModal: false,
  });

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

  const onChangeOutletStatus = (e) => {
    setAskConfirmation({
      event: e,
      openModal: true,
    });
  };

  const onCancelModal = (e) => {
    setAskConfirmation({
      event: e,
      openModal: false,
    });
    e.target.checked = !e.target.checked;
  };

  let outletStatus = {
    value: {},
    ch_status: {},
  };

  const onCheckOutletBtn = (e) => {
    //console.log(deviceId);
    const { name, checked } = e.target;
    console.log(name, checked);
    const checkedVal = checked == true ? 1 : 0;

    switch (name) {
      case "allOutlet":
        if ($("#allOutlet").is(":checked")) {
          $("#leftOutlet").prop("checked", true);
          $("#rightOutlet").prop("checked", true);
        } else {
          $("#leftOutlet").prop("checked", false);
          $("#rightOutlet").prop("checked", false);
        }
        outletStatus = {
          value: {
            value0: checkedVal,
            value1: checkedVal,
            value2: checkedVal,
          },
          ch_status: {
            ch1_status: checkedVal,
            ch2_status: checkedVal,
          },
        };
        break;
      case "leftOutlet":
        outletStatus = {
          value: {
            value1: checkedVal,
          },
          ch_status: {
            ch1_status: checkedVal,
          },
        };
        break;
      case "rightOutlet":
        outletStatus = {
          value: {
            value2: checkedVal,
          },
          ch_status: {
            ch2_status: checkedVal,
          },
        };
        break;
      default:
        break;
    }
    setFilter({
      httpDeviceStatusValue: {
        values: {
          ...httpDeviceStatusValue.values,
          ...outletStatus.value,
        },
      },
      httpDeviceOutlet: {
        device: {
          ...httpDeviceOutlet.device,
          ...outletStatus.ch_status,
        },
      },
      httpCarbonIntensity: httpCarbonIntensity,
      httpBarChart: httpBarChart,
      httpLineChart1: httpLineChart1,
      httpLineChart2: httpLineChart2,
    });
  };
  return (
    <>
      <div className="col-md-4 col-xs-12">
        <div className="metric-box on-off-controls">
          <h5 className="text-center">On/Off Control</h5>
          <div className="text-center">
            <span>All Outlets</span>
            <label className="toggle">
              <input
                name="allOutlet"
                id="allOutlet"
                type="checkbox"
                defaultChecked={value0}
                data-toggle="modal"
                data-target="#confirmationModal"
                onClick={onChangeOutletStatus}
              />
              <span></span>
            </label>
          </div>
          <div className="d-flex justify-content-between">
            <div className="outlet-side text-center">
              <span>Left Outlet</span>
              <label className="toggle">
                <input
                  name="leftOutlet"
                  id="leftOutlet"
                  type="checkbox"
                  defaultChecked={value1}
                  data-toggle="modal"
                  data-target="#confirmationModal"
                  onClick={onChangeOutletStatus}
                />
                <span></span>
              </label>
            </div>

            <div className="outlet-side text-center">
              <span>Right Outlet</span>
              <label className="toggle">
                <input
                  name="rightOutlet"
                  id="rightOutlet"
                  type="checkbox"
                  defaultChecked={value2}
                  data-toggle="modal"
                  data-target="#confirmationModal"
                  onClick={onChangeOutletStatus}
                />
                <span></span>
              </label>
            </div>
          </div>
        </div>
      </div>

      {/* modals */}
      {askConfirmation && (
        <Modals
          handleData={askConfirmation}
          onCheckOutletBtn={onCheckOutletBtn}
          onCancelModal={onCancelModal}
        />
      )}
      {/* end of modals */}
    </>
  );
}
