var test = "oi what";
console.log(test);

//frames per second
const FPS = 20;

//setting game loop
window.requestAnimationFrame = window.requestAnimationFrame
    || function(f){return setTimeout(f, 1000/FPS)}

window.cancelAnimationFrame = window.cancelAnimationFrame
    || function(requestID){clearTimeout(requestID)}

// keyCodes = {
//     32: 'space',
//     37: 'left',
//     38: 'up',
//     39: 'right',
//     40: 'down',
// }

//setup canvas
let gameCanvas = document.querySelector("#game-canvas");
let gameCtx = gameCanvas.getContext('2d');
let battleCanvas = document.querySelector("#battle-canvas");
let battleCtx = battleCanvas.getContext('2d');

//putting key codes into an array so we can add and remove easily
const keys = [];


//ship properties
let ship = {
    x: 300,
    y: 310,
    width: 120,
    height: 120,
    frameX: 0,
    frameY: 3,
    speed: 5,
    health: 5,
    moving: false,
    disableShoot: true,
    alive: true
}

let score = 0;
let kills = 0;

//bullet properties
let bullet = {
    x: 0,
    y: 0,
    width: 4,
    height: 14,
    speed: 16,
}

let bulletPool = [];
let maxBullets = 10;

//enemy ship properties
let enemyShip = {
    x: 300,
    y: 310,
    width: 120,
    height: 120,
    frameX: 0,
    frameY: 3,
    speed: 2,
    health: 2
}

let enemies = [];
let maxEnemies = 12;


//image repository
const shipSprite = new Image();
shipSprite.src = "falcon-sprite-01.png";
const background = new Image();
background.src = "space-bg-2.png";
let laserBullet = new Image();
laserBullet.src = "bullet.png"
const enemyBullet = new Image();
enemyBullet.src = "enemy-bullet.png";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    gameCtx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

// setup event listeners
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
    if((e) == 38 || 37 || 40 || 39) {
            delete keys[e.keyCode];
        } else if ((e) == 32) {
            disableShoot = false;
        }
});

//move ship
function moveShip() {
    if (keys[38] && ship.y > 0) {
        ship.y -= ship.speed;
        ship.frameY = 3;
        ship.moving = true;
    }
    if (keys[37] && ship.x > 0) {
        ship.x -= ship.speed;
        ship.frameY = 1;
        ship.moving = true;
    }
    if (keys[40] && ship.y <= gameCanvas.height - ship.height) {
        ship.y += ship.speed;
        ship.frameY = 0;
        ship.moving = true;
    }
    if (keys[39] && ship.x <= gameCanvas.width - ship.width) {
        ship.x += ship.speed;
        ship.frameY = 2;
        ship.moving = true;
    }
}

//function to draw bullets
//indicate conditional for reload distance
//indicate bullet position for every ship frame
//include loop to splice bullet in bulletpool array once it goes offscreen
function enableShoot() {
    if(keys[32]) {
        disableShoot = true;
        shoot();
    }
}

function shoot() {
    if(ship.alive && bulletPool.length < maxBullets) {
        //indicate conditional for bullet position with ship position
        bullet.x = ship.x + 57;
        bullet.y = ship.y - 10;
        battleCtx.drawImage(laserBullet, bullet.x, bullet.y, bullet.width, bullet.height);
}
}

function animate() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    gameCtx.drawImage(background, 0, 0, gameCanvas.width, gameCanvas.height);
    drawSprite(shipSprite, ship.width * ship.frameX, ship.height * ship.frameY, ship.width, ship.height, ship.x, ship.y, ship.width, ship.height);
    moveShip();
    enableShoot();
    requestAnimationFrame(animate);
}
animate();
