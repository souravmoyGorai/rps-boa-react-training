//Stateful class Component

import React, {Component} from 'react'
//parent/container
export default class Heading extends Component{
    state = {username:'Souravmoy'}
    render() {
        return (
            <div className="bg-info text-center">
                <h4>SPA Project in React for {this.props.company}</h4>
                <h5 className="text-danger">by {this.state.username}</h5>
            </div>
        )
    }
}

Heading.defaultProps={
    company: 'RPS Infotek'
}