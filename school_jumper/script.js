const boy = document.querySelector('.boy');
const fail = document.querySelector('.fail');
const pass = document.querySelector('.pass');
const scoreText = document.querySelector('.score');

let score = 0;

const jump = function () {
  if (boy.classList != 'jump') {
    boy.classList.add('jump');
    pass.style.top = Math.floor(Math.random() * 448 + 448) + 'px';

    setTimeout(() => {
      boy.classList.remove('jump');
    }, 400);
  }
};

let isAlive = setInterval(() => {
  let collided = false;

  score++;
  scoreText.textContent = `Score: ${score}`;

  let playerTop = parseInt(
    window.getComputedStyle(boy).getPropertyValue('top')
  );

  let failLeft = parseInt(
    window.getComputedStyle(fail).getPropertyValue('left')
  );

  let passLeft = parseInt(
    window.getComputedStyle(pass).getPropertyValue('left')
  );

  if (failLeft < 50 && failLeft > 0 && playerTop >= 448) {
    collided = true;

    if (collided) {
      gameOver();
    }
  }

  if (passLeft < 50 && passLeft > 0 && playerTop >= 448) {
    score += 5;
  }
}, 10);

const gameOver = function () {
  document.querySelector('img').classList.remove('hidden');
  fail.classList.add('hidden');
  boy.classList.add('hidden');
  pass.classList.add('hidden');
  clearInterval(isAlive);
};

window.addEventListener('keydown', jump);
window.addEventListener('click', jump);
