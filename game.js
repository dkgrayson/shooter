// Get the canvas and its context
var canvas = document.getElementById("secret-turtle");
var ctx = canvas.getContext("2d");

// Background canvas
var canvasBackground = document.getElementById("background");
var ctxBackground = canvasBackground.getContext("2d");

// var clientHeight = document.body.clientHeight;
// var clientWidth = document.body.clientWidth;
var clientHeight = 400;
var clientWidth = 750;

var score = 0;
var scoreText = document.getElementsByClassName("score")[0];
scoreText.textContent = String(score);

// Set the canvas size
canvas.width = clientWidth;
canvas.height = clientHeight;

canvasBackground.width = clientWidth;
canvasBackground.height = clientHeight;

ctxBackground.fillStyle = "black";
ctxBackground.fillRect(0, 0, clientWidth, clientHeight);

var player = new Player(canvas.height);
var lasers = [];

var obstacle = new Obstacle(canvas.height, canvas.width);

player.draw(ctx);

// Function to move the player
function movePlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      player.direction = 'left';
      player.xVelocity = player.speed * -1;
      break;
    case 38: // Up arrow
      player.direction = 'up';
      player.yVelocity = player.speed * -1;
      break;
    case 39: // Right arrow
      player.direction = 'right';
      player.xVelocity = player.speed;
      break;
    case 40: // Down arrow
      player.direction = 'down';
      player.yVelocity = player.speed;
      break;
    case 70: // "F" key
      var laser = new Laser(player.x, player.y, player.height, player.width, player.direction)
      lasers.push(laser);
      laser.fire();
      break;
    case 82: // "R" key
      reload();
      break;
  }

  // Check for collision with the obstacle
  if (player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y) {
    alert("You lost, at least you're not a gopher!");
  }
}

// Function to move the player
function stopPlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      player.xVelocity = 0;
      break;
    case 38: // Up arrow
      player.yVelocity = 0;
      break;
    case 39: // Right arrow
      player.xVelocity = 0;
      break;
    case 40: // Down arrow
      player.yVelocity = 0;
      break;
    case 70: // "F" key
      // laser.isFiring = false; not sure yet
      break;
    case 82: // "R" key
      reload();
      break;
  }

  // Check for collision with the obstacle
  if (player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y) {
    alert("If losing were a sport you would be a world champion!");
    reload();
  }
}

function reload() {
  score = 0;
  scoreText.textContent = String(score);
  player = new Player(canvas.height);
  lasers = [];
  obstacle = new Obstacle(canvas.height, canvas.width);
}

// Add event listeners for keyboard
document.addEventListener("keydown", movePlayer);
document.addEventListener("keyup", stopPlayer);

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player, obstacle, and laser
  player.draw(ctx, clientHeight, clientWidth);
  obstacle.draw(ctx);
  lasers.forEach(element => element.draw(ctx));
  lasers.forEach(function (element, index, array) {
    switch (element.checkCollision(obstacle, canvas.width, canvas.height)) {
      case 'hit':
        score += 1;
        lasers.splice(index, 1);
        obstacle = new Obstacle(canvas.height, canvas.width);
        break;
      case 'gone':
        lasers.splice(index, 1);
        break;
    }
  })

  // update score
  scoreText.textContent = String(score);

  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
