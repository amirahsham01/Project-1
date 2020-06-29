//define variables and properties of ship, enemy and bullets
let ship = {
    left: 320,
    top: 400,
};

//store bullets drawn in array for easy removal
let bullets = [];

//total enemies
let enemies = [
    { left: 90, top: 0 },
    { left: 160, top: 0 },
    { left: 230, top: 0 },
    { left: 300, top: 0 },
    { left: 370, top: 0 },
    { left: 440, top: 0 },
    { left: 510, top: 0 },
    { left: 580, top: 0 },
    { left: 90, top: 75 },
    { left: 160, top: 75 },
    { left: 230, top: 75 },
    { left: 300, top: 75 },
    { left: 370, top: 75 },
    { left: 440, top: 75 },
    { left: 510, top: 75 },
    { left: 580, top: 75 },
];

//function to call when player press keys
document.onkeydown = function(e) {
    if (e.keyCode === 37) {
        // Left
        ship.left = ship.left - 10;
    }
    if (e.keyCode === 39) {
        // Right
        ship.left = ship.left + 10;
    }
    if (e.keyCode === 32) {
        // Spacebar (fire)
        bullets.push({
            left: ship.left + 20,
            top: ship.top - 20 
        });
        drawLasers()
    }
    drawShip();
}

//getting main objects to display at specified position
function drawShip() {
    document.getElementById('ship').style.left = ship.left + 'px';
    document.getElementById('ship').style.top = ship.top + 'px';
}

function drawLasers() {
    document.getElementById('laser-bullets').innerHTML = ""
    for(var i = 0 ; i < bullets.length ; i++ ) {
        document.getElementById('laser-bullets').innerHTML += `<div class='bullet1' style='left:${bullets[i].left}px; top:${bullets[i].top}px'></div>`;
    }
}

function drawEnemies() {
    document.getElementById('enemies').innerHTML = ""
    for(var i = 0 ; i < enemies.length ; i++ ) {
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
    }
}

//get lasers shot to be instantanouesly moving
function moveLasers() {
    for(var i = 0 ; i < bullets.length ; i++ ) {
        bullets[i].top = bullets[i].top - 8
    }
}

//get enemies to fly downwards from top of screen
function moveEnemies() {
    for(var i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + 1;
    }
}

//remove enemies when succesfully shot by player
function collisionDetection() {
    for (var enemy = 0; enemy < enemies.length; enemy++) {
        for (var bullet = 0; bullet < bullets.length; bullet++) {
            if ( 
                bullets[bullet].left >= enemies[enemy].left  &&
                bullets[bullet].left <= (enemies[enemy].left + 50)  &&
                bullets[bullet].top <= (enemies[enemy].top + 50)  &&
                bullets[bullet].top >= enemies[enemy].top
            ) {
                enemies.splice(enemy, 1);
                bullets.splice(bullet, 1);
            }
        }
    }
}

//setting game loop
function gameLoop() {
    setTimeout(gameLoop, 100)
    moveLasers();
    drawLasers();
    moveEnemies();
    drawEnemies();
    collisionDetection();
}
gameLoop();