let ship;
let bullets = [];
let asteroids = [];

const Ship = class {
  constructor() {
    this.width = 100;
    this.height = 100;
    this.x = width / 2 - this.width / 2;
    this.y = height - this.height - 10;
  }

  show() {
    image(shipImg, this.x, this.y, this.width, this.height);
  }

  move() {
    this.x = constrain(this.x, 0, width - this.width);
    this.y = constrain(this.y, 0, height - this.height);

    if (keys.up) {
      this.y -= 10;
    }
    if (keys.down) {
      this.y += 10;
    }
    if (keys.left) {
      this.x -= 10;
    }
    if (keys.right) {
      this.x += 10;
    }
  }
};

let keys = { up: false, down: false, left: false, right: false };
let button;

let score;
let scoreEl;

let bulletsNum;
let bulletsNumEl;

let bulletPacks = [];

let gameOver;

function setup() {
  createCanvas(innerWidth, innerHeight);
  ship = new Ship();
  gameOver = true;

  score = 0;
  scoreEl = createP(`Score: ${score}`);
  scoreEl.position(10, -40);
  scoreEl.style("color: white; font-size: 4vw; font-family: 'Odibee Sans'");

  bulletsNum = 10;
  bulletsNumEl = createP(`Bullets Left: ${bulletsNum}`);
  bulletsNumEl.position(10, 15);
  bulletsNumEl.style(
    "color: white; font-size: 4vw; font-family: 'Odibee Sans'"
  );

  setInterval(() => {
    if (!gameOver) {
      let size = 50;
      bulletPacks.push({
        x: Math.floor(random(width - size)),
        y: 0 - size,
        width: size,
        height: size,
      });
      bulletPacks.push({
        x: Math.floor(random(width - size)),
        y: 0 - size,
        width: size,
        height: size,
      });
    }
  }, 10000);

  setInterval(() => {
    if (!gameOver) {
      let size = random(50) + 50;
      asteroids.push({
        x: Math.floor(random(width - size)),
        y: 0 - size,
        width: size,
        height: size,
      });
    }
  }, 500);

  button = createButton(`Play!`);
  button.style(
    "color: black; background-color: white; border-radius: 10; font-size: 5vw; font-family: 'Odibee Sans'; border-width: 10px"
  );
  button.position(width / 2 - 100, height / 2 - 50);
  button.size(200, 100);

  button.mouseClicked(start);
}

let shipImg;
let bulletImg;
let asteroidImg;
let spaceImg;
let bulletPackImg;
function preload() {
  shipImg = loadImage('imgs/ship.PNG');
  bulletImg = loadImage('imgs/bullet.PNG');
  asteroidImg = loadImage('imgs/asteroid.PNG');
  spaceImg = loadImage('imgs/space.gif');
  bulletPackImg = loadImage('imgs/bullet_pack.PNG');
}

function start() {
  gameOver = false;
  score = 0;
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    keys.up = true;
  }
  if (keyCode === DOWN_ARROW) {
    keys.down = true;
  }
  if (keyCode === LEFT_ARROW) {
    keys.left = true;
  }
  if (keyCode === RIGHT_ARROW) {
    keys.right = true;
  }
  if (key === ' ') {
    if (bulletsNum > 0) {
      bullets.push({ x: ship.x + ship.width / 2 - 10 / 2, y: ship.y });
      bulletsNum--;
    }
  }
}

function keyReleased() {
  if (keyCode === UP_ARROW) {
    keys.up = false;
  }
  if (keyCode === DOWN_ARROW) {
    keys.down = false;
  }
  if (keyCode === LEFT_ARROW) {
    keys.left = false;
  }
  if (keyCode === RIGHT_ARROW) {
    keys.right = false;
  }
}

function draw() {
  background(spaceImg);

  if (!gameOver) {
    score++;
    scoreEl.html(`Score: ${score}`);

    bulletsNumEl.html(`Bullets Left: ${bulletsNum}`);

    button.style('display: none');
  } else {
    button.style('display: block');
  }

  if (!gameOver) {
    bullets.forEach((bullet, i) => {
      image(bulletImg, bullet.x, bullet.y, 10, 30);
      bullet.y -= 10;

      if (bullet.y < 0) {
        bullets.splice(i, 1);
      }

      asteroids.forEach((asteroid, i2) => {
        if (
          collideRectRect(
            bullet.x,
            bullet.y,
            10,
            30,
            asteroid.x,
            asteroid.y,
            asteroid.width,
            asteroid.height
          )
        ) {
          asteroids.splice(i2, 1);
          bullets.splice(i, 1);

          score += 100;
        }
      });
    });

    asteroids.forEach((asteroid, i) => {
      image(
        asteroidImg,
        asteroid.x,
        asteroid.y,
        asteroid.width,
        asteroid.height
      );
      asteroid.y += 4;

      if (asteroid.y > height) {
        asteroids.splice(i, 1);
      }

      if (
        collideRectRect(
          asteroid.x,
          asteroid.y,
          asteroid.width,
          asteroid.height,
          ship.x,
          ship.y,
          ship.width,
          ship.height
        )
      ) {
        gameOver = true;
        asteroids = [];
        bullets = [];
        bulletPacks = [];

        bulletsNum = 10;
      }
    });

    bulletPacks.forEach((pack, i) => {
      image(bulletPackImg, pack.x, pack.y, pack.width, pack.height);
      pack.y += 5;

      if (pack.y > height) {
        bulletPacks.splice(i, 1);
      }

      if (
        collideRectRect(
          pack.x,
          pack.y,
          pack.width,
          pack.height,
          ship.x,
          ship.y,
          ship.width,
          ship.height
        )
      ) {
        bulletPacks.splice(i, 1);
        bulletsNum += 10;
      }
    });

    ship.show();
    ship.move();
  }
}
