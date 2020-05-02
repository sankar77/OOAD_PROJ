import React,{Component} from 'react'
import ReactTable from 'react-table'
import api from './api'
import axios from 'axios'
//import React,{Component} from 'react'
//import ReactTable from 'react-table'
//import api from './api'
//import axios from 'axios'
import socketIOClient from 'socket.io-client'
import { makeStyles } from '@material-ui/core/styles';
//import './Customer.css';
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
//import Alert from '@material-ui/lab/Alert';
import history from './history'
//import socketIOClient from 'socket.io-client'

class CustomerCheckin extends Component{
    constructor(props){
        super(props)
        this.state = {
            travel_list:[],
            //columns:[],
            isCheckedIn:false,
            //food_option:" ",

        }
    }

    /*componentDidMount=  ()=>{
        console.log("Data")
        console.log(api1.get('/flight'))
    }*/
    /*componentDidMount = async() =>{
        let apiRes = null;
        try{
            apiRes = await axios.get('http://localhost:3001/api/flight')
            console.log(apiRes)
        }
        catch(err){
            console.log(err.response)
        }
    }*/
    componentDidMount = async()=>{
        await axios({
            method:"get",
            url:"http://localhost:3001/api/customer/checkin",
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

    handleFormData = ()=>{
      const data = {
        checkin_status:true,
      }
      axios.post("http://localhost:3001/api/customer/checkin/done",data)
    .then(data=>{
      console.log("Data")
      console.log(data)
    })
    .catch(error=>{
      console.log(error.response)
    })
    // return(
    // <div>
    // <Alert severity="success">This is a success alert — check it out!</Alert>
    // </div>
    // )
    history.push('/api/checkin/done')
    //alert("Your Food Choice has been updated");

    }
    // resetThenSetFoodOption = (id,key) =>{
    //   let temp = JSON.parse(JSON.stringify(this.state[key]))
    //   temp.forEach(item => item.selected = false);
    //   temp[id].selected = true;
    //   this.setState({
    //     [key]: temp

    //   })

    //   var val = this.state.food_option.filter(function(item){
    //     return item.title === temp[id].title
    //   })
    //   //temp[id].title =val[0].title
    //   //console.log(val)
    //   this.setState({food_option:val[0].title})


    // }
    // componentDidMount = async()=>{
    //     await axios({
    //         method:"get",
    //         url:"http://localhost:3001/api/customer",
    //         withCredentials:false,
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "text/plain",
    //             Accept: "text/plain"
    //         }
    //     })
    //     .then(response=>{
    //         if(response && response.data){
    //             console.log("Success1")
    //             console.log(response)
    //             console.log(response.data)
    //             console.log(typeof response.data)
    //             var res_list = response.data
    //             console.log(res_list)
    //             this.setState({travel_list:res_list})
    //         }
    //     })
    //     .catch(error=>{
    //       console.log("Error")
    //       console.log(error.response)})
    // }

    // componentDidMount = ()=>{
    //     axios({
    //         method:"get",
    //         url:"http://localhost:3001/api/flight",
    //         withCredentials:true,
    //         headers: {
    //             "Access-Control-Allow-Origin": "*",
    //             "Content-Type": "text/plain",
    //             Accept: "text/plain"
    //         }
    //     })
    //     .then(response=>{
    //         if(response && response.data){
    //             console.log("Success1")
    //             console.log(response.data)
    //             this.setState({isloading:false
    //                 //travel_list:response.data,
    //             })
    //             //this.setState({travel_list:response.data})
    //         }
    //     })
    //     .catch(error=>{console.log(error.response)
    //     this.setState({isloading:false})})
    // }

    renderLoading() {
        return <div>Loading the web page</div>;
      }
    renderData(){
        return <div>Page Loaded</div>;

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
        //         Header: 'Travel-Time',
        //         accessor: 'time',
        //         Cell: props => <span>{props.value.join(' / ')}</span>,
        //     },
        // ]
        // let showTable = true
        // if (!this.state.travel_list.length) {
        //     showTable = false
        // }
        // return(

        // <div>
        // {showTable && (
        //     <ReactTable
        //         data={this.state.travel_list}
        //         columns={columns}
        //         loading={this.state.isloading}
        //         defaultPageSize={10}
        //         showPageSizeOptions={true}
        //         minRows={0}
        //     />
        // )}
        // </div>
        // )

    }
    /*componentDidMount = async() =>{
        fetch("http://localhost:3001/api/flight")
        .then(response=>response.json())
        .then(json=>{
            console.log("Data")
            console.log(json)
        })
        this.setState({isloading:true})
      */

        /*await api.getflight().then(flights=>{
            this.setState({
                travel_list:flights.data.data,
                isloading:false,
            })
        })
    }*/
    /*componentDidMount = ()=>{
        const{endpoint} = this.state
        const socket = socketIOClient(endpoint)
        socket.on("FromAPI", data => this.setState({ response: data }));
    }
    getflights = () =>{
        axios.get("http://localhost:3001/api/flight")
        .then((response)=>{
          const data = response.data;
          this.setState({posts:data});

          console.log("Data received");
        })
        .catch(()=>{
          alert("error retrieving data");
        })
    */

    render(){
        //const{travel_list,isloading} = this.state
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
                                      <StyledTableCell >Check In Status</StyledTableCell>

                                    </TableRow>
                                  </TableHead>
                                  <TableBody>
                                    {this.state.travel_list.map((row) => (

                                      <TableRow key={row['checkin_status']}>
                                        <StyledTableCell component="th" scope="row">
                                          {row['checkin_status']==false ?"Not CheckedIn":"Already Checked In"}
                                        </StyledTableCell>

                                      </TableRow>
                                    ))}
                                  </TableBody>

                                </Table>

                              </TableContainer>
                              </div>
                              {/* <div class = "it">
                              <Dropdown titleHelper = "Food Options" title = "Select the Food Option" list = {this.state.isCheckedIn} resetThenSet = {this.resetThenSetFoodOption}/>
                              </div> */}
                              <div class = "b1">


                                <Button variant = "contained" onClick={this.handleFormData} endIcon = {<SendIcon/>} color = "primary"  size = "large">CHECKIN</Button>{' '}

                                </div>
          </div>
                  )
        // return (
        //     <div>
        //         {this.state.isloading?this.renderLoading():this.renderData()}

        // </div>
        // )
    }
}

export default CustomerCheckin;
