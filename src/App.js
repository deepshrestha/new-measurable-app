import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Home from "./components/Home";
import SideNav from "./components/SideNav";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import DeviceDetails from "./components/DeviceDetails/DeviceDetails";
import GlobalFilterContext from "./context/GlobalFilterContext";
import GlobalDeviceOutletIntensityContext from "./context/GlobalDeviceOutletIntensityContext";

export default function App() {
  const globalVariables = {
    currentPage: 1,
    tableSearchKeyword: "",
    lSSD: "",
    lSED: "",
    timeout: null,
  };

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/home">
            <Redirect to="/new-react-device-list-route/list" />
          </Route>
          <Route path="/new-react-device-list-route/:slug">
            <section id="dashboard">
              <div className="container-fluid display-table">
                <div className="row display-table-row">
                  <Home>
                    <SideNav />
                    <div className="col-md-10 col-sm-11 display-table-cell v-align">
                      <div className="row">
                        <Header />
                      </div>
                      <Route exact path="/new-react-device-list-route/list">
                        <GlobalFilterContext>
                          <Dashboard globalVariables={globalVariables} />
                        </GlobalFilterContext>
                      </Route>
                      <Route path="/new-react-device-list-route/device-details">
                        <GlobalDeviceOutletIntensityContext>
                          <DeviceDetails globalVariables={globalVariables} />
                        </GlobalDeviceOutletIntensityContext>
                      </Route>
                    </div>
                  </Home>
                </div>
              </div>
            </section>
            <Footer />
          </Route>
        </Switch>
      </Router>
    </>
  );
}
