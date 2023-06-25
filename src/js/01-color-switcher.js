function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const refs = {
  startButtonEl: document.querySelector('[data-start]'),
  stopButtonEl: document.querySelector('[data-stop]'),
};

const timerBodyColor = {
  timerId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
  },
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
  },
};

refs.startButtonEl.addEventListener('click', () => {
  timerBodyColor.start();
});
refs.stopButtonEl.addEventListener('click', () => {
  timerBodyColor.stop();
});
