import Notiflix from 'notiflix';

const formEl = document.querySelector('form');
formEl.addEventListener('click', heandlePromiseCreate);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

function heandlePromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let valueDelay = Number(delay.value);
  let valueStep = Number(step.value);
  let valueAmount = Number(amount.value);

  for (let i = 1; i <= valueAmount; i += 1) {
    valueDelay += valueStep;
    createPromise(i, valueDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    e.currentTarget.reset();
  }
}
