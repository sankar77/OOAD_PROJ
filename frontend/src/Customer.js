import React,{Component} from 'react'
import ReactTable from 'react-table'
import api from './api'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';
import './Customer.css';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import {DropdownMultiple, Dropdown} from 'reactjs-dropdown-component';
import "react-datepicker/dist/react-datepicker.css";
import SendIcon from '@material-ui/icons/Send';
import history from './history'

class Customer extends Component{
    constructor(props){
        super(props)
        this.state = {
            travel_list:[],
            isloading:true,
            food_option:[
              {
                id:0,
                title:'Asian Veg',
                selected:false,
                key:'food_option'
              },
              {
                id:1,
                title:'Chinese',
                selected:false,
                key:'food_option'
              },
              {
                id:2,
                title:'Vegan',
                selected:false,
                key:'food_option'
              },
              {
                id:3,
                title:'Mexican',
                selected:false,
                key:'food_option'
              },

            ],
        }
    }
    handleFormData = ()=>{
      const data = {
        food_option:this.state.food_option
      }
      axios.post("http://localhost:3001/api/customer/update",data)
    .then(data=>{
      console.log("Data")
      console.log(data)
    })
    .catch(error=>{
      console.log(error.response)
    })

    history.push('./customer/update')

    }
    resetThenSetFoodOption = (id,key) =>{
      let temp = JSON.parse(JSON.stringify(this.state[key]))
      temp.forEach(item => item.selected = false);
      temp[id].selected = true;
      this.setState({
        [key]: temp

      })

      var val = this.state.food_option.filter(function(item){
        return item.title === temp[id].title
      })
      this.setState({food_option:val[0].title})


    }
    componentDidMount = async()=>{
        await axios({
            method:"get",
            url:"http://localhost:3001/api/customer",
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
                console.log(res_list)
                this.setState({travel_list:res_list})
            }
        })
        .catch(error=>{
          console.log("Error")
          console.log(error.response)})
    }
    renderLoading() {
        return <div>Loading the web page</div>;
      }
    renderData(){
        return <div>Page Loaded</div>;
    }

    render(){
        console.log("Travel_List")
        console.log(this.state.travel_list)
        const StyledTableCell = withStyles((theme) => ({
            head: {
              backgroundColor: theme.palette.common.black,
              color: theme.palette.common.white,
              fontSize:20
            },
            body: {
              fontSize: 20,
            },
          }))(TableCell);
                  this.state.travel_list.forEach((row) => (
                  console.log("My Data",row)
                  ))
                  return (
                    <div class = "total">
                    <div class = "container">
                  <h1 class = "t">FLIGHT RIDER</h1>
                  <ul class= "u">
                    <li class = "ll"><a class="active" href="#home">Home</a></li>
                    <li class = "ll"><a href="#news">News</a></li>
                    <li class = "ll"><a href="#contact">Contact</a></li>
                    <li class = "ll"><a href="#about">About</a></li>
                  </ul>

                </div >
                    <div class = "sampletable">
                    <TableContainer component={Paper}>
                                <div>
                                  <h1>Flight Booking Details</h1>
                                </div>
                                <Table  aria-label="simple table">
                                  <TableHead class='l1'>
                                    <TableRow class='l2'>
                                      <StyledTableCell >Food Option</StyledTableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {this.state.travel_list.map((row) => (

                                      <TableRow key={row['food_option']}>
                                        <StyledTableCell component="th" scope="row">
                                          {row['food_option']}
                                        </StyledTableCell>

                                      </TableRow>
                                    ))}
                                  </TableBody>

                                </Table>

                              </TableContainer>
                              </div>
                              <div class = "it">
                              <Dropdown titleHelper = "Food Options" title = "Select the Food Option" list = {this.state.food_option} resetThenSet = {this.resetThenSetFoodOption}/>
                              </div>
                              <div class = "b1">


                                <Button variant = "contained" onClick={this.handleFormData} endIcon = {<SendIcon/>} color = "primary"  size = "large">SUBMIT</Button>{' '}

                                </div>
          </div>
                  )
    }
}

export default Customer;
