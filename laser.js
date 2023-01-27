class Laser {
  constructor(x, y, height, width, direction) {
    this.x = x + width / 2;
    this.y = y + height / 2;
    this.width = 20;
    this.height = 10;
    this.color = "green";
    this.isFiring = false;
    this.direction = direction;
  }

  draw(ctx) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}