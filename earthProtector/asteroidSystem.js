class AsteroidSystem {

  //creates arrays to store each asteroid's data
  constructor(){
    this.locations = [];
    this.velocities = [];
    this.accelerations = [];
    this.diams = [];
    this.spawnRate = 0.01;
  }

  run(){
      this.spawn();
      this.move();
      this.draw();
  }

  // spawns asteroid at random intervals
  spawn(){
    if (random(1)<this.spawnRate){
      this.accelerations.push(new createVector(0,random(0.1,1)));
      this.velocities.push(new createVector(0, 0));
      this.locations.push(new createVector(random(width), 0));
      this.diams.push(random(30,50));
    }
    // spawn asteroids faster as time increases
    if(frameCount % 100 == 0){
        this.spawnRate += 0.001;
    }
  }

  //moves all asteroids
  move(){
    for (var i=0; i<this.locations.length; i++){
      this.velocities[i].add(this.accelerations[i]);
      this.locations[i].add(this.velocities[i]);
      this.accelerations[i].mult(0);
    }
  }

  applyForce(f){
    for (var i=0; i<this.locations.length; i++){
      this.accelerations[i].add(f);
    }
  }

  //draws all asteroids
  draw(){
    noStroke();
    /* draws the ellipese hitboxes invisible and the asteroid image */
    fill(0 , 0, 0, 0);
    for (var i=0; i<this.locations.length; i++){
            // ellipse hitbox
            ellipse(this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);
            // image of asteroids
            image(asteroid, this.locations[i].x, this.locations[i].y, this.diams[i], this.diams[i]);            
    }
  }

  //function that calculates effect of gravity on each asteroid and accelerates it
  calcGravity(centerOfMass){
    for (var i=0; i<this.locations.length; i++){
      var gravity = p5.Vector.sub(centerOfMass, this.locations[i]);
      gravity.normalize();
      gravity.mult(0.05);
      this.applyForce(gravity);
    }
  }
    
  score(gameScore){
      textSize(32);
      fill(255, 0, 0);
      text("Score: " + gameScore, 20, 40);
  }

  //destroys all data associated with each asteroid
  destroy(index){
    this.locations.splice(index,1);
    this.velocities.splice(index,1);
    this.accelerations.splice(index,1);
    this.diams.splice(index,1);
  }
}
