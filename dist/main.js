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

    console.log(this.prevShots);
    this.prevShots.push(coords.join(""));
    console.log(this.prevShots);
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

playerTwo.board.placeShip(new Ship(5), [3, 1], "h");
playerTwo.board.placeShip(new Ship(4), [2, 0], "v");
playerTwo.board.placeShip(new Ship(3), [0, 9], "v");
playerTwo.board.placeShip(new Ship(3), [7, 4], "h");
playerTwo.board.placeShip(new Ship(2), [7, 2], "v");

// Display the boards
const displayBoards = function () {
  let board = playerOne.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id = typeof cell === "object" ? "ship" : cell === "hit" ? "hit" : "e";
      const content = cell === "hit" || cell === "miss" ? cell : "";
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${
        typeof cell === "object" ? "ship" : content
      }</div>
      `;

      PlayerOneBoard.insertAdjacentHTML("beforeend", html);
    });
  });

  board = playerTwo.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      const content = cell === "hit" || cell === "miss" ? cell : "";
      const html = `  <div class="cell" data-x="${rI}" data-y="${cI}">${content}</div>
      `;

      PlayerTwoBoard.insertAdjacentHTML("beforeend", html);
    });
  });
};

const updateBoard = function () {
  PlayerOneBoard.innerHTML = "";
  PlayerTwoBoard.innerHTML = "";
  displayBoards();
};

displayBoards();

// PLayer moves.
PlayerTwoBoard.addEventListener("click", (e) => {
  if (currentPlayer === playerTwo) return;
  if (e.target.textContent !== "") return;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQy9CbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsa0JBQWtCLG1CQUFPLENBQUMsdUNBQWE7QUFDdkMsYUFBYSxtQkFBTyxDQUFDLDZCQUFRO0FBQzdCLFFBQVEsYUFBYSxFQUFFLG1CQUFPLENBQUMsaUNBQVU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxHQUFHLFlBQVksR0FBRyxZQUFZLEdBQUc7QUFDL0U7QUFDQSxPQUFPO0FBQ1A7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRzs7QUFFSDtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtEQUFrRCxHQUFHLFlBQVksR0FBRyxJQUFJLFFBQVE7QUFDaEY7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9wbGF5ZXIuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwLmpzJyk7XHJcblxyXG5jbGFzcyBHYW1lYm9hcmQge1xyXG4gIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgdGhpcy5zaGlwcyA9IFtdO1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuY2FsY1NoaXBzO1xyXG4gICAgdGhpcy5ib2FyZCA9IFtcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgICAgWycnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnXSxcclxuICAgIF07XHJcbiAgfVxyXG5cclxuICByZWNlaXZlQXR0YWNrKGNvb3Jkcykge1xyXG4gICAgY29uc3QgW3gsIHldID0gY29vcmRzO1xyXG4gICAgaWYgKHR5cGVvZiB0aGlzLmJvYXJkW3hdW3ldID09PSAnb2JqZWN0Jykge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ2hpdCc7XHJcbiAgICAgIHRoaXMuY2FsY1NoaXBzKCk7XHJcbiAgICB9IGVsc2UgaWYgKHRoaXMuYm9hcmRbeF1beV0gPT09ICcnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnbWlzcyc7XHJcbiAgICB9IFxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIGNvcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb3JkcztcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2gnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB5Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2JzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcclxuICB9XHJcblxyXG4gIGNhbGNTaGlwcygpIHtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLnNoaXBzLnJlZHVjZSgoc3VtLCBzaGlwKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdW0gKyAoc2hpcC5pc1N1bmsoKSA/IDAgOiAxKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XHJcbiIsImNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQ7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBaSBleHRlbmRzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgc3VwZXIobmFtZSk7XHJcbiAgICB0aGlzLnByZXZTaG90cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdGFrZVNob3QoYm9hcmQpIHtcclxuICAgIGxldCBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnByZXZTaG90cy5pbmNsdWRlcyhjb29yZHMuam9pbihcIlwiKSkpIHtcclxuICAgICAgY29vcmRzID0gdGhpcy5nZW5Db29yZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zb2xlLmxvZyh0aGlzLnByZXZTaG90cyk7XHJcbiAgICB0aGlzLnByZXZTaG90cy5wdXNoKGNvb3Jkcy5qb2luKFwiXCIpKTtcclxuICAgIGNvbnNvbGUubG9nKHRoaXMucHJldlNob3RzKTtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcclxuICB9XHJcblxyXG4gIGdlbkNvb3JkcygpIHtcclxuICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IFBsYXllciwgQWkgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuKSB7XHJcbiAgICB0aGlzLmxlbiA9IGxlbjtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMubGVuLS07XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5sZW4gPiAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgR2FtZUJvYXJkID0gcmVxdWlyZShcIi4vZ2FtZWJvYXJkXCIpO1xuY29uc3QgU2hpcCA9IHJlcXVpcmUoXCIuL3NoaXBcIik7XG5jb25zdCB7IFBsYXllciwgQWkgfSA9IHJlcXVpcmUoXCIuL3BsYXllclwiKTtcblxuLy8gR2V0IERvbSBlbGVtZW50cy5cbmNvbnN0IFBsYXllck9uZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEgLm5hbWVcIik7XG5jb25zdCBQbGF5ZXJPbmVNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEgLm1zZ1wiKTtcbmNvbnN0IFBsYXllck9uZUJvYXJkID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxIC5ib2FyZFwiKTtcblxuY29uc3QgUGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMiAubmFtZVwiKTtcbmNvbnN0IFBsYXllclR3b01zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMiAubXNnXCIpO1xuY29uc3QgUGxheWVyVHdvQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjIgLmJvYXJkXCIpO1xuXG4vLyBHbG9iYWwgVmFyaWFibGVzLlxubGV0IGN1cnJlbnRQbGF5ZXI7XG5cbi8vIENyZWF0ZSBQbGF5ZXIgYW5kIEFpLlxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcihcIkNhcHRhaW5cIik7XG5QbGF5ZXJPbmVOYW1lLnRleHRDb250ZW50ID0gcGxheWVyT25lLm5hbWU7XG5cbmNvbnN0IHBsYXllclR3byA9IG5ldyBBaShcIkJvdFwiKTtcblBsYXllclR3b05hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJUd28ubmFtZTtcblxuLy8gQ3JlYXRlIEJvYXJkcy5cbnBsYXllck9uZS5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcbnBsYXllclR3by5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcblxuLy8gQ3JlYXRlIHNoaXBzIGFuZCBwbGFjZSB0aGVtLlxucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCg1KSwgWzAsIDBdLCBcImhcIik7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDQpLCBbMiwgMF0sIFwidlwiKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFswLCA5XSwgXCJ2XCIpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzUsIDVdLCBcImhcIik7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDIpLCBbOCwgNV0sIFwidlwiKTtcblxucGxheWVyVHdvLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCg1KSwgWzMsIDFdLCBcImhcIik7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDQpLCBbMiwgMF0sIFwidlwiKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFswLCA5XSwgXCJ2XCIpO1xucGxheWVyVHdvLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzcsIDRdLCBcImhcIik7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDIpLCBbNywgMl0sIFwidlwiKTtcblxuLy8gRGlzcGxheSB0aGUgYm9hcmRzXG5jb25zdCBkaXNwbGF5Qm9hcmRzID0gZnVuY3Rpb24gKCkge1xuICBsZXQgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9IHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiID8gXCJzaGlwXCIgOiBjZWxsID09PSBcImhpdFwiID8gXCJoaXRcIiA6IFwiZVwiO1xuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09IFwiaGl0XCIgfHwgY2VsbCA9PT0gXCJtaXNzXCIgPyBjZWxsIDogXCJcIjtcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGlkPVwiJHtpZH1cIiBkYXRhLXg9XCIke3JJfVwiIGRhdGEteT1cIiR7Y0l9XCI+JHtcbiAgICAgICAgdHlwZW9mIGNlbGwgPT09IFwib2JqZWN0XCIgPyBcInNoaXBcIiA6IGNvbnRlbnRcbiAgICAgIH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllck9uZUJvYXJkLmluc2VydEFkamFjZW50SFRNTChcImJlZm9yZWVuZFwiLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjZWxsID09PSBcImhpdFwiIHx8IGNlbGwgPT09IFwibWlzc1wiID8gY2VsbCA6IFwiXCI7XG4gICAgICBjb25zdCBodG1sID0gYCAgPGRpdiBjbGFzcz1cImNlbGxcIiBkYXRhLXg9XCIke3JJfVwiIGRhdGEteT1cIiR7Y0l9XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyVHdvQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcbn07XG5cbmNvbnN0IHVwZGF0ZUJvYXJkID0gZnVuY3Rpb24gKCkge1xuICBQbGF5ZXJPbmVCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICBQbGF5ZXJUd29Cb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xuICBkaXNwbGF5Qm9hcmRzKCk7XG59O1xuXG5kaXNwbGF5Qm9hcmRzKCk7XG5cbi8vIFBMYXllciBtb3Zlcy5cblBsYXllclR3b0JvYXJkLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoZSkgPT4ge1xuICBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyVHdvKSByZXR1cm47XG4gIGlmIChlLnRhcmdldC50ZXh0Q29udGVudCAhPT0gXCJcIikgcmV0dXJuO1xuICBjb25zdCBbeCwgeV0gPSBbZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnldO1xuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZDtcbiAgYm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICB1cGRhdGVCb2FyZCgpO1xuICBjdXJyZW50UGxheWVyID0gcGxheWVyVHdvO1xuICBzZXRUaW1lb3V0KCgpID0+IGJvdE1vdmUoKSwgMCk7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn0pO1xuXG4vLyBBaSBTaG90L1xuY29uc3QgYm90TW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQ7XG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgcGxheWVyVHdvLnRha2VTaG90KGJvYXJkKTtcbiAgdXBkYXRlQm9hcmQoKTtcbiAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgY29uc29sZS5sb2coYm9hcmQpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==