import React from 'react'
import withIncrement from './withincrement'

const Hover = (props) => {
  return (
    <div>
        <h3>Testing HOC</h3>
        <h4 className='bg-warning'
            onMouseOver={props.incrementProp}>Hovered {props.countProp}</h4>
    </div>
  )
}

export default withIncrement(Hover)
