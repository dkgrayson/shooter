export class Obstacle {
	constructor(height, width, score) {
		this.width = 45;
		this.height = 40;
		this.baseSpeed = Math.random() * 15 + 20; // Speed between 20-35
		this.velocityX = 0;
		this.velocityY = 0;
		this.acceleration = 0.5; // More gradual acceleration
		this.friction = 0.99; // Keeps movement smooth
		this.x = Math.random() < 0.5 ? -this.width : width + this.width; // Spawn left or right
		this.y = Math.random() * height * 0.5; // Spawn in the upper half of the screen
		this.targetGround = height * 0.8; // Aim for a 'ground' level
		this.imageRight = document.getElementById('racoonRight');
		this.imageLeft = document.getElementById('racoon');
		this.image = this.imageLeft;
		this.score = score;
		this.health = Math.floor(1 + this.score * 0.1);
	}

	draw(ctx, player, board, deltaTime) {
		let dx = player.x - this.x;
		let dy =
			(player.y > this.targetGround ? player.y : this.targetGround) - this.y;
		let distance = Math.sqrt(dx * dx + dy * dy);

		// Move towards the 'ground' first before directly targeting player
		if (this.y < this.targetGround - 5) {
			dy = this.targetGround - this.y;
		}

		if (distance > 1) {
			let directionX = dx / distance;
			let directionY = dy / distance;

			this.velocityX += directionX * this.acceleration;
			this.velocityY += directionY * this.acceleration;
		}

		// Apply friction
		this.velocityX *= this.friction;
		this.velocityY *= this.friction;

		// Update position
		this.x += this.velocityX * deltaTime;
		this.y += this.velocityY * deltaTime;

		// Constrain to board
		this.x = Math.max(0, Math.min(board.width - this.width, this.x));
		this.y = Math.max(0, Math.min(board.height - this.height, this.y));

		// Update facing direction
		this.image = this.velocityX > 0 ? this.imageRight : this.imageLeft;

		// Draw the enemy
		ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
	}

	isHit(x, y, width, height) {
		return (
			x < this.x + this.width &&
			x + width > this.x &&
			y < this.y + this.height &&
			y + height > this.y
		);
	}
}
