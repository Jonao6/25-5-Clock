import { useEffect, useRef } from 'react';
import { useClockify } from '../clockify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faRedo } from '@fortawesome/free-solid-svg-icons'
import { actionType } from '../reducer/reducer';
import { useStore } from '../context/provider';
import './clockControler.css'
import Button from 'react-bootstrap/Button';

const Controls = () => {

    const [{timerValue, breakClock, sessionClock, timerLabel, loading, isBreakTime}] = useStore();
    const [state, dispatch] = useStore();
    const clockifiedValue = useClockify();
    const bellSoundUrl = "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3";
    const audioSoundRef = useRef();
    
    const handleReset = () => {
        dispatch({
            ...state,
            type: actionType.RESET_TIMERS
        })
        audioSoundRef.current.pause();
        audioSoundRef.current.currentTime = 0;
    }

    const handlePlayPause = () => {
        dispatch({
            ...state,
            type: actionType.TOGGLE_LOADING,
            loading: !state.loading
        })
    }

    const handleCount = () => {
        if (timerValue <= 0) {
          if (isBreakTime) {
            dispatch({
              ...state,
              type: actionType.TOGGLE_TIMER_LABEL,
              timerLabel: "Session",
            });
            dispatch({
              ...state,
              type: actionType.START_TIMER,
              timerValue: sessionClock * 60,
            });
          } else {
            dispatch({
              ...state,
              type: actionType.TOGGLE_TIMER_LABEL,
              timerLabel: "Break",
            });
            dispatch({
              ...state,
              type: actionType.START_TIMER,
              timerValue: breakClock * 60,
            });
          }
          dispatch({
            ...state,
            type: actionType.TOGGLE_IS_BREAK_TIME,
          });
          audioSoundRef.current.play();
        } else {
          dispatch({
            ...state,
            type: actionType.START_TIMER,
            timerValue: timerValue - 1,
          });
          if (timerValue === 1) {
            document.title = `[${timerLabel}] - 00:01`;
          } else {
            document.title = `[${timerLabel}] - ${clockifiedValue}`;
          }
        }
      };
          
    useEffect(() => {
        if (loading) {
            let timerInterval = setInterval(() => {
                handleCount();
                document.title = `[${timerLabel}] - ${clockifiedValue}`
            }, 1000);
            return () => clearInterval(timerInterval);
        };
    })

    return (
        <div className='controls'>
            <Button 
                    size='sm'
                    variant="outline-primary" 
                    type='button' 
                    id='start_stop' 
                    onClick={handlePlayPause}>
                <FontAwesomeIcon icon={!loading ? faPlay : faPause} />
            </Button>
            <Button 
                     size='sm'
                     variant="outline-primary" 
                     type='button'
                     id='reset' 
                     onClick={handleReset}>
                <FontAwesomeIcon icon={faRedo} />
            </Button>
            <audio id="beep" src={bellSoundUrl} ref={audioSoundRef} preload='auto' />
        </div>
    )
}

export default Controls;