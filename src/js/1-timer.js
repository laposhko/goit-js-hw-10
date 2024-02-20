import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const startBtn = document.querySelector('button');
const input = document.querySelector('#datetime-picker');
let chosenDate;
startBtn.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    chosenDate = selectedDates[0];
    const nowDate = new Date();
    if (chosenDate - nowDate <= 0) {
      startBtn.disabled = true;
      iziToast.error({
        titleColor: '#FFFFFF',
        message: 'Please choose a date in the future',
        backgroundColor: '#B51B1B',
        messageColor: '#FAFAFB',
      });
      chosenDate = 0;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(input, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

startBtn.addEventListener('click', handleStartTimer);

const formatTime = value => (Math.floor(value / 10) == 0 ? '0' + value : value);

function handleStartTimer({}) {
  startBtn.disabled = true;
  input.disabled = true;

  const values = document.querySelectorAll('.value');
  const nowDate = new Date();
  let timeDifference = chosenDate - nowDate;
  const interval = setInterval(() => {
    const { days, hours, minutes, seconds } = convertMs(timeDifference);
    values[0].textContent = formatTime(days);
    values[1].textContent = formatTime(hours);
    values[2].textContent = formatTime(minutes);
    values[3].textContent = formatTime(seconds);
    timeDifference -= 1000;
    if (seconds == 0) {
      clearInterval(interval);
      input.disabled = false;
    }
  }, 1000);
}
