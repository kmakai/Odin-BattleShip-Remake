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

  takeShot() {
    let [x, y] = [
      Math.floor(Math.random() * 10),
      Math.floor(Math.random() * 10),
    ];
    const coords = [x, y];
    if(this.prevShots.includes(coords.join(''))) this.takeShot();

    this.prevShots.push(coords.join(''))

    return coords;
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

// Display the boards
const displayBoards = function () {
  let board = playerOne.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id = typeof cell === 'object' ? 'ship' : cell === 'hit' ? 'hit' : 'e';
      const content = cell === 'hit' || cell === 'miss' ? cell : '';
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${typeof cell === 'object' ? "ship" : content}</div>
      `;

      PlayerOneBoard.insertAdjacentHTML('beforeend', html);
    });
  });

  board = playerTwo.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      const content = cell === 'hit' || cell === 'miss' ? cell : '';
      const html = `  <div class="cell" data-x="${rI}" data-y="${cI}">${content}</div>
      `;

      PlayerTwoBoard.insertAdjacentHTML('beforeend', html);
    });
  });
};

const updateBoard = function () {
  PlayerOneBoard.innerHTML = '';
  PlayerTwoBoard.innerHTML = '';
  displayBoards();
};

displayBoards();

// PLayer moves.
PlayerTwoBoard.addEventListener('click', (e) => {
  if (currentPlayer === playerTwo) return;
  const [x, y] = [e.target.dataset.x, e.target.dataset.y];
  const board = playerTwo.board;
  board.receiveAttack([x, y]);
  updateBoard();
  currentPlayer = playerTwo;
  setTimeout(() => botMove(), 800);
  console.log(board);
});

// Ai Shot/
const botMove = function () {
  const board = playerOne.board;
  const [x, y] = playerTwo.takeShot();
  board.receiveAttack([x, y]);
  updateBoard();
  currentPlayer = playerOne;
  console.log(board);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7Ozs7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLG1CQUFtQjs7Ozs7Ozs7Ozs7QUMzQm5CO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7VUNsQkE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7Ozs7O0FDdEJBLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDLGFBQWEsbUJBQU8sQ0FBQyw2QkFBUTtBQUM3QixRQUFRLGFBQWEsRUFBRSxtQkFBTyxDQUFDLGlDQUFVOztBQUV6QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLElBQUksNENBQTRDO0FBQy9IOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrREFBa0QsR0FBRyxZQUFZLEdBQUcsSUFBSSxRQUFRO0FBQ2hGOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAuanMnKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gJycpIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcCwgY29yZHMsIGRpcmVjdGlvbikge1xyXG4gICAgbGV0IFt4LCB5XSA9IGNvcmRzO1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnaCc6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwWydsZW4nXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3YnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NoaXBzKCkge1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuc2hpcHMucmVkdWNlKChzdW0sIHNoaXApID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIChzaGlwLmlzU3VuaygpID8gMCA6IDEpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcclxuIiwiY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFpIGV4dGVuZHMgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICBzdXBlcihuYW1lKTtcclxuICAgIHRoaXMucHJldlNob3RzID0gW107XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdCgpIHtcclxuICAgIGxldCBbeCwgeV0gPSBbXHJcbiAgICAgIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKSxcclxuICAgICAgTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLFxyXG4gICAgXTtcclxuICAgIGNvbnN0IGNvb3JkcyA9IFt4LCB5XTtcclxuICAgIGlmKHRoaXMucHJldlNob3RzLmluY2x1ZGVzKGNvb3Jkcy5qb2luKCcnKSkpIHRoaXMudGFrZVNob3QoKTtcclxuXHJcbiAgICB0aGlzLnByZXZTaG90cy5wdXNoKGNvb3Jkcy5qb2luKCcnKSlcclxuXHJcbiAgICByZXR1cm4gY29vcmRzO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IFBsYXllciwgQWkgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuKSB7XHJcbiAgICB0aGlzLmxlbiA9IGxlbjtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMubGVuLS07XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5sZW4gPiAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgR2FtZUJvYXJkID0gcmVxdWlyZSgnLi9nYW1lYm9hcmQnKTtcbmNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAnKTtcbmNvbnN0IHsgUGxheWVyLCBBaSB9ID0gcmVxdWlyZSgnLi9wbGF5ZXInKTtcblxuLy8gR2V0IERvbSBlbGVtZW50cy5cbmNvbnN0IFBsYXllck9uZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAubmFtZScpO1xuY29uc3QgUGxheWVyT25lTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLm1zZycpO1xuY29uc3QgUGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAuYm9hcmQnKTtcblxuY29uc3QgUGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubXNnJyk7XG5jb25zdCBQbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5ib2FyZCcpO1xuXG4vLyBHbG9iYWwgVmFyaWFibGVzLlxubGV0IGN1cnJlbnRQbGF5ZXI7XG5cbi8vIENyZWF0ZSBQbGF5ZXIgYW5kIEFpLlxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FwdGFpbicpO1xuUGxheWVyT25lTmFtZS50ZXh0Q29udGVudCA9IHBsYXllck9uZS5uYW1lO1xuXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgQWkoJ0JvdCcpO1xuUGxheWVyVHdvTmFtZS50ZXh0Q29udGVudCA9IHBsYXllclR3by5uYW1lO1xuXG4vLyBDcmVhdGUgQm9hcmRzLlxucGxheWVyT25lLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xucGxheWVyVHdvLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuXG4vLyBDcmVhdGUgc2hpcHMgYW5kIHBsYWNlIHRoZW0uXG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDUpLCBbMCwgMF0sICdoJyk7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDQpLCBbMiwgMF0sICd2Jyk7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbMCwgOV0sICd2Jyk7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbNSwgNV0sICdoJyk7XG5wbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKG5ldyBTaGlwKDIpLCBbOCwgNV0sICd2Jyk7XG5cbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNSksIFszLCAxXSwgJ2gnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoNCksIFsyLCAwXSwgJ3YnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFswLCA5XSwgJ3YnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMyksIFs3LCA0XSwgJ2gnKTtcbnBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAobmV3IFNoaXAoMiksIFs3LCAyXSwgJ3YnKTtcblxuLy8gRGlzcGxheSB0aGUgYm9hcmRzXG5jb25zdCBkaXNwbGF5Qm9hcmRzID0gZnVuY3Rpb24gKCkge1xuICBsZXQgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9IHR5cGVvZiBjZWxsID09PSAnb2JqZWN0JyA/ICdzaGlwJyA6IGNlbGwgPT09ICdoaXQnID8gJ2hpdCcgOiAnZSc7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gJ2hpdCcgfHwgY2VsbCA9PT0gJ21pc3MnID8gY2VsbCA6ICcnO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke3R5cGVvZiBjZWxsID09PSAnb2JqZWN0JyA/IFwic2hpcFwiIDogY29udGVudH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllck9uZUJvYXJkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGJvYXJkID0gcGxheWVyVHdvLmJvYXJkLmJvYXJkO1xuICBib2FyZC5mb3JFYWNoKChyb3csIHJJKSA9PiB7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGNJKSA9PiB7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gJ2hpdCcgfHwgY2VsbCA9PT0gJ21pc3MnID8gY2VsbCA6ICcnO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgZGF0YS14PVwiJHtySX1cIiBkYXRhLXk9XCIke2NJfVwiPiR7Y29udGVudH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllclR3b0JvYXJkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XG4gICAgfSk7XG4gIH0pO1xufTtcblxuY29uc3QgdXBkYXRlQm9hcmQgPSBmdW5jdGlvbiAoKSB7XG4gIFBsYXllck9uZUJvYXJkLmlubmVySFRNTCA9ICcnO1xuICBQbGF5ZXJUd29Cb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgZGlzcGxheUJvYXJkcygpO1xufTtcblxuZGlzcGxheUJvYXJkcygpO1xuXG4vLyBQTGF5ZXIgbW92ZXMuXG5QbGF5ZXJUd29Cb2FyZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XG4gIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXJUd28pIHJldHVybjtcbiAgY29uc3QgW3gsIHldID0gW2UudGFyZ2V0LmRhdGFzZXQueCwgZS50YXJnZXQuZGF0YXNldC55XTtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQ7XG4gIGJvYXJkLnJlY2VpdmVBdHRhY2soW3gsIHldKTtcbiAgdXBkYXRlQm9hcmQoKTtcbiAgY3VycmVudFBsYXllciA9IHBsYXllclR3bztcbiAgc2V0VGltZW91dCgoKSA9PiBib3RNb3ZlKCksIDgwMCk7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn0pO1xuXG4vLyBBaSBTaG90L1xuY29uc3QgYm90TW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQ7XG4gIGNvbnN0IFt4LCB5XSA9IHBsYXllclR3by50YWtlU2hvdCgpO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIHVwZGF0ZUJvYXJkKCk7XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=