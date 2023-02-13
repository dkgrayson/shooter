class Player {
  constructor(height) {
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = 36;
    this.height = 19;
    this.x = 0;
    this.y = height - this.height;
    this.color = "#1F51FF";
    this.speed = 7;
    this.lastDirection = 1;
    this.imageRight = document.getElementById("turtle");
    this.imageLeft = document.getElementById("turtleLeft");
  }

  right() {
    this.lastDirection = 1;
    this.xVelocity = 1
  }
  left() {
    this.lastDirection = -1;
    this.xVelocity = -1
  }

  draw(ctx, height, width) {
    var nextX = this.x + this.xVelocity * this.speed;
    var nextY = this.y + this.yVelocity * this.speed;
    if (nextX > 0 && nextX < width - this.width) {
      this.x = nextX;
    }
    if (nextY > 0 && nextY < height - this.height) {
      this.y = nextY;
    }
    if (this.lastDirection > 0) {
      ctx.drawImage(this.imageRight, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imageLeft, this.x, this.y, this.width, this.height);
    }
  }
}
