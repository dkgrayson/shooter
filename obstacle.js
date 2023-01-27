class Obstacle {
  constructor(height, width) {
    this.x = width / 2 + 100;
    this.y = height / 2 + 100;
    this.width = 40;
    this.height = 40;
    this.color = "red";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
