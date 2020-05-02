import React,{Component} from 'react'
import ReactTable from 'react-table'
import api from './api'
import axios from 'axios'
import history from './history';
import socketIOClient from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import Form from "./Form.js"
import './payments.css'
import Payment from "./Payment.js"


class payments extends Component{
    constructor(props){
        super(props)
        this.state = {
           payments:[],
           fields:[],
           r1:Math.random().toString(36).substring(7),
           price1:'',
           num_pas:0,
      }
    }
        componentDidMount = async()=>{
            await axios({
                method:"get",
                url:"http://localhost:3001/api/payments",
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
                    console.log("res data is ",response.data)
                    console.log(typeof response.data)
                    var res_list = response.data
                    console.log("res_list is",res_list)
                    this.setState({payments:res_list})
                }
            })
            .catch(error=>{
              console.log("Error")
              console.log(error.response)})
        }

  valid = (nm,ag,ph,em)=>{
    if(nm!=''&&ag!=''&&ph!=''&&em!=''){
      return true;
    }
    else
      return false;
  }
  onSubmit =fields => {
    this.setState({num_pas:this.state.num_pas+1})
    if(this.valid(fields['Name'],fields['Age'],fields['PhoneNo'],fields['Email'])){


    const data = {
      Name: fields['Name'],
      Age: fields['Age'],
      Phone:fields['PhoneNo'],
      Email:fields['Email'],
      BookingId:this.state.r1,
    }

    axios.post("http://localhost:3001/api/custinfo",data)
    .then(data=>{
      console.log(data)
    })
    .catch(error=>{
      console.log(error.response)
    })
    //history.push('/api/custinfo')
  }
  else{
  alert("Please fill in the required data")
  }
  }
valid1 = (cd,cv,nm,ed)=>{
  if(cd!=''&&cv!=''&&nm!=''&&ed!=''){
    return true;
  }
  else {
    return false;
  }
}
  onSubmit11 =fields1 => {
    console.log(fields1['CardNo']);
    console.log(fields1['Cvv']);
    console.log(fields1['Name']);
    console.log(fields1['ExpiryDate']);
    console.log(this.state.price1);
    if(this.valid1(fields1['CardNo'],fields1['Cvv'],fields1['Name'],fields1['ExpiryDate'])){
    const data = {
      CardNo: fields1['CardNo'],
      Cvv: fields1['Cvv'],
      Name:fields1['Name'],
      ExpiryDate:fields1['ExpiryDate'],
      price:this.state.price1,
      num_pas:this.state.num_pas,
    }
    axios.post("http://localhost:3001/api/balance",data)
    .then(data=>{
      console.log(data)
    })
    .catch(error=>{
      console.log(error.response)
    })
    //history.push('/api/custinfo')

    axios({
        method:"get",
        url:"http://localhost:3001/api/balance",
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
            console.log("res data is ",response.data)
            console.log(typeof response.data)
            var res_list = response.data
            console.log("res1 is",res_list)
            if(res_list==1){
              alert("Transaction has been successfully completed. Please check your email for more information")
            }
            if(res_list==2){
              alert("There seems to be insufficient funds in your bank account")
            }
            if(res_list==3){
              console.log("The response is")
              console.log(res_list);
              alert("Invalid credentials")
            }
            // if(response.data==0)
            //   console.log()
            //this.setState({payments:res_list})
        }
    })
    .catch(error=>{
      console.log("Error")
      console.log(error.response)})
}
else{
  alert("Please fill in the required data")
}
  }


        render(){
          var vm= this;
            // const travel_list = this.state.travel_list
            console.log("List")
            console.log("payents is ",vm.state.payments)
            console.log("List")
            // console.log(this.state.payments)
            //
            //
            // const columns = [
            //     {
            //         Header: 'ID',
            //         accessor: '_id',
            //         filterable: true,
            //     },
            //     {
            //         Header: 'Source',
            //         accessor: 'sr',
            //         filterable: true,
            //     },
            //     {
            //         Header: 'Dest',
            //         accessor: 'dt',
            //         filterable: true,
            //     },
            //     {
            //         Header: 'Start Time',
            //         accessor: 'st',
            //         filterable: true,
            //     },
            //     {
            //         Header: 'End Time',
            //         accessor: 'et',
            //         Cell: props => <span>{props.value.join(' / ')}</span>,
            //     },
            // ]
            // this.state.r1 = Math.random().toString(36).substring(7);
            let showTable = true
            if (!Object.keys(vm.state.payments).length) {
                showTable = false
            }
            console.log("Table")
            console.log(showTable)
            console.log("TRAVEL")
            console.log(vm.state.payments)
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
            vm.state.payments.forEach((row) => (
                    this.state.price1=row['price']
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
                            <h1>Ticket Details</h1>
                          </div>
                          <Table  aria-label="simple table">
                            <TableHead class='l1'>
                              <TableRow class='l2'>
                                <StyledTableCell >Booking_Id</StyledTableCell>
                                <StyledTableCell  align="right">Source</StyledTableCell>
                                <StyledTableCell  align="right">Destination</StyledTableCell>
                                <StyledTableCell  align="right">start_time</StyledTableCell>
                                <StyledTableCell  align="right">end_time</StyledTableCell>
                                <StyledTableCell  align="right">price</StyledTableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {vm.state.payments.map((row) => (

                                <TableRow key={row['_id']}>
                                  <StyledTableCell component="th" scope="row">
                                    {this.state.r1}
                                  </StyledTableCell>
                                  <StyledTableCell align="right">{row['source']}</StyledTableCell>
                                  <StyledTableCell align="right">{row['dest']}</StyledTableCell>
                                  <StyledTableCell align="right">{row['start_time']}</StyledTableCell>
                                  <StyledTableCell align="right">{row['end_time']}</StyledTableCell>
                                  <StyledTableCell align="right">{row['price']}</StyledTableCell>
                                </TableRow>
                              ))}
                            </TableBody>

                          </Table>

                        </TableContainer>
                        </div>
                        <div className="App1">
                          <div class = "ctn"  >
                            <h1 className="head1" align="center">Passenger Information</h1>
                          <Form onSubmit={fields => this.onSubmit(fields)}/>
                          <br/>
                          <Form onSubmit={fields => this.onSubmit(fields)} />
                          <br/>
                          <Form onSubmit={fields => this.onSubmit(fields)} />
                          <br/>
                          <Form onSubmit={fields => this.onSubmit(fields)} />
                          <br/>
                          <Form onSubmit={fields => this.onSubmit(fields)}/>
                          </div>

                        </div>
                      <div className="App2">
                        <div class="ctn1" >
                        <h1 className="head1" align="center"> Payment Information</h1>
                        <Payment onSubmit={fields => this.onSubmit11(fields)}  />
                        </div>
                      </div>
    </div>

                      )
        }



      }

export default payments;
