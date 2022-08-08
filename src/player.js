const { mode } = require('../webpack.config');

class Player {
  constructor(name) {
    this.name = name;
    this.board;
  }
}

class Ai extends Player {
  constructor(name) {
    super(name);
  }

  takeShot(board) {
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    if (board[x][y] === 'miss' || board[x[y]] === 'hit') this.takeShot();

    board.receiveAttack([x, y]);
  }
}

module.exports = { Player, Ai };
