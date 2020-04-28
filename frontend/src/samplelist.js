import React,{Component} from 'react'
import ReactTable from 'react-table'
import api from './api'
import axios from 'axios'
//import socketIOClient from 'socket.io-client'

class samplelist extends Component{
    constructor(props){
        super(props)
        this.state = {
            //travel_list:" ",
            //columns:[],
            isloading:true,
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
    componentDidMount = ()=>{
        axios({
            method:"get",
            url:"http://localhost:3001/api/flight",
            withCredentials:true,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "text/plain",
                Accept: "text/plain"
            }
        })
        .then(response=>{
            if(response && response.data){
                console.log("Success1")
                console.log(response.data)
                this.setState({isloading:false
                    //travel_list:response.data,
                })
                //this.setState({travel_list:response.data})
            }
        })
        .catch(error=>{console.log(error.response)
        this.setState({isloading:false})})
    }

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
        

        return (
            <div>
                {this.state.isloading?this.renderLoading():this.renderData()}
                
        </div>
        )
    }
}

export default samplelist