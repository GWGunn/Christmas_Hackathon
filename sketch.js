var snowflakes = []

function preload() {
 
 myBackground = loadImage("Image/Background.png")
 santa = loadImage("Image/Santa.png")
}

function setup() {
  createCanvas(360,640);
  
  //Deal with microphone
  mic = new p5.AudioIn();
  mic.start();
}

function draw() {
  fill(255)
  
  var volume = mic.getLevel();
  
  //If the volume is not enought, re-map it (set a higher newMax).
  var newMax = 5;
  volume = map(volume,0,1,0,newMax);
  
  background(myBackground);
  rect()
  push();  //Start with transformations
  translate(width/2,height/5*3);
  var y = map(volume,0,1,width/5,width/2);
  image(santa,-125,-y);
  pop();
  
  
  if(true){
    var amount= map(volume,0,1,0,5);
    for(i=1; i <= amount; i++) {
      var obj = {
        x: random(0,1),
        y: random(0,-height/10),
        size: random(1, amount+2)
      }
      //add snowflake to the array of snowflakes
      snowflakes.push(obj);
    }
  }
  for(var i=0; i< snowflakes.length; i++) {
    var fallingSpeed = 1;
    
    // Increase the single snowflake vertical position
    snowflakes[i].y += fallingSpeed + snowflakes[i].y*0.006; // the last piece needs to simulate gravity
    
    // Create a new ellipse using the x and y properties of the snowflake object
    fill(235,235,188)
    push()
    rotate(45)
    translate(0,-360)
    noStroke();
    fill(255);
    ellipse(snowflakes[i].x*height, snowflakes[i].y, snowflakes[i].size);
    pop()
  }
   
   for (var i=snowflakes.length-1; i>= 0; i--){
    if (snowflakes[i].y > height){
      snowflakes.splice(i,1);
    }
   }
}
  