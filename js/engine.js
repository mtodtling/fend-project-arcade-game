var Engine = (function(global) {
    var doc = global.document,
        win = global.window,
        canvas = doc.createElement('canvas'),
        ctx = canvas.getContext('2d'),
        lastTime;

    canvas.width = 505;
    canvas.height = 606;
    doc.body.appendChild(canvas);

    function init() {
        reset();
        lastTime = Date.now();
        main();
    }
	
    function main() { //the kickoff point for the game loop itself
        var now = Date.now(),
            dt = (now - lastTime) / 1000.0;

        update(dt);
        render();

        lastTime = now;

        win.requestAnimationFrame(main); //call main again as soon as the browser is able to draw another frame
    }

    function update(dt) {
        updateEntities(dt);
        checkCollisions(); 
    }

    function updateEntities(dt) { //updates properties related to the objects
        allEnemies.forEach(function(enemy) {
            enemy.update(dt);
        });
        player.update();
    }
	//This function was added to the page using ES5 instead of ES6 since the rest of the code was written in ES5. 
	function checkCollisions() {
        allEnemies.forEach(function(enemy) {
            if ((Math.abs(enemy.x - player.x) <= 80) && (Math.abs(enemy.y - player.y) <= 30)) { //Checks if enemy and player are in the same area
				alert("The bug got you this time! Be careful!");
				player.reset(player.x,player.y);
			}
        });
    }

    function render() { //draws the game
        var rowImages = [
                'images/water-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/stone-block.png',
                'images/grass-block.png',
                'images/grass-block.png'
            ],
            numRows = 6,
            numCols = 5,
            row, col;
        
        ctx.clearRect(0,0,canvas.width,canvas.height)

        for (row = 0; row < numRows; row++) {
            for (col = 0; col < numCols; col++) {
                ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
            }
        }

        renderEntities();
    }
    
    function renderEntities() {
        allEnemies.forEach(function(enemy) {
            enemy.render(); 
        });

        player.render();
    }

    function reset() {
        // handles game reset states - maybe a new game menu or a game over screen
    }

    Resources.load([
        'images/stone-block.png',
        'images/water-block.png',
        'images/grass-block.png',
        'images/enemy-bug.png',
        'images/char-pink-girl.png'
    ]);
    Resources.onReady(init); //when all of these images are properly loaded our game will start

    global.ctx = ctx; //for convenience of using it in app.js file
})(this);
