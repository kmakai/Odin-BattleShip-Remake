const Ship = require('../ship.js');

const testShip = new Ship(5);

test('checks ship length', () => {
  expect(testShip.length).toEqual(5);
});

test('checks ship length after hit()', () => {
  testShip.hit();
  expect(testShip.length).toEqual(4);
});

test('shipis isSunk to be false', () => {
  expect(testShip.isSunk()).toBe(false);
});

test('checks ship length after hits to be zero', () => {
  testShip.hit();
  testShip.hit();
  testShip.hit();
  testShip.hit();
  expect(testShip.length).toEqual(0);
});

test('shipis isSunk to be true', () => {
  expect(testShip.isSunk()).toBe(true);
});
