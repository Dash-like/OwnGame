var canvas, backgroundImage;
var losingPlayer = 0;
var carsAtEnd = 0;
var gameState = 0;
var playerCount;
var allPlayers;
var database;

var form, player, game;

var cars, car1, car2;

var lose_img, win_img, main_img;
var track, car1_img, car2_img, bullet_img, bullet2_img, bullet3_img, bullet4_img;
var score = 0;
var ele1, ele2, ele3, ele4, ele5, ele6, ele7, ele8;
var elements;
var crash_img, obstacle1_img, obstacle2_img;
var obstaclesGroup =[];
var endElement;
var otherBulletArr = [];
function preload(){
  track = loadImage("../images/track.jpg");
  car1_img = loadImage("../images/Car 1.png");
  car2_img = loadImage("../images/car 2.png");
  bullet_img = loadImage("../images/bullet.png");
  lose_img = loadImage("../images/Win.png");
  win_img = loadImage("../images/Lose.png");
  main_img = loadImage("../images/Main.jpg");

  crash_img = loadImage("../images/Crash Car.png");
  obstacle1_img = loadImage("../images/obstacle.png");
  obstacle2_img = loadImage("../images/obstacle-2.png");

  ground = loadImage("../images/ground.png");
}

function setup(){
  canvas = createCanvas(displayWidth - 20, displayHeight-30);
  database = firebase.database();
  game = new Game();
  game.getState();
  game.start();
}


function draw(){
  if(playerCount === 2 && gameState === 0){
    game.update(1);
  }
  if(gameState === 1){
    clear();
    game.play();
  }
  if(gameState === 2){
    game.end();
  }
}

