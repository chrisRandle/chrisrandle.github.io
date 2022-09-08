const myCanvas = document.getElementById('myCanvas');
const ctx = myCanvas.getContext('2d');

myCanvas.width = innerWidth;
myCanvas.height = innerHeight;

window.onresize = function(){
    myCanvas.width = innerWidth;
    myCanvas.height = innerHeight;
};

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

let Star = function () {
    this.myX = Math.random() * innerWidth;
    this.myY = Math.random() * innerHeight;
    this.myRed = 20;
    this.myGreen = 220;
    this.myBlue = 20;
    this.myAlpha = 0.4;
    this.myDigit = getRandomInt(2); // 0 or 1
};

let xMod = 0;
let yMod = 0;
let warpSpeed = 0;

document.onkeydown = function(event) {
    if (!event)
        event = KeyboardEvent;
    let code = event.code;
    if (event.key && code === '0')
        code = event.key;
    if (code === '32') {
        warpSpeed = 2;
    } else if (code === '37') {
        xMod < 6 ? xMod += 0.3 : xMod = 6;
    } else if (code === '38') {
        yMod < 6 ? yMod += 0.3 : yMod = 6;
    } else if (code === '39') {
        xMod > -6 ? xMod -= 0.3 : xMod = -6;
    } else if (code === '40') {
        yMod > -6 ? yMod -= 0.3 : yMod = -6;
    }
    event.preventDefault();
};
document.onkeyup = function(event) {
    if (!event)
        event = KeyboardEvent;
    let code = event.code;
    if (event.key && code === '0')
        code = event.key;
    if ( code === '32') {
        warpSpeed = 0;
    } else if (code === '37') {
        xMod = 0;
    } else if (code === '38') {
        yMod = 0;
    } else if (code === '39') {
        xMod = 0;
    } else if (code === '40') {
        yMod = 0;
    }
    event.preventDefault();
};
document.onmousedown = function(event) {
    warpSpeed = 1;
};
document.onmouseup = function(event) {
    warpSpeed = 0;
};
document.addEventListener('touchstart', function(event){
    event.preventDefault();
    warpSpeed = 1;
},false);
document.addEventListener('touchend', function(){
    warpSpeed = 0;
},false);

Star.prototype.updatePos = function(){
    let speedMult = 0.002; // Set initial digit speed
    if (warpSpeed) { speedMult = 0.008; }
    this.myX += xMod + (this.myX - (innerWidth/2)) * (speedMult);
    this.myY += yMod + (this.myY - (innerHeight/2)) * (speedMult);

    if (this.myX > innerWidth || this.myX < 0) {
        this.myX = Math.random() * innerWidth;
    }
    if (this.myY > innerHeight || this.myY < 0) {
        this.myY = Math.random() * innerHeight;
    }

};

const starField = [];
let starCounter = 0;

while (starCounter < 150) {
    const newStar = new Star;
    starField.push(newStar);
    starCounter++;
}

function init() {
    myCanvas.focus();
    window.requestAnimationFrame(draw);
}

function draw(event) {
    if (warpSpeed === 0) {
        ctx.fillStyle = "rgba(0,0,0,0.8)"; // Set Background back to Black
        ctx.fillRect(0,0,innerWidth,innerHeight);
        ctx.font = '15px Verdana';
    }
    for (var i = 0; i < starField.length; i++) {
        ctx.fillStyle = "rgba(" + starField[i].myRed + "," + starField[i].myGreen + "," + starField[i].myBlue + "," + starField[i].myAlpha + ")";
        // Make Dots ctx.fillRect(starField[i].myX,starField[i].myY,starField[i].myColor / 128,starField[i].myColor / 128);
        ctx.fillText(starField[i].myDigit,starField[i].myX,starField[i].myY)
        starField[i].updatePos();
    }
    window.requestAnimationFrame(draw);
}

init();