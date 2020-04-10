import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import about from './about';
import Products from './Products';
import App from './App';
import samplelist from "./samplelist";
export default class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                
                    <Switch>
                    <Route path="/" exact component={App} />
                    <Route path = "/Products" component = {Products}/>
                    <Route path = "/api/flight" component = {samplelist}/>
                    
                    
                    </Switch>
                
            </Router>
        )
    }
}