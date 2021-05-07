import React, { useEffect, useState, useRef, useContext } from "react";
import { useHistory } from "react-router-dom";
import { FilterContext } from "./../../../context/GlobalFilterContext";

export default function DeviceTable({
    domVariables,
    globalVariables,
    data,
    jsonData
}) {
    //console.log(data, jsonData)

    const history = useHistory();
    const tableRef = useRef();
    //const [content, setContent] = useState()
    const { nextBtn, prevBtn, startCount, totalCount, endCount } = jsonData;

    const [{ httpDeviceFilter, httpDeviceData }, setFilter] = useContext(
        FilterContext
    );

    //console.log("selected", deleteSelectedCount, actionTab)

    //let table = $("#device-table");
    let pageCountDetails = $("#pagination-count-box");
    let prevBtnEle = $("#pagination-prev-btn");
    let nextBtnEle = $("#pagination-next-btn");
    let selectAllRecords = $("#select-all-data");
    let selectMatchedRecords = $("#select-all-matching-data");
    let deleteSelectedCount = $(".selected-count");
    let actionTab = $("#action-tab");
    let deviceStatusModal = $("#device-status-modal");
    let deviceStatusSyncModal = $("#device-status-sync-modal");
    let addToGroupModal = $("#device-add-to-group-modal");
    let firmwareUpdateModal = $("#device-update-firmware-modal");
    let deviceDeleteModal = $("#device-delete-modal");

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

    $("#select-action-btn").on("click", function(event) {
        event.stopImmediatePropagation()
        let action = $("#select-action").val();
        if (action === "device-status") {
            deviceStatusModal.modal();
        } else if (action === "device-status-sync") {
            deviceStatusSyncModal.modal();
        } else if (action === "add-to-device-group") {
            addToGroupModal.modal();
        } else if (action === "update-firmware") {
            firmwareUpdateModal.modal();
        } else {
            toastr.warning("Something went wrong!");
        }
    });

    $("#select-action").on("change", function() {
        $("#select-action-btn").prop("disabled", false);
    });       

    $("#device-status-cancel-btn").on("click", function() {
        deviceStatusModal.modal("hide");
    });

    $("#device-status-sync-cancel-btn").on("click", function() {
        deviceStatusSyncModal.modal("hide");
    });

    $("#device-add-to-group-cancel-btn").on("click", function() {
        addToGroupModal.modal("hide");
    });

    $("#device-update-firmware-cancel-btn").on("click", function() {
        firmwareUpdateModal.modal("hide");
    });

    $("#delete-selected-devices").on("click", function() {
        deviceDeleteModal.modal();
    });

    $("#device-delete-cancel-btn").on("click", function() {
        deviceDeleteModal.modal("hide");
    });

    $(document).on("click", ".select-details", function(event) {
        event.stopImmediatePropagation()
        const deviceDetails = $(this).attr('id').replace('select-details_', '').split("*");
        const [deviceId, deviceDetail] = deviceDetails;
        const deviceName = deviceDetail.split("-")[0];
        const deviceNumber = deviceDetail.split("-")[1];

        //console.log(deviceId, deviceName, deviceNumber);
        
        history.push(
            {
                pathname: "/new-react-device-list-route/device-details",
                state: {
                    deviceId,
                    deviceName,
                    deviceNumber
                }
            }
        );
    });

    $(document).on("click", ".select-checkbox", function(event) {
        console.log("checkbox")
        let selectedCount = $(".select-checkbox:checked").length;
        if (selectedCount > 0) {
            //console.log("globalVariables", globalVariables)
            deleteSelectedCount.html(selectedCount).trigger("change");
            actionTab.css("display", "block");
        } else {
            actionTab.css("display", "none");
        }
    });

    useEffect(() => {
        //console.log("use effect")

        const tableElement = tableRef.current;

        let table = $(tableElement).DataTable({
            pageLength: 25,
            lengthChange: false,
            info: false,
            paging: false
        });

        selectAllRecords.on("click", function() {
            console.log("select all records")
            if ($(this).is(":checked")) {
                $(".checkbox-select")
                    .prop("checked", true)
                    .trigger("change");
                $(".select-checkbox")
                    .prop("checked", true)
                    .trigger("change");
                let selectedCount = $(".select-checkbox:checked").length;
                deleteSelectedCount.html(selectedCount).trigger("change");
                if (selectedCount > 0) {
                    actionTab.show();
                }
            } else {
                $(".checkbox-select")
                    .prop("checked", false)
                    .trigger("change");
                $(".select-checkbox")
                    .prop("checked", false)
                    .trigger("change");
                selectMatchedRecords.prop("checked", false).trigger("change");
                actionTab.hide();
            }
        });

        selectMatchedRecords.on("click", function() {
            console.log("selectMatchedRecords");
            if ($(this).is(":checked")) {
                $(".checkbox-select")
                    .prop("checked", true)
                    .trigger("change");
                $(".select-checkbox")
                    .prop("checked", true)
                    .trigger("change");
                selectAllRecords.prop("checked", true).trigger("change");
                let selectedCount = $(".select-checkbox:checked").length;
                deleteSelectedCount.html(selectedCount).trigger("change");
                if (selectedCount > 0) {
                    actionTab.show();
                }
            } else {
                if (!selectAllRecords.is(":checked")) {
                    $(".checkbox-select")
                        .prop("checked", false)
                        .trigger("change");
                    $(".select-checkbox")
                        .prop("checked", false)
                        .trigger("change");
                    actionTab.hide();
                }
            }
        });

        renderTableData({
            table,
            pageCountDetails,
            prevBtnEle,
            nextBtnEle,
            data,
            startCount,
            endCount,
            totalCount,
            prevBtn,
            nextBtn
        });

        return () => {
            console.log("destroy table");
            table.destroy();
        };
    }, [data]);

    function renderTableData(tableObj) {
        //console.log("renderTableData", tableObj.table, tableObj.data)

        pageCountDetails.html(
            tableObj.startCount +
                "-" +
                tableObj.endCount +
                " of " +
                tableObj.totalCount
        );

        if (tableObj.prevBtn) {
            tableObj.prevBtnEle.removeClass("disabled");
        } else {
            tableObj.prevBtnEle.addClass("disabled");
        }

        if (tableObj.nextBtn) {
            tableObj.nextBtnEle.removeClass("disabled");
        } else {
            tableObj.nextBtnEle.addClass("disabled");
        }

        $("#select-all-data")
            .prop("checked", false)
            .trigger("change");
        $(".checkbox-select")
            .prop("checked", false)
            .trigger("change");
        $(".select-checkbox")
            .prop("checked", false)
            .trigger("change");
        $("#select-all-matching-data")
            .prop("checked", false)
            .trigger("change");
        $("#action-tab").hide();

        tableObj.table.clear().draw();
        let content = "";
        Object.keys(tableObj.data).map(item => {
            if (typeof tableObj.data[item] === "object") {
                Object.values(data[item]).map((result, index) => {
                    let deviceId =  6; //result.device_id;
                    let locationBuilder = result.location_builder ?? "__";
                    let energy = result.kwatts ?? 0;
                    let power = result.watts ?? 0;
                    let current = result.amps ?? 0;
                    let status = result.status === 1 ? "On" : "Off";
                    let lastSeen = result.lastEventTime ?? "";

                    let template = `<tr data-device-number="${result.device_number}">
                                    <td>
                                    <input onClick="" type="checkbox" class="checkbox select-checkbox" id="${result.device_number}-checkbox">
                                    </td>
                                    <td>
                                    <span class="select-details" id="select-details_${deviceId}*${result.device_number}-${result.name}"><a href="javascript:void(0);"><i class="fa fa-eye"></i></a></span>
                                    <span><a href="#"><i class="fa fa-pencil-square-o"></i></a></span>
                                    <span><a href="#"><i class="fa fa-trash-o"></i></a></span>
                                    </td>
                                    <td>${result.device_number}</td>
                                    <td>${result.name}</td>
                                    <td>${result.type}</td>
                                    <td>${locationBuilder}</td>
                                    <td>${energy}</td>
                                    <td>${power}</td>
                                    <td>${current}</td>
                                    <td>${status}</td>
                                    <td>${lastSeen}</td>
                                    </tr>`;

                    content += template;
                });
            }
        });

        tableObj.table.rows.add($(content)).draw();
    }

    const onPreviousButton = () => {
        $("#loading-screen").fadeIn();
        let prevPage = parseInt(globalVariables.currentPage) - 1;

        $.ajax({
            type: "POST",
            url: "/page-data",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            data: {
                page: prevPage,
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
            },
            success: function(res) {
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
            },
            error: function() {
                $("#loading-screen").fadeOut();
                toastr.error("Internal Server Error!");
            }
        });
    };

    const onNextButton = () => {
        $("#loading-screen").fadeIn();
        let nextPage = parseInt(globalVariables.currentPage) + 1;
        $.ajax({
            type: "POST",
            url: "/page-data",
            headers: {
                "X-CSRF-TOKEN": $('meta[name="csrf-token"]').attr("content")
            },
            data: {
                page: nextPage,
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
            },
            success: function(res) {
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
            },
            error: function() {
                $("#loading-screen").fadeOut();
                toastr.error("Internal Server Error!");
            }
        });
    };

    return (
        <>
            <div className="dashboard-table-new-css">
                <table ref={tableRef} id="device-table" className="table">
                    <thead>
                        <tr>
                            <th width="50">&nbsp;</th>
                            <th width="130">&nbsp;</th>
                            <th>Device ID</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Locations</th>
                            <th>Energy (WH) Current Hour</th>
                            <th>Power (WATTS)</th>
                            <th>Current</th>
                            <th>Status</th>
                            <th>Last Seen</th>
                        </tr>
                    </thead>
                    <tbody id="device-list-tbody"></tbody>
                </table>
            </div>
            <div className="dash-pagination">
                <a
                    className="prev btn btn-link"
                    id="pagination-prev-btn"
                    onClick={onPreviousButton}
                >
                    Previous
                </a>
                <span className="pagination-box" id="pagination-count-box">
                    0-0 of 0
                </span>
                <a
                    className="next btn btn-link"
                    id="pagination-next-btn"
                    onClick={onNextButton}
                >
                    Next
                </a>
            </div>
        </>
    );
}
