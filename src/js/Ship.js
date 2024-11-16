export default class Ship {
  constructor(size, classOfShip) {
    this.size = size;
    this.hits = 0;
    this.class = classOfShip;
  }

  hit() {
    if (!this.isSunk()) this.hits++;
  }

  isSunk() {
    return this.size === this.hits;
  }
}
