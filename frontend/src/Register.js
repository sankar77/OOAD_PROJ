import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import DatePicker from "react-datepicker";
import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
import "react-datepicker/dist/react-datepicker.css";
import './App.css';
import './Register.css';
//import './Checkin.css';
// import MaterialUIForm from  'react-material-ui-form';
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

class Register extends Component{
    constructor(props){
        super(props);
        this.state = {
            first_name: ' ',
            last_name: ' ',
            year_of_birth: ' ',
            email: ' ',
            ph_no: ' ',
            us_name: ' ',
            pswd: ' ',
        }
    }
    handleFormData = (val)=>{
        console.log(val)
        this.setState({ref_num:val});
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
    handleFirstNameChange = (val)=>{
      this.setState({first_name:val.target.value});
    }
    handleLastNameChange = (val)=>{
        this.setState({last_name:val.target.value});
    }
    handleYearChange = (val)=>{
      this.setState({year_of_birth:val.target.value});
    }
    handleEmailChange = (val)=>{
      this.setState({email:val.target.value});
    }
    handlePhoneChange = (val)=>{
      this.setState({ph_no:val.target.value});
    }
    handleUserNameChange = (val)=>{
      this.setState({us_name:val.target.value});
    }
    handlePasswordChange = (val)=>{
      this.setState({pswd:val.target.value});
    }
    valid = (f_n,l_n,y_b,e_m,p_n,u_n,p_s)=>{
      if(f_n!=' '&&l_n!=' '&&y_b!=' '&&e_m!=' '&&p_n!=' '&&u_n!=' '&&p_s!=' '){
        if(f_n!=l_n&&y_b>1940&&y_b<2019&&p_n.length==10){
          if(p_s.length>6){
            return true;
          }
          return false;
        }
        return false;
      }
      else{
        return false;
      }
    }
    handleFormData = ()=>{
      if(this.valid(this.state.first_name,this.state.last_name,this.state.year_of_birth,this.state.email,this.state.ph_no,this.state.us_name,this.state.pswd)){
      const data = {
        first_name:this.state.first_name,
        last_name:this.state.last_name,
        year:this.state.year_of_birth,
        email:this.state.email,
        phone_no:this.state.ph_no,
        user_name:this.state.us_name,
        password:this.state.pswd,
      }
      axios.post("http://localhost:3001/api/registration",data)
      .then(data=>{
        console.log(data)
      })
      .catch(error=>{
        console.log(error.response)
      })
    }
    else{
      alert("Please enter the required data to enable registration")
    }
    }
    getData = ()=>{
      axios({
        method:"get",
        url:"http://localhost:3001/api/registration",
        withCredentials:false,
        headers: {
            "Access-Control-Allow-Origin": "*",
            "Content-Type": "text/plain",
            Accept: "text/plain"
        }
    })
    .then(response=>{
        if(response && response.data){
            console.log("Success1")
            console.log(response)
            console.log(response.data)
            console.log(typeof response.data)
            var res_list = response.data
            console.log("This is the result")
            console.log(res_list)
            //this.setState({travel_list:res_list})
        }
    })
    .catch(error=>{
      console.log("Error")
      console.log(error.response)})
    }
    render(){
        //console.log("entered")
        //const classes = useStyles();
        return(


//            <div>Welcome</div>

    <div>
        <div class = "container">
      <h1 class = "t">Flight Rider</h1>
      <ul class= "u">
        <li class = "ll"><a class="active" href="#home">Home</a></li>
        <li class = "ll"><a href="#news">News</a></li>
        <li class = "ll"><a href="#contact">Contact</a></li>
        <li class = "ll"><a href="#about">About</a></li>
      </ul>

    </div>
    <div class="wrapper">
      <div class="banner_body"><h1 class = "desc">Travel Seamlessly with the Flight Rider App</h1>

        <div class = "another"></div>
      </div>
  <div class="banner_folds">
      <div class="banner_fold_left"></div>
      <div class="banner_fold_right"></div>
      <div class="banner_shadow">
        <ul class = "l1">
          <li class = "ls"><a href="/">BOOK TRIP</a></li>
          <li class= "ls"><a href="#">CHECK IN</a></li>
          <li class = "ls"><a href="#contact">MANAGE BOOKING</a></li>
          <li class = "ls"><a href="#about">FLIGHT SCHEDULE</a></li>
        </ul>

      </div>
      </div>
      </div>
      <div class = "mystyle">
      <div class = "fr">

      {/* <h1>Hello {this.state.age}</h1> */}
      <div class="ref_form1">
      <div class = "ref_form" >

        <form noValidate autoComplete = "off">
          <div>
          <h1>FIRST NAME:</h1>
          <Input placeholder="First Name"  onChange = {this.handleFirstNameChange} align='center' inputProps={{ 'aria-label': 'description', color: 'white'}} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}} />
        {/* <TextField id="standard-search" onChange = {this.handleInputChange} label="Search field" type="search" /> */}
        </div>
        <div>
        <h1>LAST NAME:</h1>
          <Input placeholder="Last Name" onChange = {this.handleLastNameChange} inputProps={{ 'aria-label': 'description' }} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}}/>
          </div>



          <div>
        <h1 align = "left">YEAR OF BIRTH</h1>
          <Input placeholder="Birth Year" onChange = {this.handleYearChange} inputProps={{ 'aria-label': 'description' }} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}} />
          </div>
          <div>
        <h1>EMAIL:</h1>
          <Input placeholder="Email" onChange = {this.handleEmailChange} inputProps={{ 'aria-label': 'description' }} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}}/>
          </div>
          <div>
        <h1>PHONE NUMBER:</h1>
          <Input placeholder="Phone Number" onChange = {this.handlePhoneChange} inputProps={{ 'aria-label': 'description' }} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}}/>
          </div>

          <div>
        <h1>PREFERRED USERNAME:</h1>
          <Input placeholder="Username" onChange = {this.handleUserNameChange} inputProps={{ 'aria-label': 'description' }} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}}/>
          </div>
          <div>
        <h1>PASSWORD:</h1>
          <Input placeholder="Password" type = "password" onChange = {this.handlePasswordChange} inputProps={{ 'aria-label': 'description' }} style={{ flex: 1, margin: '0 20px 0 0', color: 'white'}}/>
          </div>
        {/* <FormControl variant="outlined">
        <InputLabel htmlFor="component-outlined">Name</InputLabel>
        <OutlinedInput id="component-outlined" value={this.state.ref_num} onChange = {this.handleInputChange} label="Name" class = "input-label"/>
      </FormControl> */}
            </form>
        </div>
        <div class = "b3">
        <Button variant = "contained" onClick={this.handleFormData} endIcon = {<SendIcon/>} color = "primary"  size = "large">SUBMIT</Button>{' '}
        </div>

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

export default Register;
