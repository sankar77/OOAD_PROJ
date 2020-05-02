import React from 'react';
import logo from './logo.svg';
import './App.css';
import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import DeleteIcon from '@material-ui/icons/Delete';
import history from './history';
import axios from 'axios'
import about from './about.js';
import {Link} from 'react-router-dom';

const src = ' '
const dst = ' '


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      age: null,
      errormessage: '',
      source: ' ',
      dest: ' ',
      startDate:new Date(),
      endDate:new Date(),
      cls: ' ',
      pas: ' ',
      location_start:[
        {
          id:0,
          title:'New York',
          selected:false,
          key:'location_start'
        },
        {
          id:1,
          title:'San Francisco',
          selected:false,
          key:'location_start'
        }
        ,
        {
          id:2,
          title:'chicago',
          selected:false,
          key:'location_start'
        },
        {
          id:3,
          title:'Chennai',
          selected:false,
          key:'location_start'
        },
        {
          id:4,
          title:'Dallas',
          selected:false,
          key:'location_start'
        }
      ],
      location_end:[
        {
          id:0,
          title:'New York',
          selected:false,
          key:'location_end'
        },
        {
          id:1,
          title:'San Francisco',
          selected:false,
          key:'location_end'
        },
        {
          id:2,
          title:'LasVegas',
          selected:false,
          key:'location_end'
        },
        {
          id:3,
          title:'Kenya',
          selected:false,
          key:'location_end'
        },
        {
          id:4,
          title:'Texas',
          selected:false,
          key:'location_end'
        }
      ],
      class:[
        {
          id:0,
          title:'Economy',
          selected:false,
          key:'class'
        },
        {
          id:1,
          title:'Business',
          selected:false,
          key:'class'
        }
      ],
      pass:[
        {
          id:0,
          title:'1',
          selected:false,
          key:'pass'
        },
        {
          id:1,
          title:'2',
          selected:false,
          key:'pass'
        },
        {
          id:2,
          title:'3',
          selected:false,
          key:'pass'
        },
        {
          id:3,
          title:'4',
          selected:false,
          key:'pass'
        }
      ]
    };
  }

  myChangeHandler = (event) => {
    var input, filter, ul, li, a, i;
    input = document.getElementById("ip1");
    filter = input.value.toUpperCase();
  }

  handleRegistration = ()=>{
    history.push('/registration')
  }
  valid = (src,dst,st_dt,en_dt,cl,ps)=>{
    if(src!=' ' &&dst!=' '&&src!=dst&&new Date(st_dt)!=new Date(en_dt) && new Date(st_dt)<new Date(en_dt)&& cl!=' '&&ps!=' '){
      return true;
    }

    else
    return false;
  }

  handleFormData = ()=>{
    console.log("Source:"+this.state.source)
    console.log("Dest:"+this.state.dest)
    console.log("Start Date:"+this.state.startDate)
    console.log("End Date:"+this.state.endDate)
    console.log("Class:"+this.state.cls)
    console.log("Passengers:"+this.state.pas)
    if(this.valid(this.state.source,this.state.dest,this.state.startDate,this.state.endDate,this.state.cls,this.state.pas)){
    const data = {
      source: this.state.source,
      dest: this.state.dest,
      status:this.state.cls,
      passengers:this.state.pas,
    }


    axios.post("http://localhost:3001/api/flight",data)
    .then(data=>{
      console.log(data)
    })
    .catch(error=>{
      console.log(error.response)
    })
    history.push('/api/flight')
  }
  else{
  alert("Please enter the required data to start looking for flights")
}
}
  handleChangeStart = date =>{
    this.setState({
      startDate:date
    });
  }
  handleChangeEnd = date =>{
    this.setState({
      endDate:date
    });
  }

  resetThenSetStart = (id,key) =>{
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp

    })

    var val = this.state.location_start.filter(function(item){
      return item.title === temp[id].title
    })
    this.setState({source:val[0].title})


  }
  resetThenSetEnd = (id,key) =>{
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp

    })

    var val = this.state.location_end.filter(function(item){
      return item.title === temp[id].title
    })
    this.setState({dest:val[0].title})


  }
  resetThenSetClass = (id,key) =>{
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp

    })

    var val = this.state.class.filter(function(item){
      return item.title === temp[id].title
    })
    this.setState({cls:val[0].title})


  }
  resetThenSetPass = (id,key) =>{
    let temp = JSON.parse(JSON.stringify(this.state[key]))
    temp.forEach(item => item.selected = false);
    temp[id].selected = true;
    this.setState({
      [key]: temp

    })

    var val = this.state.pass.filter(function(item){
      return item.title === temp[id].title
    })
    this.setState({pas:val[0].title})


  }

  render() {

    return (


      <div>
        <div class = "container">
      <h1 class = "t">FLIGHT RIDER</h1>
      <ul class= "u">
        <li class = "ll"><a class="active" href="/">Home</a></li>
        <li class = "ll"><a href="/news">News</a></li>
        <li class = "ll"><a href="/contact">Contact</a></li>
        <li class = "ll"><a href="/about">About</a></li>
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
          <li class = "ls"><a class="active" href="#home">BOOK TRIP</a></li>
          <li class= "ls"><a href="Check-in">CHECK IN</a></li>
          <li class = "ls"><a href="Manage-Booking">MANAGE BOOKING</a></li>
          <li class = "ls"><a href="#about">FLIGHT SCHEDULE</a></li>
        </ul>

      </div>
      </div>
    <div class = "mystyle">
      <div class = "fr">
      <form>
      <h1>Hello {this.state.username} {this.state.age}</h1>
      <p class = "para">FROM:</p>
      <Dropdown titleHelper = "Location" title = "Select Source" list = {this.state.location_start} resetThenSet = {this.resetThenSetStart}/>


      </form>

      <form>
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
      </div>
      </div>
      <div class = "b1">


      <Button variant = "contained" onClick={this.handleFormData} endIcon = {<SendIcon/>} color = "primary"  size = "large">SUBMIT</Button>{' '}

      </div>
      <div class = "b2">
      <Button  variant = "contained" color = "secondary" endIcon = {<DeleteIcon/>} size = "large">RESET</Button>{' '}
      </div>
      <div class = "top">
              <Button variant = "contained" onClick = {this.handleRegistration} color = "primary" size = "large" endIcon = {<SendIcon/>}>REGISTER</Button>
            </div>

      </div>
      </div>

    );
  }

}
export default App;
