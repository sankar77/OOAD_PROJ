import React from "react"
import Button from '@material-ui/core/Button';
export default class Payment extends React.Component {
  state={
    CardNo:"",
    Cvv:"",
    Name:"",
    ExpiryDate:"",
  };

  onSubmit11= e => {
    // e.preventDefault();
    console.log(this.state);
    this.props.onSubmit(this.state);
  }

  render(){
    return (
      <form align="center">
      <input
      placeholder="CardNumber"
      value={this.state.CardNo}
      onChange={e=> this.setState({CardNo:e.target.value})} />
      <br/>
      <br/>
      <input
      placeholder="cvv"
      value={this.state.Cvv}
      onChange={e=> this.setState({Cvv:e.target.value})} />
      <br/>
      <br/>
      <input
      placeholder="Name On the Card"
      value={this.state.Name}
      onChange={e=> this.setState({Name:e.target.value})} />
      <br/>
      <br/>
      <input
      placeholder="ExpiryDate"
      value={this.state.ExpiryDate}
      onChange={e=> this.setState({ExpiryDate:e.target.value})} />
      <br/>
      <br/>
      <br/>
      <br/>
      <Button variant="contained"  size="large" color="primary" onClick={()=>this.onSubmit11()}>Book</Button>
      </form>
    )
  }
}
