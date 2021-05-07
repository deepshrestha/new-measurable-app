import React, { useEffect, useState, useContext } from "react";
import { FilterContext } from "./../context/GlobalFilterContext";
import { apiHandler } from "./../api/apiHandler";

export default function Filter(props) {
    const {
        domVariables,
        lastSeenDatePicker,
        deviceGroups,
        globalVariables
    } = props;

    let matchingCount = domVariables.matchingCount;
    const presetOption = domVariables.presetOption;
    const minCurrentFilter = domVariables.minCurrentFilter;
    const maxCurrentFilter = domVariables.maxCurrentFilter;
    const statusFilter = domVariables.statusFilter;
    const groupsFilter = domVariables.groupsFilter;
    const minPowerFilter = domVariables.minPowerFilter;
    const maxPowerFilter = domVariables.maxPowerFilter;
    const minEnergyFilter = domVariables.minEnergyFilter;
    const maxEnergyFilter = domVariables.maxEnergyFilter;
    const tableSearchInput = domVariables.tableSearchInput;

    const [deviceStatus, setDeviceStatus] = useState([]);

    const [{ httpDeviceFilter, httpDeviceData }, setFilter] = useContext(
        FilterContext
    );

    useEffect(() => {
        let deviceOptionVal = [
            {
                key: "0",
                value: "Off"
            },
            {
                key: "1",
                value: "On"
            }
        ];
        setDeviceStatus(deviceOptionVal);
    }, []);

    const onApplyFilterButton = event => {
        event.preventDefault();
        let applyBtn = $(event.target);
        let resetBtn = $("#filter-reset");
        presetOption.val(0);

        $("#loading-screen").fadeIn();
        applyBtn.css("pointer-events", "none");
        applyBtn.find(".loading").show();
        resetBtn.css("pointer-events", "none");
        resetBtn.show();

        let filterData = {
            filter_current_min: minCurrentFilter.val(),
            filter_current_max: maxCurrentFilter.val(),
            filter_status: statusFilter.val(),
            filter_groups: groupsFilter.val(),
            filter_power_min: minPowerFilter.val(),
            filter_power_max: maxPowerFilter.val(),
            filter_energy_min: minEnergyFilter.val(),
            filter_energy_max: maxEnergyFilter.val(),
            last_seen_start_date: globalVariables.lSSD,
            last_seen_end_date: globalVariables.lSED,
            search_keyword: tableSearchInput.val()
        };

        apiHandler("/filter-device", "POST", filterData)
            .then(res => {
                let data = res.data;

                matchingCount.html(Object.keys(data).length).trigger("change");
                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter({
                    httpDeviceFilter: httpDeviceFilter,
                    httpDeviceData: {
                        data: data,
                        endCount: endCount,
                        nextBtn: nextBtn,
                        prevBtn: prevBtn,
                        startCount: startCount,
                        totalCount: totalCount
                    }
                });

                $("#loading-screen").fadeOut();

                applyBtn.find(".loading").hide();
                applyBtn.css("pointer-events", "");
                resetBtn.css("pointer-events", "");
            })
            .catch(err => {
                $("#loading-screen").fadeOut();
                toastr.error(err);
                applyBtn.find(".loading").hide();
                applyBtn.css("pointer-events", "");
                resetBtn.css("pointer-events", "");
            });
    };

    const onResetFilterButton = event => {
        event.preventDefault();
        let resetBtn = $(event.target);
        let applyBtn = $("#filter-apply-btn");
        presetOption.val(0);

        $("#loading-screen").fadeIn();
        applyBtn.css("pointer-events", "none");
        applyBtn.find(".loading").show();
        resetBtn.css("pointer-events", "none");
        resetBtn.hide();

        minCurrentFilter.val("").trigger("change");
        maxCurrentFilter.val("").trigger("change");
        statusFilter.val("").trigger("change");
        groupsFilter.val(null).trigger("change");
        minPowerFilter.val("").trigger("change");
        maxPowerFilter.val("").trigger("change");
        minEnergyFilter.val("").trigger("change");
        maxEnergyFilter.val("").trigger("change");
        lastSeenDatePicker.val("").trigger("change");
        globalVariables.lSSD = "";
        globalVariables.lSED = "";

        let filterData = {
            search_keyword: tableSearchInput.val()
        };

        apiHandler("/remove-filter-device", "POST", filterData)
            .then(res => {
                let data = res.data;

                matchingCount.html(Object.keys(data).length).trigger("change");

                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter({
                    httpDeviceFilter: httpDeviceFilter,
                    httpDeviceData: {
                        data: data,
                        endCount: endCount,
                        nextBtn: nextBtn,
                        prevBtn: prevBtn,
                        startCount: startCount,
                        totalCount: totalCount
                    }
                });

                $("#loading-screen").fadeOut();

                applyBtn.find(".loading").hide();
                applyBtn.css("pointer-events", "");
                resetBtn.css("pointer-events", "");
            })
            .catch(err => {
                $("#loading-screen").fadeOut();
                toastr.error(err);
                applyBtn.find(".loading").hide();
                applyBtn.css("pointer-events", "");
                resetBtn.css("pointer-events", "");
            });
    };

    return (
        <div className="filter-box">
            <div className="row">
                <form id="filter-form">
                    <div className="col-lg-2 col-sm-6">
                        <h3 className="">Current</h3>
                        <div className="inline-flex current">
                            <input
                                placeholder="0"
                                type="number"
                                className=""
                                id="filter-current-min"
                                name="filter_current_min"
                            />
                            <div className="filter-middle-text">to</div>
                            <input
                                placeholder="6"
                                type="number"
                                className=""
                                id="filter-current-max"
                                name="filter_current_max"
                            />
                        </div>
                    </div>

                    <div className="col-lg-1 col-sm-6">
                        <h3 className="">Status</h3>
                        <div className="status">
                            <select
                                dusk="Status-filter-select"
                                className=""
                                name="filter_status"
                                id="filter-status"
                            >
                                <option value="">—</option>
                                {deviceStatus.map((item, index) => {
                                    //console.log(item.key, item.value)
                                    return (
                                        <option key={index} value={item.key}>
                                            {item.value}
                                        </option>
                                    );
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-2 col-sm-6">
                        <h3 className="">Groups</h3>
                        <div className="group">
                            <select
                                className=""
                                name="filter_groups[]"
                                id="filter-groups"
                                multiple="multiple"
                            >
                                {Object.keys(deviceGroups).map(item => {
                                    //console.log(item)
                                    if (
                                        item === "deviceGroups" &&
                                        deviceGroups[item].length > 0
                                    ) {
                                        return deviceGroups[item].map(
                                            (deviceGroup, index) => {
                                                //console.log(deviceGroup.id, deviceGroup.name)
                                                return (
                                                    <option
                                                        key={index}
                                                        value={deviceGroup.id}
                                                    >
                                                        {deviceGroup.name}
                                                    </option>
                                                );
                                            }
                                        );
                                    }
                                })}
                            </select>
                        </div>
                    </div>

                    <div className="col-lg-2 col-sm-6">
                        <h3 className="">Power (Watts)</h3>
                        <div className="inline-flex power">
                            <input
                                placeholder="0"
                                type="number"
                                className="flex"
                                id="filter-power-min"
                                name="filter_power_min"
                            />
                            <div className="filter-middle-text">to</div>
                            <input
                                placeholder="150"
                                type="number"
                                className="flex"
                                id="filter-power-max"
                                name="filter_power_max"
                            />
                        </div>
                    </div>

                    <div className="col-lg-3 col-sm-6">
                        <h3 className="">Energy (Wh) current hour</h3>
                        <div className="inline-flex energy">
                            <input
                                placeholder="0"
                                type="number"
                                className=""
                                id="filter-energy-min"
                                name="filter_energy_min"
                            />
                            <div className="filter-middle-text">to</div>
                            <input
                                placeholder="0"
                                type="number"
                                className=""
                                id="filter-energy-max"
                                name="filter_energy_max"
                            />
                        </div>
                    </div>

                    <div className="col-lg-2 col-sm-6">
                        <h3 className="uppercase">Last seen</h3>
                        <div className="last-seen">
                            <input
                                type="text"
                                placeholder="Pick a date range"
                                className=""
                                id="filter-last-seen"
                                name="filter_last_seen"
                                readOnly="readOnly"
                            />
                        </div>
                    </div>

                    <div className="col-lg-12 col-sm-6">
                        <div className="filter-button-section">
                            <a
                                href="#"
                                className="filter-reset"
                                id="filter-reset"
                                style={{
                                    display: "none"
                                }}
                                onClick={event => onResetFilterButton(event)}
                            >
                                Reset Filters
                            </a>
                            <a
                                href="#"
                                className="btn btn-default btn-primary"
                                id="filter-apply-btn"
                                onClick={event => onApplyFilterButton(event)}
                            >
                                <i
                                    className="fa fa-cog fa-spin loading"
                                    style={{
                                        fontSize: "14px",
                                        display: "none"
                                    }}
                                ></i>
                                Apply
                            </a>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
