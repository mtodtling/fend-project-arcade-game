class Enemy {
  constructor(x, y, sprite, speed) {
    this.sprite = 'images/enemy-bug.png'; // Loads the image
    this.x = x; //Sets the Enemy initial location
	this.y = y;
    this.speed = Math.floor(Math.random() * 6) + 1; //Randomizes the Enemy speed; https://stackoverflow.com/questions/4959975/generate-random-number-between-two-numbers-in-javascript
  }
  
  update(dt) { //Parameter: dt, a time delta between ticks; updates the Enemy location & speed
    if (this.x >= 505) {
      this.x = -100;
	  this.speed = Math.floor(Math.random() * 6) + 1;
    } else {
      this.x += 100 * this.speed * dt;
	}
  }
  
  render() { // Draws the Enemy on the screen
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
} 

class Player {
  constructor(x, y, sprite) {
    this.sprite = 'images/char-pink-girl.png';
    this.x = x;
	this.y = y;
	this.INITIAL_X = 202;
	this.INITIAL_Y = 405;
  }
  
  update() { //Handles game won
	if (this.y <= 0) {
	  alert ("You've reached the water. Good job!");
	  this.reset(this.INITIAL_X,this.INITIAL_Y);
    }
  }
  
  reset(x,y) { //Resets the player to the initial location
    this.x = this.INITIAL_X;
	this.y = this.INITIAL_Y;
  }
  
  render() {
	ctx.drawImage(Resources.get(this.sprite), this.x, this.y); 
  }

  handleInput(key) { //Receives user input and moves the player according to that input
	switch (key) { //If statements keep the player inside the field
	  case 'left':
		if (this.x >= 100) {
	      this.x -= 100;
		};
	    break;
	  case 'up':
	    this.y -= 83;
		break;
	  case 'right':
	    if (this.x < 400) {
	      this.x += 100;
	    };
		break;
	  case 'down':
	    if (this.y < 400) {
	      this.y += 83;
	    }
	}
  }
}

const player = new Player(202, 405); //Instantiates the player

const allEnemies = [ //Instantiates the enemies
  new Enemy (-100,60),
  new Enemy (-100,145),
  new Enemy (-100,230),
];
  
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
