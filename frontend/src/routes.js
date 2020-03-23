import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import about from './about';
export default class routes extends Component {
    render() {
        return (
            <Router history={history}>
                <Switch>
                    
                    <Route path="/about" component={about} />
                    
                </Switch>
            </Router>
        )
    }
}