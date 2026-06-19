//import initialState from './initialState';
const initialState={
    balance: 0,
    withdrawals: [],
    deposits: []
  };
  export default function bankReducer(state = initialState, action) {
  
    switch (action.type) {
      case 'WITHDRAW':
        return Object.assign({}, state, {
          withdrawals: [
            ...state.withdrawals,
            {
              amount: action.amount,
              timestamp: action.timestamp
            }
          ],
          balance: state.balance - action.amount
        });
  
      case 'DEPOSIT':
        return Object.assign({}, state, {
          deposits: [
            ...state.deposits,
            {
              amount: action.amount,
              timestamp: action.timestamp
            }
          ],
          balance: state.balance + action.amount
        });
  
      default:
        return state;
    }
  }
  