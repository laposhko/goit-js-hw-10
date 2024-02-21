// const submitBtn = document.querySelector('button');
// console.log(submitBtn);
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const form = document.querySelector('form');
let delay = 0;
form.addEventListener('submit', handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  delay = form.elements.delay.value;
  if (delay < 0) {
    iziToast.show({
      message: 'Please choose normal delay',
      position: 'topRight',
    });
    return;
  }
  const selectedRadioButton = form.querySelector(
    'input[name="state"]:checked'
  ).value;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (selectedRadioButton == 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay} ms`);
      }
      reject(`❌ Rejected promise in ${delay}ms`);
    }, delay);
  });

  promise
    .then(res => {
      iziToast.show({
        position: 'topRight',
        theme: 'dark',
        backgroundColor: '#59A10D',
        message: res,
      });
    })
    .catch(err => {
      iziToast.show({
        position: 'topRight',
        backgroundColor: '#EF4040',
        theme: 'dark',
        message: err,
      });
    });
}
