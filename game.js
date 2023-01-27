// Get the canvas and its context
var canvas = document.getElementById("secret-turtle");
var ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 500;
canvas.height = 500;

var player = new Player(canvas.height);
var laser = new Laser(player.x, player.y, player.height, player.width)
var obstacle = new Obstacle(canvas.width, canvas.height);

player.draw(ctx);

// Function to move the player
function movePlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      player.x -= player.speed;
      break;
    case 38: // Up arrow
      player.y -= player.speed;
      break;
    case 39: // Right arrow
      player.x += player.speed;
      break;
    case 40: // Down arrow
      player.y += player.speed;
      break;
    case 70: // "F" key
      laser.isFiring = true;
      break;
  }
  // Check for collision with the obstacle
  if (player.x < obstacle.x + obstacle.width &&
    player.x + player.width > obstacle.x &&
    player.y < obstacle.y + obstacle.height &&
    player.y + player.height > obstacle.y) {
    alert("Collision detected!");
  }
}

// Function to move the laser
function moveLaser() {
  if (laser.isFiring) {
    laser.x += 1;
    if (laser.x > canvas.width) {
      laser.isFiring = false;
      laser.x = player.x + player.width / 2;
      laser.y = player.y + player.height / 2;
    }
  }
}

// Add event listeners for arrow keys and the "f" key
document.addEventListener("keydown", movePlayer);

// Game loop
function gameLoop() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the player, obstacle, and laser
  player.draw(ctx);
  obstacle.draw(ctx);
  laser.draw(ctx);

  // Move the laser
  moveLaser();

  // Call the game loop again
  requestAnimationFrame(gameLoop);
}

// Start the game loop
gameLoop();
