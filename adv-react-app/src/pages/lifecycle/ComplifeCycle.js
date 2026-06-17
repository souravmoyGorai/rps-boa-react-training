import React, { Component } from 'react'

export default class ComplifeCycle extends Component {
    state={data:0,msg:'BoA is in profits'}

    update(){
        this.setState({data : this.state.data+1})
    }
  render() {
    return (
      <div className="bg-info container">
        <button className="btn btn-success" 
                    onClick={ (event) => this.update(event)}>Increment</button>
        <h4>Data : {this.state.data} - Message: {this.state.msg}</h4>
        <br/>
        <Child  dataProp={this.state.data}/>
        </div>
    )
  }
}
//-------------------------------------
//child props={dataProp : 0}
class Child extends Component {
    constructor(props){
        //#1 for init
        super(props)
        this.state={username:'sriram'}
        console.log(` In constructor  of child: ${props.dataProp}`)//{0} 
    }
  render() {
    //# 2 for rendering DOM
    return (
      <div className="container ">
          <h4>Child Component</h4>
          Counter: <h5>{this.props.dataProp}</h5>
      </div>
    )
  }

  //#3 cDM
  componentDidMount(){
    // component is mounted on DOM, AJAx calls to rest api, subscribe to web sockets
    console.log(` In cDM: ${this.props.dataProp}`)
  }

  //#4 :gDSFP
  static getDerivedStateFromProps(props,state){
    // this hook is called every time when state changes (state/prop validations), live ajax
    console.log(` In gDSFP: ${props.dataProp} - ${state.username}`)
    return {city:'Hyderabad'}
  }
  //#5
  shouldComponentUpdate(props,state){
    // fired every time, decide weather to render or not when state changes
    console.log(` In sCU: ${this.props.dataProp}`)
     if (props.dataProp>5)
         return true
    else
       return false
  }
  componentWillUnmount(){
    //fired only once when component is removed from  DOM
    //clean the cache, unsubscibe to web socket   to avoid memory leaks
    //Death
  }

}
