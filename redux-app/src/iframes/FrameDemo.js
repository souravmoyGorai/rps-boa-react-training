import React, { useRef, useState } from 'react'

const FrameDemo = () => {
    const baseURL = "https://www.wikipedia.org"
    const iframeRef = useRef(null)
    const [url,setUrl] = useState(baseURL)

    const handleLoad = () => {
        console.log('IFrame loaded successfully.')
    }

    const getFrameInfo = () => {
        console.log(iframeRef.current)
    }

    return (
        <div>
            Enter URL:
                <input type='text' value={url}
                    onChange={(event) => setUrl(event.target.value)} />
            <iframe ref={iframeRef} src={url} onLoad={handleLoad}
                title='Dynamic Frame' width="80%" height="500px" 
                sandbox="allow-scripts allow-forms"/>
            
            <button className='btn btn-primary'
                    onClick={getFrameInfo}>Get Frame Info</button>
        </div>
    )
}

export default FrameDemo