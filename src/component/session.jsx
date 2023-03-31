import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons'
import { actionType } from '../reducer/reducer';
import { useStore } from '../context/provider';
import Button from 'react-bootstrap/Button';
import './session.css'
const Session = () => {

    const [{sessionClock, loading}] = useStore();
    const [state, dispatch] = useStore();

    const handleDecrement = () => {
        dispatch({
            ...state,
            type: actionType.DECREASE_SESSION_CLOCK,
            sessionClock: sessionClock - 1,
            timerValue: (sessionClock - 1) * 60
        })
    }
    const handleIncrement = () => {
        dispatch({
            ...state,
            type: actionType.INCREASE_SESSION_CLOCK,
            sessionClock: sessionClock + 1,
            timerValue: (sessionClock + 1) * 60
        })
    }

    return (
        <div className='session'>
            <span id='session-label' className='session-label'>Session Length</span>
            <div className="session-controls">
              <Button
                    size='sm'
                    variant="outline-primary"
                    type='button'
                    id='session-decrement'
                    className='session-btn'
                    onClick={handleDecrement}
                    disabled={loading || sessionClock <= 1}>
                    <FontAwesomeIcon icon={faMinus}/>
                </Button>
                <p id="session-length" className='session-length'>{sessionClock}</p>
                <Button
                    size='sm'
                    variant="outline-primary"
                    type='button'
                    id='session-increment'
                    className='session-btn'
                    onClick={handleIncrement}
                    disabled={loading || sessionClock > 59}>
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
        </div>
    )
}

export default Session;