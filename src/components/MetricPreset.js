import React, { useEffect, useState, useContext } from "react";
import Filter from "./../components/Filter";
import { FilterContext } from "./../context/GlobalFilterContext";
import { apiHandler } from "./../api/apiHandler";

export default function MetricPreset(props) {
    const { domVariables, presets, globalVariables } = props;
    const [{ httpDeviceFilter, httpDeviceData }, setFilter] = useContext(
        FilterContext
    );

    let matchingCount = domVariables.matchingCount;
    const presetOption = domVariables.presetOption;
    const presetNameInput = domVariables.presetNameInput;
    const minCurrentFilter = domVariables.minCurrentFilter;
    const maxCurrentFilter = domVariables.maxCurrentFilter;
    const statusFilter = domVariables.statusFilter;
    const groupsFilter = domVariables.groupsFilter;
    const minPowerFilter = domVariables.minPowerFilter;
    const maxPowerFilter = domVariables.maxPowerFilter;
    const minEnergyFilter = domVariables.minEnergyFilter;
    const maxEnergyFilter = domVariables.maxEnergyFilter;
    const tableSearchInput = domVariables.tableSearchInput;

    const [datePicker, setDatePicker] = useState();

    useEffect(() => {
        const lastSeenDatePicker = $('input[name="filter_last_seen"]');
        lastSeenDatePicker.daterangepicker({
            opens: "left",
            autoUpdateInput: false,
            locale: {
                format: "YYYY-MM-DD",
                cancelLabel: "Clear"
            }
        });

        lastSeenDatePicker.on("apply.daterangepicker", function(ev, picker) {
            $(this).val(
                picker.startDate.format("YYYY-MM-DD") +
                    " - " +
                    picker.endDate.format("YYYY-MM-DD")
            );
            globalVariables.lSSD = picker.startDate.format("YYYY-MM-DD");
            globalVariables.lSED = picker.endDate.format("YYYY-MM-DD");
        });

        lastSeenDatePicker.on("cancel.daterangepicker", function() {
            $(this).val("");
            globalVariables.lSSD = null;
            globalVariables.lSED = null;
        });

        setDatePicker(lastSeenDatePicker);
    }, []);

    const onAddMetricPreset = event => {
        event.preventDefault();
        //console.log("onAddMetricPreset")
        let saveBtn = $(event.target);

        let presetName = presetNameInput.val();

        if (presetName === "") {
            toastr.error("Preset Name is required!");
            return false;
        }

        saveBtn.prop("disabled", true);
        $("#loading-screen").fadeIn();

        let data = {
            presetName: presetName,
            minCurrent: minCurrentFilter.val(),
            maxCurrent: maxCurrentFilter.val(),
            status: statusFilter.val(),
            groups: groupsFilter.val(),
            minPower: minPowerFilter.val(),
            maxPower: maxPowerFilter.val(),
            minEnergy: minEnergyFilter.val(),
            maxEnergy: maxEnergyFilter.val(),
            lSSD: globalVariables.lSSD,
            lSED: globalVariables.lSED
        };

        apiHandler("/save-preset", "POST", data)
            .then(res => {
                $("#loading-screen").fadeOut();
                if (res.success) {
                    toastr.success("Preset saved!");
                    presetOption
                        .append(
                            '<option value="' +
                                res.id +
                                '" selected="selected">' +
                                res.name +
                                "</option>"
                        )
                        .trigger("change");
                    presetOption.val(res.id).trigger("change");
                } else {
                    toastr.warning("Something went wrong!");
                }
                presetNameInput.val("");
                saveBtn.prop("disabled", false);
            })
            .catch(err => {
                $("#loading-screen").fadeOut();
                toastr.error(err);
                presetNameInput.val("");
                saveBtn.prop("disabled", false);
            });
    };

    const onChangeMetricPreset = event => {
        event.preventDefault();
        let $this = $(event.target);
        let presetId = $this.val();

        $("#loading-screen").fadeIn();

        let filterData = {
            preset_id: presetId,
            search_keyword: tableSearchInput.val()
        };

        apiHandler("/filter-preset", "POST", filterData)
            .then(res => {
                $("#loading-screen").fadeOut();
                let presetData = res.preset;
                let deviceData = res.data;

                if (presetData.length !== 0) {
                    minCurrentFilter
                        .val(presetData.minCurrent)
                        .trigger("change");
                    maxCurrentFilter
                        .val(presetData.maxCurrent)
                        .trigger("change");
                    statusFilter.val(presetData.status).trigger("change");
                    groupsFilter.val(presetData.groups).trigger("change");
                    minPowerFilter.val(presetData.minPower).trigger("change");
                    maxPowerFilter.val(presetData.maxPower).trigger("change");
                    minEnergyFilter.val(presetData.minEnergy).trigger("change");
                    maxEnergyFilter.val(presetData.maxEnergy).trigger("change");
                    globalVariables.lSSD = presetData.lastSeenStartDate;
                    globalVariables.lSED = presetData.lastSeenEndDate;
                    if (
                        globalVariables.lSSD !== "" &&
                        globalVariables.lSED !== "" &&
                        globalVariables.lSSD !== null &&
                        globalVariables.lSED !== null
                    ) {
                        datePicker
                            .val(
                                presetData.lastSeenStartDate +
                                    " - " +
                                    presetData.lastSeenEndDate
                            )
                            .trigger("change");
                    } else {
                        datePicker.val("").trigger("change");
                    }
                } else {
                    minCurrentFilter.val("").trigger("change");
                    maxCurrentFilter.val("").trigger("change");
                    statusFilter.val("").trigger("change");
                    groupsFilter.val(null).trigger("change");
                    minPowerFilter.val("").trigger("change");
                    maxPowerFilter.val("").trigger("change");
                    minEnergyFilter.val("").trigger("change");
                    maxEnergyFilter.val("").trigger("change");
                    datePicker.val("").trigger("change");
                    globalVariables.lSSD = null;
                    globalVariables.lSED = null;
                }

                matchingCount
                    .html(Object.keys(deviceData).length)
                    .trigger("change");

                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter({
                    httpDeviceFilter: httpDeviceFilter,
                    httpDeviceData: {
                        data: deviceData,
                        endCount: endCount,
                        nextBtn: nextBtn,
                        prevBtn: prevBtn,
                        startCount: startCount,
                        totalCount: totalCount
                    }
                });

                $("#loading-screen").fadeOut();
            })
            .catch(err => {
                $("#loading-screen").fadeOut();
                toastr.error(err);
            });
    };

    return (
        <>
            <div className="row">
                <div className="col-lg-4">
                    <div className="metric-box">
                        <h2>Metric Preset</h2>
                        <div className="inline-flex metric-input">
                            <input
                                placeholder="Metric name"
                                className=""
                                id="preset-name"
                                name="preset_name"
                            ></input>
                            <button
                                className="btn btn-default btn-primary"
                                type="button"
                                id="save-preset-btn"
                                onClick={event => onAddMetricPreset(event)}
                            >
                                Save
                            </button>
                        </div>
                        <div className="select-metric">
                            <select
                                className="block w-full form-control-sm form-select"
                                id="filter-preset-options"
                                onChange={event => onChangeMetricPreset(event)}
                            >
                                <option value="0">-- No Filter --</option>
                                {Object.keys(presets).map((item, index) => {
                                    //console.log(item)
                                    if (
                                        item === "presets" &&
                                        presets[item].length > 0
                                    ) {
                                        //console.log(presets[item][index].id, presets[item][index].name)
                                        return presets[item].map(
                                            (preset, index) => {
                                                return (
                                                    <option
                                                        key={index}
                                                        value={preset.id}
                                                    >
                                                        {preset.name}
                                                    </option>
                                                );
                                            }
                                        );
                                    }
                                })}
                            </select>
                        </div>
                    </div>
                </div>
            </div>
            <Filter
                domVariables={domVariables}
                lastSeenDatePicker={datePicker}
                deviceGroups={presets}
                globalVariables={globalVariables}
            />
        </>
    );
}
