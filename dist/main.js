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
const PlayerOneName = document.querySelector(".player1 .name");
const PlayerOneMsg = document.querySelector(".player1 .msg");
const PlayerOneBoard = document.querySelector(".player1 .board");

const PlayerTwoName = document.querySelector(".player2 .name");
const PlayerTwoMsg = document.querySelector(".player2 .msg");
const PlayerTwoBoard = document.querySelector(".player2 .board");

// Global Variables.
let currentPlayer;

// Create Player and Ai.
const playerOne = new Player("Captain");
PlayerOneName.textContent = playerOne.name;

const playerTwo = new Ai("Bot");
PlayerTwoName.textContent = playerTwo.name;

// Create Boards.
playerOne.board = new GameBoard();
playerTwo.board = new GameBoard();

// Create ships and place them.
playerOne.board.placeShip(new Ship(5), [0, 0], "h");
playerOne.board.placeShip(new Ship(4), [2, 0], "v");
playerOne.board.placeShip(new Ship(3), [0, 9], "v");
playerOne.board.placeShip(new Ship(3), [5, 5], "h");
playerOne.board.placeShip(new Ship(2), [8, 5], "v");
console.log(playerOne.board);
playerOne.board.receiveAttack([8, 5]);
playerOne.board.receiveAttack([9, 5]);
console.log(playerOne.board);

playerTwo.board.placeShip(new Ship(5), [3, 1], "h");
playerTwo.board.placeShip(new Ship(4), [2, 0], "v");
playerTwo.board.placeShip(new Ship(3), [0, 9], "v");
playerTwo.board.placeShip(new Ship(3), [7, 4], "h");
playerTwo.board.placeShip(new Ship(2), [7, 2], "v");
// console.log(playerTwo.board);

// Display the boards
const displayBoards = function () {
  let board = playerOne.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id = typeof cell === "object" ? "ship" : cell === "hit" ? "hit" : "e";
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${
        typeof cell === "object" ? "ship" : cell
      }</div>
      `;

      PlayerOneBoard.insertAdjacentHTML("beforeend", html);
    });
  });

  board = playerTwo.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      const content =
        typeof cell === "object" || cell === ""
          ? ""
          : cell === "hit"
          ? "hit"
          : "miss";
      const html = `  <div class="cell" data-x="${rI}" data-y="${cI}">${content}</div>
      `;

      PlayerTwoBoard.insertAdjacentHTML("beforeend", html);
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

PlayerTwoBoard.addEventListener("click", (e) => {
  if (currentPlayer === playerTwo) return;
  const [x, y] = [e.target.dataset.x, e.target.dataset.y];
  const board = playerTwo.board;
  board.receiveAttack([x, y]);
  PlayerOneBoard.innerHTML = "";
  PlayerTwoBoard.innerHTML = "";
  displayBoards();
  console.log(playerTwo.board);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx3QkFBd0IsaUJBQWlCO0FBQ3pDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDeEJuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHO0FBQy9FO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELEdBQUcsWUFBWSxHQUFHLElBQUksUUFBUTtBQUNoRjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7O0FBRUo7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU2hpcCA9IHJlcXVpcmUoJy4vc2hpcC5qcycpO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2hpcHMgPSBbXTtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLmNhbGNTaGlwcztcclxuICAgIHRoaXMubWlzc2VkID0gW107XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29yZHMpIHtcclxuICAgIGNvbnN0IFt4LCB5XSA9IGNvcmRzO1xyXG4gICAgaWYgKHRoaXMuYm9hcmRbeF1beV0gIT09ICcnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWlzc2VkLnB1c2goY29yZHMpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIGNvcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb3JkcztcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2gnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB5Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2JzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcclxuICB9XHJcblxyXG4gIGNhbGNTaGlwcygpIHtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLnNoaXBzLnJlZHVjZSgoc3VtLCBzaGlwKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdW0gKyAoc2hpcC5pc1N1bmsoKSA/IDAgOiAxKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XHJcbiIsImNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQ7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBaSBleHRlbmRzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgc3VwZXIobmFtZSk7XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdChib2FyZCkge1xyXG4gICAgbGV0IFt4LCB5XSA9IFtcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxyXG4gICAgICBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksXHJcbiAgICBdO1xyXG5cclxuICAgIGlmIChib2FyZFt4XVt5XSA9PT0gJ21pc3MnIHx8IGJvYXJkW3hbeV1dID09PSAnaGl0JykgdGhpcy50YWtlU2hvdCgpO1xyXG5cclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0geyBQbGF5ZXIsIEFpIH07XHJcbiIsImNsYXNzIFNoaXAge1xyXG4gIGNvbnN0cnVjdG9yKGxlbikge1xyXG4gICAgdGhpcy5sZW4gPSBsZW47XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmxlbi0tO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMubGVuID4gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsImNvbnN0IEdhbWVCb2FyZCA9IHJlcXVpcmUoXCIuL2dhbWVib2FyZFwiKTtcbmNvbnN0IFNoaXAgPSByZXF1aXJlKFwiLi9zaGlwXCIpO1xuY29uc3QgeyBQbGF5ZXIsIEFpIH0gPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XG5cbi8vIEdldCBEb20gZWxlbWVudHMuXG5jb25zdCBQbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxIC5uYW1lXCIpO1xuY29uc3QgUGxheWVyT25lTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxIC5tc2dcIik7XG5jb25zdCBQbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMSAuYm9hcmRcIik7XG5cbmNvbnN0IFBsYXllclR3b05hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjIgLm5hbWVcIik7XG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjIgLm1zZ1wiKTtcbmNvbnN0IFBsYXllclR3b0JvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyIC5ib2FyZFwiKTtcblxuLy8gR2xvYmFsIFZhcmlhYmxlcy5cbmxldCBjdXJyZW50UGxheWVyO1xuXG4vLyBDcmVhdGUgUGxheWVyIGFuZCBBaS5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoXCJDYXB0YWluXCIpO1xuUGxheWVyT25lTmFtZS50ZXh0Q29udGVudCA9IHBsYXllck9uZS5uYW1lO1xuXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgQWkoXCJCb3RcIik7XG5QbGF5ZXJUd29OYW1lLnRleHRDb250ZW50ID0gcGxheWVyVHdvLm5hbWU7XG5cbi8vIENyZWF0ZSBCb2FyZHMuXG5wbGF5ZXJPbmUuYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG5wbGF5ZXJUd28uYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XG5cbi8vIENyZWF0ZSBzaGlwcyBhbmQgcGxhY2UgdGhlbS5cbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNSksIFswLCAwXSwgXCJoXCIpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCg0KSwgWzIsIDBdLCBcInZcIik7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbMCwgOV0sIFwidlwiKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFs1LCA1XSwgXCJoXCIpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgyKSwgWzgsIDVdLCBcInZcIik7XG5jb25zb2xlLmxvZyhwbGF5ZXJPbmUuYm9hcmQpO1xucGxheWVyT25lLmJvYXJkLnJlY2VpdmVBdHRhY2soWzgsIDVdKTtcbnBsYXllck9uZS5ib2FyZC5yZWNlaXZlQXR0YWNrKFs5LCA1XSk7XG5jb25zb2xlLmxvZyhwbGF5ZXJPbmUuYm9hcmQpO1xuXG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDUpLCBbMywgMV0sIFwiaFwiKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNCksIFsyLCAwXSwgXCJ2XCIpO1xucGxheWVyVHdvLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzAsIDldLCBcInZcIik7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbNywgNF0sIFwiaFwiKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMiksIFs3LCAyXSwgXCJ2XCIpO1xuLy8gY29uc29sZS5sb2cocGxheWVyVHdvLmJvYXJkKTtcblxuLy8gRGlzcGxheSB0aGUgYm9hcmRzXG5jb25zdCBkaXNwbGF5Qm9hcmRzID0gZnVuY3Rpb24gKCkge1xuICBsZXQgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9IHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiID8gXCJzaGlwXCIgOiBjZWxsID09PSBcImhpdFwiID8gXCJoaXRcIiA6IFwiZVwiO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke1xuICAgICAgICB0eXBlb2YgY2VsbCA9PT0gXCJvYmplY3RcIiA/IFwic2hpcFwiIDogY2VsbFxuICAgICAgfTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyT25lQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBib2FyZCA9IHBsYXllclR3by5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9XG4gICAgICAgIHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiIHx8IGNlbGwgPT09IFwiXCJcbiAgICAgICAgICA/IFwiXCJcbiAgICAgICAgICA6IGNlbGwgPT09IFwiaGl0XCJcbiAgICAgICAgICA/IFwiaGl0XCJcbiAgICAgICAgICA6IFwibWlzc1wiO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgZGF0YS14PVwiJHtySX1cIiBkYXRhLXk9XCIke2NJfVwiPiR7Y29udGVudH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllclR3b0JvYXJkLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG59O1xuXG5kaXNwbGF5Qm9hcmRzKCk7XG4vLyBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuLy8gUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4vLyAgIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXJPbmUpIHJldHVybjtcbi8vICAgY29uc3QgW3gsIHldID0gW2UudGFyZ2V0LmRhdGFzZXQueCwgZS50YXJnZXQuZGF0YXNldC55XTtcbi8vICAgY29uc3QgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQ7XG4vLyAgIGJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcbi8vICAgUGxheWVyT25lQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbi8vICAgUGxheWVyVHdvQm9hcmQuaW5uZXJIVE1MID0gXCJcIjtcbi8vICAgZGlzcGxheUJvYXJkcygpO1xuLy8gICBjb25zb2xlLmxvZyhwbGF5ZXJPbmUuYm9hcmQpO1xuLy8gfSk7XG5cblBsYXllclR3b0JvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyVHdvKSByZXR1cm47XG4gIGNvbnN0IFt4LCB5XSA9IFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV07XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyVHdvLmJvYXJkO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIFBsYXllck9uZUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gIFBsYXllclR3b0JvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gIGRpc3BsYXlCb2FyZHMoKTtcbiAgY29uc29sZS5sb2cocGxheWVyVHdvLmJvYXJkKTtcbn0pO1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9