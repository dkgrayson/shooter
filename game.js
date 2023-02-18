// Get the canvas and its context
var canvas = document.getElementById("secret-turtle");
var ctx = canvas.getContext("2d");

var canvasF1 = document.getElementById("background-f1");
var ctxF1 = canvasF1.getContext("2d");

var canvasF2 = document.getElementById("background-f2");
var ctxF2 = canvasF2.getContext("2d");

var canvasF3 = document.getElementById("background-f3");
var ctxF3 = canvasF3.getContext("2d");

var canvasF4 = document.getElementById("background-f4");
var ctxF4 = canvasF4.getContext("2d");

var score = 0;
var scoreText = document.getElementsByClassName("score")[0];

var highScore = localStorage.getItem("highScore") || 0;
var highScoreText = document.getElementsByClassName("highScore")[0];
highScoreText.textContent = "High Score: " + String(highScore);

var scoreboardOffset = 50;

function updateCanvasSize(height, width) {
  height -= 200;
  width -= 130;

  canvas.width = width;
  canvasF1.width = width;
  canvasF2.width = width;
  canvasF3.width = width;
  canvasF4.width = width;

  canvas.height = height;
  canvasF1.height = height;
  canvasF2.height = height;
  canvasF3.height = height;
  canvasF4.height = height;
}

updateCanvasSize(window.innerHeight, window.innerWidth);

// render backgrounds
ctxF1.drawImage(document.getElementById("f1"), 0, 0, window.innerWidth, window.innerHeight);
ctxF2.drawImage(document.getElementById("f2"), 0, 0, window.innerWidth, window.innerHeight);
ctxF3.drawImage(document.getElementById("f3"), 0, 0, window.innerWidth, window.innerHeight);
ctxF4.drawImage(document.getElementById("f4"), 0, 0, window.innerWidth, window.innerHeight);

// time keeping variables
var previousTime = 0;
var deltaTime = 0;
var paused = false;

// game pieces
var player = new Player(canvas.height);
var lasers = [];
var obstacles = [new Obstacle(canvas.height, canvas.width, score)];

// Function to move the player
function movePlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      if (player.xVelocity > -1) {
        player.left();
      }
      break;
    case 38: // Up arrow
      var laser = new Laser(player)
      lasers.push(laser);
      laser.fire(0, -1);
      break;
    case 39: // Right arrow
      if (player.xVelocity < 1) {
        player.right();
      }
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


// update game objects based on delta time
function update(currentTime) {
  deltaTime = (currentTime - previousTime) / 100;
  // update previous time for next frame
  previousTime = currentTime;
}

function render() {
  // updateCanvasSize(window.innerHeight, window.innerWidth);
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player, obstacle, and laser
  player.draw(ctx, window.innerWidth, deltaTime);
  obstacles.forEach(element => element.draw(ctx, player, canvas, deltaTime));
  lasers.forEach(element => element.draw(ctx, deltaTime));
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
}

// Game loop
function gameLoop(currentTime) {
  if (this.paused) {
    return requestAnimationFrame(gameLoop);
  }
  update(currentTime);
  render();
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop(1);
