const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
const gameArea = document.querySelector('.game-area');

const player = { speed: 10, score: 0 };

const start = function () {
  player.score = 0;

  startScreen.classList.add('hide');
  gameArea.innerHTML = '';

  gameArea.classList.remove('hide');
  startScreen.classList.add('hide');

  player.start = true;

  let ship = document.createElement('div');
  ship.setAttribute('class', 'ship');
  gameArea.appendChild(ship);

  player.x = ship.offsetLeft;
  player.y = ship.offsetTop;

  for (x = 0; x < 4; x++) {
    const asteroid = document.createElement('div');
    asteroid.setAttribute('class', 'asteroids');
    asteroid.y = (x + 3) * 350 * -1;
    asteroid.style.top = asteroid.y + 'px';
    asteroid.style.left = Math.floor(Math.random() * 90) + 'vw';
    gameArea.appendChild(asteroid);
  }

  window.requestAnimationFrame(gamePlay);
};

startScreen.addEventListener('click', start);

const keys = {
  ArrowUp: false,
  ArrowDown: false,
  ArrowLeft: false,
  ArrowRight: false,
};

const endGame = function () {
  player.start = false;
  startScreen.classList.remove('hide');
};

const moveAsteroids = function (ship) {
  const asteroids = document.querySelectorAll('.asteroids');

  asteroids.forEach(function (i) {
    if (isCollide(ship, i)) {
      endGame();
    }

    if (i.y >= 700) {
      i.y = -300;
      i.style.left = Math.floor(Math.random() * 90) + 'vw';
    }

    i.y += 6;
    i.style.top = i.y + 'px';
  });
};

const gamePlay = function () {
  const ship = document.querySelector('.ship');

  const space = gameArea.getBoundingClientRect();

  if (player.start) {
    moveAsteroids(ship);

    if (keys.ArrowUp && player.y > space.top + 200) {
      player.y -= player.speed;
    }
    if (keys.ArrowDown && player.y < space.height - 70) {
      player.y += player.speed;
    }
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
    }
    if (keys.ArrowRight && player.x < space.width) {
      player.x += player.speed;
    }

    ship.style.top = player.y + 'px';
    ship.style.left = player.x + 'px';

    player.score++;
    score.innerHTML = `Score: ${player.score}`;

    window.requestAnimationFrame(gamePlay);
  }
};

const keyDown = function (e) {
  e.preventDefault();
  keys[e.key] = true;
};

const keyUp = function (e) {
  e.preventDefault();
  keys[e.key] = false;
};

const isCollide = function (a, b) {
  const aRect = a.getBoundingClientRect();
  const bRect = b.getBoundingClientRect();

  return !(
    aRect.bottom < bRect.top ||
    aRect.top > bRect.bottom ||
    aRect.right < bRect.left ||
    aRect.left > bRect.right
  );
};

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);
