const boy = document.querySelector('.boy');
const fail = document.querySelector('.fail');

const jump = function () {
  if (boy.classList != 'jump') {
    boy.classList.add('jump');

    setTimeout(() => {
      boy.classList.remove('jump');
    }, 700);
  }
};

let isAlive = setInterval(() => {
  let collided = false;

  let playerTop = parseInt(
    window.getComputedStyle(boy).getPropertyValue('top')
  );

  let failLeft = parseInt(
    window.getComputedStyle(fail).getPropertyValue('left')
  );

  if (failLeft < 50 && failLeft > 0 && playerTop >= 448) {
    collided = true;
    console.log(collided);

    if (collided) {
      gameOver();
    }
  }
}, 10);

const gameOver = function () {
  document.querySelector('img').classList.remove('hidden');
  fail.classList.add('hidden');
  boy.classList.add('hidden');
  clearInterval(isAlive);
};

window.addEventListener('keydown', jump);
window.addEventListener('click', jump);
