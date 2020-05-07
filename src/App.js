import React, { useState, useEffect } from 'react';
import TimeLeft from './TimeLeft'
import './App.css';

import moment from 'moment'
import momentDurationFormatSetup from 'moment-duration-format'


function App() {
  const [timerState, setTimerState] = useState("STOP") //START OR STOP
  const [intervalId, setIntervalId] = useState(null)
  const [session, setSession] = useState("POMODORO")
  const [timeLeft, setTimeLeft] = useState(60 * 25)

  const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })

  useEffect(() => {
    document.title = `${formattedTimeLeft} - ${session}`

  }, [timeLeft])

  const handleStart = () => {

    const id = setInterval(() => {
      setTimeLeft((timeLeft) => {
        const newTimeLeft = timeLeft - 1

        if (newTimeLeft >= 0) {
          return timeLeft - 1
        }

        clearInterval(id)
        setTimeLeft(60 * 25)
        setTimerState('STOP')

      })

    }, 1000)

    setIntervalId(id)
    setTimerState('START')
  }

  const handleStop = () => {
    clearInterval(intervalId)
    setTimeLeft(60 * 25)
    setIntervalId(null)
    setTimerState('STOP')
    setSession('POMODORO')
  }

  const handleBreak5 = () => {
    setTimeLeft(5)
    handleStart()
    setSession('BREAK')
  }

  const handleBreak15 = () => {
    setTimeLeft(15)
    handleStart()
    setSession('BREAK')

  }

  return (
    <div className="App">
      <TimeLeft time={timeLeft} sessionTitle={session} />
      <div>
        {timerState === 'START' ? <button onClick={handleStop}>STOP</button> : <button onClick={handleStart}>START</button>}
      </div>
      <div>
        {timerState === 'STOP' && <button onClick={handleBreak5}>SHORT BREAK</button>}
        {timerState === 'STOP' && <button onClick={handleBreak15}>LONG BREAK</button>}
      </div>



    </div >
  );
}

export default App;
