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
// import 'bootstrap/dist/css/bootstrap.min.css';
// import './samplelist.css'
//import 'react-table/react-table.css'
const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});



class samplelist extends Component{
    constructor(props){
        super(props)
        this.state = {
            travel_list:[],
            columns:[
                {
                    Header: 'ID',
                    accessor: '_id',
                    filterable: true,
                },
                {
                    Header: 'Source',
                    accessor: 'sr',
                    filterable: true,
                },
                {
                    Header: 'Dest',
                    accessor: 'dt',
                    filterable: true,
                },
                {
                    Header: 'Start Time',
                    accessor: 'st',
                    filterable: true,
                },
                {
                    Header: 'End Time',
                    accessor: 'et',
                    Cell: props => <span>{props.value.join(' / ')}</span>,
                },
            ]
,
            isloading:true,
        }
    }


    handleData  = (src,dest,st_time,en_time,pc) => {
      // console.log(this.state.source);
      // console.log(this.state.dest);
      // console.log(this.state.start_time);
      // console.log(this.state.end_time);
      // console.log(this.state.price);
      //console.log(val);
      const data = {
        source: src,
        dest: dest,
        start_time:st_time,
        end_time:en_time,
        price:pc
      }


      axios.post("http://localhost:3001/api/payments",data)
      .then(data=>{
        console.log("data is ",data)
      })
      .catch(error=>{
        console.log(error.response)
      })
      history.push('/api/payments')
      //console.log("Dest:"+this.state.dest)

    }
    componentDidMount = async()=>{
        await axios({
            method:"get",
            url:"http://localhost:3001/api/flight",
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
                console.log("sample list is ",res_list)
                this.setState({travel_list:res_list})
            }
        })
        .catch(error=>{
          console.log("Error")
          console.log(error.response)})
    }

    render(){
      var vm= this;
        // const travel_list = this.state.travel_list
        console.log("List")
        console.log(vm.state.travel_list)
        //console.log("List")
        //console.log(this.travel_list)


        const columns = [
            {
                Header: 'ID',
                accessor: '_id',
                filterable: true,
            },
            {
                Header: 'Source',
                accessor: 'sr',
                filterable: true,
            },
            {
                Header: 'Dest',
                accessor: 'dt',
                filterable: true,
            },
            {
                Header: 'Start Time',
                accessor: 'st',
                filterable: true,
            },
            {
                Header: 'End Time',
                accessor: 'et',
                Cell: props => <span>{props.value.join(' / ')}</span>,
            },
        ]

        let showTable = true
        if (!Object.keys(vm.state.travel_list).length) {
            showTable = false
        }
        console.log("Table")
        console.log(showTable)
        console.log("TRAVEL")
        console.log(vm.state.travel_list)
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
        vm.state.travel_list.forEach((row) => (
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
                            <StyledTableCell >Id</StyledTableCell>
                            <StyledTableCell  align="right">Source</StyledTableCell>
                            <StyledTableCell  align="right">Destination</StyledTableCell>
                            <StyledTableCell  align="right">start_time</StyledTableCell>
                            <StyledTableCell  align="right">end_time</StyledTableCell>
                            <StyledTableCell  align="right">price</StyledTableCell>
                            <StyledTableCell  align="right">Status</StyledTableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {vm.state.travel_list.map((row) => (

                            <TableRow key={row['_id']}>
                              <StyledTableCell component="th" scope="row">
                                {row['_id']}
                              </StyledTableCell>
                              <StyledTableCell align="right">{row['Source']}</StyledTableCell>
                              <StyledTableCell align="right">{row['Destination']}</StyledTableCell>
                              <StyledTableCell align="right">{row['start_time']}</StyledTableCell>
                              <StyledTableCell align="right">{row['end_time']}</StyledTableCell>
                              <StyledTableCell align="right">{row['price']}</StyledTableCell>
                              <StyledTableCell align = "right">
                              <Button variant="contained" onClick={()=>this.handleData(row['Source'],row['Destination'],row['start_time'],row['end_time'],row['price'])} size="medium" color="primary">Book</Button>
                              </StyledTableCell>
                            </TableRow>
                          ))}
                        </TableBody>

                      </Table>

                    </TableContainer>
                    </div>

</div>
                  )
    }
}

export default samplelist
