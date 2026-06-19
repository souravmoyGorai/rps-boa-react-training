import React from 'react'
import './BankApp.css'
import HomePage from '../containers/HomePage'
import DepositPage from '../containers/DepositPage'
import WithdrawalsPage from '../containers/WithdrawalsPage'

const BankApp = () => {
  return (
    <div>
        <HomePage/>
        <DepositPage/>
        <WithdrawalsPage/>
    </div>
  )
}

export default BankApp