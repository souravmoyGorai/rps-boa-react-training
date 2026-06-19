//Here we have to write business logic, REST API calls with thunk middleware
//dispatch action to reducer

//React = VIEW, Redux = Model + Controller = MVC architecture

import { ADD, SUBTRACT } from "./types"

export const addInputs = (number1, number2) => {
    let output  = number1 + number2
    return {type: ADD, payload: output}
}

export const subInputs = (number1, number2) => {
    let output = number1 - number2
    return {type: SUBTRACT, payload: output}
}