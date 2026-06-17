import { useMemo, useRef, useState, useCallback } from 'react';

const expensiveFunction = (inputValue) => {
    //
    let value = inputValue * 100000;
    return value
}

function MemoDemo (props) {
    const [inputValue, setInputValue] = useState(100);
    const txtValue = useRef()

    const handler = () => {
        setInputValue(txtValue.current.value)
    }
    const expensiveResult = useMemo(
        ()=> expensiveFunction(inputValue),
        [inputValue]
    )

    return (
        <>
            <h4>UseMemo Demo with useRef</h4>
            Value: <input type="text" ref={txtValue}/>
            <button onClick={handler} className='btn btn-primary'>Calculate</button>
            <h3 className='bg-info'>The Expensive calculation result is:{expensiveResult}</h3>
        </>
    )
}

export default MemoDemo;