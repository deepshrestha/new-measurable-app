import React, { useEffect, useState } from "react";

export default function SelectActionCheckBox({count}) {
    //console.log(count)
    const [defaultOption, setDefaultOption] = useState('Select Action')
    const [deviceGroup, setDeviceGroup] = useState([])

    useEffect(()=> {
        let deviceKeyOptions = [            
            {
                key: 'device-status',
                value: "Device Status"
            },
            {
                key: 'device-status-sync',
                value: "Device Status Sync"
            },
            {
                key: 'add-to-device-group',
                value: "Add To Device Group"
            },
            {
                key: 'update-firmware',
                value: "Update firmware"
            }
        ]
        setDeviceGroup(deviceKeyOptions)
    }, [])

    const onChangeHandler = (event) => {
        event.preventDefault()
        //console.log(event.target.value)
        const { value } = event.target
        setDefaultOption(value)
    }

    return (
        <div className="row">
            <div className="col-sm-3">
                <div className="dashboard-table-top left">
                    <div className="dropdown">
                        <button
                            className="inline-flex dropdown-toggle"
                            type="button"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <input
                                type="checkbox"
                                className="checkbox checkbox-select"
                            />
                            <span className="caret"></span>
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="select-all"
                        >
                            <li>
                                <a href="#">
                                    <label className="inline-flex">
                                        <input 
                                            type="checkbox"
                                            className="checkbox"
                                            id="select-all-data"
                                        />
                                        Select All
                                    </label>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <label className="inline-flex">
                                        <input 
                                            type="checkbox"
                                            className="checkbox"
                                            id="select-all-matching-data"
                                        />
                                        Select All Matching (
                                        <span id="matching-count">{count}</span>)
                                    </label>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <div
                className="col-sm-offset-5 col-sm-4"
                id="action-tab"
                style={{ display: "none" }}
            >
                <div className="dashboard-table-top right inline-flex">
                    <select value={defaultOption}
                        data-testid="action-select"
                        className="form-control form-select mr-2"
                        id="select-action"
                        onChange={onChangeHandler}
                    >
                        <option value="Select Action" disabled={true}>
                            Select Action
                        </option>
                        <optgroup label="Device">
                        {
                            deviceGroup.map((item, index) => {
                                //console.log(item.key, item.value)
                                return(
                                    <option key={index}
                                        value={item.key}>{item.value}
                                    </option>
                                )
                            })
                        }
                        </optgroup>
                    </select>
                    <button
                        data-testid="action-confirm"
                        title="Run Action"
                        type="button"
                        className="btn btn-default btn-primary flex items-center justify-center px-3"
                        disabled="disabled"
                        id="select-action-btn">
                        <i className="fa fa-play"></i>
                    </button>
                    <div className="dropdown">
                        <button
                            className=" dropdown-toggle"
                            type="button"
                            id="select-all"
                            data-toggle="dropdown"
                            aria-haspopup="true"
                            aria-expanded="false"
                        >
                            <i className="fa fa-trash-o"></i>
                            <span className="caret"></span>
                        </button>
                        <ul
                            className="dropdown-menu"
                            aria-labelledby="select-all"
                        >
                            <li>
                                <a 
                                    className="inline-flex"
                                    id="delete-selected-devices"
                                >
                                    Delete Selected (
                                    <span className="selected-count"></span>)
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}
