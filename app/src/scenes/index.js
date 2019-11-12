import React , { Component } from "react";
import { Route ,Switch,  BrowserRouter as Router } from "react-router-dom";
import Feed from "./Feed";
import Analytic from "./Analytic";


class Layout extends Component{
    constructor(){
        super()
    }
    render(){
        return(
                <Router>
                    <Switch>
                        <Route  exact path={"/feed"} component={Feed}></Route>
                        <Route  path={"/analytics"} component={Analytic}></Route>
                        {/* <Route path={"*"} component={} /> */}
                    </Switch>
                </Router>
        )
    }
}

export default  Layout
