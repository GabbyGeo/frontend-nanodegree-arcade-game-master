// inheritance created to avoid repeating 
var character = function() {}

character.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = 'images/enemy-bug.png';

};

Enemy.prototype = Object.create(character.prototype);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;
    if (this.x > 600) {
        this.x = -110;
    }
};


// Draw the enemy on the screen, required method for game
/*Enemy.prototype.render = function() {
 ctx.drawImage(Resources.get(this.sprite),
  this.x,
  this.y);
};*/

Enemy.prototype.reset = function() {
    this.x = -100;
    this.y = 30 * this.row;
    this.row = Math.floor((Math.random() * 3) + 1);
    this.speed = Math.floor((Math.random() * 4) + 3);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


var Player = function() {
    this.x = 200;
    this.y = 390;
    this.speed = 30;
    this.sprite = 'images/char-princess-girl.png';
};

Player.prototype = Object.create(character.prototype);

Player.prototype.update = function(dt) {
    if (this.x > 450 || this.x < -80 || this.y > 440) {
        this.x = 200;
        this.y = 390;
    } else if (this.y < 0) {
        this.x = 200;
        this.y = 390;
    }
}

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    if (this.y < 10) {
        this.renderWin();
    }
}

Player.prototype.reset = function(x, y) {
    this.x = 200;
    this.y = 390;
}


Player.prototype.handleInput = function(keypress) {
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
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [new Enemy()];
for (var i = 0; i < 4; i++) {
    allEnemies.push(new Enemy(50, 25, 25), new Enemy(100, 50, 50), new Enemy(0, 150, 75));
};

var player = new Player(200, 400, 50);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if (enemy.x < player.x + 80 &&
            enemy.x + 80 > player.x &&
            enemy.y < player.y + 60 &&
            enemy.y + 60 > player.y) {
            console.log('COLLISION!');
            player.x = 200;
            player.y = 390;
        }
    });

    /*checkCollisions = function {
     ctx.fillText("COLLISION", 50, 300)
           
    }*/

    Player.prototype.renderWin = function() {
        ctx.font = "30px Roboto Slab";
        ctx.fillStyle = "black";
        ctx.fillText("Winner!  Refresh to Start Again", 50, 300);
    }
}
