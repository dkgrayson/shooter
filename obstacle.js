class Obstacle {
  constructor(height, width, score) {
    this.width = 29;
    this.height = 27;
    this.speed = 3;
    this.x = Math.floor(Math.random() * (width - this.width));
    this.y = Math.floor(Math.random() * (height - this.height));
    this.color = "#FF5733";
    this.image = document.getElementById("racoon");
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
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  isHit(x, y, width, height) {
    // Check for collision with the obstacle
    return (x < this.x + this.width &&
      x + width > this.x &&
      y < this.y + this.height &&
      y + height > this.y);
  }
}
