'use strict';

console.log("Week 1 Web Animation");

var canvas = document.getElementById('drawingCanvas');
var ctx = canvas.getContext('2d'); //Use Canvas API
var lastPos = {
    x: 0,
    y: 0
};

var colorChosen = document.querySelector(".color");
var transparency = document.querySelector(".trans");
var thickness = document.querySelector(".thicc");
var eraserBtn = document.querySelector(".eraser");

var isDrawing = false;
var eraser = false;

//boxes
function shapeDemo() {
    ctx.fillStyle = "#ff0000";
    ctx.fillRect(100, 50, 45, 45);
    ctx.fillStyle = "rgba(0, 255, 0, 0.5";
    ctx.fillRect(120, 70, 45, 45);

    //lines 
    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.lineTo(800, 0);
    ctx.stroke();

    ctx.strokeStyle = "blue";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.moveTo(400, 300);
    ctx.lineTo(0, 0);
    ctx.stroke();

    //Circle
    ctx.beginPath();
    ctx.fillStyle = "orange";
    ctx.arc(400, 300, 100, 0, 6.28);
    ctx.fill();
}

function drawBar(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, 50, 100);
}

function drawCircle(x, y, color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x, y, 100, 0, 6.28);
    ctx.fill();
}

function drawGradientStep() {
    var colorStep = 255 / 16;

    for (var i = 0; i < 16; i++) {
        var xPos = i * 50;
        var currentStep = i * colorStep;
        var newColor = "rgb(" + (255 - currentStep) + ", 0, " + currentStep + ")";

        drawBar(xPos, 250, newColor);
    }
}

function drawRing() {
    for (var i = 0; i < 10; i++) {
        var percentComlpete = i / 10 * 6.28;
        var xPos = 400 + Math.sin(percentComlpete) * 200;
        var yPos = 300 + Math.cos(percentComlpete) * 200;

        var color = i % 2 === 0 ? "#0000ff" : "#0088ff";

        drawCircle(xPos, yPos, color);
    }
}

function drawOnLoad() {
    var image = new Image();
    image.src = "dist/img/logo.png";
    image.onload = onImageLoaded;
}

function onImageLoaded() {
    ctx.drawImage(this, 262, 162);
}

function onDrawStart(e) {
    isDrawing = true;

    lastPos = {
        x: e.offsetX,
        y: e.offsetY
    };
}

function onDraw(e) {
    if (!isDrawing) {
        return;
    }
    ctx.beginPath();
    ctx.moveTo(lastPos.x, lastPos.y);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineWidth = thickness.value;

    if (eraser === true) {
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 1;
    } else {
        ctx.strokeStyle = colorChosen.value;
        ctx.globalAlpha = '0.' + transparency.value;
    }

    ctx.stroke();

    lastPos = {
        x: e.offsetX,
        y: e.offsetY
    };
}

function onDrawEnd(e) {
    isDrawing = false;
}

colorChosen.addEventListener('click', function (e) {
    eraser = false;
    console.log(isDrawing);
    lastPos = {
        x: e.offsetX,
        y: e.offsetY
    };
});

eraserBtn.addEventListener('click', function (e) {
    eraser = true;
    lastPos = {
        x: e.offsetX,
        y: e.offsetY
    };
});

window.onload = function () {
    // drawGradientStep();
    // ctx.globalCompositeOperation = "lighten";
    // ctx.globalAlpha = 0.5;
    // drawRing();
    // ctx.globalAlpha = 1;
    // // ctx.globalCompositeOperation = "source-out";
    // drawOnLoad();

    canvas.addEventListener('mousedown', onDrawStart);
    canvas.addEventListener("mousemove", onDraw);
    canvas.addEventListener("mouseup", onDrawEnd);
};
//# sourceMappingURL=main.js.map
