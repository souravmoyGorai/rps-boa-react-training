import React  from 'react';
import {connect} from 'react-redux';

const WithdrawPage = (props) => {
  return (
    <div>
      <h2 className="container">
        <div >
          Withdrawals
          <div >Your recent withdrawals</div>
        </div>
      </h2>
          <table className="table table-hovered table-striped">
        <thead>
          <tr>
            <th>Amount ($)</th>
            <th className="right aligned">Timestamp</th>
          </tr>
        </thead>
        <tbody>
        {props.withdrawals.map(function(withdraw, index){
          return (
            <tr key={index}>
              <td>-{withdraw.amount}</td>
              <td className="right aligned">{withdraw.timestamp}</td>
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
    withdrawals: state.account.withdrawals
  };
}

export default connect(
  mapStateToProps
)(WithdrawPage);
