class Spaceship {

  constructor(){
    this.velocity = new createVector(0, 0);
    this.location = new createVector(width/2, height/2);
    this.acceleration = new createVector(0, 0);
    this.maxVelocity = 5;
    this.bulletSys = new BulletSystem();
    this.size = 50;
  }

  run(){
    this.bulletSys.run();
    this.draw();
    this.move();
    this.edges();
    this.interaction();
  }

  // draw the ship as well as a triangle hitbox aroound the ship
  draw(){
    fill(0,0,0,0);
    triangle(this.location.x - this.size/2, this.location.y + this.size/2,
        this.location.x + this.size/2, this.location.y + this.size/2,
        this.location.x, this.location.y - this.size/2);
      // draw starShip
      image(starShip, this.location.x, this.location.y);
  }

  move(){ 
      this.velocity.add(this.acceleration);
      this.location.add(this.velocity);
      this.acceleration.mult(0);
      this.acceleration.limit(this.maxVelocity);
    
  }

  applyForce(f){
    this.acceleration.add(f);
  }

  interaction(){
      if (keyIsDown(LEFT_ARROW)){
        this.applyForce(createVector(-0.1, 0));
      }
      if (keyIsDown(RIGHT_ARROW)){
        this.applyForce(createVector(0.1, 0));
      }
      if (keyIsDown(UP_ARROW)){
        this.applyForce(createVector(0, -0.1));
      }
      if (keyIsDown(DOWN_ARROW)){
        this.applyForce(createVector(0, 0.1));
      }
  }

  fire(){
    this.bulletSys.fire(this.location.x, this.location.y);
  }

  edges(){
    if (this.location.x<0) this.location.x=width;
    else if (this.location.x>width) this.location.x = 0;
    else if (this.location.y<0) this.location.y = height;
    else if (this.location.y>height) this.location.y = 0;
  }
    
    /* The gravity well and friction where making the game near
    unplayable, so I have shelved it for now*/

//  setNearEarth(){
//    var gravity = new createVector(0, 0.05);
//    this.applyForce(gravity);  
//    var friction = this.velocity.copy();
//    friction.mult(-1);
//    friction.normalize();
//    friction.mult(0.03);
//    this.applyForce(friction);  
//  }
    
}
