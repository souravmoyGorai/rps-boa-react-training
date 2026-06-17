import React from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import AgGridDemo from './grid/RealGrid'
import { HomeButton } from './HomeButton'

const Users = () => {
    const navigate = useNavigate()
    const location = useLocation()
    console.log(`Location: ${location.pathname}`)

    const handleClick=(userId) => {
        navigate(`/users/${userId}`)
        //loading userDetails page of id #123
    }
  return (
    <div className='bg-warning'>
        <h4>Users Page</h4>
        <button className='user-link' onClick={()=>handleClick('123')}>
            View user details of #123
        </button>

        <Outlet/>
        <HomeButton/>

    </div>
  )
}

export default Users