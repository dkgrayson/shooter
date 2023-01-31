class Obstacle {
  constructor(height, width) {
    this.x = width / 2 + 100;
    this.y = height / 2 + 100;
    this.width = 20;
    this.height = 20;
    this.color = "#FF5733";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }

  get xFront() {
    return this.x + this.width;
  }

  get yTop() {
    return this.y + this.height;
  }

  isHit(x, y, width, height) {
    // Check for collision with the obstacle
    return (x < this.x + this.width &&
      x + width > this.x &&
      y < this.y + this.height &&
      y + height > this.y);
  }
}
