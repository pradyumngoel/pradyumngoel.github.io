let boy;
const Boy = class {
  constructor() {
    this.x = 50;
    this.y = height - 150;
    this.velocity = 0;
    this.gravity = 1.5;
    this.lives = 3;
    this.score = 0;
    this.bombs = 3;
  }

  jump() {
    if (this.y == height - 150) {
      this.velocity = -30;
      this.score++;
    }
  }

  move() {
    this.y += this.velocity;
    this.velocity += this.gravity;
    this.y = constrain(this.y, 0, height - 150);
  }

  hits(obj) {
    return collideRectRect(this.x, this.y, 110, 150, obj.x, obj.y, 100, 100);
  }

  show() {
    image(boyImg, this.x, this.y, 110, 150);
  }
};

let fail;
let failSpeed = 10;
const Fail = class {
  constructor() {
    this.x = width;
    this.y = height - 100;
  }

  move() {
    this.x -= failSpeed;
  }

  show() {
    image(failImg, this.x, this.y, 100, 100);
  }
};

setInterval(() => {
  failSpeed++;
}, 30000);

let fails = [];

let boyImg;
let failImg;
let gameOverImg;
let bombImg;

let gameFont;

function preload() {
  boyImg = loadImage('img/boy.PNG');
  failImg = loadImage('img/fail.PNG');
  gameOverImg = loadImage('img/game_over.PNG');
  bombImg = loadImage('img/bomb.PNG');

  gameFont = loadFont('PressStart2P-Regular.ttf');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  boy = new Boy();

  let failTimer = random(800) + 700;
  setInterval(() => {
    fails.push(new Fail());
    failTimer = random(700) + 500;
  }, failTimer);

  setInterval(() => {
    boy.bombs++;
  }, 60000);
}

function keyPressed() {
  if (key == ' ') {
    boy.jump();
  }

  if (key == 'b') {
    if (boy.bombs != 0) {
      boy.bombs--;
      fails = [];
    }
  }
}

function mousePressed() {
  boy.jump();
}

function mouseClicked() {
  if (dist(mouseX, mouseY, width - 70, 20) < 50) {
    if (boy.bombs != 0) {
      fails = [];
      boy.bombs--;
    }
  }
}

function draw() {
  background(30);
  boy.show();
  boy.move();

  fill(255);

  textSize(30);
  textFont(gameFont);
  text(`Score: ${boy.score}  Lives: ${boy.lives}`, width / 2, height / 5);
  textAlign(CENTER);

  textSize(40);
  textFont(gameFont);
  text(`Bombs: ${boy.bombs}`, 190, 70);
  textAlign(CENTER);

  image(bombImg, width - 70, 20, 50, 50);

  for (let f of fails) {
    f.move();
    f.show();

    if (boy.hits(f)) {
      if (boy.lives == 0) {
        image(gameOverImg, innerWidth / 2 - 125, innerHeight / 4, 250, 250);
        noLoop();
      } else {
        fails = [];
        boy.bombs = 3;
        boy.lives--;
      }
    }
  }
}
