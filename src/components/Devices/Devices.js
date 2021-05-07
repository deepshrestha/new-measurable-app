import { isEmpty, isObject } from "lodash";
import React from "react";
import CreateDeviceButton from "./Child/CreateDeviceButton";
import DeviceTable from "./Child/DeviceTable";
import SearchDevice from "./Child/SearchDevice";
import SelectActionCheckBox from "./Child/SelectActionCheckBox";

export default function Devices(props) {
    const { domVariables, data, globalVariables } = props;

    const jsonData = Object.keys(data)
        .map((key, index) => {
            return {
                [key]: data[key]
            };
        })
        .reduce((all, item) => {
            if (typeof item.data === "object") {
                return {
                    ...all,
                    count: Object.keys(item.data).length
                };
            }
            Object.assign(all, item);
            return all;
        }, {});

    //console.log(jsonData)

    return (
        <>
            {jsonData && (
                <div className="user-dashboard-body">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Devices</h2>
                        </div>
                        <SearchDevice
                            domVariables={domVariables}
                            globalVariables={globalVariables}
                            data={data}
                            jsonData={jsonData}
                        />
                        <CreateDeviceButton />
                        <div className="col-sm-12">
                            <div className="dashboard-body-table">
                                <SelectActionCheckBox count={jsonData.count} />
                                <div className="row">
                                    <div className="col-lg-12">
                                        <DeviceTable
                                            domVariables={domVariables}
                                            globalVariables={globalVariables}
                                            data={data}
                                            jsonData={jsonData}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
