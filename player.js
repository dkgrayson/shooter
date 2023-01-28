class Player {
  constructor(height) {
    this.x = 0;
    this.y = height - 20;
    this.width = 20;
    this.height = 20;
    this.color = "#1F51FF";
    this.speed = 10;
    this.direction = "right";
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}