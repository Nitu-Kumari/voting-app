import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Axios from 'axios';


class App extends Component {

constructor(){
  super()
  this.state={
    VoteAllowed:0,
    VoteNotAllowed:0,
    name:'',
    age:'',
 data:[]
  }
}
OnInputChange(e){
  console.log(e.target.value)
 this.setState({
   [e.target.name]:e.target.value
 })
}
submitForm(e){
  e.preventDefault()
  e.target.reset();

  const{name,age,VoteAllowed,VoteNotAllowed,data}=this.state;
  const obj={
    name,
    age
  }
  if(parseInt(age)>18){
    this.setState({
      VoteAllowed:VoteAllowed+1
    })
  }else{
    this.setState({
       VoteNotAllowed: VoteNotAllowed+1
    })
  }

  this.setState({
   name:'',
   age:''
  })

  data.push(obj)
}

renderList(){
 const {data}=this.state
 const out=data.map((d,i)=>{
   return(
<li Key={i}> {d.name}-{d.age}</li>
   )
 })
 return out
}

state = {
  voting: []
}

componentDidMount() {
  this.getAllVoting();
}
getAllVoting = () => {
  // store the api url in a variable
  let url = 'http://localhost:8080/voting';

  Axios.get(url)
    .then(res => {
      console.log(res)
      this.setState({
        voting: res.data
      })
    })
}



  render() {
    return (
      <div className="container">
        <div className="row">
          <div className="col-sm-6">
          <ul>
           {this.renderList()}
          </ul>
          </div>
          <div className="col-sm-6">
          Vote Allowed:{this.state.VoteAllowed}<br/>
          Vote Not Allowed:{this.state.VoteNotAllowed}
          </div>
        </div>

        <form onSubmit={this.submitForm.bind(this)}>
  <div className="form-group">
    <label for="name">Name</label>
    <input type="text" onChange={this.OnInputChange.bind(this)}
     value={this.state.name} name="name" className="form-control" id="text" />
  </div>

<div className="form-group">
    <label for="age">Age</label>
    <input type="text" onChange={this.OnInputChange.bind(this)}
     value={this.state.age} name="age" className="form-control" id="text" />
  </div>

   <button type="submit" className="btn bitn-primary">Submit</button>
</form>
      </div>
    );
  }
}

export default App;