let timer;
let isRunning = false;
let startTime;
let elapsedTime = 0;
let pausedTime = 0;
const display = document.querySelector('.display');
const startStopBtn = document.getElementById('startStop');
const resetBtn = document.getElementById('reset');
const lapBtn = document.getElementById('lap');
const lapsList = document.getElementById('laps');

function formatTime(time) {
  const date = new Date(time);
  const minutes = date.getMinutes().toString().padStart(2, '0');
  const seconds = date.getSeconds().toString().padStart(2, '0');
  const milliseconds = Math.floor(date.getMilliseconds() / 10)
    .toString()
    .padStart(2, '0');
  return `${minutes}:${seconds}:${milliseconds}`;
}

function displayTime() {
  const currentTime = Date.now() - startTime + elapsedTime;
  display.textContent = formatTime(currentTime);
}

function startStop() {
  if (isRunning) {
    clearInterval(timer);
    isRunning = false;
    pausedTime = Date.now() - startTime;
    startStopBtn.textContent = 'Start';
  } else {
    startTime = Date.now() - pausedTime - elapsedTime;
    timer = setInterval(displayTime, 10);
    isRunning = true;
    startStopBtn.textContent = 'Stop';
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  pausedTime = 0;
  display.textContent = '00:00:00';
  startStopBtn.textContent = 'Start';
  lapsList.innerHTML = '';
}

function lap() {
  if (isRunning) {
    const lapTime = Date.now() - startTime + elapsedTime - pausedTime;
    const lapItem = document.createElement('li');
    lapItem.textContent = formatTime(lapTime);
    lapsList.appendChild(lapItem);
  }
}

startStopBtn.addEventListener('click', startStop);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);
