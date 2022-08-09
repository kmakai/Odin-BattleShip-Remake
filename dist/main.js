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
    if (this.board[x][y] !== '') {
      this.board[x][y].hit();
      this.board[x][y] = 'hit';
      this.calcShips();
    } else {
      this.missed.push(cords);
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
const playerOne = new Player('Player');
const playerTwo = new Ai('Bot');

// Create Boards.
playerOne.board = new GameBoard();
playerTwo.board = new GameBoard();

// Create ships and place them.
playerOne.board.placeShip(new Ship(5), [0, 0], 'h');
playerOne.board.placeShip(new Ship(4), [2, 0], 'v');
playerOne.board.placeShip(new Ship(3), [0, 9], 'v');
playerOne.board.placeShip(new Ship(3), [5, 5], 'h');
playerOne.board.placeShip(new Ship(2), [8, 5], 'v');
console.log(playerOne.board);

playerTwo.board.placeShip(new Ship(5), [0, 0], 'h');
playerTwo.board.placeShip(new Ship(4), [2, 0], 'v');
playerTwo.board.placeShip(new Ship(3), [0, 9], 'v');
playerTwo.board.placeShip(new Ship(3), [5, 5], 'h');
playerTwo.board.placeShip(new Ship(2), [8, 5], 'v');
console.log(playerTwo.board);


const displayBoard = function(player){
  player.board.forEach((row, rI)=>{
    row.forEach((cell, cI)=> {
      const html = `  <div class="cell" data-x="${rI}" data-y="${cI}"></div>
      `
    })
  })
}
})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQ3hCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsa0JBQWtCLG1CQUFPLENBQUMsdUNBQWE7QUFDdkMsYUFBYSxtQkFBTyxDQUFDLDZCQUFRO0FBQzdCLFFBQVEsYUFBYSxFQUFFLG1CQUFPLENBQUMsaUNBQVU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsR0FBRyxZQUFZLEdBQUc7QUFDcEU7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNILEMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAuanMnKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLm1pc3NlZCA9IFtdO1xyXG4gICAgdGhpcy5ib2FyZCA9IFtcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvcmRzKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBjb3JkcztcclxuICAgIGlmICh0aGlzLmJvYXJkW3hdW3ldICE9PSAnJykge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XHJcbiAgICAgIHRoaXMuY2FsY1NoaXBzKCk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLm1pc3NlZC5wdXNoKGNvcmRzKTtcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChzaGlwLCBjb3JkcywgZGlyZWN0aW9uKSB7XHJcbiAgICBsZXQgW3gsIHldID0gY29yZHM7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdoJzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndic6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwWydsZW4nXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XHJcbiAgfVxyXG5cclxuICBjYWxjU2hpcHMoKSB7XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5zaGlwcy5yZWR1Y2UoKHN1bSwgc2hpcCkgPT4ge1xyXG4gICAgICByZXR1cm4gc3VtICsgKHNoaXAuaXNTdW5rKCkgPyAwIDogMSk7XHJcbiAgICB9LCAwKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gR2FtZWJvYXJkO1xyXG4iLCJjbGFzcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHRoaXMubmFtZSA9IG5hbWU7XHJcbiAgICB0aGlzLmJvYXJkO1xyXG4gIH1cclxufVxyXG5cclxuY2xhc3MgQWkgZXh0ZW5kcyBQbGF5ZXIge1xyXG4gIGNvbnN0cnVjdG9yKG5hbWUpIHtcclxuICAgIHN1cGVyKG5hbWUpO1xyXG4gIH1cclxuXHJcbiAgdGFrZVNob3QoYm9hcmQpIHtcclxuICAgIGxldCBbeCwgeV0gPSBbXHJcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxyXG4gICAgXTtcclxuXHJcbiAgICBpZiAoYm9hcmRbeF1beV0gPT09ICdtaXNzJyB8fCBib2FyZFt4W3ldXSA9PT0gJ2hpdCcpIHRoaXMudGFrZVNob3QoKTtcclxuXHJcbiAgICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgUGxheWVyLCBBaSB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW4pIHtcclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5sZW4tLTtcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmxlbiA+IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJjb25zdCBHYW1lQm9hcmQgPSByZXF1aXJlKCcuL2dhbWVib2FyZCcpO1xuY29uc3QgU2hpcCA9IHJlcXVpcmUoJy4vc2hpcCcpO1xuY29uc3QgeyBQbGF5ZXIsIEFpIH0gPSByZXF1aXJlKCcuL3BsYXllcicpO1xuXG4vLyBHZXQgRG9tIGVsZW1lbnRzLlxuY29uc3QgUGxheWVyT25lTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJPbmVNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAubXNnJyk7XG5jb25zdCBQbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5ib2FyZCcpO1xuXG5jb25zdCBQbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjIgLm5hbWUnKTtcbmNvbnN0IFBsYXllclR3b01zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5tc2cnKTtcbmNvbnN0IFBsYXllclR3b0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjIgLmJvYXJkJyk7XG5cbi8vIEdsb2JhbCBWYXJpYWJsZXMuXG5sZXQgY3VycmVudFBsYXllcjtcblxuLy8gQ3JlYXRlIFBsYXllciBhbmQgQWkuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKCdQbGF5ZXInKTtcbmNvbnN0IHBsYXllclR3byA9IG5ldyBBaSgnQm90Jyk7XG5cbi8vIENyZWF0ZSBCb2FyZHMuXG5wbGF5ZXJPbmUuYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG5wbGF5ZXJUd28uYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG5cbi8vIENyZWF0ZSBzaGlwcyBhbmQgcGxhY2UgdGhlbS5cbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNSksIFswLCAwXSwgJ2gnKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNCksIFsyLCAwXSwgJ3YnKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFswLCA5XSwgJ3YnKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFs1LCA1XSwgJ2gnKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMiksIFs4LCA1XSwgJ3YnKTtcbmNvbnNvbGUubG9nKHBsYXllck9uZS5ib2FyZCk7XG5cbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNSksIFswLCAwXSwgJ2gnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNCksIFsyLCAwXSwgJ3YnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFswLCA5XSwgJ3YnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFs1LCA1XSwgJ2gnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMiksIFs4LCA1XSwgJ3YnKTtcbmNvbnNvbGUubG9nKHBsYXllclR3by5ib2FyZCk7XG5cblxuY29uc3QgZGlzcGxheUJvYXJkID0gZnVuY3Rpb24ocGxheWVyKXtcbiAgcGxheWVyLmJvYXJkLmZvckVhY2goKHJvdywgckkpPT57XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGNJKT0+IHtcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj48L2Rpdj5cbiAgICAgIGBcbiAgICB9KVxuICB9KVxufSJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==