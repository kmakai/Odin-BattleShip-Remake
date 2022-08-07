const GameBoard = require("./gameboard");
const Ship = require("./ship");

const b = new GameBoard();

b.placeShip(new Ship(3), [0, 1], "h");
b.placeShip(new Ship(2), [2, 3], "v");

b.receiveAttack([2, 3]);
console.log(b);

b.receiveAttack([5, 3]);
b.receiveAttack([5, 4]);
b.receiveAttack([5, 5]);
b.receiveAttack([5, 6]);
b.receiveAttack([5, 7]);

b.receiveAttack([3, 3]);
console.log(b);
