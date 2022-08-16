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

const PlayerTwoName = document.querySelector('.player2 .name');
const PlayerTwoMsg = document.querySelector('.player2 .msg');
const PlayerTwoBoard = document.querySelector('.player2 .board');

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


PlayerOneMsg.textContent = `Place your ships! 
    press (space) to change orientation`


function handlePlacement(ships, e) {
  if (ships === []) return;
  let index = 0;
  let ship;
  while (index < ships.length) {
    ship = ships[index];
    PlayerOneMsg.textContent = `Place your ships! 
    press (space) to change orientation`
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsOENBQThDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRyxJQUFJLFFBQVE7QUFDM0Y7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwLmpzJyk7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuY2FsY1NoaXBzO1xyXG4gICAgdGhpcy5ib2FyZCA9IFtcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgY29uc3QgW3gsIHldID0gY29vcmRzO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XHJcbiAgICAgIHRoaXMuY2FsY1NoaXBzKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XHJcbiAgICB9IFxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIGNvcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb3JkcztcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2gnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB5Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2JzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcclxuICB9XHJcblxyXG4gIGNhbGNTaGlwcygpIHtcclxuICAgIGxldCBzdW07XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5zaGlwcy5yZWR1Y2UoKHN1bSwgc2hpcCkgPT4ge1xyXG4gICAgIHJldHVybiBzdW0gKyAoc2hpcC5pc1N1bmsoKSA/IDAgOiAxKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XHJcbiIsImNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQ7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBaSBleHRlbmRzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgc3VwZXIobmFtZSk7XHJcbiAgICB0aGlzLnByZXZTaG90cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdGFrZVNob3QoYm9hcmQpIHtcclxuICAgIGxldCBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnByZXZTaG90cy5pbmNsdWRlcyhjb29yZHMuam9pbihcIlwiKSkpIHtcclxuICAgICAgY29vcmRzID0gdGhpcy5nZW5Db29yZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByZXZTaG90cy5wdXNoKGNvb3Jkcy5qb2luKFwiXCIpKTtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcclxuICB9XHJcblxyXG4gIGdlbkNvb3JkcygpIHtcclxuICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IFBsYXllciwgQWkgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuKSB7XHJcbiAgICB0aGlzLmxlbiA9IGxlbjtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSAndic7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmxlbi0tO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMubGVuID4gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IEdhbWVCb2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5jb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwJyk7XG5jb25zdCB7IFBsYXllciwgQWkgfSA9IHJlcXVpcmUoJy4vcGxheWVyJyk7XG5cbi8vIEdldCBEb20gZWxlbWVudHMuXG5jb25zdCBQbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLm5hbWUnKTtcbmNvbnN0IFBsYXllck9uZU1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5tc2cnKTtcbmNvbnN0IFBsYXllck9uZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLmJvYXJkJyk7XG5cbmNvbnN0IFBsYXllclR3b05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubmFtZScpO1xuY29uc3QgUGxheWVyVHdvTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjIgLm1zZycpO1xuY29uc3QgUGxheWVyVHdvQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAuYm9hcmQnKTtcblxuLy8gR2xvYmFsIFZhcmlhYmxlcy5cbmxldCBjdXJyZW50UGxheWVyO1xuXG4vLyBDcmVhdGUgUGxheWVyIGFuZCBBaS5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcHRhaW4nKTtcblBsYXllck9uZU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJPbmUubmFtZTtcblxuY29uc3QgcGxheWVyVHdvID0gbmV3IEFpKCdCb3QnKTtcblBsYXllclR3b05hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJUd28ubmFtZTtcblxuLy8gQ3JlYXRlIEJvYXJkcy5cbnBsYXllck9uZS5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcbnBsYXllclR3by5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcblxuZGlzcGxheUJvYXJkcygpO1xuXG5cbi8vIFBsYXllciAxIHBsYWNlIHNoaXNwcy5cbmNvbnN0IHBzaGlwcyA9IFtcbiAgbmV3IFNoaXAoNSksXG4gIG5ldyBTaGlwKDQpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDIpLFxuXTtcblxuXG5QbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciBzaGlwcyEgXG4gICAgcHJlc3MgKHNwYWNlKSB0byBjaGFuZ2Ugb3JpZW50YXRpb25gXG5cblxuZnVuY3Rpb24gaGFuZGxlUGxhY2VtZW50KHNoaXBzLCBlKSB7XG4gIGlmIChzaGlwcyA9PT0gW10pIHJldHVybjtcbiAgbGV0IGluZGV4ID0gMDtcbiAgbGV0IHNoaXA7XG4gIHdoaWxlIChpbmRleCA8IHNoaXBzLmxlbmd0aCkge1xuICAgIHNoaXAgPSBzaGlwc1tpbmRleF07XG4gICAgUGxheWVyT25lTXNnLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMhIFxuICAgIHByZXNzIChzcGFjZSkgdG8gY2hhbmdlIG9yaWVudGF0aW9uYFxuICAgIGlmIChlLmNvZGUgPT09ICdTcGFjZScpIHtcbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uID09PSAndicgPyAnaCcgOiAndic7XG4gICAgICB1cGRhdGVCb2FyZCgpO1xuICAgIH1cblxuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHJldHVybjtcblxuICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgIGxldCB5ID0gZS50YXJnZXQuZGF0YXNldC55O1xuICAgIGxldCBlbDtcbiAgICBjb25zdCBjb2xvciA9IGUudHlwZSA9PT0gJ21vdXNlb3V0JyA/ICcjZmZmJyA6ICdyZWQnO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc2hpcC5sZW4pIHtcbiAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAucGxheWVyMSAuYm9hcmQgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5Kyt9J11gXG4gICAgICAgICk7XG4gICAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09ICd2Jykge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5wbGF5ZXIxIC5ib2FyZCBbZGF0YS14PScke3grK30nXVtkYXRhLXk9JyR7eX0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiAoIWVsKSBhbGVydCgnT2ZmIEJvYXJkISEnKTtcbiAgICAgIGlmICghZWwpIGNvbnNvbGUubG9nKCdvdXRzaWRlISEnKTtcbiAgICAgIGlmIChlbC5pZCA9PT0gJ3NoaXAnKSByZXR1cm47XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoZS50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICBwbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICBzaGlwLFxuICAgICAgICBbZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnldLFxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uXG4gICAgICApO1xuICAgICAgc2hpcHMuc2hpZnQoKTtcbiAgICAgIHVwZGF0ZUJvYXJkKCk7XG4gICAgfVxuICAgIGJyZWFrO1xuICB9XG59XG5cblBsYXllck9uZUJvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlb3ZlcicsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdXQnLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgaGFuZGxlUGxhY2VtZW50LmJpbmQoZSwgcHNoaXBzKSk7XG5cbi8vIFBsYXllciAyIEFpIHBsYWNlIHNoaXBzLlxuXG5jb25zdCBhc2hpcHMgPSBbXG4gIG5ldyBTaGlwKDUpLFxuICBuZXcgU2hpcCg0KSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDMpLFxuICBuZXcgU2hpcCgyKSxcbl07XG5cbmNvbnN0IHJhbmRvbVBsYWNlID0gZnVuY3Rpb24gKHNoaXApIHtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQuYm9hcmQ7XG4gIGxldCBbeCwgeV0gPSBwbGF5ZXJUd28uZ2VuQ29vcmRzKCk7XG4gIGxldCBvcmllbnRhdGlvbiA9IFsndicsICdoJ11bTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMildO1xuXG4gIGZ1bmN0aW9uIGlzQ2xlYXIoeCwgeSkge1xuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ3YnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuOyBpKyspIHtcblxuICAgICAgICBpZiAoIWJvYXJkW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChib2FyZFt4XVt5XSAhPT0gJycpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgeCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCFib2FyZFt4XSAmJiAhYm9hcmRbeF1beV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHkrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuXG4gIHdoaWxlICghaXNDbGVhcih4LCB5KSkge1xuICAgIFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcbiAgfVxuXG4gIHBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgW3gsIHldLCBvcmllbnRhdGlvbik7XG4gIHVwZGF0ZUJvYXJkKCk7XG59O1xuXG5hc2hpcHMuZm9yRWFjaCgoc2hpcCwgaSkgPT4ge1xuICByYW5kb21QbGFjZShzaGlwKTtcbn0pO1xuXG4vLyBEaXNwbGF5IHRoZSBib2FyZHNcbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZHMoKSB7XG4gIGxldCBib2FyZCA9IHBsYXllck9uZS5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgbGV0IGlkID1cbiAgICAgICAgdHlwZW9mIGNlbGwgPT09ICdvYmplY3QnXG4gICAgICAgICAgPyAnc2hpcCdcbiAgICAgICAgICA6IGNlbGwgPT09ICdoaXQnXG4gICAgICAgICAgPyAnaGl0J1xuICAgICAgICAgIDogY2VsbCA9PT0gJ21pc3MnXG4gICAgICAgICAgPyAnbWlzcydcbiAgICAgICAgICA6ICdlJztcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjZWxsID09PSAnaGl0JyB8fCBjZWxsID09PSAnbWlzcycgPyBjZWxsIDogJyc7XG4gICAgICBjb25zdCBodG1sID0gYCAgPGRpdiBjbGFzcz1cImNlbGxcIiBpZD1cIiR7aWR9XCIgZGF0YS14PVwiJHtySX1cIiBkYXRhLXk9XCIke2NJfVwiPiR7XG4gICAgICAgIHR5cGVvZiBjZWxsID09PSAnb2JqZWN0JyA/ICcnIDogY29udGVudFxuICAgICAgfTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyT25lQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9IGNlbGwgPT09ICdoaXQnID8gJ2hpdCcgOiBjZWxsID09PSAnbWlzcycgPyAnbWlzcycgOiAnZSc7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gJ2hpdCcgfHwgY2VsbCA9PT0gJ21pc3MnID8gY2VsbCA6ICcnO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBQbGF5ZXJUd29Cb2FyZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQm9hcmQoKSB7XG4gIFBsYXllck9uZUJvYXJkLmlubmVySFRNTCA9ICcnO1xuICBQbGF5ZXJUd29Cb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgZGlzcGxheUJvYXJkcygpO1xufVxuXG51cGRhdGVCb2FyZCgpO1xuLy8gY2hlY2sgaWYgZ2FtZSBpcyBvdmVyXG5jb25zdCBJc092ZXIgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChwbGF5ZXJPbmUuYm9hcmQuYWN0aXZlU2hpcHMgPT09IDAgfHwgcGxheWVyVHdvLmJvYXJkLmFjdGl2ZVNoaXBzID09PSAwKSB7XG4gICAgaWYgKHBsYXllck9uZS5ib2FyZC5hY3RpdmVTaGlwcyA+IDApXG4gICAgICBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSAnQ29uZ3JhdHMgeW91IHdpbic7XG4gICAgaWYgKHBsYXllclR3by5ib2FyZC5hY3RpdmVTaGlwcyA+IDApXG4gICAgICBQbGF5ZXJUd29Nc2cudGV4dENvbnRlbnQgPSAnQ29uZ3JhdHMgeW91IHdpbic7XG4gICAgcmV0dXJuIHRydWU7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59O1xuXG4vLyBQTGF5ZXIgbW92ZXMuXG5QbGF5ZXJUd29Cb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChJc092ZXIoKSkgcmV0dXJuO1xuICBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyVHdvKSByZXR1cm47XG4gIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCAhPT0gJycpIHJldHVybjtcbiAgY29uc3QgW3gsIHldID0gW2UudGFyZ2V0LmRhdGFzZXQueCwgZS50YXJnZXQuZGF0YXNldC55XTtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQ7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcbiAgdXBkYXRlQm9hcmQoKTtcbiAgY3VycmVudFBsYXllciA9IHBsYXllclR3bztcbiAgc2V0VGltZW91dCgoKSA9PiBib3RNb3ZlKCksIDApO1xuICBjb25zb2xlLmxvZyhib2FyZCk7XG59KTtcblxuLy8gQWkgU2hvdC9cbmNvbnN0IGJvdE1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gIGlmIChJc092ZXIoKSkgcmV0dXJuO1xuICBjb25zdCBib2FyZCA9IHBsYXllck9uZS5ib2FyZDtcbiAgLy8gY29uc29sZS5sb2coYm9hcmQpO1xuICBwbGF5ZXJUd28udGFrZVNob3QoYm9hcmQpO1xuICB1cGRhdGVCb2FyZCgpO1xuICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICBjb25zb2xlLmxvZyhib2FyZCk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9