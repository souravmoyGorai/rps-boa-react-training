import React, { Component } from 'react'
import { data } from 'react-router-dom'
//container.state manager
export default class Dataflow extends Component {
    state = {data:'Initial Data'}

    updateState(event) {
        this.setState({data:event.target.value})
    }
  render() {
    return (
        <>
            <h4>Parent Component</h4>
            <h5>{this.state.data}</h5>
            <br/>

            <div className='bg-info container'>
                <h4>Child Component</h4>
                <Content dataProp={this.state.data}
                         updateProp={(event) => this.updateState(event)}/>
                <br/>
                <ContentSibling info={this.state.data}/>
            </div>
        </>
    )
  }
}


//------------------------------
const Content = (props) => {
  return (
    <div>
        Enter data: <input type='text' value={props.dataProp}
                        onChange={props.updateProp}/>
    </div>
  )
}

//-------------------------------
const ContentSibling = (props) => {
  return (
    <div>
        <h5>Info is : {props.info}</h5>
    </div>
  )
}
