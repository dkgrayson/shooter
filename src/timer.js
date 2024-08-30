export class Timer {
  constructor(help) {
    this.previousTime = 0;
    this.deltaTime = 0;
    this.paused = false;
    this.help = help;

    this.update = (currentTime) => {
      this.deltaTime = (currentTime - this.previousTime) / 100;
      this.previousTime = currentTime;
    }
  }
}
