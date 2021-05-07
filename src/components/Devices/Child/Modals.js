import React, { useEffect, useState, useContext } from 'react'
import {FilterContext} from './../../../context/GlobalFilterContext'

const Modals = (props) => {

    const [{httpDeviceFilter, httpDeviceData}, setFilter] = useContext(FilterContext)

    /* console.log("ModalhttpDeviceFilter", httpDeviceFilter)
    console.log("ModalhttpDeviceData", httpDeviceData) */

    const {domVariables, deviceGroups, globalVariables} = props

    const [deviceStatus, setDeviceStatus] = useState([])
    const [defaultOption, setDefaultOption] = useState('Choose an option')

    let matchingCount = domVariables.matchingCount;
    //let matchingCount = $("#matching-count");
    let deviceStatusModal = $('#device-status-modal');
    let deviceStatusSyncModal = $('#device-status-sync-modal');
    let addToGroupModal = $('#device-add-to-group-modal');
    let firmwareUpdateModal = $('#device-update-firmware-modal');
    let deviceDeleteModal = $('#device-delete-modal');
    let actionTab = $("#action-tab");
    let selectAllRecords = $("#select-all-data");
    let selectMatchedRecords = $("#select-all-matching-data");

    useEffect(()=> {
        let deviceOptionVal = [
            {
                key: 'Choose an option',
                value: 'Choose an option',
                attribute: [
                    {
                        disabled: true
                    }
                ]
            },
            {
                key: '0',
                value: "Off"
            },
            {
                key: '1',
                value: "On"
            }
        ]
        setDeviceStatus(deviceOptionVal)
    }, [onDeviceStatusRunAction])

    const onChangeHandler = (event) => {
        event.preventDefault()
        //console.log(event.target.value)
        const { value } = event.target
        setDefaultOption(value)
    }
    
    const onDeviceStatusRunAction = (event) => {
        event.preventDefault();
        //console.log("onDeviceStatusRunAction")
        let $this = $(event.target);
        let cancelBtn = $('#device-status-cancel-btn');
        let statusOptions = $('#device-status');
        let selectedValue = statusOptions.val();

        if ((selectedValue === undefined) || (selectedValue === '') || (selectedValue === null)) {
            toastr.info('Select an option first!');
            return false;
        }

        let displayedDevices = [];
        $.each($('.select-checkbox'), function (i, e) {
            displayedDevices.push($(e).parents('tr').data('device-number'));
        });

        let selectedDevices = [];
        let selectedRows = $(".select-checkbox:checked");
        $.each(selectedRows, function (i, e) {
            selectedDevices.push($(e).parents('tr').data('device-number'));
        });

        $this.find('.loading').show();
        $this.prop('disabled', true);
        cancelBtn.prop('disabled', true);
        statusOptions.css('pointer-events', 'none');

        $.ajax({
            type: 'POST',
            url: '/change-device-status',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                status: selectedValue,
                displayedDevices: displayedDevices,
                selected_devices: selectedDevices
            },
            success: function (res) {
                toastr.success(res.message);
                deviceStatusModal.modal('hide');

                $("#loading-screen").fadeIn();

                selectAllRecords.prop('checked', false);
                selectMatchedRecords.prop('checked', false);
                actionTab.hide();

                let data = res.data;

                matchingCount.html(Object.keys(data).length).trigger('change');
                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter(
                    {
                        httpDeviceFilter: httpDeviceFilter,
                        httpDeviceData: {
                            data: data,
                            endCount: endCount,
                            nextBtn: nextBtn,
                            prevBtn: prevBtn,
                            startCount: startCount,
                            totalCount: totalCount
                        }
                    }
                )
                
                $("#loading-screen").fadeOut();

                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
                statusOptions.css('pointer-events', '');
            }, error: function () {
                toastr.error('Internal Server Error!');
                deviceStatusModal.modal('hide');
                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
                statusOptions.css('pointer-events', '');
            }
        });
    }

    const onDeviceStatusSyncAction = (event) => {
        event.preventDefault();
        //console.log("onDeviceStatusSyncAction")
        let $this = $(event.target);

        let cancelBtn = $('#device-status-sync-cancel-btn');

        let displayedDevices = [];
        $.each($('.select-checkbox'), function (i, e) {
            displayedDevices.push($(e).parents('tr').data('device-number'));
        });

        let selectedDevices = [];
        let selectedRows = $(".select-checkbox:checked");
        $.each(selectedRows, function (i, e) {
            selectedDevices.push($(e).parents('tr').data('device-number'));
        });

        $this.find('.loading').show();
        $this.prop('disabled', true);
        cancelBtn.prop('disabled', true);

        $.ajax({
            type: 'POST',
            url: '/sync-device-status',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                displayedDevices: displayedDevices,
                selected_devices: selectedDevices
            },
            success: function (res) {
                toastr.success(res.message);
                deviceStatusSyncModal.modal('hide');

                $("#loading-screen").fadeIn();

                selectAllRecords.prop('checked', false);
                selectMatchedRecords.prop('checked', false);
                actionTab.hide();

                let data = res.data;

                matchingCount.html(Object.keys(data).length).trigger('change');

                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter(
                    {
                        httpDeviceFilter: httpDeviceFilter,
                        httpDeviceData: {
                            data: data,
                            endCount: endCount,
                            nextBtn: nextBtn,
                            prevBtn: prevBtn,
                            startCount: startCount,
                            totalCount: totalCount
                        }
                    }
                )

                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
            }, error: function () {
                toastr.error('Internal Server Error!');
                deviceStatusSyncModal.modal('hide');
                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
            }
        });
    }

    const onAddToDeviceGroup = (event) => {
        event.preventDefault();
        //console.log("onAddToDeviceGroup")
        let $this = $(event.target);
        let cancelBtn = $('#device-add-to-group-cancel-btn');
        let groupOptions = $('#device-group');
        let selectedValue = groupOptions.val();

        if ((selectedValue === undefined) || (selectedValue === '') || (selectedValue === null)) {
            toastr.info('Select an option first!');
            return false;
        }

        let displayedDevices = [];
        $.each($('.select-checkbox'), function (i, e) {
            displayedDevices.push($(e).parents('tr').data('device-number'));
        });

        let selectedDevices = [];
        let selectedRows = $(".select-checkbox:checked");
        $.each(selectedRows, function (i, e) {
            selectedDevices.push($(e).parents('tr').data('device-number'));
        });

        $this.find('.loading').show();
        $this.prop('disabled', true);
        cancelBtn.prop('disabled', true);
        groupOptions.css('pointer-events', 'none');

        $.ajax({
            type: 'POST',
            url: '/add-to-device-group',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                group: selectedValue,
                displayedDevices: displayedDevices,
                selected_devices: selectedDevices
            },
            success: function (res) {
                toastr.success(res.message);
                addToGroupModal.modal('hide');

                $("#loading-screen").fadeIn();

                selectAllRecords.prop('checked', false);
                selectMatchedRecords.prop('checked', false);
                actionTab.hide();

                let data = res.data;
                matchingCount.html(Object.keys(data).length).trigger('change');
                
                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter(
                    {
                        httpDeviceFilter: httpDeviceFilter,
                        httpDeviceData: {
                            data: data,
                            endCount: endCount,
                            nextBtn: nextBtn,
                            prevBtn: prevBtn,
                            startCount: startCount,
                            totalCount: totalCount
                        }
                    }
                )

                $("#loading-screen").fadeOut();

                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
                groupOptions.css('pointer-events', '');
            }, error: function () {
                toastr.error('Internal Server Error!');
                addToGroupModal.modal('hide');
                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
                groupOptions.css('pointer-events', '');
            }
        });
    }

    const onUpdateDeviceFirmware = (event) => {
        event.preventDefault();
        //console.log("onAddToDeviceGroup")
        let $this = $(event.target);
        let cancelBtn = $('#device-update-firmware-cancel-btn');

        let displayedDevices = [];
        $.each($('.select-checkbox'), function (i, e) {
            displayedDevices.push($(e).parents('tr').data('device-number'));
        });

        let selectedDevices = [];
        let selectedRows = $(".select-checkbox:checked");
        $.each(selectedRows, function (i, e) {
            selectedDevices.push($(e).parents('tr').data('device-number'));
        });

        $this.find('.loading').show();
        $this.prop('disabled', true);
        cancelBtn.prop('disabled', true);

        $.ajax({
            type: 'POST',
            url: '/update-device-firmware',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                displayedDevices: displayedDevices,
                selected_devices: selectedDevices
            },
            success: function (res) {
                if (res.success) {
                    toastr.success(res.message);
                    firmwareUpdateModal.modal('hide');

                    $("#loading-screen").fadeIn();

                    selectAllRecords.prop('checked', false);
                    selectMatchedRecords.prop('checked', false);
                    actionTab.hide();

                    let data = res.data;
                    matchingCount.html(Object.keys(data).length).trigger('change');
                    
                    globalVariables.currentPage = res.currentPage;
                    const startCount = res.startCount;
                    const endCount = res.endCount;
                    const totalCount = res.totalCount;
                    const prevBtn = res.prevBtn;
                    const nextBtn = res.nextBtn;

                    setFilter(
                        {
                            httpDeviceFilter: httpDeviceFilter,
                            httpDeviceData: {
                                data: data,
                                endCount: endCount,
                                nextBtn: nextBtn,
                                prevBtn: prevBtn,
                                startCount: startCount,
                                totalCount: totalCount
                            }
                        }
                    )

                    $("#loading-screen").fadeOut();
                    
                } else {
                    $("#loading-screen").fadeOut();
                    toastr.warning("Permission Denied!");
                    firmwareUpdateModal.modal('hide');
                }
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
            }, error: function () {
                toastr.error('Internal Server Error!');
                firmwareUpdateModal.modal('hide');
                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
            }
        });
    }

    const onDeleteDeviceData = (event) => {
        event.preventDefault();
        let $this = $(event.target);
        let cancelBtn = $('#device-delete-cancel-btn');

        let displayedDevices = [];
        $.each($('.select-checkbox'), function (i, e) {
            displayedDevices.push($(e).parents('tr').data('device-number'));
        });

        let selectedDevices = [];
        let selectedRows = $(".select-checkbox:checked");
        $.each(selectedRows, function (i, e) {
            selectedDevices.push($(e).parents('tr').data('device-number'));
        });

        $this.find('.loading').show();
        $this.prop('disabled', true);
        cancelBtn.prop('disabled', true);

        $.ajax({
            type: 'POST',
            url: '/delete-device',
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
            },
            data: {
                displayedDevices: displayedDevices,
                selected_devices: selectedDevices
            },
            success: function (res) {
                toastr.success(res.message);
                deviceDeleteModal.modal('hide');

                $("#loading-screen").fadeIn();

                selectAllRecords.prop('checked', false);
                selectMatchedRecords.prop('checked', false);
                actionTab.hide();

                let data = res.data;
                matchingCount.html(Object.keys(data).length).trigger('change');

                globalVariables.currentPage = res.currentPage;
                const startCount = res.startCount;
                const endCount = res.endCount;
                const totalCount = res.totalCount;
                const prevBtn = res.prevBtn;
                const nextBtn = res.nextBtn;

                setFilter(
                    {
                        httpDeviceFilter: httpDeviceFilter,
                        httpDeviceData: {
                            data: data,
                            endCount: endCount,
                            nextBtn: nextBtn,
                            prevBtn: prevBtn,
                            startCount: startCount,
                            totalCount: totalCount
                        }
                    }
                )

                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
            }, error: function () {
                toastr.error('Internal Server Error!');
                deviceDeleteModal.modal('hide');
                $("#loading-screen").fadeOut();
                $this.find('.loading').hide();
                $this.prop('disabled', false);
                cancelBtn.prop('disabled', false);
            }
        });
    }

    return (
        <>
        {/* Device State Change Modal */}
        <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade"
            data-backdrop="static" data-keyboard="false" id="device-status-modal" role="dialog"
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Device Status</h2>
                    </div>
                    <form autoComplete="off" id="device-status-form">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="device-status">Device Status</label>
                                </div>
                                <div className="col-md-9">
                                    <select value={defaultOption} className="form-control" name="device_status"
                                        id="device-status" 
                                        required
                                        onChange={onChangeHandler}>
                                        {
                                            deviceStatus.map((item, index) => {
                                                //console.log(item.key, item.value)
                                                return(
                                                    <option key={index} 
                                                        disabled={item.attribute !== undefined ? item.attribute[0].disabled : false} 
                                                        value={item.key}>{item.value}
                                                    </option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    id="device-status-cancel-btn">Cancel
                            </button>
                            <button type="button" 
                                    className="btn btn-primary btn-sm"
                                    id="device-status-run-btn"
                                    onClick={(event) => onDeviceStatusRunAction(event)}>
                                    <i className="fa fa-cog fa-spin loading" style={{fontSize:"14px", display: "none"}}></i>
                                Run Action
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Device State Sync Modal */}
        <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade"
            data-backdrop="static" data-keyboard="false" id="device-status-sync-modal" role="dialog"
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Device Status Sync</h2>
                    </div>
                    <form autoComplete="off" id="device-status-sync-form">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>
                                        Are you sure you want to run this action?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    id="device-status-sync-cancel-btn">Cancel
                            </button>
                            <button type="button" className="btn btn-primary btn-sm"
                                    id="device-status-sync-run-btn"
                                    onClick={(event) => onDeviceStatusSyncAction(event)}>
                                    <i className="fa fa-cog fa-spin loading" style={{fontSize:"14px", display: "none"}}></i>
                                Run Action
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Device Add to Group Modal */}
        <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade"
            data-backdrop="static" data-keyboard="false" id="device-add-to-group-modal" role="dialog"
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Add To Device Group</h2>
                    </div>
                    <form autoComplete="off" id="device-add-to-group-form">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-3">
                                    <label htmlFor="device-group">Device Group</label>
                                </div>
                                <div className="col-md-9">
                                    <select value={defaultOption} className="form-control" name="device_group"
                                        id="device-group" 
                                        required
                                        onChange={onChangeHandler}>
                                        <option value="Choose an option" disabled={true}>
                                            Choose an option
                                        </option>
                                        {
                                            Object.keys(deviceGroups).map(item => {                                    
                                                //console.log(item)
                                                if(item === "deviceGroups" && deviceGroups[item].length > 0)
                                                {
                                                    return (
                                                        deviceGroups[item].map((deviceGroup, index) => {
                                                            //console.log(deviceGroup.id, deviceGroup.name)
                                                            return(
                                                                <option key={index} value={deviceGroup.id}>{deviceGroup.name}</option>
                                                            )
                                                        })
                                                    )                                        
                                                }
                                            })                                
                                        }
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    id="device-add-to-group-cancel-btn">Cancel
                            </button>
                            <button type="button" className="btn btn-primary btn-sm"
                                    id="device-add-to-group-run-btn"
                                    onClick={(event) => onAddToDeviceGroup(event)}>
                                    <i className="fa fa-cog fa-spin loading" style={{fontSize:"14px", display: "none"}}></i>
                                Run Action
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Device Update Firmware Modal */}
        <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade"
            data-backdrop="static" data-keyboard="false" id="device-update-firmware-modal" role="dialog"
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Update firmware</h2>
                    </div>
                    <form autoComplete="off" id="device-update-firmware-form">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>
                                        Are you sure you want to run this action?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    id="device-update-firmware-cancel-btn">Cancel
                            </button>
                            <button type="button" className="btn btn-primary btn-sm"
                                    id="device-update-firmware-run-btn"
                                    onClick={(event) => onUpdateDeviceFirmware(event)}>
                                    <i className="fa fa-cog fa-spin loading" style={{fontSize:"14px", display: "none"}}></i>
                                Run Action
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>

        {/* Device Delete Modal */}
        <div aria-hidden="true" aria-labelledby="myModalLabel" className="modal fade"
            data-backdrop="static" data-keyboard="false" id="device-delete-modal" role="dialog"
            tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Delete Resource</h2>
                    </div>
                    <form autoComplete="off" id="device-delete-firmware-form">
                        <div className="modal-body">
                            <div className="row">
                                <div className="col-md-12">
                                    <label>
                                        Are you sure you want to delete the selected resources?
                                    </label>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button type="button" className="btn btn-link"
                                    id="device-delete-cancel-btn">Cancel
                            </button>
                            <button type="button" className="btn btn-danger btn-sm"
                                    id="device-delete-run-btn"
                                    onClick={(event) => onDeleteDeviceData(event)}>
                                <i className="fa fa-cog fa-spin loading" style={{fontSize:"14px", display: "none"}}></i>
                                Delete
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    )
}

export default Modals