let startTime, interval, elapsed = 0;
const display = document.getElementById('display');
const status = document.getElementById('status');
const laps = document.getElementById('laps');

function updateDisplay(ms) {
  const date = new Date(ms);
  const minutes = String(date.getUTCMinutes()).padStart(2, '0');
  const seconds = String(date.getUTCSeconds()).padStart(2, '0');
  const centiseconds = String(Math.floor(date.getUTCMilliseconds() / 10)).padStart(2, '0');
  display.textContent = `${minutes}:${seconds}:${centiseconds}`;
}

document.getElementById('start').onclick = () => {
  if (!interval) {
    startTime = Date.now() - elapsed;
    interval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay(elapsed);
    }, 10);
    status.textContent = "⏳ Timing in progress...";
  }
};

document.getElementById('pause').onclick = () => {
  clearInterval(interval);
  interval = null;
  status.textContent = "⏸️ Paused. Take a breath.";
};

document.getElementById('reset').onclick = () => {
  clearInterval(interval);
  interval = null;
  elapsed = 0;
  updateDisplay(0);
  laps.innerHTML = '';
  status.textContent = "🔄 Reset. Ready to go again!";
};

document.getElementById('lap').onclick = () => {
  const li = document.createElement('li');
  li.textContent = `🏁 Lap at ${display.textContent}`;
  laps.appendChild(li);
  status.textContent = "📍 Lap recorded!";
  if (laps.children.length === 3) {
    status.textContent = "🔥 You're on a roll!";
  }
};
