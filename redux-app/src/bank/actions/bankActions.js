// example of a thunk using the redux-thunk middleware
//import {configureStore} from '../store/configureStore'
export function deposit(amount) {
    return function (dispatch) {
      // thunks allow for pre-processing actions, calling apis, and dispatching multiple actions
      // in this case at this point we could call a service that would persist the fuel savings
     //axios.post(url+body,headers)  api calls
     //const data=configureStore.getState()
     //configureStore.subscribe((data)=>console.log(data)
    
      return dispatch({
        type: 'DEPOSIT',
        timestamp: Date(),
        amount: Math.abs(amount)
      });
    };
  }
  export function withdraw(amount) {
    return function (dispatch) {
        return dispatch({
        type: 'WITHDRAW',
        timestamp: Date(),
        amount: Math.abs(amount)
      });
    };
  }
  