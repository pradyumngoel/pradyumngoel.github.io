let boy;
const Boy = class {
  constructor() {
    this.x = 50;
    this.y = height - 150;
    this.velocity = 0;
    this.gravity = 1.5;
  }

  jump() {
    if (this.y == height - 150) this.velocity = -30;
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

function preload() {
  boyImg = loadImage('img/boy.PNG');
  failImg = loadImage('img/fail.PNG');
  gameOverImg = loadImage('img/game_over.PNG');
}

function setup() {
  createCanvas(innerWidth, innerHeight);
  boy = new Boy();

  let failTimer = random(800) + 700;
  setInterval(() => {
    fails.push(new Fail());
    failTimer = random(700) + 500;
  }, failTimer);
}

function keyPressed() {
  if (key == ' ') {
    boy.jump();
  }
}

function mouseClicked() {
  boy.jump();
}

function draw() {
  background(30);
  boy.show();
  boy.move();

  for (let f of fails) {
    f.move();
    f.show();

    if (boy.hits(f)) {
      image(gameOverImg, innerWidth / 2 - 125, innerHeight / 4, 250, 250);
      noLoop();
    }
  }
}
