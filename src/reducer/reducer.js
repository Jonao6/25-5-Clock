export const initialState = {
    timerLabel: 'Session',
    loading: false,
    breakClock: 5,
    sessionClock: 25,
    timerValue: 1500
}

export const actionType = {
    RESET_TIMERS: 'RESET_TIMERS',
    START_TIMER: 'START_TIMER',
    TOGGLE_TIMER_LABEL: 'TOGGLE_TIMER_LABEL',
    TOGGLE_LOADING: 'TOGGLE_LOADING',
    INCREASE_BREAK_CLOCK: 'INCREASE_BREAK_CLOCK',
    DECREASE_BREAK_CLOCK: 'DECREASE_BREAK_CLOCK',
    INCREASE_SESSION_CLOCK: 'INCREASE_SESSION_CLOCK',
    DECREASE_SESSION_CLOCK: 'DECREASE_SESSION_CLOCK'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionType.INCREASE_BREAK_CLOCK:
            return {
                ...state,
                breakClock: action.breakClock
            };
        case actionType.DECREASE_BREAK_CLOCK:
            return {
                ...state,
                breakClock: action.breakClock
            };
        case actionType.INCREASE_SESSION_CLOCK:
            return {
                ...state,
                sessionClock: action.sessionClock,
                timerValue: action.timerValue
            };
        case actionType.DECREASE_SESSION_CLOCK:
            return {
                ...state,
                sessionClock: action.sessionClock,
                timerValue: action.timerValue
            };
        case actionType.TOGGLE_LOADING:
            return {
                ...state,
                loading: action.loading
            };
        case actionType.TOGGLE_TIMER_LABEL:
            return {
                ...state,
                timerLabel: action.timerLabel
            };
        case actionType.START_TIMER:
            return {
                ...state,
                timerValue: action.timerValue
            };
            case actionType.TOGGLE_IS_BREAK_TIME:
             return {
            ...state,
            isBreakTime: !state.isBreakTime,
            };
        case actionType.RESET_TIMERS:
            return initialState;
        default:
            return state;
    }
}

export default reducer;