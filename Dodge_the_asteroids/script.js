const score = document.querySelector('.score');
const startScreen = document.querySelector('.start-screen');
const gameArea = document.querySelector('.game-area');
const explosion = document.querySelector('img');

const player = { speed: 10, score: 0 };

let bulletsNum = 10;

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

  for (x = 0; x < 6; x++) {
    const asteroid = document.createElement('div');
    asteroid.setAttribute('class', 'asteroids');
    asteroid.y = (x + 3) * 60 * -1;
    asteroid.style.top = asteroid.y + 'px';
    asteroid.style.left = Math.floor(Math.random() * 90) + 'vw';
    const asteroidBackgroundSize = Math.random() * (10 - 3) + 3;
    asteroid.style.backgroundSize = `${asteroidBackgroundSize}rem ${asteroidBackgroundSize}rem`;
    asteroid.style.width = asteroidBackgroundSize + 'rem';
    asteroid.style.height = asteroidBackgroundSize + 'rem';
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
  bulletsNum = 10;
  explosion.classList.add('hide');
};

const moveAsteroids = function (ship) {
  const asteroids = document.querySelectorAll('.asteroids');

  asteroids.forEach(function (i) {
    if (isCollide(ship, i)) {
      endGame();
    }

    if (i.y >= 900) {
      i.remove();

      const asteroid = document.createElement('div');
      asteroid.setAttribute('class', 'asteroids');
      asteroid.y = (x + 3) * 60 * -1;
      asteroid.style.top = asteroid.y + 'px';
      asteroid.style.left = Math.floor(Math.random() * 90) + 'vw';
      const asteroidBackgroundSize = Math.random() * (10 - 3) + 3;
      asteroid.style.backgroundSize = `${asteroidBackgroundSize}rem ${asteroidBackgroundSize}rem`;
      asteroid.style.width = asteroidBackgroundSize + 'rem';
      asteroid.style.height = asteroidBackgroundSize + 'rem';
      gameArea.appendChild(asteroid);
    }

    i.y += 5;
    i.style.top = i.y + 'px';
  });
};

const movePowerup = function (ship) {
  const powerup = document.querySelectorAll('.powerups');

  powerup.forEach(function (i) {
    if (isCollide(ship, i)) {
      bulletsNum += 10;
      i.remove();
    }

    if (i.y >= 900) {
      i.remove();
    }

    i.y += 5;
    i.style.top = i.y + 'px';
  });
};

const moveBullets = function () {
  const bullets = document.querySelectorAll('.bullets');
  const asteroids = document.querySelectorAll('.asteroids');

  bullets.forEach(function (i) {
    if (i.y < 0) {
      i.remove();
    }

    i.y -= 10;
    i.style.top = i.y + 'px';

    asteroids.forEach(function (index) {
      if (isCollide(i, index)) {
        index.remove();
        player.score += 100;

        const asteroid = document.createElement('div');
        asteroid.setAttribute('class', 'asteroids');
        asteroid.y = (x + 3) * 60 * -1;
        asteroid.style.top = asteroid.y + 'px';
        asteroid.style.left = Math.floor(Math.random() * 90) + 'vw';
        const asteroidBackgroundSize = Math.random() * (10 - 3) + 3;
        asteroid.style.backgroundSize = `${asteroidBackgroundSize}rem ${asteroidBackgroundSize}rem`;
        asteroid.style.width = asteroidBackgroundSize + 'rem';
        asteroid.style.height = asteroidBackgroundSize + 'rem';
        gameArea.appendChild(asteroid);

        i.remove();

        explosion.style.left = index.style.left;
        explosion.style.top = index.style.top;

        explosion.classList.remove('hide');

        setTimeout(() => {
          explosion.classList.add('hide');
        }, 20);
      }
    });
  });
};

const gamePlay = function () {
  const ship = document.querySelector('.ship');

  const space = gameArea.getBoundingClientRect();

  if (player.start) {
    moveAsteroids(ship);
    movePowerup(ship);
    moveBullets();

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

addEventListener('keydown', e => {
  if (bulletsNum) {
    if (e.code === 'Space') {
      const bullet = document.createElement('div');
      bullet.setAttribute('class', 'bullets');
      bullet.y = player.y;
      bullet.x = player.x;
      bullet.style.top = bullet.y + 'px';
      bullet.style.left = bullet.x + 71.6 + 'px';
      bullet.style.backgroundSize = `5rem 5rem`;
      gameArea.appendChild(bullet);

      bulletsNum -= 1;
    }
  }
});

document.addEventListener('keydown', keyDown);
document.addEventListener('keyup', keyUp);

setInterval(() => {
  for (x = 0; x < 2; x++) {
    const powerup = document.createElement('div');
    powerup.setAttribute('class', 'powerups');
    powerup.y = (x + 3) * 60 * -1;
    powerup.style.top = powerup.y + 'px';
    powerup.style.left = Math.floor(Math.random() * 90) + 'vw';
    const powerupBackgroundSize = 3;
    powerup.style.backgroundSize = `${powerupBackgroundSize}rem ${powerupBackgroundSize}rem`;
    powerup.style.width = powerupBackgroundSize + 'rem';
    powerup.style.height = powerupBackgroundSize + 'rem';
    gameArea.appendChild(powerup);
  }
}, 10000);
