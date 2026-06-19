
/*//Level: 1 & 2
import { applyMiddleware } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";

const reducer=function(state,action){
  if(action.type === 'INC')
    return state + action.payload
  if(action.type === 'DEC')
    return state - action.payload
  if(action.type === 'MUL')
      return state * action.payload
  return state
}

const middleware = applyMiddleware(logger)
const store = createStore(reducer, 1, middleware)
store.subscribe(()=> {
  console.log("Store Data: "+store.getState())
})

store.dispatch({type:'INC', payload:5})
store.dispatch({type:'DEC', payload:3})
store.dispatch({type:'MUL', payload:2})
store.dispatch({type:'INC', payload:4})
*/

//Level: 3, Level 4 Redux and React
// debug rudux state in browser, react app debug
//combineReducers and give to store
/*
import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension'

const userReducer = (state ={}, action) => {
  switch(action.type) {
    case 'CHANGE_NAME' : {return state = {...state, name: action.payload}}
    case 'CHANGE_AGE' : {return state = {...state, age: action.payload}}
    case 'CHANGE_ADDRESS' : {return state = {...state, address: action.payload}}
    default : return state
  }

}
const tweetsReducer = (state = [], action) => {
  return state
}
const allReducers = combineReducers({
  user : userReducer,
  tweets : tweetsReducer
})

const store = createStore(allReducers, 
                composeWithDevTools(applyMiddleware(logger)))
store.subscribe(()=> {
  console.log("Store Data: "+store.getState())
})
store.dispatch({type:'CHANGE_NAME',payload:'Sourav'})
store.dispatch({type:'CHANGE_AGE',payload:35})
store.dispatch({type:'CHANGE_NAME',payload:'Joy'})
store.dispatch({type:'CHANGE_ADDRESS',payload:'Hyderabad'})
*/

//Level 4: 
//How to make REST API call and async. dispatch woth redux-thunk middleware
// axios: get,post,put,delete on http , promise axios.get(url)

import { applyMiddleware, combineReducers } from "redux";
import { legacy_createStore as createStore } from "redux";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension'
import axios from 'axios'
import { thunk } from "redux-thunk"

const initialState = {
  fetching : false,
  users : [],
  error : null
}

const reducer =(state = initialState,action) => {
  switch(action.type) {
    case 'FETCH_USERS_START' : {return {...state, fetching: true}}
    case 'RECEIVED_USERS' : {return {...state, fetching: false, users: action.payload}}
    case 'FETCH_USERS_ERROR' : {return {...state, fetching: false, error: action.payload}}
    default: return state
  }

}

const store = createStore(reducer, 
                composeWithDevTools(applyMiddleware(thunk,logger)))
store.subscribe(()=> {
  console.log("Store Data: "+store.getState())
})
store.dispatch( (dispatch)=> {
  dispatch({type : 'FETCH_USERS_START'})
  axios.get("https://jsonplaceholder.typicode.com/users")
          .then((response) => {
            dispatch({type : 'RECEIVED_USERS',payload: response.data})
          })
          .catch((error) => 
            dispatch({type : 'FETCH_USERS_ERROR', payload:  error}))
})








/*
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
*/