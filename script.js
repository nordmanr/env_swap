var CANVAS;
var CTX;
var W,H;
var UNIT_SIZE;
var ENVIROMENT=[];
var CHARACTER;
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

    CHARACTER = new Rectangle(W*.5-UNIT_SIZE*.5, H*.5-UNIT_SIZE*.5, UNIT_SIZE, UNIT_SIZE);
    CHARACTER.color = "red";
    CHARACTER.verticalVelocity = 0;

    ENVIROMENT.acceleration = UNIT_SIZE*FALL_RATE;
    ENVIROMENT.color = "grey";

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
    var drawElement = CHARACTER.toInsertableArray();
    CTX.beginPath();
    for(var i=0; i<drawElement.points.length; i++) {
        if (i == 0) {
            CTX.moveTo(drawElement.points[0].x, drawElement.points[0].y);
        } else {
            CTX.lineTo(drawElement.points[i].x, drawElement.points[i].y);
        }
    }
    CTX.closePath();
    CTX.fill();
}

function clearScreen() {
    CTX.clearRect(0, 0, W, H);
}

function drawEnv() {
    var drawElement;

    for (var i=0; i<ENVIROMENT.length; i++) {
        drawElement = ENVIROMENT[i].toInsertableArray();

        CTX.fillStyle = drawElement.color;
        CTX.beginPath();
        for(var j=0; j<drawElement.points.length; j++) {
            if (j == 0) {
                CTX.moveTo(drawElement.points[0].x, drawElement.points[0].y);
            } else {
                CTX.lineTo(drawElement.points[j].x, drawElement.points[j].y);
            }
        }
        CTX.closePath();
        CTX.fill();
    }
}

//// !---
function checkCollision(a, b) {
    /*if (a.type == "RECT" && b.type == "RECT") {
        return (a.p1x < b.p2x && a.p2x > b.p1x && a.p1y < b.p4y && a.p4y > b.p1y);
    } else if (a.type == "RECT" && b.type == "TRI") {
        return true;
    }*/
}


function checkAndReactToCharacterCollision(){
    /*for (var i=0; i<ENVIROMENT.length; i++) {
        if (checkCollision(CHARACTER, ENVIROMENT[i])) {
            switch (ENVIROMENT[i].reaction) {
                case "PUSH UP":
                    CHARACTER.p3y = ENVIROMENT[i].p1y;
                    CHARACTER.p4y = ENVIROMENT[i].p1y;
                    CHARACTER.p1y = ENVIROMENT[i].p1y - CHARACTER.height;
                    CHARACTER.p2y = ENVIROMENT[i].p1y - CHARACTER.height;
                    CHARACTER.speed = 0;
                    break;
                case "PUSH DOWN":
                    CHARACTER.p1y = ENVIROMENT[i].p3y;
                    CHARACTER.p2y = ENVIROMENT[i].p3y;
                    CHARACTER.p3y = ENVIROMENT[i].p3y + CHARACTER.height;
                    CHARACTER.p4y = ENVIROMENT[i].p3y + CHARACTER.height;
                    CHARACTER.speed = 0;
                    break;
                case "BOUNCE UP":
                    CHARACTER.p3y = ENVIROMENT[i].p1y;
                    CHARACTER.p4y = ENVIROMENT[i].p1y;
                    CHARACTER.p1y = ENVIROMENT[i].p1y - CHARACTER.height;
                    CHARACTER.p2y = ENVIROMENT[i].p1y - CHARACTER.height;
                    CHARACTER.speed *= -.9;
                    break;
                case "BOUNCE DOWN":
                    CHARACTER.p1y = ENVIROMENT[i].p3y;
                    CHARACTER.p2y = ENVIROMENT[i].p3y;
                    CHARACTER.p3y = ENVIROMENT[i].p3y + CHARACTER.height;
                    CHARACTER.p4y = ENVIROMENT[i].p3y + CHARACTER.height;
                    CHARACTER.speed *= -.9;
                    break;
            }
        }else{
            
        }
    }*/
}//// !---


function doOneFrame(){
    var element;

    clearScreen();

    // Move enviroment to the right - making it seem like you are going right
    for (var i=0; i<ENVIROMENT.length; i++) {
        element = ENVIROMENT[i];
        element.move();
    }

    // Character should be effected by gravity
    CHARACTER.increaseVerticalVelocity(ENVIROMENT.acceleration);
    CHARACTER.move();
    //checkAndReactToCharacterCollision();

    
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