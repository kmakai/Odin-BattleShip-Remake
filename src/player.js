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

  takeShot() {
    const randomGen = () => Math.floor(Math.random() * 10);
    let x = randomGen();
    let y = randomGen();
    while (this.prevShots.includes(`${x}${y}`)) {
      x = randomGen();
      y = randomGen();
    }

    return [x,y]
  }
}

module.exports = { Player, Ai };
