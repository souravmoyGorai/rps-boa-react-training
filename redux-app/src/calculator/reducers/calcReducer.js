import { ADD, SUBTRACT } from "../actions/types"

const initalState = {output : 0}
const calcReducer = (state = initalState, action) => {
    switch (action.type) {
        case ADD : return {...state, output: action.payload}
        case SUBTRACT : return {...state, output: action.payload}
        default: return {...state}
    }
}
export default calcReducer