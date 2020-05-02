import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import './Checkin.css';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import SendIcon from '@material-ui/icons/Send';
import axios from 'axios'
import history from './history'

const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));

class Checkin extends Component{
    constructor(props){
        super(props);
        this.state = {
            ref_num: ' ',
        }
    }
    valid = (r_num)=>{
      if(r_num!=' '){
        return true;
      }
      else{
        return false;
      }
    }
    handleFormData = (val)=>{
        console.log(val)
        this.setState({ref_num:val});
        if(this.valid(this.state.ref_num)){
        const data = {
          num_checkin:this.state.ref_num,
        }
        axios.post("http://localhost:3001/api/customer/checkin",data)
    .then(data=>{
      console.log(data)
    })
    .catch(error=>{
      console.log(error.response)
    })
    history.push('/api/checkin');
    }
    else{
      alert("Please enter the required data to check in")
    }
    }
    handleInputChange = (val)=>{
      this.setState({ref_num:val.target.value});
    }
    render(){
        console.log("entered")
        return(
    <div>
        <div class = "container">
      <h1 class = "t">Singapore Airlines</h1>
      <ul class= "u">
        <li class = "ll"><a class="active" href="#home">Home</a></li>
        <li class = "ll"><a href="#news">News</a></li>
        <li class = "ll"><a href="#contact">Contact</a></li>
        <li class = "ll"><a href="#about">About</a></li>
      </ul>

    </div>
    <div class="wrapper">
      <div class="banner_body"><h1 class = "desc">Travel Seamlessly with the Singapore Air App</h1>

        <div class = "another"></div>
      </div>
  <div class="banner_folds">
      <div class="banner_fold_left"></div>
      <div class="banner_fold_right"></div>
      <div class="banner_shadow">
        <ul class = "l1">
          <li class = "ls"><a href="/">BOOK TRIP</a></li>
          <li class= "ls"><a class = "active" href="#">CHECK IN</a></li>
          <li class = "ls"><a href="Manage-Booking">MANAGE BOOKING</a></li>
          <li class = "ls"><a href="#about">FLIGHT SCHEDULE</a></li>
        </ul>

      </div>
      </div>
      </div>
      <div class = "mystyle">
      <div class = "fr">

      {/* <h1>Hello {this.state.age}</h1> */}
      <div class = "ref_form">
          <h1>BOOKING REFERENCE NUMBER:</h1>
        <form noValidate autoComplete = "off">
          <div>
          <Input placeholder="Placeholder" onChange = {this.handleInputChange} inputProps={{ 'aria-label': 'description' }} />
        {/* <TextField id="standard-search" onChange = {this.handleInputChange} label="Search field" type="search" /> */}
        </div>
        {/* <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={this.state.ref_num} onChange = {this.handleInputChange} label="Name" class = "input-label"/>
      </FormControl> */}
            </form>
        </div>
        <div class = "b1">
        <Button variant = "contained" onClick={this.handleFormData} endIcon = {<SendIcon/>} color = "primary"  size = "large">SUBMIT</Button>{' '}
        </div>





      {/* <form>
      <p class ="para">TO:</p>
      <Dropdown titleHelper = "Location" title = "Select Destination" list = {this.state.location_end} resetThenSet = {this.resetThenSetEnd}/>
      </form>
      </div>
      <div class = "frm">
      <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p class = "para">DEPART DATE:</p>
      <DatePicker titleHelper = "Location" title = "Select Departure Date" selected = {this.state.startDate} onChange = {this.handleChangeStart}/>
      </form>
      <form>
      <p class = "para">RETURN DATE:</p>
      <DatePicker titleHelper = "Location" title = "Select Return Date" selected = {this.state.endDate} onChange = {this.handleChangeEnd}/>
      </form>
     </div>
      <div class = "frm1">
      <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p class = "para">CLASS:</p>
      <Dropdown titleHelper = "Location" title = "Select Class" list = {this.state.class} resetThenSet = {this.resetThenSetClass}/>
      </form>
      <form>
      <p class = "para">PASSENGERS:</p>
      <Dropdown titleHelper = "Location" title = "Select Number of Passengers" list = {this.state.pass} resetThenSet = {this.resetThenSetPass}/>

      </form>
      </div> */}
      </div>
      </div>
      </div>
        )
    }
}

export default Checkin;
