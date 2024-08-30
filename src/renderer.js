import { Obstacle } from './obstacle.js';
import { Powerup } from './powerup.js';

export class Renderer {
  constructor(canvas, ctx, player, lasers, timer, powered, obstacles, checkEnd) {
    this.maxPowerups = 1;
    this.maxEnemies = 10;
    this.score = 0;
    this.scoreText = document.getElementsByClassName("score")[0];
    this.canvas = canvas;
    this.ctx = ctx;
    this.player = player;
    this.lasers = lasers;
    this.timer = timer;
    this.powered = false;
    this.highScore = localStorage.getItem("highScore") || 0;
    this.highScoreText = document.getElementsByClassName("highScore")[0];
    this.highScoreText.textContent = "High Score: " + String(this.highScoreText);
    this.powerups = [];
    this.powered = powered;
    this.paused = timer.paused;
    this.obstacles = obstacles;
    this.checkEnd = checkEnd;

    this.spawn = () => {
      if (Math.floor(this.score / 10) > 0 && this.powerups.length < this.maxPowerups) {
        this.powerups.push(new Powerup(this.canvas.width, this.canvas.height));
      }

      let scoreEnemies = Math.floor(this.score / 5);
      let pandas = scoreEnemies < this.maxEnemies ? scoreEnemies : this.maxEnemies;
      for (let i = this.obstacles.length; i < pandas + 1; i++) {
        this.obstacles.push(new Obstacle(this.canvas.height, this.canvas.width, this.score));
      }
    }

    this.render = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.player.draw(this.ctx, window.innerWidth, this.timer.deltaTime);
      this.obstacles.forEach(element => element.draw(this.ctx, this.player, this.canvas, this.timer.deltaTime));
      this.lasers.forEach(element => element.draw(this.ctx, this.timer.deltaTime));
      this.powerups.forEach(element => element.draw(this.ctx));
      this.checkEnd(this.player);

      this.powerups.forEach((element, index) => {
        if (element.checkCollision(this.player)) {
          this.powered = true;
          this.powerups.splice(index, 1);
          this.maxPowerups = 0;
        }
      });

      this.lasers.forEach((element, index) => {
        this.obstacles.forEach((obstacle, oIndex) => {
          switch (element.checkCollision(obstacle, this.canvas.width, this.canvas.height)) {
            case 'hit':
              this.score += 1;
              this.lasers.splice(index, 1);
              this.obstacles.splice(oIndex, 1);
              if (this.score > this.highScore) {
                this.highScore = this.score;
                this.highScoreText.textContent = "High Score: " + String(this.highScore);
                localStorage.setItem("highScore", this.highScore);
              }
              break;
            case 'gone':
              this.lasers.splice(index, 1);
              break;
          }
        });
      });

      this.spawn();
      this.scoreText.textContent = "Score: " + String(this.score);
    }
  }
}
