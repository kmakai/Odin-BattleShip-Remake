class Player {
  constructor(name) {
    this.name = name;
    this.board;
  }
}

class Ai extends Player {
  constructor(name) {
    super(name);
    this.prevShots = [];
  }

  takeShot(board) {
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    if (board.board[x][y] === "miss" || board.board[x][y] === "hit")
      this.takeShot();

    board.receiveAttack([x, y]);
  }
}

module.exports = { Player, Ai };
