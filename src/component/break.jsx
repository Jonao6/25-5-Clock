import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useStore } from '../context/provider'; 
import { actionType } from '../reducer/reducer';
import './break.css';
import Button from 'react-bootstrap/Button';

const Break = () => {
    const [{ breakClock, loading }, dispatch] = useStore();

    const handleDecrement = () => {
        dispatch({
            type: actionType.DECREASE_BREAK_CLOCK,
            breakClock: breakClock - 1
        });
    };

    const handleIncrement = () => {
        dispatch({
            type: actionType.INCREASE_BREAK_CLOCK,
            breakClock: breakClock + 1
        });
    };

    return (
        <div className="break">
            <span id="break-label" className="break-label">Break Length</span>
            <div className="break-controls">
                <Button
                    size="sm"
                    variant="outline-primary"
                    type="button"
                    id="break-decrement"
                    className="break-btn"
                    onClick={handleDecrement}
                    disabled={loading || breakClock <= 1}
                >
                    <FontAwesomeIcon icon={faMinus} />
                </Button>
                <p id="break-length" className="break-length">{breakClock}</p>
                <Button
                    size="sm"
                    variant="outline-primary"
                    type="button"
                    id="break-increment"
                    className="break-btn"
                    onClick={handleIncrement}
                    disabled={loading || breakClock > 59}
                >
                    <FontAwesomeIcon icon={faPlus} />
                </Button>
            </div>
        </div>
    );
};

export default Break;