import React, { Component } from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from './history';
import about from './about';
import Products from './Products';
import App from './App';
import samplelist from "./samplelist";
import Checkin from './Checkin';
import Managebooking from './Managebooking';
import Customer from './Customer';
import CustomerCheckin from './CustomerCheckin';
import Register from './Register';
export default class Routers extends Component {
    render() {
        return (
            <Router history={history}>
                
                    <Switch>
                    <Route path="/" exact component={App} />
                    <Route path = "/Products" component = {Products}/>
                    <Route path = "/Check-in" component = {Checkin}/>
                    <Route path = "/Manage-Booking" component = {Managebooking}/>
                    <Route path = "/api/flight" component = {samplelist}/>
                    <Route path = "/api/customer" component = {Customer}/>
                    <Route path = "/api/customer/update" component = {Customer}/>
                    <Route path = "/api/checkin" component = {CustomerCheckin}/>
                    <Route path = "/api/checkin/done" component = {Checkin}/>
                    <Route path = "/registration" component = {Register}/>
                    
                    
                    </Switch>
                
            </Router>
        )
    }
}