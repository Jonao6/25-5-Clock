const SESSION_LENGTH = 25 * 60;
const BREAK_LENGTH = 5 * 60;

let timer;
let isRunning = false;
let isSession = true;
let timeRemaining = SESSION_LENGTH;

const startTimer = () => {
  isRunning = true;
  timer = setInterval(() => {
    timeRemaining--;
    if (timeRemaining < 0) {
      clearInterval(timer);
      timeRemaining = isSession ? BREAK_LENGTH : SESSION_LENGTH;
      isSession = !isSession;
      startTimer();
    }
    updateTimerDisplay();
  }, 1000);
};

const stopTimer = () => {
  clearInterval(timer);
  isRunning = false;
};

const resetTimer = () => {
  stopTimer();
  isSession = true;
  timeRemaining = SESSION_LENGTH;
  updateTimerDisplay();
};

const updateTimerDisplay = () => {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  const timerDisplay = document.getElementById('timerDisplay');
  timerDisplay.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const toggleTimer = () => {
  if (isRunning) {
    stopTimer();
  } else {
    startTimer();
  }
};

const sessionLengthInput = document.getElementById('sessionLengthInput');
sessionLengthInput.addEventListener('change', () => {
  if (!isRunning) {
    SESSION_LENGTH = sessionLengthInput.value * 60;
    resetTimer();
  }
});

const breakLengthInput = document.getElementById('breakLengthInput');
breakLengthInput.addEventListener('change', () => {
  if (!isRunning) {
    BREAK_LENGTH = breakLengthInput.value * 60;
    resetTimer();
  }
});

const playPauseButton = document.getElementById('playPauseButton');
playPauseButton.addEventListener('click', toggleTimer);

const resetButton = document.getElementById('resetButton');
resetButton.addEventListener('click', resetTimer);
