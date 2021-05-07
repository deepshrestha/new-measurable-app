import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { apiHandler } from "./../api/apiHandler";

export default function Header() {
    const resultContainerRef = useRef();
    const globalSearchRef = useRef();

    const onChangeGlobalSearch = event => {
        event.preventDefault();
        const { value } = event.target;

        if (value === "") {
            resultContainerRef.current.innerHTML = "";
            resultContainerRef.current.style.display = "none";
        } else {
            let timeout = null;
            let resultLoadingTemplate = `<div class="search loading">
                                         <img src="/assets/public/dist/images/loading.gif" alt="" />
                                         </div>`;
            resultContainerRef.current.innerHTML = resultLoadingTemplate;
            resultContainerRef.current.setAttribute("height", "auto");
            resultContainerRef.current.setAttribute("overflow-y", "auto");
            resultContainerRef.current.style.display = "block";

            /* clearTimeout(timeout);
            timeout = setTimeout(function() {
                apiHandler(`/nova-api/search?search=${value}`, "GET")
                    .then(res => {
                        let userCount = 0;
                        let deviceCount = 0;
                        let roleCount = 0;
                        let searchResultTemplate = '<div class="">';
                        let userResultTemplate =
                            '<div class="search user"><h3>Users</h3><ul>';
                        let deviceResultTemplate =
                            '<div class="search devices"><h3>Devices</h3><ul class="list-reset">';
                        let roleResultTemplate =
                            '<div class="search roles"><h3>Roles</h3><ul>';
                        let noResultTemplate =
                            '<div class="search no-result"><h3>No Results Found.</h3></div>';

                        if ($(res).length <= 0) {
                            resultContainerRef.current.innerHTML = noResultTemplate;
                            resultContainerRef.current.style.display = "block";
                        } else {
                            $.each(res, function(i, e) {
                                if (e.resourceName === "users") {
                                    userCount++;
                                    let url = e.url.replace(/\/\/+/g, "/");
                                    userResultTemplate += userTemplate(
                                        url,
                                        e.title,
                                        e.avatar
                                    );
                                }

                                if (e.resourceName === "devices") {
                                    deviceCount++;
                                    let url = e.url.replace(/\/\/+/g, "/");
                                    deviceResultTemplate += deviceTemplate(
                                        url,
                                        e.title
                                    );
                                }

                                if (e.resourceName === "roles") {
                                    roleCount++;
                                    let url = e.url.replace(/\/\/+/g, "/");
                                    roleResultTemplate += roleTemplate(
                                        url,
                                        e.title
                                    );
                                }
                            });

                            if (deviceCount > 0) {
                                deviceResultTemplate += "</ul></div>";
                                searchResultTemplate += deviceResultTemplate;
                            }

                            if (userCount > 0) {
                                userResultTemplate += "</ul></div>";
                                searchResultTemplate += userResultTemplate;
                            }

                            if (roleCount > 0) {
                                roleResultTemplate += "</ul></div>";
                                searchResultTemplate += roleResultTemplate;
                            }

                            searchResultTemplate += "</div>";
                            resultContainerRef.current.innerHTML = searchResultTemplate;
                            resultContainerRef.current.setAttribute(
                                "height",
                                "300px"
                            );
                            resultContainerRef.current.setAttribute(
                                "overflow-y",
                                "auto"
                            );
                            resultContainerRef.current.style.display = "block";
                        }
                    })
                    .catch(err => {
                        toastr.error(err);
                    });
            }, 1000);*/
        }
    };

    const onFocusOutGlobalSearch = event => {
        event.preventDefault();

        event.target.value = "";
        resultContainerRef.current.innerHTML = "";
        resultContainerRef.current.style.display = "none";

        /* console.log("I am clicked!!");
        console.log(resultContainerRef.current.onblur); */
        /* if (!resultContainerRef.current.is(":hover")) {
            $this.val('');
            resultContainerRef.current.innerHTML = '';
            resultContainerRef.current.style.display = 'none';
        } */
    };

    function userTemplate(url, title, avatar) {
        return (
            '<li> \
                <a class="inline-flex" href="' +
            url +
            '"> \
                <img src="' +
            avatar +
            '" alt=""> \
                <div><p>' +
            title +
            "</p></div> \
                </a> \
                </li>"
        );
    }

    function deviceTemplate(url, title) {
        return (
            '<li> \
                <a href="' +
            url +
            '"> \
                <div><p>' +
            title +
            "</p></div> \
                </a> \
                </li>"
        );
    }

    function roleTemplate(url, title) {
        return (
            '<li> \
                <a href="' +
            url +
            '"> \
                <div><p>' +
            title +
            "</p></div> \
                </a> \
                </li>"
        );
    }

    const logout = () => {
        if (window.localStorage.getItem("user_name"))
            window.localStorage.removeItem("user_name");

        //history.push("/login");
    };

    return (
        <header>
            <div className="col-lg-7 col-sm-6 col-xs-7">
                <nav className="navbar-default pull-left">
                    <div className="navbar-header">
                        <button
                            type="button"
                            className="navbar-toggle collapsed"
                            data-toggle="offcanvas"
                            data-target="#side-menu"
                            aria-expanded="false"
                        >
                            <span className="sr-only">Toggle navigation</span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                            <span className="icon-bar"></span>
                        </button>
                    </div>
                </nav>
                <div className="search">
                    <span className="input-group-addon">
                        <i className="fa fa-search"></i>
                    </span>
                    <input
                        ref={globalSearchRef}
                        type="search"
                        placeholder="Press / to search"
                        className="pl-search w-full form-global-search"
                        id="global-search"
                        autoComplete="off"
                        onChange={event => onChangeGlobalSearch(event)}
                        onBlur={event => onFocusOutGlobalSearch(event)}
                    />
                    <div className="row">
                        <div className="form-group col-lg-12">
                            <div
                                ref={resultContainerRef}
                                id="searchResults"
                            ></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-5 col-sm-6 col-xs-5">
                <div className="header-rightside">
                    <ul className="list-inline header-top pull-right">
                        <li className="dropdown">
                            <a
                                href="#"
                                className="dropdown-toggle"
                                data-toggle="dropdown"
                            >
                                <img
                                    src="/assets/public/dist/images/avatar.jpg"
                                    alt="user"
                                />
                                <span id="user_name" className=""></span>
                                <b className="caret"></b>
                            </a>
                            <ul className="dropdown-menu">
                                <li>
                                    <div className="navbar-content">
                                        {/* <a href="/nova/logout" className="">
                                            Logout
                                        </a> */}
                                        <Link
                                            to="/"
                                            onClick={logout}
                                        >
                                            Logout
                                        </Link>
                                    </div>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </div>
            </div>
        </header>
    );
}
