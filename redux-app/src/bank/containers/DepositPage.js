import React from 'react';
import {connect} from 'react-redux';

const DepositPage = (props) => {
  return (
    <div className="text-left">
      <h2 className="container bg-info">
        <div className="">
          Deposits
          <div >Your recent deposits</div>
        </div>
      </h2>
      <table className="table table-hover table-striped">
        <thead>
          <tr>
            <th>Amount ($)</th>
            <th>Timestamp</th>
          </tr>
        </thead>
        <tbody>
        {props.deposits.map(function(deposit, index){
          return (
            <tr key={index}>
              <td>+{deposit.amount}</td>
              <td >{deposit.timestamp}</td>
            </tr>
          );
        })}
        </tbody>
      </table>

    </div>
  );
};



function mapStateToProps(state) {
  return {
    deposits: state.account.deposits
  };
}

export default connect(
  mapStateToProps
)(DepositPage);
