import React, { useRef, useState } from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../actions/bankActions';
 
const HomePage = (props) => {
  const amountDeposit=useRef()
  const amountWithdraw=useRef()
  let amount=0
 
  const deposit=()=>{
    amount=amountDeposit.current.value
    props.actionsProp.deposit(amount);
  }

  const withdraw=()=>{
    amount=amountWithdraw.current.value
    props.actionsProp.withdraw(amount);
  }
  //data={x:10,y:20}
//const{y}=data
    const {account} = props.accountProp;  
    return (
      <div>
        <h2   >
            <div className="bg-warning">Powered by Redux.</div>      
        </h2>     

        <h1 className="bg-dark text-warning">Current Balance<br/><span
        className={account.balance >= 0 ? "green" : "red"}>
               ${account.balance}</span>
        </h1>


          <div className="bg-info">
            <h1>Make a Deposit</h1>
            Amount ($) :<input type="number" ref={amountDeposit} /><br/><br/>
            <button className="green" onClick={deposit}>Deposit</button>
          </div>
          <div className="bg-warning">

            <h1>Make a Withdrawal</h1>
            Amount ($): <input type="number" ref={amountWithdraw} />
            <br/>
            <button className="red" onClick={withdraw} 
            >Withdraw</button>
          </div>
      </div>
    );
  }


function mapStateToProps(state) {
  return {
    accountProp: state
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actionsProp: bindActionCreators(actions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomePage);
