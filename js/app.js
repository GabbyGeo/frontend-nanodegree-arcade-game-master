// inheritance created to avoid repeating 
var Character = function(x, y, sprite) {
    "use strict";
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

Character.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    "use strict";
    Character.call(this, x, y, 'images/enemy-bug.png');
    this.speed = speed;
};

Enemy.prototype = Object.create(Character.prototype);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks

//Function to detect for collisions between enemy and player
Enemy.prototype.checkCollisions = function() {
    "use strict";
    if (this.x < player.x + 80 &&
        this.x + 80 > player.x &&
        this.y < player.y + 60 &&
        this.y + 60 > player.y) {
        console.log('COLLISION!');
        player.x = 200;
        player.y = 390;
    }
};


Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    "use strict";
    this.x += this.speed * dt;
    if (this.x > 600) {
        this.x = -110;
    }
    this.checkCollisions();
};


// Draw the enemy on the screen, required method for game
/*Enemy.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite),
  this.x,
  this.y);
};*/

Enemy.prototype.reset = function() {
    "use strict";
    this.x = -100;
    this.y = 30 * this.row;
    this.row = Math.floor((Math.random() * 3) + 1);
    this.speed = Math.floor((Math.random() * 4) + 3);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function(x, y, speed) {
    Character.call(this, x, y, 'images/char-princess-girl.png');
    this.speed = 30;
};

Player.prototype = Object.create(Character.prototype);

Player.prototype.update = function(dt) {
    "use strict";
    if (this.x > 420 || this.x < -20 || this.y > 440) {
        this.x = 200;
        this.y = 390;
    } else if (this.y < 0) {
        this.x = 200;
        this.y = 390;
    }
};

Player.prototype.render = function() {
    "use strict";
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y < 10) {
        this.renderWin();
    }
};

Player.prototype.reset = function(x, y) {
    "use strict";
    this.x = 200;
    this.y = 390;
};


Player.prototype.handleInput = function(keypress) {
    "use strict";
    if (keypress == 'left') {
        this.x -= this.speed;
    }
    if (keypress == 'right') {
        this.x += this.speed;
    }
    if (keypress == 'up') {
        this.y -= this.speed;
    }
    if (keypress == 'down') {
        this.y += this.speed;
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy()];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy(50, 25, 25), new Enemy(100, 50, 50), new Enemy(0, 150, 75));
}

var player = new Player(200, 400, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    "use strict";
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

Player.prototype.renderWin = function() {
    "use strict";
    ctx.font = "30px Roboto Slab";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.fillText("Winner!", 250, 300);
};
