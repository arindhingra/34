const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var canvas;
var palyer, playerBase, playerArcher;
var ball = [];
var basket1, basket2;
var numberOfArrows = 10;

var score = 0;

function preload() {
  backgroundImg = loadImage("./assets/background1.jpeg");
}

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);

  engine = Engine.create();
  world = engine.world;

  playerBase = new PlayerBase(300, 500, 180, 150);
  player = new Player(285, playerBase.body.position.y - 153, 50, 180);
  playerArcher = new PlayerArcher(
    340,
    playerBase.body.position.y - 180,
    70,
    70
  );

  basket1 = new Basket(width - 300, 75, 150, 150);
  basket2 = new Basket(width - 100, height - 300, 150, 150);
}

function draw() {
  background(backgroundImg);

  Engine.update(engine);

  playerBase.display();
  player.display();
  playerArcher.display();
  playerArcher.scale = 0.1;

  basket1.display();
  basket2.display();


  for (var i = 0; i < ball.length; i++) {
    if (ball[i] !== undefined) {
      ball[i].display();

      var basket1Collision = Matter.SAT.collides(
        basket1.body,
        ball[i].body
      );

      var basket2Collision = Matter.SAT.collides(
        basket2.body,
       ball[i].body
      );

      /*if1Collision || bo2Collision) {
        score += 5;
      }*/

      /*if (bard1Collision.collided && boCollision.collided) {
        score += 5;
      }*/

      if (basket1Collision.collided || basket2Collision.collided) {
        score += 5;
        Matter.World.remove(world, ball);
      
      }

      /*if (bard1Collision.collided || bord2Collision.collided) {
        score = 5;
      }*/

      
      var posX = ball[i].body.position.x;
      var posY = ball[i].body.position.y;

      
   
        
        
      
    
    }
  }

  // Title
  fill("#FFFF");
  textAlign("center");
  textSize(40);
  text("EPIC ARCHERY", width / 2, 100);

  // Score
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Score " + score, width - 200, 100);

  // Arrow Count
  fill("#FFFF");
  textAlign("center");
  textSize(30);
  text("Remaining Arrows : " + numberOfArrows, 200, 100);

  /*if (numberOfArrows == 5) {
    gameOver();
  }*/

if (numberOfArrows == 0) {
    gameOver();
}

  /*if (numberOfArrows = 0) {
    gameOver();
  }*/

  /*if (numberOfArrows == 0) {
    gameOver;
  }*/

}

function keyPressed() {
  if (keyCode === 32) {
    if (numberOfArrows > 0) {
      var posX = playerArcher.body.position.x;
      var posY = playerArcher.body.position.y;
      var angle = playerArcher.body.angle;

      var arrow = new Ball(posX, posY, 70, 70, angle);

      arrow.trajectory = [];
      Matter.Body.setAngle(arrow.body, angle);
      ball.push(arrow);
      numberOfArrows -= 1;
    }
  }
}

function keyReleased() {
  if (keyCode === 32) {
    if (ball.length) {
      var angle = playerArcher.body.angle;
      ball[ball.length - 1].shoot(angle);
    }
  }
}

function gameOver() {
  swal(
    {
      title: `Game Over!!!`,
      text: "Thanks for playing!!",
      imageUrl:
        "https://raw.githubusercontent.com/vishalgaddam873/PiratesInvision/main/assets/basket.png",
      imageSize: "150x150",
      confirmButtonText: "Play Again"
    },
    function(isConfirm) {
      if (isConfirm) {
        location.reload();
      }
    }
  );
}




