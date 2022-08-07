const Ship = require('./ship.js');

class Gameboard {
  constructor() {
    this.ships = [];
    this.activeShips = 0;
    this.missed = [];
    this.board = [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ];

    this.placeShip(new Ship(3), [0, 1], 'h');
    this.placeShip(new Ship(2), [2, 3], 'v');
  }

  receiveAttack(cords) {
    const [x, y] = cords;
    if (this.board[x][y] !== '') {
      this.board[x][y].hit();
    } else {
      this.missed.push(cords);
    }
    this._availableShip();
  }

  placeShip(ship, cords, direction) {
    let [x, y] = cords;
    switch (direction) {
      case 'h':
        for (let i = 0; i < ship['length']; i++) {
          this.board[x][y] = ship;
          y++;
        }
        break;
      case 'v':
        for (let i = 0; i < ship['length']; i++) {
          this.board[x][y] = ship;
          x++;
        }
    }
    this.ships.push(ship);
  }

  availableShip() {
    let sum = 0;
    this.ships.forEach((ship) => (ship.isSunk ? (sum += 1) : sum));
    this.activeShips = sum;
  }
}

module.exports = Gameboard;
