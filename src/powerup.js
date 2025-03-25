export class Powerup {
  constructor(width, height) {
    this.width = 60;
    this.height = 60;
    this.x = 200;
    this.y = height - this.height;
    this.image = document.getElementById("egg");
    this.time = 0;
  }

  checkCollision(player) {
    return ((player.x + player.width > this.x && player.x < this.x + this.width) || (player.x < this.x + this.width && player.x + player.width > this.x + this.width));
  }

  draw(ctx) {
    ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
