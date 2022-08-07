const Ship = require("./ship.js");

class Gameboard {
  constructor() {
    this.ships = [];
    this.activeShips = 0;
    this.missed = [];
    this.board = [
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
  }

  receiveAttack(cords) {
    const [x, y] = cords;
    if (this.board[x][y] !== "") {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
      this.calcShips();
    } else {
      this.missed.push(cords);
    }
  }

  placeShip(ship, cords, direction) {
    let [x, y] = cords;
    switch (direction) {
      case "h":
        for (let i = 0; i < ship["len"]; i++) {
          this.board[x][y] = ship;
          y++;
        }
        break;
      case "v":
        for (let i = 0; i < ship["len"]; i++) {
          this.board[x][y] = ship;
          x++;
        }
    }
    this.ships.push(ship);
  }

  calcShips() {
    this.activeShips = this.ships.reduce((sum, ship) => {
      return sum + (ship.isSunk() ? 0 : 1);
    }, 0);
  }
}

module.exports = Gameboard;
