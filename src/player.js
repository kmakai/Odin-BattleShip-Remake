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
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const coords = [x, y];

    if (this.prevShots.includes(coords.join(','))) this.takeShot();
    this.prevShots.push(coords.join(','));

    return coords;
  }
}

module.exports = { Player, Ai };
