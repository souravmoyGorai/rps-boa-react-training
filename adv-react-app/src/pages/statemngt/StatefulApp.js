import React, { Component } from 'react'
import { data } from 'react-router-dom'

export default class StatefulApp extends Component {
    state ={
        data:[
            {"id":101,"name":"Joy","balance":50000},
            {"id":102,"name":"Toy","balance":45000},
            {"id":103,"name":"Roy","balance":60000}
        ]
    }
  render() {
    return (
    <>
      <div>StatefulApp</div>
      <h4>Account Holder Details</h4>
      <table className='table table-hover table-striped'>
        <tbody>
            {
                this.state.data.map((customer,index) => {
                    return <TableRow key={index} dataProp={customer}/>
                })
            }
        </tbody>
      </table>
    </>
    )
  }
}


//Presentation Component: props are read only, immutable
const TableRow = (props) =>{
    return (
        <tr>
            <td>{props.dataProp.id}</td>
            <td>{props.dataProp.name}</td>
            <td>{props.dataProp.balance}</td>
        </tr>
    )
}