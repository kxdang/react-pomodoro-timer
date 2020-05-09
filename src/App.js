import React, { useState, useEffect } from 'react';
import TimeLeft from './TimeLeft'
import Quoteblock from './Quoteblock'
import { ThemeProvider } from 'styled-components';
import { lightTheme, darkTheme } from './theme';
import { createGlobalStyle } from 'styled-components';
import moment from 'moment'
import Switch from "react-switch";
import './App.css';

export const GlobalStyles = createGlobalStyle`
  *,
  *::after,
  *::before {
    box-sizing: border-box;
  }

  body {
    align-items: center;
    background: ${({ theme }) => theme.body};
    color: ${({ theme }) => theme.text};
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100vh;
    margin: 0;
    padding: 0;
    font-family: BlinkMacSystemFont, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
    transition: all 0.25s linear;

    button{
      background: ${({ theme }) => theme.text};
      color: ${({ theme }) => theme.body};
      margin: 0 0.5rem;
    }
  }`



function App() {
  const [timerState, setTimerState] = useState("STOP") //START OR STOP
  const [intervalId, setIntervalId] = useState(null)
  const [session, setSession] = useState("POMODORO")
  const [timeLeft, setTimeLeft] = useState(60 * 25)
  const [theme, setTheme] = useState('light')
  const [checked, setChecked] = useState(false)

  const formattedTimeLeft = moment.duration(timeLeft, 's').format('mm:ss', { trim: false })

  useEffect(() => {
    document.title = `${formattedTimeLeft} - ${session}`

  }, [timeLeft])

  const handleStartPomodoro = () => {
    setTimeLeft(60 * 25)
    setSession('POMODORO')
    handleStart()
  }

  const handleStart = () => {
    const id = setInterval(() => {
      setTimeLeft((timeLeft) => {
        const newTimeLeft = timeLeft - 1

        if (newTimeLeft >= 0) {
          return timeLeft - 1
        }

        clearInterval(id)
        // setTimeLeft(60 * 25)
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
    setTimeLeft(60 * 5)
    handleStart()
    setSession('BREAK')
  }

  const handleBreak15 = () => {
    setTimeLeft(60 * 15)
    handleStart()
    setSession('LONG BREAK')
  }

  const toggleTheme = () => {
    // if the theme is not light, then set it to dark
    if (theme === 'light') {
      setTheme('dark');
      // otherwise, it should be light
    } else {
      setTheme('light');
    }
  }

  const toggleButton = () => {
    setChecked(!checked)
    toggleTheme()
  }

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <div className="App">
        <GlobalStyles />
        <Quoteblock />

        <TimeLeft time={timeLeft} isCompleted={timerState === 'STOP'} sessionTitle={session} />
        <div>
          {timerState === 'START' ? <button onClick={handleStop}>STOP</button> : <button onClick={handleStartPomodoro}>START POMO</button>}
        </div>

        <div className="App-breakbuttons">
          <div>
            {timerState === 'STOP' && <button onClick={handleBreak5}>SHORT BREAK</button>}
          </div>

          <div>
            {timerState === 'STOP' && <button onClick={handleBreak15}>LONG BREAK</button>}
          </div>

        </div>

        <Switch checked={checked} onChange={toggleButton} checkedIcon={
          <span
            style={{ fontSize: "0.8rem", marginLeft: "0.2rem" }}
            role="img"
            aria-label="sun"
          >
            🌞
          </span>
        }
          onColor="#242424"
          uncheckedIcon={
            <span
              style={{ fontSize: "0.8rem", marginLeft: "0.2rem" }}
              role="img"
              aria-label="moon"
            >
              🦉
                    </span>
          }
        />



      </div >
    </ThemeProvider>
  );
}

export default App;
