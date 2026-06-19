import React, { useRef } from 'react'
import { connect } from 'react-redux'
import { addInputs, subInputs } from '../actions/calcActions'

const Calculator = (props) => {
    const input1 = useRef()
    const input2 = useRef()
    let intA, intB
  return (
    <div>
        <div>
            Input 1 : <input type='text' placeholder='0' ref={input1} />
        </div>
        <div>
            Input 2 : <input type='text' placeholder='0' ref={input2} />
        </div>
        <div>
            <button onClick={() => {
                intA = parseInt(input1.current.value)
                intB = parseInt(input2.current.value)
                props.dispatch(addInputs(intA,intB))
            }}>ADD</button>

            <button onClick={() => {
                intA = parseInt(input1.current.value)
                intB = parseInt(input2.current.value)
                props.dispatch(subInputs(intA,intB))
            }}>SUBTRACT</button>
        </div>
        <div>
            Output : <input type='text' readOnly value={props.outputProp}/>
        </div>
    </div>
  )
}
const mapStateToProps = (state) => ({
    outputProp : state.output

})

export default connect(mapStateToProps) (Calculator)