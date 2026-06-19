import calcReducer from '../reducers/calcReducer'
import {ADD,SUBTRACT} from '../actions/types'

describe('Test CalcReducer', ()=> {
    it('Add Action', ()=> {
        let state = {output: 0}
        state=calcReducer(0,{type:ADD,payload:50})
        expect(state).toEqual({output: 50})
    })
    it('Subtract Action', ()=> {
        let state = {output: 0}
        state=calcReducer(0,{type:SUBTRACT,payload:50})
        expect(state).toEqual({output: 50})
    })
})