// Get the canvas and its context
var canvas = document.getElementById("secret-turtle");
var ctx = canvas.getContext("2d");

// Set the canvas size
canvas.width = 500;
canvas.height = 500;

var player = new Player(canvas.height);
var laser = new Laser(player.x, player.y, player.height, player.width, "right");
var obstacle = new Obstacle(canvas.width, canvas.height);

player.draw(ctx);

// Function to move the player
function movePlayer(e) {
  switch (e.keyCode) {
    case 37: // Left arrow
      player.direction = 'left';
      player.x -= player.speed;
      break;
    case 38: // Up arrow
      player.direction = 'up';
      player.y -= player.speed;
      break;
    case 39: // Right arrow
      player.direction = 'right';
      player.x += player.speed;
      break;
    case 40: // Down arrow
      player.direction = 'down';
      player.y += player.speed;
      break;
    case 70: // "F" key
      laser.direction = player.direction;
      laser.isFiring = true;
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

function reload() {
  player = new Player(canvas.height);
  laser = new Laser(player.x, player.y, player.height, player.width, "right");
  obstacle = new Obstacle(canvas.width, canvas.height);
}

// Function to move the laser
function moveLaser() {
  if (laser.isFiring) {
    switch (laser.direction) {
      case 'left':
        laser.x -= 1;
        break;
      case 'up':
        laser.y -= 1;
        break;
      case 'right':
        laser.x += 1;
        break;
      case 'down':
        laser.y += 1;
        break;
    }

    if (laser.x > canvas.width || laser.x < 0 || laser.y > canvas.height || laser.y < 0) {
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
