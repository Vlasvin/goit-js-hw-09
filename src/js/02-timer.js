import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  inDate: document.querySelector('#datetime-picker'),
};

let difference = null;
refs.btnStart.addEventListener('click', startTimer);
refs.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    createTimer(selectedDates[0]);
  },
};

flatpickr(refs.inDate, options);

function createTimer(selectedDate) {
  let selectDate = selectedDate.getTime();
  let currentDate = options.defaultDate.getTime();
  if (selectDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future', {
      timeout: 6000,
    });
  } else {
    refs.btnStart.disabled = false;
    difference = selectDate - currentDate;
  }
}
function startTimer() {
  refs.inDate.disabled = true;
  refs.btnStart.disabled = true;

  let timeComponents = convertMs(difference);
  let totalMilliseconds = timeToMilliseconds(timeComponents);

  updateDate(timeComponents);

  let timerId = setInterval(() => {
    totalMilliseconds -= 1000;
    const updatedTime = convertMs(totalMilliseconds);
    updateDate(updatedTime);
    if (totalMilliseconds <= 0) {
      clearInterval(timerId);
    }
    return;
  }, 1000);
}

function convertMs(ms) {
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

function timeToMilliseconds(timeComponents) {
  const days = parseInt(timeComponents.days) || 0;
  const hours = parseInt(timeComponents.hours) || 0;
  const minutes = parseInt(timeComponents.minutes) || 0;
  const seconds = parseInt(timeComponents.seconds) || 0;

  return (days * 86400 + hours * 3600 + minutes * 60 + seconds) * 1000;
}

function addLeadingZero(value) {
  const stringValue = String(value);
  if (stringValue.length > 2) {
    return stringValue;
  } else {
    return stringValue.padStart(2, '0');
  }
}

function updateDate({ days, hours, minutes, seconds }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${minutes}`;
  refs.seconds.textContent = `${seconds}`;
  return;
}
