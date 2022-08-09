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
    console.log(board);
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    // console.log(x, y);

    // if (board[x][y] === 'miss' || board[x][y] === 'hit') this.takeShot(board);

    // board.receiveAttack([x, y]);

    return [x, y];
  }
}

module.exports = { Player, Ai };
