import React from "react";
import Header from "./Header";
import Dashboard from "./Dashboard";

function Body(props) {
    const {globalVariables} = props
    return (
            <div className="col-md-10 col-sm-11 display-table-cell v-align">
                <div className="row">
                    <Header />
                </div>
                {/* end header */}
                <Dashboard globalVariables={globalVariables}/>
            </div>
    );
}

export default React.memo(Body);
