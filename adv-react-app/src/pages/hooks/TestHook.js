import React from "react";
import useFetch from "./useFetch";

const TestHook = ()=> {
    const url = 'http://jsonplaceholder.typicode.com/users'
    const {loading, error, data=[]} = useFetch(url)
    if(error) 
        return <h5 className="text-danger">Error has occured.</h5>
    if(loading)
        return <h5>Loading data .... please wait</h5>
    return (
        <div className="bg-dark text-light">
        <h4>Data from REST API with Custom Hook</h4>
        <ul>
            {data?.map(item => (<li key={item.id}>{item.username} - {item.email}</li>))}
        </ul>
        </div>
    )
}
export default TestHook