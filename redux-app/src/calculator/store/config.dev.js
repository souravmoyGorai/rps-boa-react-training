import { applyMiddleware } from "redux";
import { legacy_createStore as createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension'
import logger from "redux-logger";

import calcReducer from '../reducers/calcReducer'

export const store = createStore( calcReducer,
    composeWithDevTools(applyMiddleware(logger))
)

store.subscribe( ()=> console.log(store.getState()))