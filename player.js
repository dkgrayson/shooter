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

  move() {
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
  }

  draw(ctx) {
    this.x = this.x + this.xVelocity;
    this.y = this.y + this.yVelocity;
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}
