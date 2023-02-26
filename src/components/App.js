import React, { useRef, useState } from 'react';
import '../styles/App.css';

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time) => {
  const ms = Math.floor(time % 1000);
  const s = Math.floor(time / 1000);
  return `${s}.${ms.toString().padStart(3, '0')}`;
};



  const handleStart = () => {
    if (!isRunning) {
      startTime.current = Date.now() - currentTime;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTime.current);
      }, 10);
      setIsRunning(true);
    }
  };

  const handleStop = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const handleLap = () => {
    const lapTime = currentTime;
    setLaps([...laps, lapTime]);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setCurrentTime(0);
    setLaps([]);
    setIsRunning(false);
  };

  return (
    <div id="main">
      <section>
        <h1 className='seconds-elapsed'>{formatTime(currentTime)}</h1>
        <section className='buttons'>
          <button className="start-btn" onClick={handleStart} >START</button>
          <button className="stop-btn" onClick={handleStop} >STOP</button>
          <button className="lap-btn" onClick={handleLap} >LAP</button>
          <button className="reset-btn" onClick={handleReset} >RESET</button>
        </section>
      </section>
      {laps.length > 0 && (
        <section className='lap-section'>
          <h2>Laps</h2>
          <section className='laps'>
            {laps.map((lapTime, index) => (
              <p key={index}>{formatTime(lapTime)}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  )
};

export default App;

