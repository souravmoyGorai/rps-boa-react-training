//custom hook: useFetch(url,options)
import { useState, useEffect } from "react";

const useFetch = (url='',options=null) => {
    const [data,setData] = useState(null);
    const [error,setError] = useState(null);
    const [loading,setLoading] = useState(false);

    useEffect( ()=> {
        setLoading(true)
        setTimeout( ()=> {
            fetch(url,options)
                .then( res => res.json())
                    .then(data => {
                        setData(data)
                        setError(null)
                    })
                .catch(error => {
                    setError(error)
                    setData(null)
                })
                .finally( () => setLoading(false))
        },5000)
    },[url,options])

    return {loading,error,data}
}
export default useFetch;