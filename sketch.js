let cupcake,
  ball,
  bat,
  wallN,
  wallE,
  wallS,
  wallW,
  score = 0;
let batX = 50;
let batY = 300;
let bb, bbImg, abat, abatImg;
let monster, cupcakeImg,
  monsterImg,
    endMonster,
  blinkAni,
  blinkArray = [],
  runAni = [],
  total = 0;
let wall,
  wallGroup,
  cupcakeGroup,
  bgColor = [],
  restAni = [];

function preload() {
  // static image
  bbImg = loadImage("images/mixer.png");
  abatImg = loadImage("images/dough roller.png");
  monsterImg = loadImage("images/blinkAni/blink__005.png");
  cupcakeImg = loadImage("images/cupcake.png");
  //preloading blink animation
  for (let i = 0; i < 8; i++) {
    blinkArray[i] = loadImage("images/blinkAni/blink__00" + i + ".png");
  }
  //preload run animation
  for (let i = 0; i < 16; i++) {
    runAni[i] = loadImage("images/monsterRun/run__00" + i + ".png");
  }
  for (let i = 0; i < 12; i++) {
    restAni[i] = loadImage("images/restAni/rest__00" + i + ".png");
  }
}

function setup() {
  createCanvas(500, 800);
  bgColor = [random(255), random(255), random(255)];

  textAlign(CENTER);
  
  bb = new Sprite(width / 3, height / 2, 700, 500);
  bb.img = bbImg;
  bb.scale = 0.1;
  bb.rotationSpeed = 7;
  bb.velocity.y = -15;
  bb.bounciness = 0.9;

  abat = new Sprite(width / 4, height / 4, 2300, 250);
  abat.img = abatImg;
  abat.scale = 0.06;
  abat.vel.y = 20;
  abat.bounciness = 0.5;

  endMonster = new Sprite(-250, 350);
    monsterEnd = endMonster.addAnimation(
    "end",
    restAni[0],
    restAni[1],
    restAni[2],
    restAni[3],
    restAni[4],
    blinkArray[2],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[5],
    blinkArray[6],
    restAni[5],
    restAni[5],
    restAni[5],
    restAni[5],
    restAni[6],
    restAni[6],
    restAni[7],
    restAni[7],
    restAni[7],
    restAni[8],
    restAni[8],
    restAni[8],
    restAni[9],
    restAni[9],
    restAni[9],
    restAni[10],
    restAni[10],
    restAni[10],
    restAni[11],
    restAni[11],
    restAni[11] 
    );
  endMonster.scale = 0.4;
  
  monster = new Sprite(400, 225, 300, 375);
  monsterRun = monster.addAnimation(
    "run",
    runAni[0],
    runAni[1],
    runAni[2],
    runAni[3],
    runAni[4],
    runAni[5],
    runAni[6],
    runAni[7],
    runAni[8],
    runAni[9],
    runAni[10],
    runAni[11],
    runAni[12],
    runAni[13],
    runAni[14],
    runAni[15]
  );
  monsterRest = monster.addAnimation(
    "rest",
    restAni[0],
    restAni[1],
    restAni[2],
    restAni[3],
    restAni[4],
    blinkArray[2],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[5],
    blinkArray[6],
    restAni[5],
    restAni[5],
    restAni[5],
    restAni[5],
    restAni[6],
    restAni[6],
    restAni[7],
    restAni[7],
    restAni[7],
    restAni[8],
    restAni[8],
    restAni[8],
    restAni[9],
    restAni[9],
    restAni[9],
    restAni[10],
    restAni[10],
    restAni[10],
    restAni[11],
    restAni[11],
    restAni[11]
  );
  chillAni = monster.addAnimation("chill", blinkArray[2]);
  flyAni = monster.addAnimation("fly", runAni[8], runAni[9]);
  landAni = monster.addAnimation(
    "land",
    runAni[3],
    runAni[3],
    runAni[3],
    runAni[3],
    runAni[3],
    runAni[2]
  );
  hurtAni = monster.addAnimation(
    "hurt",
    blinkArray[1],
    blinkArray[2],
    blinkArray[3],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4],
    blinkArray[5],
    blinkArray[6],
    blinkArray[7]
  );
  tiredAni = monster.addAnimation(
    "tired",
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[3],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4],
    blinkArray[4]
  );
  blinkAni = monster.addAnimation(
    "blink",
    blinkArray[0],
    blinkArray[0],
    blinkArray[0],
    blinkArray[0],
    blinkArray[0],
    blinkArray[0],
    blinkArray[0],
    blinkArray[0],
    blinkArray[1],
    blinkArray[2],
    blinkArray[3],
    blinkArray[4],
    blinkArray[5],
    blinkArray[6],
    blinkArray[7]
  );
  monster.scale = 0.2;

  // Create Walls
  wallGroup = new Group();
  for (let i = 0; i < 4; i++) {
     //top
    if (i === 0) {
      wall = new Sprite(width / 2, 5, width, 10);
       //left
    } else if (i === 1) {
      wall = new Sprite(5, height / 2, 10, height);
      //bottom
    } else if (i === 2) {
      wall = new Sprite(width / 2, height - 5, width, 10);
       //right
    } else if (i === 3) {
      wall = new Sprite(width - 5, height / 2, 10, height);
    }
    wall.color = "white";
    wall.collider = "static";
    wallGroup.add(wall);
  }

  // Create Sprites and addImage cupcakes
  cupcakeGroup = new Group();
  for (let i = 0; i <= 22; i++) {
    cupcake = new Sprite(random(width), random(height), 400, 600);
    // billy.collider = 'static';// squares dont move
    // billy.friction = 10;
    cupcake.addImage(cupcakeImg); // add cupcakeImg
    cupcakeGroup.add(cupcake);
  }
  cupcakeGroup.scale = 0.05;
  cupcakeGroup.rotationSpeed = 1;


  // tools to see the collider
  // monster.debug = true;
  // bb.debug = true;
  // abat.debug = true;
  // billyGroup.debug = true;
}

function draw() {
  background(bgColor);
  push();
  fill(0);
  textSize(25);
  textStyle(BOLD);
  text("Cupcake Monster", width / 2, 40);
  textSize(20);
  text("Score: " + score, width / 2, 60);
  textSize(15);
  // stroke("white");
  strokeWeight(2);
  text('Click Screen to Start ', 250, 750)
  text('Use arrows to move the Monster', 250, 765)
  text('Collect squares without getting hit by the bat', 250, 780)
  pop();
  noStroke();
  abat.rotationSpeed = 5;
  monster.rotation = 0;

  // Bat Doinks Hurt
  if (monster.colliding(abat)) {
    monster.changeAnimation("hurt");
    score = 0;
    monster.scale = 0.2;

  }

  // remove the squares that collide
  for (let i = 0; i < cupcakeGroup.length; i++) {
    let collideCheck = cupcakeGroup[i];
    if (monster.colliding(collideCheck)) {
      // Remove the collided sprite from the group
      collideCheck.remove();
      monster.scale += 0.0025;
      score += 1;
      total += 1;
    }
  }
  
  // Game Over Screen
  if (total === 20) {
    abat.remove();
    bb.remove();
    monster.mirror.x = true;
    monster.changeAnimation("rest");
    push();
    stroke("white");
    strokeWeight(10);
    textSize(40);
    text("GAME OVER", width / 2, height / 2);
    pop();
    monster.remove()
    endMonster.pos = {x: 250, y: 225};
    endMonster.rotation = false;
    
  }
}

// function colorChange() {
//   bgColor = [random(255), random(255), random(255)];
// }

function mousePressed() {
  abat.moveTo(mouse, 4);
}

function keyPressed() {
  // see the key pressed in the console
  console.log(keyCode);

  // PLAYER MOVEMENT
  // move up
  if (keyCode === 38) {
    monster.direction = 270;
    monster.speed = 6;
    monster.mirror.x = true;
    // monster.vel.x = 3;
    monster.changeAnimation("fly");
    // move right
  } else if (keyCode === 39) {
    monster.mirror.x = true;
    monster.vel.x = 5;
    monster.changeAnimation("run");
    // move down
  } else if (keyCode === 40) {
    monster.direction = 90;
    monster.speed = 5;
    monster.mirror.x = true;
    monster.changeAnimation("land");
    // move left
  } else if (keyCode === 37) {
    monster.mirror.x = false;
    monster.vel.x = -5;
    monster.changeAnimation("run");
    // esc - teleport
  } else if (keyCode === 27) {
    monster.position.x = batX;
    monster.position.y = batY;
    monster.speed = 0;
  }
}
