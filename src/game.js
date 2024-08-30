import { Player } from './player.js';
import { Laser } from './laser.js';
import { Obstacle } from './obstacle.js';
import { Powerup } from './powerup.js';

let canvas = document.getElementById("secret-turtle");
let ctx = canvas.getContext("2d");

let backgroundCanvas = document.getElementById("background");
let backgroundCtx = backgroundCanvas.getContext("2d");

let score = 0;
let scoreText = document.getElementsByClassName("score")[0];

let maxEnemies = 10;
let maxPowerups = 1;

let powerups = [];
let powered = false;

let highScore = localStorage.getItem("highScore") || 0;
let highScoreText = document.getElementsByClassName("highScore")[0];
highScoreText.textContent = "High Score: " + String(highScore);

let bgImg = new Image();
bgImg.src = 'background.jpg';
bgImg.onload = () => {
  backgroundCtx.drawImage(bgImg, 0, 0, canvasWidth, canvasHeight);
}

// time keeping variables
var previousTime = 0;
var deltaTime = 0;
var paused = false;

// game pieces
var player = new Player(canvas.height);
var lasers = [];
var obstacles = [new Obstacle(canvas.height, canvas.width, score)];

function movePlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      if (player.xVelocity > -1) {
        player.left();
      }
      break;
    case 38: // Up arrow
      if (powered) {
        var laserLeft = new Laser(player)
        var laserUp = new Laser(player)
        var laserRight = new Laser(player)
        lasers.push(laserLeft);
        lasers.push(laserUp);
        lasers.push(laserRight);
        laserLeft.fire(-1, 0);
        laserUp.fire(1, 0);
        laserRight.fire(0, -1);
      } else {
        var laser = new Laser(player)
        lasers.push(laser);
        laser.fire(0, -1);
      }
      break;
    case 39: // Right arrow
      if (player.xVelocity < 1) {
        player.right();
      }
      break;
    case 70: // "F" key

      if (powered) {
        var laserLeft = new Laser(player)
        var laserUp = new Laser(player)
        var laserRight = new Laser(player)
        lasers.push(laserLeft);
        lasers.push(laserUp);
        lasers.push(laserRight);
        laserLeft.fire(-1, 0);
        laserUp.fire(1, 0);
        laserRight.fire(0, -1);
      } else {
        var laser = new Laser(player)
        lasers.push(laser);
        laser.fire(player.lastDirection, 0);
      }

      break;
    case 82: // "R" key
      reload();
      break;
    case 80: // "P" key
      paused = !paused;
      break;
  }
}

// Function to stop the player
function stopPlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      player.xVelocity = 0;
      break;
    case 39: // Right arrow
      player.xVelocity = 0;
      break;
  }
}

function checkEnd() {
  obstacles.forEach(function (obstacle) {
    if (player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y) {
      paused = true;
    }
  });
}

function reload() {
  paused = false;
  score = 0;
  scoreText.textContent = "Score: " + String(score);
  player = new Player(canvas.height);
  powered = false;
  lasers = [];
  powerups = [];
  maxPowerups = 1;
  obstacles = [new Obstacle(canvas.height, canvas.width, score)];
}

function update(currentTime) {
  deltaTime = (currentTime - previousTime) / 100;
  previousTime = currentTime;
}

//spawn bad guys and powerups
function spawn() {
  if (Math.floor(score / 10) > 0 && powerups.length < maxPowerups) {
    powerups.push(new Powerup(canvas.width, canvas.height));
  }

  var scoreEnemies = Math.floor(score / 5);
  var pandas = scoreEnemies < maxEnemies ? scoreEnemies : maxEnemies;
  for (let i = obstacles.length; i < pandas + 1; i++) {
    obstacles.push(new Obstacle(canvas.height, canvas.width, score));
  }
}

function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player, obstacle, and laser
  player.draw(ctx, window.innerWidth, deltaTime);
  obstacles.forEach(element => element.draw(ctx, player, canvas, deltaTime));
  lasers.forEach(element => element.draw(ctx, deltaTime));
  powerups.forEach(element => element.draw(ctx));
  checkEnd();

  powerups.forEach(function (element, index) {
    if (element.checkCollision(player)) {
      powered = true;
      powerups.splice(index, 1);
      maxPowerups = 0;
    }
  });

  lasers.forEach(function (element, index) {
    obstacles.forEach(function (obstacle, oIndex) {
      switch (element.checkCollision(obstacle, canvas.width, canvas.height)) {
        case 'hit':
          score += 1;
          lasers.splice(index, 1);
          obstacles.splice(oIndex, 1);
          if (score > highScore) {
            highScore = score;
            highScoreText.textContent = "High Score: " + String(highScore);
            localStorage.setItem("highScore", highScore);
          }
          break;
        case 'gone':
          lasers.splice(index, 1);
          break;
      }
    });
  });

  spawn();

  // update score
  scoreText.textContent = "Score: " + String(score);
}

// Game loop
function gameLoop(currentTime) {
  if (paused) {
    return requestAnimationFrame(gameLoop);
  }
  update(currentTime);
  render();
  requestAnimationFrame(gameLoop);
}


// Add event listeners for keyboard
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

// Start the game loop
gameLoop(1);
