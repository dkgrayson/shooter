import { Player } from './player.js';
import { Obstacle } from './obstacle.js';
import { Powerup } from './powerup.js';
import { Controller } from './controller.js';
import { Timer } from './timer.js';

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

// game pieces
let player = new Player(canvas.height);
let lasers = [];
let obstacles = [new Obstacle(canvas.height, canvas.width, score)];
let controller = new Controller(player, powered, lasers, reload, paused)
let timer = new Timer();

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

//spawn bad guys and powerups
function spawn() {
  if (Math.floor(score / 10) > 0 && powerups.length < maxPowerups) {
    powerups.push(new Powerup(canvas.width, canvas.height));
  }

  let scoreEnemies = Math.floor(score / 5);
  let pandas = scoreEnemies < maxEnemies ? scoreEnemies : maxEnemies;
  for (let i = obstacles.length; i < pandas + 1; i++) {
    obstacles.push(new Obstacle(canvas.height, canvas.width, score));
  }
}

function render() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player, obstacle, and laser
  player.draw(ctx, window.innerWidth, timer.deltaTime);
  obstacles.forEach(element => element.draw(ctx, player, canvas, timer.deltaTime));
  lasers.forEach(element => element.draw(ctx, timer.deltaTime));
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
  timer.update(currentTime);
  render();
  requestAnimationFrame(gameLoop);
}


// Add event listeners for keyboard
document.addEventListener("keydown", controller.movePlayer);
document.addEventListener("keyup", controller.stopPlayer);

// Start the game loop
gameLoop(1);
