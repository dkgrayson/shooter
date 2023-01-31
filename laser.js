class Laser {
  constructor(x, y, height, width, direction) {
    this.x = x + width / 2;
    this.y = y + height / 2;
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = 10;
    this.height = 10;
    this.color = "#49fb35";
    this.isFiring = false;
    this.direction = direction;
    this.speed = 7;
  }

  draw(ctx) {
    if (this.isFiring) {
      this.x = this.x + this.xVelocity;
      this.y = this.y + this.yVelocity;
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);
    }
  }

  checkCollision(obstacle, canvasWidth, canvasHeight) {
    if (this.isFiring) {
      // Check for going off board
      if (this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0) {
        this.isFiring = false;
        return 'gone';
      }
      // Check for hit
      if (obstacle.isHit(this.x, this.y, this.width, this.height)) {
        this.isFiring = false;
        return 'hit';
      }
    }

    return 0;
  }

  fire() {
    this.isFiring = true;
    switch (this.direction) {
      case 'left':
        this.yVelocity = 0;
        this.xVelocity = this.speed * -1;
        break;
      case 'up':
        this.xVelocity = 0;
        this.yVelocity = this.speed * -1;
        break;
      case 'right':
        this.yVelocity = 0;
        this.xVelocity = this.speed;
        break;
      case 'down':
        this.xVelocity = 0;
        this.yVelocity = this.speed;
        break;
    }
  }
}
