let gridWidth = 200;
let gridHeight = 200;

let gameStarted = false;

let startingSegment = 10;

let xStart = 0;
let yStart = gridHeight / 2;

let startDirection = 'right';
let direction = startDirection;

let segments = [];
let score = 0;

let highScore;
let fruit;

function setup() {

    createCanvas(600, 400);

    frameRate(10);

    textAlign(CENTER, CENTER);
    textSize(2);

    highScore = getItem('High Score');
    console.log(highScore);
}

function draw() {
    background(0);
   // scale(width / gridWidth, height / gridHeight);

    if (gameStarted == false) {
        showStartScreen();
    }
    else {
        translate(0.5, 0.5);
        showFruit();
        showSegments();
        updateSegments();
        checkForCollision();
        checkForFruit();
        gameMode();
    }
}

function gameMode(){
    noStroke();
    fill(255, 0, 0);
    rect(620, 200, 50, 50, 2);
}
function showStartScreen() {
    noStroke();
    fill(32);
    rect(200, 150, 200, 100, 10);
    fill(255);
    textSize(12);
    textAlign(LEFT, CENTER);
    text('Click to play.\n Use arrow key to move', 250, 200);
    noLoop();
}

function mousePressed() {
    if (gameStarted == false) {
        startGame();
    }
}

function startGame() {
    updateFruitCoordinates();

    segments = [];

    for (let x = xStart; x < xStart + startingSegment; x++) {
        let segmentPosition = createVector(x, yStart);

        segments.unshift(segmentPosition);
    }
    direction = startDirection;
    score = 0;
    gameStarted = true;
    loop();
}


function showFruit() {
    stroke(255, 64, 32);
    point(fruit.x, fruit.y);
}

function showSegments() {
    noFill();
    stroke(96, 255, 64);
    beginShape();
    for (let segment of segments) {
        vertex(segment.x, segment.y);
    }
    endShape();
}

function updateSegments() {

    segments.pop();
    let head = segments[0].copy();

    segments.unshift(head);

    switch (direction) {
        case 'right':
            head.x = head.x + 1;
            //  console.log(head.x);
            break;

        case 'up':
            head.y = head.y - 1;
            break;
        case 'left':
            head.x = head.x - 1;
            break;
        case 'down':
            head.y = head.y + 1;
            break;
    }
}

function checkForCollision() {
    let head = segments[0];

    if (head.x >= gridWidth || head.x < 0 || head.y >= gridHeight || head.y < 0 || selfColliding() == true) {
        gameOver();
    }
}

function gameOver() {
    highScore = max(score, highScore);
    noStroke();
    fill(32);
    rect(2, gridHeight / 2 - 5, gridWidth - 4, 12, 2);
    storeItem('High Score', highScore);
    text(`Game Over! Your Score : ${score} \n Your High Score : ${highScore} \n Click to play again`, gridWidth / 2, gridHeight / 2);
    gameStarted == false;
    noLoop();
}


function selfColliding() {
    let head = segments[0];

    let segmentAfterHead = segments.slice(1);

    for (let segment of segmentAfterHead) {
        if (segment.equals(head) == true) {
            return true;
        }
    }
    return false;
}


function checkForFruit() {
    let head = segments[0];

    if (head.equals(fruit) == true) {
        score = score + 1;

        let tail = segments[segments.length - 1];
        let newSegment = tail.copy();

        segments.push(newSegment);

        updateFruitCoordinates();
    }
}

function updateFruitCoordinates() {
    let x = floor(random(gridWidth));
    let y = floor(random(gridHeight));

    fruit = createVector(x, y);
}


function keyPressed() {

    switch (keyCode) {
        case LEFT_ARROW:
            if (direction !== 'right') {
                direction = 'left';
            }
            break;

        case RIGHT_ARROW:
            if (direction !== 'left') {
                direction = 'right';
            }
            break;

        case UP_ARROW:
            if (direction !== 'down') {
                direction = 'up'
            }
            break;

        case DOWN_ARROW:
            if (direction !== 'up') {
                direction = 'down'
            }
            break;
    }
}
