//Made the sticks move faster across the screen
//Takes longer for the beaver to hop and fall
//Added obstacles that move slightly faster which take away points
//Added more sticks to the array
var Beaver = function(x, y) {
    this.x = x;
    this.y = y;
    this.img = getImage("creatures/Hopper-Happy");
    this.sticks = 0;
};

Beaver.prototype.draw = function() {
    fill(255, 0, 0);
    this.y = constrain(this.y, 0, height-50);
    image(this.img, this.x, this.y, 40, 40);
};

Beaver.prototype.hop = function() {
    this.img = getImage("creatures/Hopper-Jumping");
    this.y -= 2;
};

Beaver.prototype.fall = function() {
    this.img = getImage("creatures/Hopper-Happy");
    this.y += 2;
};

Beaver.prototype.checkForHit = function(stick, obstacle) {
    if ((stick.x >= this.x && stick.x <= (this.x + 40)) &&
        (stick.y >= this.y && stick.y <= (this.y + 40))) {
        stick.y = -400;
        this.sticks++;
    }
    else if ((obstacle.x >= this.x && obstacle.x <= (this.x + 40)) &&
        (obstacle.y >= this.y && obstacle.y <= (this.y + 40))) {
        obstacle.y = -400;
        this.sticks--;
    }
};

var Stick = function(x, y) {
    this.x = x;
    this.y = y;
};

var Obstacle = function(x, y) {
    this.x = x;
    this.y = y;
};

Stick.prototype.draw = function() {
    fill(89, 71, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

Obstacle.prototype.draw = function() {
    fill(255, 0, 43);
    rectMode(CENTER);
    rect(this.x, this.y, 5, 40);
};

var beaver = new Beaver(200, 300);

var sticks = [];
for (var i = 0; i < 100; i++) {  
    sticks.push(new Stick(i * 40 + 300, random(20, 260)));
}

var obstacles = [];
for (var i = 0; i < 100; i++) {  
    obstacles.push(new Obstacle(i * 40 + 300, random(20, 260)));
}

var grassXs = [];
for (var i = 0; i < 25; i++) { 
    grassXs.push(i*20);
}

draw = function() {
    
    // static
    background(227, 254, 255);
    fill(130, 79, 43);
    rectMode(CORNER);
    rect(0, height*0.90, width, height*0.10);
    
    for (var i = 0; i < grassXs.length; i++) {
        image(getImage("cute/GrassBlock"), grassXs[i], height*0.85, 20, 20);
        grassXs[i] -= 1;
        if (grassXs[i] <= -20) {
            grassXs[i] = width;
        }
    }
    
    for (var i = 0; i < 100; i++) {
        sticks[i].draw();
        obstacles[i].draw();
        beaver.checkForHit(sticks[i], obstacles[i]);
        sticks[i].x -= 3.0;
        obstacles[i].x -= 3.1;
    }
    
    textSize(18);
    text("Score: " + beaver.sticks, 20, 30);
    
    if (beaver.sticks/sticks.length >= 0.95) {
        textSize(36);
        text("YOU WIN!!!!", 100, 200);
    }
    
    if (keyIsPressed && keyCode === 0) {
        beaver.hop();
    } else {
        beaver.fall();
    }
    beaver.draw();
};
