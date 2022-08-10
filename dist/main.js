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
  setTimeout(() => botMove(), 500);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtQkFBbUI7Ozs7Ozs7Ozs7O0FDN0JuQjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbEJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRztBQUMvRTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0RBQWtELEdBQUcsWUFBWSxHQUFHLElBQUksUUFBUTtBQUNoRjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAuanMnKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gJycpIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcCwgY29yZHMsIGRpcmVjdGlvbikge1xyXG4gICAgbGV0IFt4LCB5XSA9IGNvcmRzO1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnaCc6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwWydsZW4nXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3YnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NoaXBzKCkge1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuc2hpcHMucmVkdWNlKChzdW0sIHNoaXApID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIChzaGlwLmlzU3VuaygpID8gMCA6IDEpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcclxuIiwiY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFpIGV4dGVuZHMgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICBzdXBlcihuYW1lKTtcclxuICAgIHRoaXMucHJldlNob3RzID0gW107XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdChib2FyZCkge1xyXG4gICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2VuQ29vcmRzKCk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMucHJldlNob3RzLmluY2x1ZGVzKGNvb3Jkcy5qb2luKFwiXCIpKSkge1xyXG4gICAgICBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldlNob3RzLnB1c2goY29vcmRzLmpvaW4oXCJcIikpO1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gIH1cclxuXHJcbiAgZ2VuQ29vcmRzKCkge1xyXG4gICAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgUGxheWVyLCBBaSB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW4pIHtcclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG4gIH1cclxuXHJcbiAgaGl0KCkge1xyXG4gICAgdGhpcy5sZW4tLTtcclxuICB9XHJcblxyXG4gIGlzU3VuaygpIHtcclxuICAgIGlmICh0aGlzLmxlbiA+IDApIHtcclxuICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IFNoaXA7XHJcbiIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCJjb25zdCBHYW1lQm9hcmQgPSByZXF1aXJlKFwiLi9nYW1lYm9hcmRcIik7XG5jb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcFwiKTtcbmNvbnN0IHsgUGxheWVyLCBBaSB9ID0gcmVxdWlyZShcIi4vcGxheWVyXCIpO1xuXG4vLyBHZXQgRG9tIGVsZW1lbnRzLlxuY29uc3QgUGxheWVyT25lTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMSAubmFtZVwiKTtcbmNvbnN0IFBsYXllck9uZU1zZyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMSAubXNnXCIpO1xuY29uc3QgUGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEgLmJvYXJkXCIpO1xuXG5jb25zdCBQbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyIC5uYW1lXCIpO1xuY29uc3QgUGxheWVyVHdvTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyIC5tc2dcIik7XG5jb25zdCBQbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMiAuYm9hcmRcIik7XG5cbi8vIEdsb2JhbCBWYXJpYWJsZXMuXG5sZXQgY3VycmVudFBsYXllcjtcblxuLy8gQ3JlYXRlIFBsYXllciBhbmQgQWkuXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKFwiQ2FwdGFpblwiKTtcblBsYXllck9uZU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJPbmUubmFtZTtcblxuY29uc3QgcGxheWVyVHdvID0gbmV3IEFpKFwiQm90XCIpO1xuUGxheWVyVHdvTmFtZS50ZXh0Q29udGVudCA9IHBsYXllclR3by5uYW1lO1xuXG4vLyBDcmVhdGUgQm9hcmRzLlxucGxheWVyT25lLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xucGxheWVyVHdvLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuXG4vLyBDcmVhdGUgc2hpcHMgYW5kIHBsYWNlIHRoZW0uXG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDUpLCBbMCwgMF0sIFwiaFwiKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNCksIFsyLCAwXSwgXCJ2XCIpO1xucGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzAsIDldLCBcInZcIik7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbNSwgNV0sIFwiaFwiKTtcbnBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMiksIFs4LCA1XSwgXCJ2XCIpO1xuXG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDUpLCBbMywgMV0sIFwiaFwiKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNCksIFsyLCAwXSwgXCJ2XCIpO1xucGxheWVyVHdvLmJvYXJkLnBsYWNlU2hpcChuZXcgU2hpcCgzKSwgWzAsIDldLCBcInZcIik7XG5wbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbNywgNF0sIFwiaFwiKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMiksIFs3LCAyXSwgXCJ2XCIpO1xuXG4vLyBEaXNwbGF5IHRoZSBib2FyZHNcbmNvbnN0IGRpc3BsYXlCb2FyZHMgPSBmdW5jdGlvbiAoKSB7XG4gIGxldCBib2FyZCA9IHBsYXllck9uZS5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgbGV0IGlkID0gdHlwZW9mIGNlbGwgPT09IFwib2JqZWN0XCIgPyBcInNoaXBcIiA6IGNlbGwgPT09IFwiaGl0XCIgPyBcImhpdFwiIDogXCJlXCI7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gXCJoaXRcIiB8fCBjZWxsID09PSBcIm1pc3NcIiA/IGNlbGwgOiBcIlwiO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke1xuICAgICAgICB0eXBlb2YgY2VsbCA9PT0gXCJvYmplY3RcIiA/IFwic2hpcFwiIDogY29udGVudFxuICAgICAgfTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyT25lQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBib2FyZCA9IHBsYXllclR3by5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09IFwiaGl0XCIgfHwgY2VsbCA9PT0gXCJtaXNzXCIgPyBjZWxsIDogXCJcIjtcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke2NvbnRlbnR9PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBQbGF5ZXJUd29Cb2FyZC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIFBsYXllck9uZUJvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gIFBsYXllclR3b0JvYXJkLmlubmVySFRNTCA9IFwiXCI7XG4gIGRpc3BsYXlCb2FyZHMoKTtcbn07XG5cbmRpc3BsYXlCb2FyZHMoKTtcblxuLy8gUExheWVyIG1vdmVzLlxuUGxheWVyVHdvQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIChlKSA9PiB7XG4gIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXJUd28pIHJldHVybjtcbiAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ICE9PSBcIlwiKSByZXR1cm47XG4gIGNvbnN0IFt4LCB5XSA9IFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV07XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyVHdvLmJvYXJkO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIHVwZGF0ZUJvYXJkKCk7XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIHNldFRpbWVvdXQoKCkgPT4gYm90TW92ZSgpLCA1MDApO1xuICBjb25zb2xlLmxvZyhib2FyZCk7XG59KTtcblxuLy8gQWkgU2hvdC9cbmNvbnN0IGJvdE1vdmUgPSBmdW5jdGlvbiAoKSB7XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyT25lLmJvYXJkO1xuICAvLyBjb25zb2xlLmxvZyhib2FyZCk7XG4gIHBsYXllclR3by50YWtlU2hvdChib2FyZCk7XG4gIHVwZGF0ZUJvYXJkKCk7XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=