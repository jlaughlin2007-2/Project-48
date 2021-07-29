var brokenCar,zombieHoard, zombieHazard;
var debrisPile, road, survivor;
var brokenCarImage,zombieHoardImage, zombieHazardImage;
var debrisPileImage, roadImage, survivorImage;
var lane1,lane2,lane3;
var hazardLane1,hazardLane2,hazardLane3;
var laneValue = 2;
var score;
var obstacle;
var gameState=1;
var obstaclesGroup;
function preload() {
roadImage=loadImage("Images/Static/Road.png");
debrisPileImage=loadImage("Images/Static/Debris-Pile.jpg");
brokenCarImage=loadImage("Images/Static/Broken-Car.png");

zombieHoardImage=loadAnimation("zombie1.png","zombie2.png","zombie3.png");
zombieHoardImage2=loadAnimation("zombie1.png","zombie2.png","zombie3.png");
zombieHoardImage3=loadAnimation("zombie1.png","zombie2.png","zombie3.png");
zombieHoardImage4=loadAnimation("zombie1.png","zombie2.png","zombie3.png");
zombieHoardImage5=loadAnimation("zombie1.png","zombie2.png","zombie3.png");

zombieHazardImage=loadAnimation("zombie1.png","zombie2.png","zombie3.png");
survivorImage=loadAnimation("Survivor1.png","Survivor2.png","Survivor3.png","Survivor4.png","Survivor5.png","Survivor6.png","Survivor7.png","Survivor8.png");
}

function setup() {
  createCanvas(1536,990);
  lane1=createSprite(638,120,0,0);
  lane2=createSprite(638,475,0,0);
  lane3=createSprite(638,820,0,0);
  hazardLane1=createSprite(1325,lane1.y,0,0);
  hazardLane2=createSprite(1325,lane2.y,0,0);
  hazardLane3=createSprite(1325,lane3.y,0,0);
  road=createSprite(768,475,1536,750);
  road.addImage(roadImage);
  road.scale=7.4;

  zombieHoard=createSprite(68, 110, 0, 0 );
  zombieHoard.addAnimation("movingZombieHoardImage",zombieHoardImage);
  zombieHoard.scale=0.8;
  zombieHoard=createSprite(68, 310, 0, 0 );
  zombieHoard.addAnimation("movingZombieHoardImage2",zombieHoardImage);
  zombieHoard.scale=0.8;
  zombieHoard=createSprite(68, 510, 0, 0 );
  zombieHoard.addAnimation("movingZombieHoardImage3",zombieHoardImage);
  zombieHoard.scale=0.8;
  zombieHoard=createSprite(68, 710, 0, 0 );
  zombieHoard.addAnimation("movingZombieHoardImage4",zombieHoardImage);
  zombieHoard.scale=0.8;
  zombieHoard=createSprite(68, 910, 0, 0 );
  zombieHoard.addAnimation("movingZombieHoardImage5",zombieHoardImage);
  zombieHoard.scale=0.8;

  survivor=createSprite(638,475, 0, 0);
  survivor.addAnimation("movingSurvivorImage",survivorImage);
  survivor.scale=1.5;
  console.log(survivor.x);
  console.log(survivor.y);
  console.log(lane2.x);
  console.log(lane2.y);
  console.log(laneValue);
  score = 0;



}

function draw() {
  background(0); 

  textSize(30);
  fill(255)
  text("SCORE : "+score,750,40);
 
 
  score=score+1;
  console.log(score);
  if(gameState===1){
    if(survivor.x===lane2.x && (survivor.y===lane2.y))
  {
  laneValue=2;
  }
  if(survivor.x===lane1.x &&(survivor.y===lane1.y))
  {
  laneValue=1;
  }
  if(survivor.x===lane3.x &&(survivor.y===lane3.y))
  {
  laneValue=3;
  }
 
  if(laneValue===2){
    if(keyDown("UP_ARROW")){
      survivor.x=lane1.x;
      survivor.y=lane1.y;
    }
    if(keyDown("DOWN_ARROW")){
      survivor.x=lane3.x;
      survivor.y=lane3.y;
    }
  }
    if(laneValue===1){
    if(keyDown("DOWN_ARROW")){
      survivor.x=lane2.x;
      survivor.y=lane2.y;
    }
  }
  if(laneValue===3){
    if(keyDown("UP_ARROW")){
      survivor.x=lane2.x;
      survivor.y=lane2.y;
    }
  }
    spawnObstacles();

  }
  if(obstaclesGroup.isTouching(survivor)){
    gameState = 2;
}
  if(gameState===2){
    obstaclesGroup.setVelocityXEach(0);
    obstaclesGroup.setLifetimeEach(-1);
  }  

  road.display();
  debrisPile.display();
  brokenCar.display();
  zombieHoard.display();
  zombieHazard.display();
  survivor.display();
  
  
  
  drawSprites();
}
function spawnObstacles() {
  if(score % 60 === 0) {
    
    var obstacle = createSprite(600,165,10,40);
    var laneNumber = Math.round(random(1,3))
    switch(rand){
      case 1:(obstacle.x=hazardLane1.x);
      (obstacle.y=hazardLane1.y);
      break;
      case 2:(obstacle.x=hazardLane2.x);
      (obstacle.y=hazardLane2.y);
      break;
      case 3:(obstacle.x=hazardLane3.x);
      (obstacle.y=hazardLane3.y);
      break;
    }
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + 3*score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,3));
    switch(rand) {
      case 1: obstacle.addImage(debrisPileImage);
              break;
      case 2: obstacle.addImage(brokenCarImage);
              break;
      case 3: obstacle.addAnimation("movingZombieHazardImage", zombieHazardImage);
              break;
  
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.7;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}