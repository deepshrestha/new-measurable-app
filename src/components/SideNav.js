import React from "react";
import { Link } from "react-router-dom";

const SideNav = () => {
    return (
        <div
            className="col-lg-2 col-sm-4 hidden-xs display-table-cell v-align box"
            id="navigation"
        >
            <div className="logo">
                <a href="#">
                    <img
                        src="/assets/public/dist/images/measurable-logo.png"
                        alt="logo"
                        className="hidden-xs hidden-sm"
                    />
                    <img
                        src="/assets/public/dist/images/measurable-logo.png"
                        alt="logo"
                        className="visible-xs visible-sm circle-logo"
                    />
                </a>
            </div>
            <div className="navi">
                <ul>
                    <li>
                        <a href="#">
                            <i className="fa fa-home" aria-hidden="true"></i>
                            <span className="">Dashboard</span>
                        </a>
                    </li>
                    <li>
                        <a href="#">
                            <i className="fa fa-th-large"></i>
                            <span className="">Resources</span>
                        </a>
                        <ul>
                            <li>
                                <a href="#">
                                    <i className="fa fa-th hidden-lg hidden-md hidden-sm"></i>
                                    <span className="hidden-xs">
                                        Device Groups
                                    </span>
                                </a>
                            </li>
                            <li className="active">
                                <Link to="/home">
                                    <i className="fa fa-hdd-o hidden-lg hidden-md hidden-sm"></i>
                                    <span className="hidden-xs">Devices</span>
                                </Link>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-users hidden-lg hidden-md hidden-sm"></i>
                                    <span className="hidden-xs">Roles</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-file-text hidden-lg hidden-md hidden-sm"></i>
                                    <span className="hidden-xs">Rule Sets</span>
                                </a>
                            </li>
                            <li>
                                <a href="#">
                                    <i className="fa fa-user hidden-lg hidden-md hidden-sm"></i>
                                    <span className="hidden-xs">Users</span>
                                </a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default SideNav;
