var test = "oi what";
console.log(test);

//frames per second
const FPS = 30;

//setup canvas
let gameCanvas = document.querySelector("#game-canvas");
let gameCtx = gameCanvas.getContext('2d');

//create ship
let shipSize = 30;
let ship = {
    x: gameCanvas.width/2,
    y: gameCanvas.height/2,
    r: shipSize/2,
    a: 90/180 * Math.PI //convert to radians
}


//setting game loop
setInterval(update, 1000 / FPS);

function update() {
    //draw space
    gameCtx.fillStyle = "black";
    gameCtx.fillRect(0, 0, gameCanvas.width, gameCanvas.height);

    //draw ship - starting with a triangle first
    gameCtx.strokeStyle = "white",
    gameCtx.lineWidth = shipSize/20;
    gameCtx.beginPath();
    gameCtx.moveTo( //tip of triangle
        ship.x + ship.r * Math.cos(ship.a),
        ship.y - ship.r * Math.sin(ship.a)
    )
    gameCtx.lineTo( //left line
        ship.x - ship.r * (Math.cos(ship.a) + Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) - Math.cos(ship.a))
    )
    gameCtx.lineTo( //right line
        ship.x - ship.r * (Math.cos(ship.a) - Math.sin(ship.a)),
        ship.y + ship.r * (Math.sin(ship.a) + Math.cos(ship.a))
    )
    gameCtx.closePath();
    gameCtx.stroke();

    //rotate ship


    //move the ship



}

