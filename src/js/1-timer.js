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
        theme: 'dark',
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

  const nowDate = new Date();
  let timeDifference = chosenDate - nowDate;
  for (let i = 0; i <= Math.floor(timeDifference / 1000); i++) {
    setTimeout(() => {
      const time = convertMs(timeDifference);
      for (const key in time) {
        document.querySelector(`[data-${key}]`).textContent = formatTime(
          time[key]
        );
      }
      timeDifference -= 1000;
    }, i * 1000);
  }
}
