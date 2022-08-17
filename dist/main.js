/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

const Ship = __webpack_require__(/*! ./ship.js */ "./src/ship.js");

class Gameboard {
  constructor() {
    this.ships = [];
    this.activeShips = this.calcShips;
    this.board = [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ];
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    if (typeof this.board[x][y] === 'object') {
      this.board[x][y].hit();
      this.board[x][y] = 'hit';
      this.calcShips();
    } else if (this.board[x][y] === '') {
      this.board[x][y] = 'miss';
    }
  }

  placeShip(ship, cords, direction) {
    let [x, y] = cords;
    switch (direction) {
      case 'h':
        for (let i = 0; i < ship['len']; i++) {
          this.board[x][y] = ship;
          y++;
        }
        break;
      case 'v':
        for (let i = 0; i < ship['len']; i++) {
          this.board[x][y] = ship;
          x++;
        }
    }
    this.ships.push(ship);
    this.calcShips();
  }

  calcShips() {
    let sum;
    this.activeShips = this.ships.reduce((sum, ship) => {
      return sum + (ship.isSunk() ? 0 : 1);
    }, 0);
  }
}

module.exports = Gameboard;


/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module) => {

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
    let coords = this.genCoords();

    while (this.prevShots.includes(coords.join(""))) {
      coords = this.genCoords();
    }

    this.prevShots.push(coords.join(""));
    board.receiveAttack(coords);
  }

  genCoords() {
    return [Math.floor(Math.random() * 10), Math.floor(Math.random() * 10)];
  }
}

module.exports = { Player, Ai };


/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

class Ship {
  constructor(len) {
    this.len = len;
    this.orientation = 'v';
  }

  hit() {
    this.len--;
  }

  isSunk() {
    if (this.len > 0) {
      return false;
    } else {
      return true;
    }
  }
}

module.exports = Ship;


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
const GameBoard = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
const Ship = __webpack_require__(/*! ./ship */ "./src/ship.js");
const { Player, Ai } = __webpack_require__(/*! ./player */ "./src/player.js");

// Get Dom elements.
const PlayerOneName = document.querySelector('.player1 .name');
const PlayerOneMsg = document.querySelector('.player1 .msg');
const PlayerOneBoard = document.querySelector('.player1 .board');
const PlayerOneships = document.querySelector('.player1 .ships');

const PlayerTwoName = document.querySelector('.player2 .name');
const PlayerTwoMsg = document.querySelector('.player2 .msg');
const PlayerTwoBoard = document.querySelector('.player2 .board');
const PlayerTwoships = document.querySelector('.player2 .ships');

// Global Variables.
let currentPlayer;

// Create Player and Ai.
const playerOne = new Player('Captain');
PlayerOneName.textContent = playerOne.name;

const playerTwo = new Ai('Bot');
PlayerTwoName.textContent = playerTwo.name;

// Create Boards.
playerOne.board = new GameBoard();
playerTwo.board = new GameBoard();

displayBoards();

// Player 1 place shisps.
const pships = [
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
];

// PlayerOneMsg.textContent = `Place your ships!
//     press (space) to change orientation`;
PlayerOneMsg.textContent = `Place your ships! 
    press (space) to change orientation`;
function handlePlacement(ships, e) {
  if (ships === []) return;
  let index = 0;
  let ship;
  while (index < ships.length) {
    ship = ships[index];

    
    PlayerOneMsg.textContent = `Place your ships! 
    press (space) to change orientation`;
    if (e.code === 'Space') {
      ship.orientation = ship.orientation === 'v' ? 'h' : 'v';
      updateBoard();
    }

    if (!e.target.classList.contains('cell')) return;

    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    let el;
    const color = e.type === 'mouseout' ? '#fff' : 'red';

    let i = 0;
    while (i < ship.len) {
      if (ship.orientation === 'h') {
        el = document.querySelector(
          `.player1 .board [data-x='${x}'][data-y='${y++}']`
        );
        if (!el) return;
      }

      if (ship.orientation === 'v') {
        el = document.querySelector(
          `.player1 .board [data-x='${x++}'][data-y='${y}']`
        );
        if (!el) return;
      }

      // if (!el) alert('Off Board!!');
      if (!el) console.log('outside!!');
      if (el.id === 'ship') return;
      el.style.backgroundColor = color;
      i++;
    }

    if (e.type === 'click') {
      playerOne.board.placeShip(
        ship,
        [e.target.dataset.x, e.target.dataset.y],
        ship.orientation
      );
      ships.shift();
      updateBoard();
    }

    break;
  }
  if(ships.length === 0) PlayerOneMsg.textContent = ``;
}

PlayerOneBoard.addEventListener('mouseover', handlePlacement.bind(e, pships));
PlayerOneBoard.addEventListener('mouseout', handlePlacement.bind(e, pships));
document.addEventListener('keydown', handlePlacement.bind(e, pships));
document.addEventListener('click', handlePlacement.bind(e, pships));

// Player 2 Ai place ships.

const aships = [
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
];

const randomPlace = function (ship) {
  const board = playerTwo.board.board;
  let [x, y] = playerTwo.genCoords();
  let orientation = ['v', 'h'][Math.floor(Math.random() * 2)];

  function isClear(x, y) {
    if (orientation === 'v') {
      for (let i = 0; i < ship.len; i++) {
        if (!board[x]) return false;
        if (board[x][y] !== '') return false;
        if (typeof board[x][y] === 'object') return false;
        x++;
      }
    }

    if (orientation === 'h') {
      for (let i = 0; i < ship.len; i++) {
        if (!board[x] && !board[x][y]) return false;
        if (board[x][y] !== '') return false;
        if (typeof board[x][y] === 'object') return false;

        y++;
      }
    }
    return true;
  }

  while (!isClear(x, y)) {
    [x, y] = playerTwo.genCoords();
  }

  playerTwo.board.placeShip(ship, [x, y], orientation);
  updateBoard();
};

aships.forEach((ship, i) => {
  randomPlace(ship);
});

// Display the boards
function displayBoards() {
  let board = playerOne.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id =
        typeof cell === 'object'
          ? 'ship'
          : cell === 'hit'
          ? 'hit'
          : cell === 'miss'
          ? 'miss'
          : 'e';
      const content = cell === 'hit' || cell === 'miss' ? cell : '';
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${
        typeof cell === 'object' ? '' : content
      }</div>
      `;

      PlayerOneBoard.insertAdjacentHTML('beforeend', html);
    });
  });

  board = playerTwo.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id = cell === 'hit' ? 'hit' : cell === 'miss' ? 'miss' : 'e';
      const content = cell === 'hit' || cell === 'miss' ? cell : '';
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${content}</div>
      `;

      PlayerTwoBoard.insertAdjacentHTML('beforeend', html);
    });
  });

  PlayerOneships.textContent = `Available Ships: ${
    playerOne.board.activeShips >= 1 ? playerOne.board.activeShips : 0
  }`;
  PlayerTwoships.textContent = `Available Ships: ${playerTwo.board.activeShips}`;
}

function updateBoard() {
  PlayerOneBoard.innerHTML = '';
  PlayerTwoBoard.innerHTML = '';
  displayBoards();
}

updateBoard();
// check if game is over
const IsOver = function () {
  if (playerOne.board.activeShips === 0 || playerTwo.board.activeShips === 0) {
    if (playerOne.board.activeShips > 0)
      PlayerOneMsg.textContent = 'Congrats you win';
    if (playerTwo.board.activeShips > 0)
      PlayerTwoMsg.textContent = 'Congrats you win';
    return true;
  } else {
    return false;
  }
};

// PLayer moves.
PlayerTwoBoard.addEventListener('click', (e) => {
  if (IsOver()) return;
  if (currentPlayer === playerTwo) return;
  if (e.target.textContent !== '') return;
  const [x, y] = [e.target.dataset.x, e.target.dataset.y];
  const board = playerTwo.board;
  board.receiveAttack([x, y]);
  updateBoard();
  currentPlayer = playerTwo;
  setTimeout(() => botMove(), 0);
  console.log(board);
});

// Ai Shot/
const botMove = function () {
  if (IsOver()) return;
  const board = playerOne.board;
  // console.log(board);
  playerTwo.takeShot(board);
  updateBoard();
  currentPlayer = playerOne;
  console.log(board);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQzdCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEVBQUUsYUFBYSxJQUFJO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLElBQUksYUFBYSxFQUFFO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHO0FBQy9FO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxHQUFHLFlBQVksR0FBRyxZQUFZLEdBQUcsSUFBSSxRQUFRO0FBQzNGOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBLEdBQUc7QUFDSCxtREFBbUQsNEJBQTRCO0FBQy9FOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwLmpzJyk7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuY2FsY1NoaXBzO1xyXG4gICAgdGhpcy5ib2FyZCA9IFtcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgY29uc3QgW3gsIHldID0gY29vcmRzO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XHJcbiAgICAgIHRoaXMuY2FsY1NoaXBzKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcCwgY29yZHMsIGRpcmVjdGlvbikge1xyXG4gICAgbGV0IFt4LCB5XSA9IGNvcmRzO1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnaCc6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwWydsZW4nXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3YnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xyXG4gICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICB9XHJcblxyXG4gIGNhbGNTaGlwcygpIHtcclxuICAgIGxldCBzdW07XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5zaGlwcy5yZWR1Y2UoKHN1bSwgc2hpcCkgPT4ge1xyXG4gICAgICByZXR1cm4gc3VtICsgKHNoaXAuaXNTdW5rKCkgPyAwIDogMSk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xyXG4iLCJjbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmJvYXJkO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQWkgZXh0ZW5kcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgdGhpcy5wcmV2U2hvdHMgPSBbXTtcclxuICB9XHJcblxyXG4gIHRha2VTaG90KGJvYXJkKSB7XHJcbiAgICBsZXQgY29vcmRzID0gdGhpcy5nZW5Db29yZHMoKTtcclxuXHJcbiAgICB3aGlsZSAodGhpcy5wcmV2U2hvdHMuaW5jbHVkZXMoY29vcmRzLmpvaW4oXCJcIikpKSB7XHJcbiAgICAgIGNvb3JkcyA9IHRoaXMuZ2VuQ29vcmRzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5wcmV2U2hvdHMucHVzaChjb29yZHMuam9pbihcIlwiKSk7XHJcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKGNvb3Jkcyk7XHJcbiAgfVxyXG5cclxuICBnZW5Db29yZHMoKSB7XHJcbiAgICByZXR1cm4gW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSwgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApXTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBQbGF5ZXIsIEFpIH07XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbikge1xyXG4gICAgdGhpcy5sZW4gPSBsZW47XHJcbiAgICB0aGlzLm9yaWVudGF0aW9uID0gJ3YnO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5sZW4tLTtcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmxlbiA+IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJjb25zdCBHYW1lQm9hcmQgPSByZXF1aXJlKCcuL2dhbWVib2FyZCcpO1xuY29uc3QgU2hpcCA9IHJlcXVpcmUoJy4vc2hpcCcpO1xuY29uc3QgeyBQbGF5ZXIsIEFpIH0gPSByZXF1aXJlKCcuL3BsYXllcicpO1xuXG4vLyBHZXQgRG9tIGVsZW1lbnRzLlxuY29uc3QgUGxheWVyT25lTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJPbmVNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAubXNnJyk7XG5jb25zdCBQbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5ib2FyZCcpO1xuY29uc3QgUGxheWVyT25lc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAuc2hpcHMnKTtcblxuY29uc3QgUGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubXNnJyk7XG5jb25zdCBQbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5ib2FyZCcpO1xuY29uc3QgUGxheWVyVHdvc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAuc2hpcHMnKTtcblxuLy8gR2xvYmFsIFZhcmlhYmxlcy5cbmxldCBjdXJyZW50UGxheWVyO1xuXG4vLyBDcmVhdGUgUGxheWVyIGFuZCBBaS5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcHRhaW4nKTtcblBsYXllck9uZU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJPbmUubmFtZTtcblxuY29uc3QgcGxheWVyVHdvID0gbmV3IEFpKCdCb3QnKTtcblBsYXllclR3b05hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJUd28ubmFtZTtcblxuLy8gQ3JlYXRlIEJvYXJkcy5cbnBsYXllck9uZS5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcbnBsYXllclR3by5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcblxuZGlzcGxheUJvYXJkcygpO1xuXG4vLyBQbGF5ZXIgMSBwbGFjZSBzaGlzcHMuXG5jb25zdCBwc2hpcHMgPSBbXG4gIG5ldyBTaGlwKDUpLFxuICBuZXcgU2hpcCg0KSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDMpLFxuICBuZXcgU2hpcCgyKSxcbl07XG5cbi8vIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzIVxuLy8gICAgIHByZXNzIChzcGFjZSkgdG8gY2hhbmdlIG9yaWVudGF0aW9uYDtcblBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzISBcbiAgICBwcmVzcyAoc3BhY2UpIHRvIGNoYW5nZSBvcmllbnRhdGlvbmA7XG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoc2hpcHMsIGUpIHtcbiAgaWYgKHNoaXBzID09PSBbXSkgcmV0dXJuO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgc2hpcDtcbiAgd2hpbGUgKGluZGV4IDwgc2hpcHMubGVuZ3RoKSB7XG4gICAgc2hpcCA9IHNoaXBzW2luZGV4XTtcblxuICAgIFxuICAgIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzISBcbiAgICBwcmVzcyAoc3BhY2UpIHRvIGNoYW5nZSBvcmllbnRhdGlvbmA7XG4gICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJykge1xuICAgICAgc2hpcC5vcmllbnRhdGlvbiA9IHNoaXAub3JpZW50YXRpb24gPT09ICd2JyA/ICdoJyA6ICd2JztcbiAgICAgIHVwZGF0ZUJvYXJkKCk7XG4gICAgfVxuXG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkgcmV0dXJuO1xuXG4gICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgbGV0IHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgbGV0IGVsO1xuICAgIGNvbnN0IGNvbG9yID0gZS50eXBlID09PSAnbW91c2VvdXQnID8gJyNmZmYnIDogJ3JlZCc7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzaGlwLmxlbikge1xuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5wbGF5ZXIxIC5ib2FyZCBbZGF0YS14PScke3h9J11bZGF0YS15PScke3krK30nXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gJ3YnKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLnBsYXllcjEgLmJvYXJkIFtkYXRhLXg9JyR7eCsrfSddW2RhdGEteT0nJHt5fSddYFxuICAgICAgICApO1xuICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmICghZWwpIGFsZXJ0KCdPZmYgQm9hcmQhIScpO1xuICAgICAgaWYgKCFlbCkgY29uc29sZS5sb2coJ291dHNpZGUhIScpO1xuICAgICAgaWYgKGVsLmlkID09PSAnc2hpcCcpIHJldHVybjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIHBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgIHNoaXAsXG4gICAgICAgIFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV0sXG4gICAgICAgIHNoaXAub3JpZW50YXRpb25cbiAgICAgICk7XG4gICAgICBzaGlwcy5zaGlmdCgpO1xuICAgICAgdXBkYXRlQm9hcmQoKTtcbiAgICB9XG5cbiAgICBicmVhaztcbiAgfVxuICBpZihzaGlwcy5sZW5ndGggPT09IDApIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBgO1xufVxuXG5QbGF5ZXJPbmVCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW92ZXInLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcblBsYXllck9uZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3V0JywgaGFuZGxlUGxhY2VtZW50LmJpbmQoZSwgcHNoaXBzKSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlUGxhY2VtZW50LmJpbmQoZSwgcHNoaXBzKSk7XG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuXG4vLyBQbGF5ZXIgMiBBaSBwbGFjZSBzaGlwcy5cblxuY29uc3QgYXNoaXBzID0gW1xuICBuZXcgU2hpcCg1KSxcbiAgbmV3IFNoaXAoNCksXG4gIG5ldyBTaGlwKDMpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMiksXG5dO1xuXG5jb25zdCByYW5kb21QbGFjZSA9IGZ1bmN0aW9uIChzaGlwKSB7XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyVHdvLmJvYXJkLmJvYXJkO1xuICBsZXQgW3gsIHldID0gcGxheWVyVHdvLmdlbkNvb3JkcygpO1xuICBsZXQgb3JpZW50YXRpb24gPSBbJ3YnLCAnaCddW01hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDIpXTtcblxuICBmdW5jdGlvbiBpc0NsZWFyKHgsIHkpIHtcbiAgICBpZiAob3JpZW50YXRpb24gPT09ICd2Jykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbjsgaSsrKSB7XG4gICAgICAgIGlmICghYm9hcmRbeF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB4Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW47IGkrKykge1xuICAgICAgICBpZiAoIWJvYXJkW3hdICYmICFib2FyZFt4XVt5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoYm9hcmRbeF1beV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgeSsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHdoaWxlICghaXNDbGVhcih4LCB5KSkge1xuICAgIFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcbiAgfVxuXG4gIHBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgW3gsIHldLCBvcmllbnRhdGlvbik7XG4gIHVwZGF0ZUJvYXJkKCk7XG59O1xuXG5hc2hpcHMuZm9yRWFjaCgoc2hpcCwgaSkgPT4ge1xuICByYW5kb21QbGFjZShzaGlwKTtcbn0pO1xuXG4vLyBEaXNwbGF5IHRoZSBib2FyZHNcbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZHMoKSB7XG4gIGxldCBib2FyZCA9IHBsYXllck9uZS5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgbGV0IGlkID1cbiAgICAgICAgdHlwZW9mIGNlbGwgPT09ICdvYmplY3QnXG4gICAgICAgICAgPyAnc2hpcCdcbiAgICAgICAgICA6IGNlbGwgPT09ICdoaXQnXG4gICAgICAgICAgPyAnaGl0J1xuICAgICAgICAgIDogY2VsbCA9PT0gJ21pc3MnXG4gICAgICAgICAgPyAnbWlzcydcbiAgICAgICAgICA6ICdlJztcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjZWxsID09PSAnaGl0JyB8fCBjZWxsID09PSAnbWlzcycgPyBjZWxsIDogJyc7XG4gICAgICBjb25zdCBodG1sID0gYCAgPGRpdiBjbGFzcz1cImNlbGxcIiBpZD1cIiR7aWR9XCIgZGF0YS14PVwiJHtySX1cIiBkYXRhLXk9XCIke2NJfVwiPiR7XG4gICAgICAgIHR5cGVvZiBjZWxsID09PSAnb2JqZWN0JyA/ICcnIDogY29udGVudFxuICAgICAgfTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyT25lQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9IGNlbGwgPT09ICdoaXQnID8gJ2hpdCcgOiBjZWxsID09PSAnbWlzcycgPyAnbWlzcycgOiAnZSc7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gJ2hpdCcgfHwgY2VsbCA9PT0gJ21pc3MnID8gY2VsbCA6ICcnO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBQbGF5ZXJUd29Cb2FyZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBQbGF5ZXJPbmVzaGlwcy50ZXh0Q29udGVudCA9IGBBdmFpbGFibGUgU2hpcHM6ICR7XG4gICAgcGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID49IDEgPyBwbGF5ZXJPbmUuYm9hcmQuYWN0aXZlU2hpcHMgOiAwXG4gIH1gO1xuICBQbGF5ZXJUd29zaGlwcy50ZXh0Q29udGVudCA9IGBBdmFpbGFibGUgU2hpcHM6ICR7cGxheWVyVHdvLmJvYXJkLmFjdGl2ZVNoaXBzfWA7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkKCkge1xuICBQbGF5ZXJPbmVCb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgUGxheWVyVHdvQm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gIGRpc3BsYXlCb2FyZHMoKTtcbn1cblxudXBkYXRlQm9hcmQoKTtcbi8vIGNoZWNrIGlmIGdhbWUgaXMgb3ZlclxuY29uc3QgSXNPdmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAocGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID09PSAwIHx8IHBsYXllclR3by5ib2FyZC5hY3RpdmVTaGlwcyA9PT0gMCkge1xuICAgIGlmIChwbGF5ZXJPbmUuYm9hcmQuYWN0aXZlU2hpcHMgPiAwKVxuICAgICAgUGxheWVyT25lTXNnLnRleHRDb250ZW50ID0gJ0NvbmdyYXRzIHlvdSB3aW4nO1xuICAgIGlmIChwbGF5ZXJUd28uYm9hcmQuYWN0aXZlU2hpcHMgPiAwKVxuICAgICAgUGxheWVyVHdvTXNnLnRleHRDb250ZW50ID0gJ0NvbmdyYXRzIHlvdSB3aW4nO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gUExheWVyIG1vdmVzLlxuUGxheWVyVHdvQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBpZiAoSXNPdmVyKCkpIHJldHVybjtcbiAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IHBsYXllclR3bykgcmV0dXJuO1xuICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgIT09ICcnKSByZXR1cm47XG4gIGNvbnN0IFt4LCB5XSA9IFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV07XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyVHdvLmJvYXJkO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIHVwZGF0ZUJvYXJkKCk7XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIHNldFRpbWVvdXQoKCkgPT4gYm90TW92ZSgpLCAwKTtcbiAgY29uc29sZS5sb2coYm9hcmQpO1xufSk7XG5cbi8vIEFpIFNob3QvXG5jb25zdCBib3RNb3ZlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoSXNPdmVyKCkpIHJldHVybjtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQ7XG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgcGxheWVyVHdvLnRha2VTaG90KGJvYXJkKTtcbiAgdXBkYXRlQm9hcmQoKTtcbiAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgY29uc29sZS5sb2coYm9hcmQpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==