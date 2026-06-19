
import React, { useReducer } from 'react'
const initialState = {
    count: 1
}

function reducer(state,action) {
    switch (action.type) {
        case "INC" : return {count: state.count + action.payload}
        case "DEC" : return {count: state.count - action.payload}
        default: return state
    }
}

const ReducerDemo = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
        <h3>UseReducer Demo</h3>
        <h4>Counter: {state.count}</h4>
        <button className='btn btn-success'
                onClick={()=>dispatch({type:"INC", payload:10})}>
                    Increment
                </button>

        <button className='btn btn-danger'
                onClick={()=>dispatch({type:"DEC",payload: 5})}>
                    Decrement
                </button>
    </div>
  )
}

export default ReducerDemo