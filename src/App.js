import React from 'react'
import './App.css';
import Break from './component/break';
import Session from './component/session';
import {useClockify } from './clockify'
import Controls from './component/clockControler';
import { useStore } from './context/provider';


export default function App() {
  const [{timerLabel}] = useStore();
  const clockifiedValue = useClockify();

  return (
    <div className="timer">
      <h1 id='title' >Pomodoro Clock</h1>
      <div className='wrapper'>
      <h1 id='timer-label' className='timer-label'>{timerLabel}</h1>
      <h1 id='time-left' className='timer-time'>{clockifiedValue}</h1>
      <Controls />
      <div className="timer-control">
        <Break />
        <Session />
        </div>
      </div>
    </div>
  );
}





