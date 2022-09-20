var spaceship;
var asteroids;
var atmosphereLoc;
var atmosphereSize;
var earthLoc;
var earthSize;
var gameScore = 0;
var starLocs = [];
var starShip;
var asteroid;

//////////////////////////////////////////////////
function preload(){
     starShip = loadImage('assets/newShip.png');
     asteroid = loadImage('assets/asteroid.png');
}


function setup() {
    // lines up the images and the drawn invisible shapes
  imageMode(CENTER);
  createCanvas(1200,800);
  spaceship = new Spaceship();
  asteroids = new AsteroidSystem();

  //location and size of earth and its atmosphere
  atmosphereLoc = new createVector(width/2, height*2.9);
  atmosphereSize = new createVector(width*3, width*3);
  earthLoc = new createVector(width/2, height*3.1);
  earthSize = new createVector(width*3, width*3);   
}

//////////////////////////////////////////////////
function draw() {
  background(0);
  sky();
  spaceship.run();
  asteroids.run();
  // keeps track of how many asteroids were destroyed
  asteroids.score(gameScore);
  drawEarth();
  checkCollisions(spaceship, asteroids); // function that checks collision between various elements
    
}


//////////////////////////////////////////////////
//draws earth and atmosphere
function drawEarth(){
  noStroke();
  //draw atmosphere
  fill(0,0,255, 50);
  ellipse(atmosphereLoc.x, atmosphereLoc.y, atmosphereSize.x,  atmosphereSize.y);
  //draw earth
  fill(105, 129, 231);
  ellipse(earthLoc.x, earthLoc.y, earthSize.x, earthSize.y);
}

//////////////////////////////////////////////////
//checks collisions between all types of bodies
function checkCollisions(spaceship, asteroids){    
    for(var i = 0; i < asteroids.locations.length; i++){ 
        
            //spaceship-2-asteroid collisions
            if(isInside(spaceship.location, spaceship.size / 1.24, asteroids.locations[i], asteroids.diams[i])){
                gameOver();
            }
        
            //asteroid-2-earth collisions
            if(isInside(earthLoc, earthSize.x, asteroids.locations[i], asteroids.diams[i])){
                gameOver();
            }
             
            //spaceship-2-earth
            if(isInside(spaceship.location, spaceship.size, earthLoc, earthSize.x)){
                 gameOver();
             } 
        
        /* The gravity well and friction where making the game near
    unplayable, so I have shelved it for now*/
        
//            //spaceship-2-atmosphere
//            if(isInside(spaceship.location, spaceship.size, atmosphereLoc, atmosphereSize.x)){
//                spaceship.setNearEarth();
//            }
//            
            

            // Loop to check if asteroids have been hit by bullets
            var destroyed = false;
            for(var j = 0; j < spaceship.bulletSys.bullets.length; j++) 
                    { if(isInside(asteroids.locations[i], asteroids.diams[i],          spaceship.bulletSys.bullets[j], spaceship.bulletSys.diam)){
                                console.log(asteroids[i]);
                                destroyed = true;
                                spaceship.bulletSys.bullets.splice(j, 1);
                        }
                    }
                if(destroyed == true){
                    asteroids.destroy(i);
                    gameScore += 1;
                }       
            }
    };
        

//////////////////////////////////////////////////
//helper function checking if there's collision between object A and object B
function isInside(locA, sizeA, locB, sizeB){
    // YOUR CODE HERE (3-5 lines approx)
    var d = dist(locA.x, locA.y, locB.x, locB.y);
    if(d < sizeA / 2 + sizeB / 2){
        return true;
    }
    return false;   
}

//////////////////////////////////////////////////
function keyPressed(){
  if (keyIsPressed && keyCode === 32){ // if spacebar is pressed, fire!
    spaceship.fire();
  }
}

//////////////////////////////////////////////////
// function that ends the game by stopping the loops and displaying "Game Over"
function gameOver(){
  fill(255);
  textSize(80);
  textAlign(CENTER);
  text("GAME OVER", width/2, height/2)
  noLoop();
}

//////////////////////////////////////////////////
// function that creates a star lit sky
function sky(){
  push();
  while (starLocs.length<300){
    starLocs.push(new createVector(random(width), random(height)));
  }
  fill(255);
  for (var i=0; i<starLocs.length; i++){
    rect(starLocs[i].x, starLocs[i].y,2,2);
  }

  if (random(1)<0.3) starLocs.splice(int(random(starLocs.length)),1);
  pop();
}
