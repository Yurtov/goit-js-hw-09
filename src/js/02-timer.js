import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const TIMER_DELAY = 1000;
let selectedDate = null;

const refs = {
  dateInputEl: document.querySelector('#datetime-picker'),
  startBtnEl: document.querySelector('[data-start]'),
  timerEl: document.querySelector('.timer'),
  timerDayEl: document.querySelector('[data-days]'),
  timerHoursEl: document.querySelector('[data-hours]'),
  timerMinutesEl: document.querySelector('[data-minutes]'),
  timerSecondsEl: document.querySelector('[data-seconds]'),
};


flatpickr(refs.dateInputEl, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < Date.now()) {
      Notiflix.Notify.failure('Please choose a date in future');
      return (refs.startBtnEl.disabled = true);
    }
    refs.startBtnEl.disabled = false;
    selectedDate = selectedDates[0];
  },
});

const timer = {
  timerId: null,
  isActive: false,
  start() {
    if (this.isActive) {
      return;
    }
    this.isActive = true;
    this.timerId = setInterval(() => {
      const currentDate = Date.now();
      const deltaTime = selectedDate - currentDate;

      if (deltaTime <= 0) {
        this.stop();
        Notiflix.Notify.success('Time is out');
        return;
      }
      const time = convertMs(deltaTime);
      //   console.log(`${days}:${hours}:${minutes}:${seconds}`);
      updateTimerFace(time);
    }, TIMER_DELAY);
  },
  stop() {
    clearInterval(this.timerId);
    this.isActive = false;
  },
};

refs.startBtnEl.addEventListener('click', () => {
  timer.start();
});

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(
    Math.floor((((ms % day) % hour) % minute) / second)
  );

  return { days, hours, minutes, seconds };
}

function updateTimerFace({ days, hours, minutes, seconds }) {
  refs.timerDayEl.textContent = `${days}`;
  refs.timerHoursEl.textContent = `${hours}`;
  refs.timerMinutesEl.textContent = `${minutes}`;
  refs.timerSecondsEl.textContent = `${seconds}`;
}
