// Get the canvas and its context
var canvas = document.getElementById("secret-turtle");
var ctx = canvas.getContext("2d");

// Background canvas
var canvasBackground = document.getElementById("background");
var ctxBackground = canvasBackground.getContext("2d");


var clientHeight = 600;
var clientWidth = 1250;

var score = 0;
var scoreText = document.getElementsByClassName("score")[0];
scoreText.textContent = "Score: " + String(score);

var highScore = localStorage.getItem("highScore") || 0;
var highScoreText = document.getElementsByClassName("highScore")[0];
highScoreText.textContent = "High Score: " + String(highScore);

var paused = false;

// Set the canvas size
canvas.width = clientWidth;
canvas.height = clientHeight;

canvasBackground.width = clientWidth;
canvasBackground.height = clientHeight;

ctxBackground.fillStyle = "#c8f7c8";
ctxBackground.fillRect(0, 0, clientWidth, clientHeight);

var player = new Player(canvas.height);
var lasers = [];

var obstacles = [new Obstacle(canvas.height, canvas.width, score)];
// Function to move the player
function movePlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      player.left();
      break;
    case 38: // Up arrow
      var laser = new Laser(player)
      lasers.push(laser);
      laser.fire(0, -1);
      break;
    case 39: // Right arrow
      player.right();
      break;
    case 70: // "F" key
      var laser = new Laser(player)
      lasers.push(laser);
      laser.fire(player.lastDirection, 0);
      break;
    case 82: // "R" key
      reload();
      break;
    case 80: // "P" key
      paused = !paused;
      break;
  }
}

// Function to move the player
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
    // Check for collision with the obstacle
    if (player.x < obstacle.x + obstacle.width &&
      player.x + player.width > obstacle.x &&
      player.y < obstacle.y + obstacle.height &&
      player.y + player.height > obstacle.y) {
      alert("Why does the turtle shoot bees? None of your bees-ness...");
      paused = true;
    }
  });
}

function reload() {
  paused = false;
  score = 0;
  scoreText.textContent = "Score: " + String(score);
  player = new Player(canvas.height);
  lasers = [];
  obstacles = [new Obstacle(canvas.height, canvas.width, score)];
}

// Add event listeners for keyboard
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

// Game loop
function gameLoop() {
  if (this.paused) {
    return requestAnimationFrame(gameLoop);
  }
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player, obstacle, and laser
  player.draw(ctx, clientHeight, clientWidth);
  obstacles.forEach(element => element.draw(ctx, player, canvas));
  lasers.forEach(element => element.draw(ctx));
  checkEnd();

  lasers.forEach(function (element, index) {
    obstacles.forEach(function (obstacle, oIndex) {
      switch (element.checkCollision(obstacle, canvas.width, canvas.height)) {
        case 'hit':
          score += 1;
          lasers.splice(index, 1);
          obstacles.splice(oIndex, 1);
          for (let i = obstacles.length; i < Math.floor(score / 5) + 1; i++) {
            obstacles.push(new Obstacle(canvas.height, canvas.width, score));
          }
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

  // update score
  scoreText.textContent = "Score: " + String(score);
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
