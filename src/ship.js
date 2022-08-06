export default class Ship {
  constructor(length) {
    this.length = length;
  }

  hit() {
    this.length--;
  }

  isSunk() {
    if (!this.length) true;
    else false;
  }
}
