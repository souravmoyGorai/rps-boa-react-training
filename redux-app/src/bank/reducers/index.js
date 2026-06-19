// Set up your root reducer here...
import { combineReducers } from 'redux';
//import { routerReducer } from 'react-router-redux';
// Deposit reducers
import bankReducer from './bankReducer';

const rootReducer = combineReducers({
 //routing: routerReducer,
 account: bankReducer
});

export default rootReducer;
//{ account: { balance:0, deposits:[],withdarwls:[]}

