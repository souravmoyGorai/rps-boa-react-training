import React from 'react'
import withIncrement from './withincrement'

const Button = (props) => {
  return (
    <div>
        <h3>Testing HOC</h3>
        <button className='btn btn-danger'
            onClick={props.incrementProp}>Clicked {props.countProp} </button>
    </div>
  )
}

export default withIncrement(Button)
