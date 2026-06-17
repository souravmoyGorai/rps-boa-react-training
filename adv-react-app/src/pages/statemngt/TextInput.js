import React, { Component } from 'react'
import TextDisplay from './TextDisplay'

export default class TextInput extends Component {
    state={inputText:'Sourav'}

    handleChange(event){
        this.setState({inputText:event.target.value})
    }
  render() {
    return (
        <>
        <h4>Form Details</h4>
        Company: <input type='text' id="txt1"/>
        <br/>
        Info: <input type='text' value="BoA offers low int. rate"/>
        <br/>
        Username: <input type='text' value={this.state.inputText} onChange={(event)=> this.handleChange(event)}/>
        {this.state.inputText
            ? console.log("Valid data")
            : console.log("Please enter username")}

        <p>{this.state.inputText}</p>

        {this.state.inputText
            ? <TextDisplay textProp={this.state.inputText}/>
            : <TextDisplay textProp="Enter username please"/>
        }
        </>
    )
  }
}
