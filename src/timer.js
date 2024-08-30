export default class timer {
  constructor() {
    this.previousTime = 0;
    this.deltaTime = 0;
    this.paused = false;
  }

  update(currentTime) {
    this.deltaTime = (currentTime - this.previousTime) / 100;
    this.previousTime = currentTime;
  }
}
