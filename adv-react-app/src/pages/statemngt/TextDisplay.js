import React, { Component } from 'react'

export default class TextDisplay extends Component {
  render() {
    let myStyle = {
        FontSize:20,
        color:'red',
        background:'yellow'
    }
    return (
      <div style={myStyle}>
        Welcome : {this.props.textProp}
      </div>
    )
  }
}
