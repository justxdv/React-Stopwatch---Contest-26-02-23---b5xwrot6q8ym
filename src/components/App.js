import React, { useRef, useState } from 'react';
import '../styles/App.css';

const App = () => {
  const startTime = useRef(0);
  const intervalRef = useRef(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);

  const formatTime = (time) => {
    const ms = Math.floor((time % 1000) / 10);
    const s = Math.floor((time / 1000) % 60);
    const m = Math.floor((time / 1000 / 60) % 60);
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}.${ms.toString().padStart(2, '0')}`;
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
          {!isRunning && <button className="start-btn" onClick={handleStart}>START</button>}
          {isRunning && <button className="stop-btn" onClick={handleStop}>STOP</button>}
          {isRunning && <button className="lap-btn" onClick={handleLap}>LAP</button>}
          <button className="reset-btn" onClick={handleReset}>RESET</button>
        </section>
      </section>
      {laps.length > 0 && (
        <section className='lap-section'>
          <h2>Laps</h2>
          <section className='laps'>
            {laps.map((lapTime, index) => (
              <p key={index}>Lap {index + 1}: {formatTime(lapTime)}</p>
            ))}
          </section>
        </section>
      )}
    </div>
  )
};

export default App;
