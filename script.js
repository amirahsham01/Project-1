
//audio repository
let main = new Audio('audio/main.mp3');
let blaster = new Audio('audio/blaster.mp3');
document.getElementById('play').addEventListener('click', function() {
    main.play();
    main.loop = true;
});
document.getElementById('pause').addEventListener('click', function() {
    main.pause();
});

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

let enemiesTwo = [
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

//player score
let score = 0;

//putting key codes into an array so we can add and remove easily
const keys = [];

document.addEventListener("keydown", function(e) {
    if((e) == 32 || 37 || 39) {
        keys[e.keyCode] = true;
    }
});

document.addEventListener("keyup", function(e) {
    if((e) == 32 || 37 || 39) {
            delete keys[e.keyCode];
        }
});

function controlShip() {
    if (keys[37] && ship.left >= 0) {
        ship.left -= 12;
    }
    if (keys[39] && ship.left <= 620) {
        ship.left += 12;
    }
    if (keys[32]) {
        bullets.push({
            left: ship.left + 37,
            top: ship.top - 20 
        });
        blaster.play();
        drawLasers();
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

function drawEnemiesLevelTwo() {
    if(enemies.length == 0) {
        document.getElementById('enemies').innerHTML = "";
        for(let i = 0 ; i < enemiesTwo.length ; i++ ) {
            document.getElementById('enemies').innerHTML += `<div class='enemy' style='left:${enemiesTwo[i].left}px; top:${enemiesTwo[i].top}px'></div>`;
        }
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

function moveEnemiesLevelTwo() {
    if(enemies.length == 0) {
        for(let i = 0 ; i < enemiesTwo.length ; i++ ) {
            enemiesTwo[i].top = enemiesTwo[i].top + 2;
    
            if (enemiesTwo[i].top >= 400) {
                alert("You lost");
                break;
            }
        }
    }
}


//remove enemies when succesfully shot by player 
// or when reaching edges of container
function wallCollision() {
    for (let bullet = 0; bullet < bullets.length; bullet++) {
        if (bullets[bullet].top <= 10) {
            bullets.splice(bullet, 1);
        }
    }
}

function collisionDetection() {
    for (let enemy = 0; enemy < enemies.length; enemy++) {
        for (let bullet = 0; bullet < bullets.length; bullet++) {
            if ( 
                bullets[bullet].left >= enemies[enemy].left  &&
                bullets[bullet].left <= (enemies[enemy].left + 50)  &&
                bullets[bullet].top <= (enemies[enemy].top + 50)  &&
                bullets[bullet].top >= enemies[enemy].top
            ) {
                score += 10;
                enemies.splice(enemy, 1);
                bullets.splice(bullet, 1);
            }
        }
    }
}

function collisionDetectionLevelTwo() {
    if(enemies.length == 0) {

        for (let enemy = 0; enemy < enemiesTwo.length; enemy++) {
            for (let bullet = 0; bullet < bullets.length; bullet++) {
                if ( 
                    bullets[bullet].left >= enemiesTwo[enemy].left  &&
                    bullets[bullet].left <= (enemiesTwo[enemy].left + 50)  &&
                    bullets[bullet].top <= (enemiesTwo[enemy].top + 50)  &&
                    bullets[bullet].top >= enemiesTwo[enemy].top
                ) {
                    score += 10;
                    enemiesTwo.splice(enemy, 1);
                    bullets.splice(bullet, 1);
                }
            }
        }
    }
}

//displaying score
function displayScore() {
    document.querySelector("#player-name").textContent = `${enterName.value} ${score}`;
}

//setting game loop
function gameLoop() {
    setTimeout(gameLoop, 90)
    controlShip();
    moveLasers();
    drawLasers();
    wallCollision();
    moveEnemies();
    moveEnemiesLevelTwo();
    drawEnemies();
    drawEnemiesLevelTwo();
    collisionDetection();
    collisionDetectionLevelTwo();
}

function updateScore() {
    setInterval(updateScore, 4000)
    displayScore();
}

//when player enters name, input field is hidden
//start button shows and name is appended to game screen
const clickStart = document.querySelector("#click");
const enterName = document.querySelector("#enter-name");

enterName.addEventListener('change', () => {
    if (clickStart.style.display = "none") {
        clickStart.style.display = "block";
    }
    if (enterName.style.display = "block") {
        enterName.style.display = "none";
    }
    let playerName = enterName.value;
    document.querySelector("#player-name").textContent = playerName + " " + 0;
    console.log(playerName);
});

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

clickStart.addEventListener('click', () => {
    start();
    gameLoop();
    updateScore();
});
