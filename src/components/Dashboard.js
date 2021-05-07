import React, { useEffect, useContext } from 'react'
import Devices from "./Devices/Devices";
import MetricPreset from "./MetricPreset";
import Modals from './Devices/Child/Modals';
import {FilterContext} from './../context/GlobalFilterContext';

const Dashboard = ({globalVariables}) => {

    let matchingCount = $("#matching-count");
    const presetOption = $('#filter-preset-options');
    const presetNameInput = $('#preset-name');
    const minCurrentFilter = $('#filter-current-min');
    const maxCurrentFilter = $('#filter-current-max');
    const statusFilter = $('#filter-status');
    const groupsFilter = $('#filter-groups');
    const minPowerFilter = $('#filter-power-min');
    const maxPowerFilter = $('#filter-power-max');
    const minEnergyFilter = $('#filter-energy-min');
    const maxEnergyFilter = $('#filter-energy-max');
    const tableSearchInput = $('#table-search-input');

    const domVariables = {
        matchingCount,
        presetOption,
        presetNameInput ,
        minCurrentFilter,
        maxCurrentFilter,
        statusFilter,
        groupsFilter,
        minPowerFilter,
        maxPowerFilter,
        minEnergyFilter, 
        maxEnergyFilter,
        tableSearchInput       
    }

    const [{httpDeviceFilter, httpDeviceData}, setFilter] = useContext(FilterContext)
    /* console.log("httpDeviceFilter", httpDeviceFilter)
    console.log("httpDeviceData", httpDeviceData) */
    return (
        <div className="user-dashboard">
            <div id="filter-card">
                {/* metric preset */}
                <MetricPreset domVariables={domVariables} presetOption={presetOption} presets={httpDeviceFilter} globalVariables={globalVariables} />
                {/* metric preset */}
            </div>
            {/* Modals */}
            <Modals domVariables={domVariables} globalVariables={globalVariables} deviceGroups={httpDeviceFilter} />
            {/* device */}
            <Devices domVariables={domVariables} globalVariables={globalVariables} data={httpDeviceData} />
            {/* device */}
        </div>
    )
}

export default React.memo(Dashboard)
