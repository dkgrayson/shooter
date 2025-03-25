export class Laser {
  constructor(player) {
    this.xVelocity = 0;
    this.yVelocity = 0;
    this.width = 30;
    this.height = 42;
    this.x = player.x + Math.floor(player.width / 2);
    this.y = player.y - Math.floor(player.height / 2);
    this.isFiring = false;
    this.speed = 100;
    this.imageUp = document.getElementById("beeUp");
    this.imageLeft = document.getElementById("beeLeft");
    this.imageRight = document.getElementById("bee");
    this.image = this.imageRight;
    this.power = 1 + Math.floor(player.power * 0.5);
  }

  draw(ctx, deltaTime) {
    if (this.isFiring) {
      this.x = this.x + this.xVelocity * this.speed * deltaTime;
      this.y = this.y + this.yVelocity * this.speed * deltaTime;
      ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
    }
  }

  checkCollision(obstacle, canvasWidth, canvasHeight, deltaTime) {
    if (this.isFiring) {
      // Check for going off board
      if (this.x > canvasWidth || this.x < 0 || this.y > canvasHeight || this.y < 0) {
        this.isFiring = false;
        return 'gone';
      }
      // Check for hit
      if (obstacle.isHit(this.x, this.y, this.width, this.height)) {
        obstacle.health -= this.power;
        if (obstacle.health <= 0) {
          return 'hit';
        }
        this.isFiring = false;
      }
    }

    return 0;
  }

  fire(xVelocity, yVelocity) {
    this.isFiring = true;
    this.xVelocity = xVelocity;
    this.yVelocity = yVelocity;
    if (xVelocity == 1) {
      this.image = this.imageRight;
    } else if (xVelocity === -1) {
      this.image = this.imageLeft;
    } else {
      this.image = this.imageUp;
    }
  }
}
