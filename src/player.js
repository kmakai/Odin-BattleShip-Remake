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

    
  }
}

module.exports = { Player, Ai };
