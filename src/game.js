import { Player } from './player.js';
import { Controller } from './controller.js';
import { Timer } from './timer.js';
import { Renderer } from './renderer.js';
import { Obstacle } from './obstacle.js';

let canvas = document.getElementById("secret-turtle");
let ctx = canvas.getContext("2d");

let backgroundCanvas = document.getElementById("background");
let backgroundCtx = backgroundCanvas.getContext("2d");

function updateCanvasSize(height, width) {
  height -= 300;
  width -= 130;

  canvas.width = width;
  backgroundCanvas.width = width;

  canvas.height = height;
  backgroundCanvas.height = height;
}


let bgImg = new Image();
bgImg.src = 'background.jpg';
bgImg.onload = () => {
  backgroundCtx.drawImage(bgImg, 0, 0, window.innerWidth - 130, window.innerHeight - 300);
}
updateCanvasSize(window.innerHeight, window.innerWidth - 200);

function reload() {
  renderer.paused = false;
  renderer.score = 0;
  renderer.scoreText.textContent = "Score: " + String(renderer.score);
  renderer.player = new Player(canvas.height);
  renderer.powered = false;
  renderer.lasers = [];
  renderer.powerups = [];
  renderer.maxPowerups = 1;
  renderer.obstacles = [new Obstacle(canvas.height, canvas.width, 0)];
}



// game pieces
let player = new Player(canvas.height);
let lasers = [];
let paused = false;
let powered = false;
let obstacles = [new Obstacle(canvas.height, canvas.width, 0)];
let timer = new Timer();

function checkEnd() {
  obstacles.forEach(function (obstacle) {
    if (player && player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y) {
      paused = true;
    }
  });
}

let renderer = new Renderer(canvas, ctx, player, lasers, timer, powered, obstacles, checkEnd);
let controller = new Controller(player, powered, lasers, timer);

function gameLoop(currentTime) {
  if (paused) {
    return requestAnimationFrame(gameLoop);
  }
  timer.update(currentTime);
  renderer.render();
  requestAnimationFrame(gameLoop);
}

// Add event listeners for keyboard
document.addEventListener("keydown", controller.movePlayer);
document.addEventListener("keyup", controller.stopPlayer);

// Start the game loop
gameLoop(1);
