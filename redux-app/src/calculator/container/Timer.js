import React, { useState, useEffect } from "react";

function Timer() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {//ComponentDidMount
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
        return () => clearInterval(interval); //componentWillUnmount
  }, []);

  return (
    <div className="bg-dark text-warning text-center">
    
      <h4>Time now : {currentTime.toLocaleTimeString()}</h4>
    </div>
  );
}

export default Timer;
