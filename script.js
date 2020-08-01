var CANVAS;
var CTX;
var W,H;
var UNIT_SIZE;
var ENVIROMENT=[];
var CHARACTER=[];
var FALL_RATE=.03;
var MOVE_RATE=.2;
var FPS=60;
var MAINLOOP;
var ALTERNATE=[];


function init() {
    // Setup global vars
    CANVAS = document.getElementById("canvas");
    CTX = canvas.getContext("2d");
    ENVIROMENT=[];
    CHARACTER=[];

    ALTERNATE.bouncy=true;
    FALL_RATE=.03;
    MOVE_RATE=.2;

    var side = window.innerHeight > window.innerWidth ? window.innerWidth : window.innerHeight;
    side = side*.9;
    W = side;
    H = side;
    UNIT_SIZE = .05*side;
    CANVAS.width = W;
    CANVAS.height = H;

    CHARACTER.type = "RECT"
    CHARACTER.left = W*.5-UNIT_SIZE*.5;
    CHARACTER.top = H*.5-UNIT_SIZE*.5;
    CHARACTER.height = UNIT_SIZE;
    CHARACTER.width = UNIT_SIZE;
    CHARACTER.color = "red";
    CHARACTER.speed = 0;

    ENVIROMENT.acceleration = UNIT_SIZE*FALL_RATE;

    loadLevel1();
    
    if (MAINLOOP != null) {
        window.clearInterval(MAINLOOP);
    }
    MAINLOOP = window.setInterval(doOneFrame, 1000/FPS);
}

function playButtonClicked() {
    init();
}

function drawCharacter() {
    CTX.fillStyle = CHARACTER.color;
    CTX.fillRect(CHARACTER.left, CHARACTER.top, CHARACTER.width, CHARACTER.height);
}

function clearScreen() {
    CTX.clearRect(0, 0, W, H);
}

function drawEnv() {
    CTX.fillStyle = ENVIROMENT.color;
    for (var i=0; i<ENVIROMENT.length; i++) {
        CTX.fillStyle = ENVIROMENT[i].color;
        switch (ENVIROMENT[i].type) {
            case "RECT":
                CTX.fillRect(ENVIROMENT[i].left, ENVIROMENT[i].top, ENVIROMENT[i].width, ENVIROMENT[i].height);
                break;
            case "TRI":
                CTX.beginPath();
                CTX.moveTo(ENVIROMENT[i].p1x, ENVIROMENT[i].p1y);
                CTX.lineTo(ENVIROMENT[i].p2x, ENVIROMENT[i].p2y);
                CTX.lineTo(ENVIROMENT[i].p3x, ENVIROMENT[i].p3y);
                CTX.closePath();
                CTX.fill();
        }
    }
}

function checkCollision(a, b) {
    if (a.type == "RECT" && b.type == "RECT") {
        return (a.left < b.left+b.width && a.left+a.width > b.left && a.top < b.top+b.height && a.top+a.height > b.top);
    }
}


function checkAndReactToCharacterCollision(){
    for (var i=0; i<ENVIROMENT.length; i++) {
        if (checkCollision(CHARACTER, ENVIROMENT[i])) {
            switch (ENVIROMENT[i].reaction) {
                case "PUSH UP":
                    CHARACTER.top = ENVIROMENT[i].top - CHARACTER.height;
                    CHARACTER.speed = 0;
                    break;
                case "PUSH DOWN":
                    CHARACTER.top = ENVIROMENT[i].top + ENVIROMENT[i].height;
                    CHARACTER.speed = 0;
                    break;
                case "BOUNCE UP":
                    CHARACTER.top = ENVIROMENT[i].top - CHARACTER.height;
                    CHARACTER.speed *= -.9;
                    break;
                case "BOUNCE DOWN":
                    CHARACTER.top = ENVIROMENT[i].top + ENVIROMENT[i].height;
                    CHARACTER.speed *= -.9;
                    break;
            }
        }else{
            
        }
    }
}

function doOneFrame(){
    clearScreen();

    // Move enviroment to the right - making it seem like you are going right
    for (var i=0; i<ENVIROMENT.length; i++) {
        if (ENVIROMENT[i].move) {
            switch (ENVIROMENT[i].type) {
                case "RECT":
                    ENVIROMENT[i].left -= UNIT_SIZE*MOVE_RATE;
                    break;
                case "TRI":
                    ENVIROMENT[i].p1x -= UNIT_SIZE*MOVE_RATE;
                    ENVIROMENT[i].p2x -= UNIT_SIZE*MOVE_RATE;
                    ENVIROMENT[i].p3x -= UNIT_SIZE*MOVE_RATE;
                    break;
            }
            
        }
    }

    // Character should be effected by gravity
    CHARACTER.speed += ENVIROMENT.acceleration;
    CHARACTER.top += CHARACTER.speed;
    checkAndReactToCharacterCollision();

    
    // Draw updated screen
    drawEnv();
    // Draw character too
    drawCharacter();
}

function keyPress(button){
    switch (button) {
        case 'bouncy':
            for (var i=0; i<ENVIROMENT.length; i++) {
                if (ALTERNATE.bouncy){
                    ENVIROMENT[i].color = "magenta";
                    ENVIROMENT[i].reaction = ENVIROMENT[i].reaction.replace("PUSH", "BOUNCE")
                } else {
                    ENVIROMENT[i].color = "gray";
                    ENVIROMENT[i].reaction = ENVIROMENT[i].reaction.replace("BOUNCE", "PUSH")
                }
            }
            ALTERNATE.bouncy = !ALTERNATE.bouncy;
            break;
        case 'fast': // fast enviroment
            MOVE_RATE += .1;
            MOVE_RATE = MOVE_RATE>.4 ? .4 : MOVE_RATE;
            break;
        case 'slow': // slow enviroment
            MOVE_RATE -= .1;
            MOVE_RATE = MOVE_RATE<0 ? 0 : MOVE_RATE;
            break;
        case 'gravity': // alternate gravity
            ENVIROMENT.acceleration *= -1;
            break;
    }
}

document.onkeydown = function(e) {
    //alert(e.keyCode);

    var keys = {
        70: 'fast', // f
        71: 'gravity', // g
        74: 'bouncy', // j
        83: 'slow' // s
    };
    if (typeof keys[e.keyCode] != 'undefined') {
        keyPress(keys[e.keyCode]);
    }
};