class Player {
  constructor(height) {
    this.x = 0;
    this.y = height - 20;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = 20;
    this.height = 20;
    this.color = "#1F51FF";
    this.speed = 5;
    this.direction = "right";
  }

  draw(ctx, height, width) {
    var nextX = this.x + this.xVelocity;
    var nextY = this.y + this.yVelocity;
    if (nextX > 0 && nextX < width - this.width) {
      this.x = nextX;
    }
    if (nextY > 0 && nextY < height - this.height) {
      this.y = nextY;
    }
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
