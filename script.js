//define variables and properties of ship, enemy and bullets
let ship = {
    left: 320,
    top: 400,
};

//store bullets drawn in array for easy removal
let bullets = [];

//total enemies
let enemies = [
    { left: 125, top: 30 },
    { left: 185, top: 30 },
    { left: 245, top: 30 },
    { left: 305, top: 30 },
    { left: 365, top: 30 },
    { left: 425, top: 30 },
    { left: 485, top: 30 },
    { left: 545, top: 30 },
    { left: 125, top: 85 },
    { left: 185, top: 85 },
    { left: 245, top: 85 },
    { left: 305, top: 85 },
    { left: 365, top: 85 },
    { left: 425, top: 85 },
    { left: 485, top: 85 },
    { left: 545, top: 85 },
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
            left: ship.left + 37,
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
    for(let i = 0 ; i < bullets.length ; i++ ) {
        document.getElementById('laser-bullets').innerHTML += `<div class='bullet1' style='left:${bullets[i].left}px; top:${bullets[i].top}px'></div>`;
    }
}

function drawEnemies() {
    document.getElementById('enemies').innerHTML = ""
    for(let i = 0 ; i < enemies.length ; i++ ) {
        document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemies[i].left}px; top:${enemies[i].top}px'></div>`;
    }
}

//get lasers shot to be instantanouesly moving
function moveLasers() {
    for(let i = 0 ; i < bullets.length ; i++ ) {
        bullets[i].top = bullets[i].top - 8;
    }
}

//get enemies to fly downwards from top of screen
function moveEnemies() {
    for(let i = 0 ; i < enemies.length ; i++ ) {
        enemies[i].top = enemies[i].top + 1;

        if (enemies[i].top >= 400) {
            alert("You lost");
            break;
        }
    }
}

//remove enemies when succesfully shot by player 
// or when reaching edges of container
function collisionDetection() {
    for (let enemy = 0; enemy < enemies.length; enemy++) {
        for (let bullet = 0; bullet < bullets.length; bullet++) {
            if ( 
                bullets[bullet].left >= enemies[enemy].left  &&
                bullets[bullet].left <= (enemies[enemy].left + 50)  &&
                bullets[bullet].top <= (enemies[enemy].top + 50)  &&
                bullets[bullet].top >= enemies[enemy].top
            ) {
                enemies.splice(enemy, 1);
                bullets.splice(bullet, 1);
            }
            if (bullets[bullet].top <= 10) {
                bullets.splice(bullet, 1);
            }
            // if (enemies[enemy].top >= 450) {
            //     alert("You lost");
            //     break;
            // }
        }
    }
}

//setting game loop
function gameLoop() {
    setTimeout(gameLoop, 90)
    moveLasers();
    drawLasers();
    moveEnemies();
    drawEnemies();
    collisionDetection();
}

//hide start button
//change display of #background to block
const startButton = document.querySelector("#start");
const game = document.querySelector("#background");

function start() {
    if (startButton.style.display = "block") {
        startButton.style.display = "none";
    } else 
    if (startButton.style.display = "none") {
        startButton.style.display = "block";
    }

    if (game.style.display = "none") {
        game.style.display = "block";
    } else 
    if (game.style.display = "block") {
        game.style.display = "none";
    }
}

document.querySelector("#click").addEventListener('click', () => {
    start();
    gameLoop();
});