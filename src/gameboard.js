const Ship = require("./ship.js");

class Gameboard {
  constructor() {
    this.ships = [];
    this.activeShips = this.calcShips;
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

  receiveAttack(coords) {
    const [x, y] = coords;
    if (typeof this.board[x][y] === "object") {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
      this.calcShips();
    } else if (this.board[x][y] === "") {
      this.board[x][y] = "miss";
    }
  }

  placeShip(ship, coords, direction) {
    let [x, y] = coords;
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
    this.calcShips();
  }

  calcShips() {
    let sum;
    this.activeShips = this.ships.reduce((sum, ship) => {
      return sum + (ship.isSunk() ? 0 : 1);
    }, 0);
  }
}

module.exports = Gameboard;
