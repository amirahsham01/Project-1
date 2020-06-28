var test = "oi what";
console.log(test);

//frames per second
const FPS = 30;

//setting game loop
window.requestAnimationFrame = window.requestAnimationFrame
    || function(f){return setTimeout(f, 1000/FPS)}

window.cancelAnimationFrame = window.cancelAnimationFrame
    || function(requestID){clearTimeout(requestID)}


// //setup canvas
let gameCanvas = document.querySelector("#game-canvas");
let gameCtx = gameCanvas.getContext('2d');

//putting key codes into an array so we can add and remove easily
const keys = [];

//ship properties
const turningSpeed = 360;
const spaceshipThrust = 5;
const ship = {
    x: 300,
    y: 310,
    width: 120,
    height: 120,
    frameX: 0,
    frameY: 3,
    speed: 5,
    moving: false,
};

//drawing our images
const shipSprite = new Image();
shipSprite.src = "falcon-sprite-01.png";
// const background = new Image();
// background.src = "...";

function drawSprite(img, sX, sY, sW, sH, dX, dY, dW, dH) {
    gameCtx.drawImage(img, sX, sY, sW, sH, dX, dY, dW, dH);
}

function animate() {
    gameCtx.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
    drawSprite(shipSprite, ship.width * ship.frameX, ship.height * ship.frameY, ship.width, ship.height, ship.x, ship.y, ship.width, ship.height);
    moveShip();
    requestAnimationFrame(animate);
}
animate();

// setup event listeners
window.addEventListener("keydown", function(e) {
    keys[e.keyCode] = true;
});

window.addEventListener("keyup", function(e) {
    delete keys[e.keyCode];
});

//move ship
function moveShip() {
    if (keys[38] && ship.y > 0) {
        ship.y -= ship.speed;
        ship.frameY = 3;
    }
    if (keys[37] && ship.x > 0) {
        ship.x -= ship.speed;
        ship.frameY = 1;
    }
    if (keys[40] && ship.y <= gameCanvas.height - ship.height) {
        ship.y += ship.speed;
        ship.frameY = 0;
    }
    if (keys[39] && ship.x <= gameCanvas.width - ship.width) {
        ship.x += ship.speed;
        ship.frameY = 2;
    }
}