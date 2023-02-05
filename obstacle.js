class Obstacle {
  constructor(height, width, score) {
    this.width = 30 + score;
    this.height = 30 + score;
    this.speed = 1;
    this.x = Math.floor(Math.random() * (width - this.width));
    this.y = Math.floor(Math.random() * (height - this.height));
    this.color = "#FF5733";
  }

  draw(ctx, player, board) {
    if (this.x < player.x && this.x + this.width + this.speed < board.width) {
      this.x += this.speed;
    }
    else if (this.x > player.x && this.x - this.speed > 0) {
      this.x -= this.speed;
    }
    if (this.y < player.y && this.y + this.height + this.speed < board.height) {
      this.y += this.speed;
    }
    else if (this.y > player.y && this.y - this.speed > 0) {
      this.y -= this.speed;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  isHit(x, y, width, height) {
    // Check for collision with the obstacle
    return (x < this.x + this.width &&
      x + width > this.x &&
      y < this.y + this.height &&
      y + height > this.y);
  }
}
