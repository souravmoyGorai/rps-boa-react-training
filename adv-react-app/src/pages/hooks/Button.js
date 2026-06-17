/*
import React, { Component } from 'react'

export default class Button extends Component {
    state = {buttonText: 'Click me, please'}
    handleClick = () => {
        this.setState({buttonText: 'Thanks ... been clicked'})
    }

  render() {
    return (
      <div>
        <button className='btn btn-primary'
                onClick={this.handleClick}>{this.state.buttonText}</button>
      </div>
    )
  }
}
  */

import React,{useState} from 'react'
export default function Button(){
    const [buttonText,setButtonText] = useState('Click me, please')
    //const [users,setUsers] = useState([])

    function handleClick(){
        setButtonText("Thanks, been clicked")
    }

    return (
      <>
        <button className='btn btn-primary'
                onClick={handleClick}>{buttonText}</button>
      </>
    )
}