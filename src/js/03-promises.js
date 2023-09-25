import Notiflix from 'notiflix';

const form = document.querySelector('form.form');
const button = document.querySelector('.form button');
button.addEventListener('click', onPromise);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
function onPromise(elm) {
  elm.preventDefault();
  let firstDelay = Number(form.delay.value);
  let step = Number(form.step.value);
  let amount = Number(form.amount.value);
  for (let i = 0; i < amount; i += 1) {
    let promiseDelay = firstDelay + step * i;

    createPromise(i, promiseDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,

          {
            timeout: 3000,
          }
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}
