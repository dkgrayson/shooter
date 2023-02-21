class Obstacle {
  constructor(height, width) {
    this.width = 29;
    this.height = 27;
    this.speed = 20;
    this.x = Math.floor(Math.random() * (width - this.width));
    this.y = Math.floor(Math.random() * (height - this.height));
    this.color = "#FF5733";
    this.imageRight = document.getElementById("racoonRight");
    this.imageLeft = document.getElementById("racoon");
    this.image = this.imageLeft;
  }

  draw(ctx, player, board, deltaTime) {
    var deltaMove = this.speed * deltaTime;
    if (this.x < player.x && this.x + this.width + deltaMove < board.width) {
      this.x += deltaMove;
      this.image = this.imageRight;
    }
    else if (this.x > player.x && this.x - deltaMove > 0) {
      this.x -= this.speed * deltaTime;
      this.image = this.imageLeft;
    }
    if (this.y < player.y && this.y + this.height + deltaMove < board.height) {
      this.y += deltaMove;
    }
    else if (this.y > player.y && this.y - deltaMove > 0) {
      this.y -= deltaMove;
    }
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }

  isHit(x, y, width, height) {
    // Check for collision with the obstacle
    return (x < this.x + this.width &&
      x + width > this.x &&
      y < this.y + this.height &&
      y + height > this.y);
  }
}
