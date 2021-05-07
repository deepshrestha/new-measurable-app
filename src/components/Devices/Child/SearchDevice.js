import React, { useContext } from "react";
import { FilterContext } from "./../../../context/GlobalFilterContext";
import { apiHandler } from "./../../../api/apiHandler";

export default function SearchDevice(props) {
  const { domVariables, globalVariables, data, jsonData } = props;

  const [{ httpDeviceFilter, httpDeviceData }, setFilter] = useContext(
    FilterContext
  );

  let matchingCount = domVariables.matchingCount;
  const minCurrentFilter = domVariables.minCurrentFilter;
  const maxCurrentFilter = domVariables.maxCurrentFilter;
  const statusFilter = domVariables.statusFilter;
  const groupsFilter = domVariables.groupsFilter;
  const minPowerFilter = domVariables.minPowerFilter;
  const maxPowerFilter = domVariables.maxPowerFilter;
  const minEnergyFilter = domVariables.minEnergyFilter;
  const maxEnergyFilter = domVariables.maxEnergyFilter;
  const tableSearchInput = domVariables.tableSearchInput;

  const getFilterData = () => {
    return {
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
      search_keyword: tableSearchInput.val(),
    };
  };

  const onFocusOutTableSearch = () => {
    clearTimeout(globalVariables.timeout);
    globalVariables.timeout = setTimeout(function () {
      if (globalVariables.tableSearchKeyword !== tableSearchInput.val()) {
        $("#loading-screen").fadeIn();

        let filterData = getFilterData();

        apiHandler("/table-search", "POST", filterData)
          .then((res) => {
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
                totalCount: totalCount,
              },
            });
            $("#loading-screen").fadeOut();
          })
          .catch((err) => {
            $("#loading-screen").fadeOut();
            toastr.error(err);
          });
      }
    }, 1000);
  };

  const onFocusInTableSearch = () => {
    globalVariables.tableSearchKeyword = tableSearchInput.val();
  };

  const onKeyupTableSearch = () => {
    clearTimeout(globalVariables.timeout);
    globalVariables.timeout = setTimeout(function () {
      globalVariables.tableSearchKeyword = tableSearchInput.val();
      if (tableSearchInput.val() !== "") {
        $("#loading-screen").fadeIn();

        let filterData = getFilterData();

        apiHandler("/table-search", "POST", filterData)
          .then((res) => {
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
                totalCount: totalCount,
              },
            });
            $("#loading-screen").fadeOut();
          })
          .catch((err) => {
            $("#loading-screen").fadeOut();
            toastr.error(err);
          });
      }
    }, 1000);
  };

  return (
    <div className="col-sm-6 col-md-3">
      <div className="dashboard-body-uppersection">
        <span className="input-group-addon">
          <i className="fa fa-search"></i>
        </span>
        <input
          data-testid="search-input"
          placeholder="Search"
          type="search"
          className="appearance-none form-search w-search pl-search shadow"
          id="table-search-input"
          autoComplete="off"
          onKeyUp={onKeyupTableSearch}
          onFocus={onFocusInTableSearch}
          onBlur={onFocusOutTableSearch}
        />
      </div>
    </div>
  );
}
