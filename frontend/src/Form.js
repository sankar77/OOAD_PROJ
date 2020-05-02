import React from "react"
import Button from '@material-ui/core/Button';
import './Form.css'
export default class Form extends React.Component {
  state={
    Name:"",
    Age:"",
    PhoneNo:"",
    Gender:"",
  };
onSubmit= e => {
  // e.preventDefault();
  this.props.onSubmit(this.state);
}
  render(){
    return (
      <form align="center">
      <input placeholder="Name"
      value={this.state.Name}
      onChange={e=> this.setState({Name:e.target.value})} />
      <input placeholder="Age"
      value={this.state.Age}
      onChange={e=> this.setState({Age:e.target.value})} />
      <input placeholder="PhoneNo"
      value={this.state.PhoneNo}
      onChange={e=> this.setState({PhoneNo:e.target.value})} />
      <input placeholder="Email"
      value={this.state.Email}
      onChange={e=> this.setState({Email:e.target.value})} />
      &nbsp;
      &nbsp;
      &nbsp;
      &nbsp;
      <Button variant="contained"  size="large" color="primary" onClick={()=>this.onSubmit()}>Save</Button>
      </form>
    )
  }
}
