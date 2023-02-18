class Player {
  constructor(height) {
    this.xVelocity = 0;
    this.width = 36;
    this.height = 19;
    this.x = 0;
    this.y = height - this.height;
    this.speed = 70;
    this.lastDirection = 1;
    this.imageRight = document.getElementById("turtle");
    this.imageLeft = document.getElementById("turtleLeft");
  }

  right() {
    this.xVelocity = 1
    this.lastDirection = 1;
  }
  left() {
    this.xVelocity = -1
    this.lastDirection = -1;
  }

  draw(ctx, width, deltaTime) {
    var nextX = this.x + this.xVelocity * this.speed * deltaTime;
    if (nextX > 0 && nextX < width - this.width) {
      this.x = nextX;
    }
    if (this.lastDirection > 0) {
      ctx.drawImage(this.imageRight, this.x, this.y, this.width, this.height);
    } else {
      ctx.drawImage(this.imageLeft, this.x, this.y, this.width, this.height);
    }
  }
}
