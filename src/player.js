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
    console.log(this.prevShots);
    console.log(coords);
    console.log(this.prevShots.includes(coords.join('')));
    if (this.prevShots.includes(coords.join(''))) {
      this.takeShot();
    } else {
      this.prevShots.push(coords.join(''));

      return coords;
    }
  }
}

module.exports = { Player, Ai };
