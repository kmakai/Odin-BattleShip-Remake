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
    this.missed = [];
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

  receiveAttack(cords) {
    const [x, y] = cords;
    if(this.board[x][y] === 'miss' || this.board[x][y] === 'hit') return;
    if (this.board[x][y] === typeof Ship) {
      this.board[x][y] = 'hit';
      this.calcShips();
    } else {
      this.missed.push(cords);
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
  }

  takeShot(board) {
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];

    if (board[x][y] === 'miss' || board[x[y]] === 'hit') this.takeShot();

    board.receiveAttack([x, y]);
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

// Create ships and place them.
playerOne.board.placeShip(new Ship(5), [0, 0], 'h');
playerOne.board.placeShip(new Ship(4), [2, 0], 'v');
playerOne.board.placeShip(new Ship(3), [0, 9], 'v');
playerOne.board.placeShip(new Ship(3), [5, 5], 'h');
playerOne.board.placeShip(new Ship(2), [8, 5], 'v');

playerTwo.board.placeShip(new Ship(5), [3, 1], 'h');
playerTwo.board.placeShip(new Ship(4), [2, 0], 'v');
playerTwo.board.placeShip(new Ship(3), [0, 9], 'v');
playerTwo.board.placeShip(new Ship(3), [7, 4], 'h');
playerTwo.board.placeShip(new Ship(2), [7, 2], 'v');
// console.log(playerTwo.board);

// Display the boards
const displayBoards = function () {
  let board = playerOne.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id = typeof cell === 'object' ? 'ship' : cell === 'hit' ? 'hit' : 'e';
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${
        typeof cell === 'object' ? 'ship' : cell
      }</div>
      `;

      PlayerOneBoard.insertAdjacentHTML('beforeend', html);
    });
  });

  board = playerTwo.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      const content =
        typeof cell === 'object' || cell === ''
          ? ''
          : cell === 'hit'
          ? 'hit'
          : 'miss';
      const html = `  <div class="cell" data-x="${rI}" data-y="${cI}">${content}</div>
      `;

      PlayerTwoBoard.insertAdjacentHTML('beforeend', html);
    });
  });
};

displayBoards();
// currentPlayer = playerOne;
// PlayerOneBoard.addEventListener("click", (e) => {
//   if (currentPlayer === playerOne) return;
//   const [x, y] = [e.target.dataset.x, e.target.dataset.y];
//   const board = playerOne.board;
//   board.receiveAttack([x, y]);
//   PlayerOneBoard.innerHTML = "";
//   PlayerTwoBoard.innerHTML = "";
//   displayBoards();
//   console.log(playerOne.board);
// });

PlayerTwoBoard.addEventListener('click', (e) => {
  if (currentPlayer === playerTwo) return;
  const [x, y] = [e.target.dataset.x, e.target.dataset.y];
  const board = playerTwo.board;
  board.receiveAttack([x, y]);
  PlayerOneBoard.innerHTML = '';
  PlayerTwoBoard.innerHTML = '';
  displayBoards();
  console.log(playerTwo.board);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDeEJuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRztBQUMvRTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxHQUFHLFlBQVksR0FBRyxJQUFJLFFBQVE7QUFDaEY7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFJOztBQUVKO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAuanMnKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLm1pc3NlZCA9IFtdO1xyXG4gICAgdGhpcy5ib2FyZCA9IFtcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvcmRzKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBjb3JkcztcclxuICAgIGlmKHRoaXMuYm9hcmRbeF1beV0gPT09ICdtaXNzJyB8fCB0aGlzLmJvYXJkW3hdW3ldID09PSAnaGl0JykgcmV0dXJuO1xyXG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09IHR5cGVvZiBTaGlwKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWlzc2VkLnB1c2goY29yZHMpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIGNvcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb3JkcztcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2gnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB5Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2JzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcclxuICB9XHJcblxyXG4gIGNhbGNTaGlwcygpIHtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLnNoaXBzLnJlZHVjZSgoc3VtLCBzaGlwKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdW0gKyAoc2hpcC5pc1N1bmsoKSA/IDAgOiAxKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XHJcbiIsImNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQ7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBaSBleHRlbmRzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgc3VwZXIobmFtZSk7XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdChib2FyZCkge1xyXG4gICAgbGV0IFt4LCB5XSA9IFtcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxyXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChib2FyZFt4XVt5XSA9PT0gJ21pc3MnIHx8IGJvYXJkW3hbeV1dID09PSAnaGl0JykgdGhpcy50YWtlU2hvdCgpO1xyXG5cclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBQbGF5ZXIsIEFpIH07XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbikge1xyXG4gICAgdGhpcy5sZW4gPSBsZW47XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmxlbi0tO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMubGVuID4gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IEdhbWVCb2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG5jb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwJyk7XG5jb25zdCB7IFBsYXllciwgQWkgfSA9IHJlcXVpcmUoJy4vcGxheWVyJyk7XG5cbi8vIEdldCBEb20gZWxlbWVudHMuXG5jb25zdCBQbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLm5hbWUnKTtcbmNvbnN0IFBsYXllck9uZU1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5tc2cnKTtcbmNvbnN0IFBsYXllck9uZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLmJvYXJkJyk7XG5cbmNvbnN0IFBsYXllclR3b05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubmFtZScpO1xuY29uc3QgUGxheWVyVHdvTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjIgLm1zZycpO1xuY29uc3QgUGxheWVyVHdvQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAuYm9hcmQnKTtcblxuLy8gR2xvYmFsIFZhcmlhYmxlcy5cbmxldCBjdXJyZW50UGxheWVyO1xuXG4vLyBDcmVhdGUgUGxheWVyIGFuZCBBaS5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcHRhaW4nKTtcblBsYXllck9uZU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJPbmUubmFtZTtcblxuY29uc3QgcGxheWVyVHdvID0gbmV3IEFpKCdCb3QnKTtcblBsYXllclR3b05hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJUd28ubmFtZTtcblxuLy8gQ3JlYXRlIEJvYXJkcy5cbnBsYXllck9uZS5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcbnBsYXllclR3by5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcblxuLy8gQ3JlYXRlIHNoaXBzIGFuZCBwbGFjZSB0aGVtLlxucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCg1KSwgWzAsIDBdLCAnaCcpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCg0KSwgWzIsIDBdLCAndicpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzAsIDldLCAndicpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzUsIDVdLCAnaCcpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgyKSwgWzgsIDVdLCAndicpO1xuXG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDUpLCBbMywgMV0sICdoJyk7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDQpLCBbMiwgMF0sICd2Jyk7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbMCwgOV0sICd2Jyk7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbNywgNF0sICdoJyk7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDIpLCBbNywgMl0sICd2Jyk7XG4vLyBjb25zb2xlLmxvZyhwbGF5ZXJUd28uYm9hcmQpO1xuXG4vLyBEaXNwbGF5IHRoZSBib2FyZHNcbmNvbnN0IGRpc3BsYXlCb2FyZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBib2FyZCA9IHBsYXllck9uZS5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgbGV0IGlkID0gdHlwZW9mIGNlbGwgPT09ICdvYmplY3QnID8gJ3NoaXAnIDogY2VsbCA9PT0gJ2hpdCcgPyAnaGl0JyA6ICdlJztcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGlkPVwiJHtpZH1cIiBkYXRhLXg9XCIke3JJfVwiIGRhdGEteT1cIiR7Y0l9XCI+JHtcbiAgICAgICAgdHlwZW9mIGNlbGwgPT09ICdvYmplY3QnID8gJ3NoaXAnIDogY2VsbFxuICAgICAgfTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyT25lQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPVxuICAgICAgICB0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcgfHwgY2VsbCA9PT0gJydcbiAgICAgICAgICA/ICcnXG4gICAgICAgICAgOiBjZWxsID09PSAnaGl0J1xuICAgICAgICAgID8gJ2hpdCdcbiAgICAgICAgICA6ICdtaXNzJztcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBQbGF5ZXJUd29Cb2FyZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmRpc3BsYXlCb2FyZHMoKTtcbi8vIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4vLyBQbGF5ZXJPbmVCb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcbi8vICAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IHBsYXllck9uZSkgcmV0dXJuO1xuLy8gICBjb25zdCBbeCwgeV0gPSBbZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnldO1xuLy8gICBjb25zdCBib2FyZCA9IHBsYXllck9uZS5ib2FyZDtcbi8vICAgYm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuLy8gICBQbGF5ZXJPbmVCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuLy8gICBQbGF5ZXJUd29Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuLy8gICBkaXNwbGF5Qm9hcmRzKCk7XG4vLyAgIGNvbnNvbGUubG9nKHBsYXllck9uZS5ib2FyZCk7XG4vLyB9KTtcblxuUGxheWVyVHdvQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyVHdvKSByZXR1cm47XG4gIGNvbnN0IFt4LCB5XSA9IFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV07XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyVHdvLmJvYXJkO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIFBsYXllck9uZUJvYXJkLmlubmVySFRNTCA9ICcnO1xuICBQbGF5ZXJUd29Cb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgZGlzcGxheUJvYXJkcygpO1xuICBjb25zb2xlLmxvZyhwbGF5ZXJUd28uYm9hcmQpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=