const GameBoard = require('./gameboard');

const b = new GameBoard();

console.log(b);

b.receiveAttack([0, 0]);

console.log(b);

b.receiveAttack([0, 2]);
console.log(b);

b.receiveAttack([2, 3]);
b.receiveAttack([3, 3]);
console.log(b);
b._availableShip();
console.log(b);
