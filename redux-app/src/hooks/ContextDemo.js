import React, { createContext, useContext, useState } from 'react'

const UserContext = createContext()

 export default function ContextDemo () {
    const [user,setUser] = useState('Sourav')
    return (
        <UserContext.Provider value={user}>
        <div>
            <h4>{`Welcome ${user}! to Bank of America`}</h4>
            <Family/>
        </div>
        </UserContext.Provider>
    )
 }

 function Family() {
    return (
        <>
            <h3 className='bg-info container'>I am a Family component</h3>
            <GrandChild />
        </>
    )
 }

 function GrandChild() {
    const user = useContext(UserContext)

    return (
        <>
            <h3 className='bg-success text-light'>{`I, ${user}, am a GrandChild`}</h3>
        </>
    )
 }