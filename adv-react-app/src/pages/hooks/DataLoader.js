import React, { useEffect, useState } from 'react'

const DataLoader = () => {
    const url = "http://jsonplaceholder.typicode.com/users"
    const [users,setUsers] = useState([])

    //#1. once= [], #2 forever if nothing is give, #3 if dependency changes
    useEffect (() => {
       fetch(url).then(response => response.json())
                    .then(data => setUsers(data))
    },[])
    return (
        <div>
            <ul>
                {users.map(item => (<li key={item.id}>{item.username} - {item.email}</li>))}
            </ul>
        </div>
    )
}

export default DataLoader
