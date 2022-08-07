class Ship {
  constructor(length) {
    this.length = length;
  }

  hit() {
    this.length -= 1;
  }

  isSunk() {
    if (this.length > 0) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Ship;
