class Obstacle {
  constructor(height, width) {
    this.width = 30;
    this.height = 30;
    this.x = Math.floor(Math.random() * (width - this.width));
    this.y = Math.floor(Math.random() * (height - this.height));
    this.color = "#FF5733";
  }

  draw(ctx) {
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
