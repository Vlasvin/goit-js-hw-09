const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  currentColor: document.querySelector('body'),
};
let timerId = null;
refs.btnStart.addEventListener('click', changeBackColor);
refs.btnStop.addEventListener('click', stopChangColor);

function changeBackColor() {
  refs.btnStart.disabled = true;
  refs.btnStop.disabled = false;
  timerId = setInterval(() => {
    const randomColor = getRandomHexColor();
    refs.currentColor.style.backgroundColor = randomColor;
  }, 1000);
}
function stopChangColor() {
  clearInterval(timerId);
  refs.btnStart.disabled = false;
  refs.btnStop.disabled = true;
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
