import { Laser } from './laser.js';

export class Controller {
  constructor(player, lasers, timer, reloadFn) {
    this.player = player;
    this.lasers = lasers;
    this.paused = timer.paused;
    this.reloadFn = reloadFn;

    this.movePlayer = (e) => {
      switch (e.keyCode) {
        case 37: // Left arrow
          if (this.player.xVelocity > -1) {
            this.player.left();
          }
          break;
        case 38: // Up arrow
          if (this.player.powered) {
            // TODO: dry up code
            let laserLeft = new Laser(this.player)
            let laserUp = new Laser(this.player)
            let laserRight = new Laser(this.player)
            this.lasers.push(laserLeft);
            this.lasers.push(laserUp);
            this.lasers.push(laserRight);
            laserLeft.fire(-1, 0);
            laserUp.fire(1, 0);
            laserRight.fire(0, -1);
          } else {
            let laser = new Laser(player)
            this.lasers.push(laser);
            laser.fire(0, -1);
          }
          break;
        case 39: // Right arrow
          if (this.player.xVelocity < 1) {
            this.player.right();
          }
          break;
        case 70: // "F" key
          if (this.player.powered) {
            // TODO: dry up code
            var laserLeft = new Laser(this.player)
            var laserUp = new Laser(this.player)
            var laserRight = new Laser(this.player)
            this.lasers.push(laserLeft);
            this.lasers.push(laserUp);
            this.lasers.push(laserRight);
            laserLeft.fire(-1, 0);
            laserUp.fire(1, 0);
            laserRight.fire(0, -1);
          } else {
            var laser = new Laser(this.player)
            this.lasers.push(laser);
            laser.fire(this.player.lastDirection, 0);
          }
          break;
        case 82: // "R" key
          this.reloadFn();
          break;
        case 80: // "P" key
          this.paused = !this.paused;
          break;
        }
      }

      // Function to stop the player
      this.stopPlayer = (e) => {
        switch (e.keyCode) {
          case 37: // Left arrow
            this.player.xVelocity = 0;
            break;
          case 39: // Right arrow
            this.player.xVelocity = 0;
            break;
        }
      }
    }
  }
