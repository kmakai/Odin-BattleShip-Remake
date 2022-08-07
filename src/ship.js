class Ship {
  constructor(len) {
    this.length = len;
  }

  hit() {
    this.length -= 1;
  }

  isSunk() {
    if (this.len > 0) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Ship;
