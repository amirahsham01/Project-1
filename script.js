var test = "oi what";
console.log(test);

//frames per second
const FPS = 30;

//setup canvas
let gameCanvas = document.querySelector("#game-canvas");
let gameCtx = gameCanvas.getContext('2d');

//create ship
const turningSpeed = 270; //degrees per second
// const friction = 0.7;
const shipSize = 30; //size in pixels
const shipThrust = 5; //5 pixels forward/backwards when moving up and down
let ship = {
    x: gameCanvas.width/2,
    y: gameCanvas.height/2,
    r: shipSize/2,
    a: 90/180 * Math.PI, //convert to radians
    rotate: 0,
    forwards: false,
    front: {
        x: 0,
        y: 0
    },
    backwards: false,
    back: {
        x: 0,
        y: 0
    }

}

//setup event listeners
document.addEventListener("keydown", keyDown);
document.addEventListener("keyup", keyUp);

//setting game loop
setInterval(update, 1000 / FPS);

//all 'dem functions
function keyDown(e) {
    switch(e.keyCode) {
        case 37: //left arrow to rotate ship
            ship.rotate = turningSpeed/180 * Math.PI/FPS //convert to radians
            break;
        case 38: //up arrow to move up
            ship.forwards = true;
            break;
        case 40: //down arrow to move down
            ship.backwards = true;
            break;
        case 39: //right arrow to rotate ship
            ship.rotate = -turningSpeed/180 * Math.PI/FPS
            break;
    }
}

function keyUp(e) {
    switch(e.keyCode) {
        case 37: //stop from rotating
            ship.rotate = 0;
            break;
        case 38:
            ship.forwards = false;
            break;
        case 40:
            ship.backwards = false;
            break;
        case 39:
            ship.rotate = 0;
            break;
    }
}

function update() {
    //draw space
    gameCtx.fillStyle = "black";
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    //thrusting the ship forward
    if(ship.forwards) {
        ship.front.x += shipThrust * Math.cos(ship.a)/FPS;
        ship.front.y -= shipThrust * Math.sin(ship.a)/FPS;
    } else {
        ship.front.x -= ship.front.x/FPS;
        ship.front.y -= ship.front.y/FPS;
    }

    //moving backwards
    if(ship.backwards) {
        ship.back.x -= shipThrust * Math.cos(ship.a)/FPS;
        ship.back.y += shipThrust * Math.sin(ship.a)/FPS;
    } else {
        ship.back.x -= ship.back.x/FPS;
        ship.back.y -= ship.back.y/FPS;
    }
    

    //draw ship - starting with a triangle first
    gameCtx.strokeStyle = "white",
    gameCtx.lineWidth = shipSize/20;
    gameCtx.beginPath();
    gameCtx.moveTo( //tip of triangle
        ship.x + 4/3 * ship.r * Math.cos(ship.a),
        ship.y - 4/3 * ship.r * Math.sin(ship.a)
    );
    gameCtx.lineTo( //left line
        ship.x - ship.r * (2/3 * Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (2/3 * Math.sin(ship.a) - Math.cos(ship.a))
    )
    gameCtx.lineTo( //right line
        ship.x - ship.r * (2/3 * Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (2/3 * Math.sin(ship.a) + Math.cos(ship.a))
    )
    gameCtx.closePath();
    gameCtx.stroke();

    //rotate ship
    ship.a += ship.rotate;

    //move the ship
    ship.x += ship.front.x;
    ship.y += ship.front.y;
    ship.x += ship.back.x;
    ship.y += ship.back.y;
    
    //ensure ship does not move off the screen
    if (ship.x <= 30) {
        ship.x = 30;
    } else if (ship.x >= gameCanvas.width - shipSize) {
        ship.x = gameCanvas.width - shipSize; 
    }
    if (ship.y < 30) {
        ship.y = 30;
    } else if (ship.y >= gameCanvas.height - shipSize) {
        ship.y = gameCanvas.height - shipSize; 
    }

}