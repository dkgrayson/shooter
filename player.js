class Player {
  constructor(height) {
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = 36;
    this.height = 19;
    this.x = 0;
    this.y = height - this.height;
    this.color = "#1F51FF";
    this.speed = 5;
    this.direction = "right";
    this.xDirection = 1;
    this.yDirection = 0;
    this.image = document.getElementById("turtle");
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
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
