class Player {
  constructor(height) {
    this.x = 0;
    this.y = height - 20;
    this.width = 20;
    this.height = 20;
    this.color = "blue";
    this.speed = 10;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}