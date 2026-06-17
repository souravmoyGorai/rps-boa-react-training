import { useParams } from "react-router-dom";
import React, { useEffect } from 'react'

const UserDetails = () => {
    const {id} = useParams()
    
  return (
    <div className="bg-primary text-light">
        <h4>Details of #{id}</h4>
    </div>
  )
}

export default UserDetails