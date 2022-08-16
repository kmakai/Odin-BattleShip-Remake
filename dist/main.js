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
  PlayerOneMsg.textContent = `Active Ships: ${board.activeShips}`
  // console.log(board);
  playerTwo.takeShot(board);
  updateBoard();
  currentPlayer = playerOne;
  console.log(board);
};

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0EsOENBQThDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRyxJQUFJLFFBQVE7QUFDM0Y7O0FBRUE7QUFDQSxLQUFLO0FBQ0wsR0FBRztBQUNIOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBSTtBQUNKO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLGtCQUFrQjtBQUNoRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAuanMnKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gJycpIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcclxuICAgIH0gXHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcCwgY29yZHMsIGRpcmVjdGlvbikge1xyXG4gICAgbGV0IFt4LCB5XSA9IGNvcmRzO1xyXG4gICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcclxuICAgICAgY2FzZSAnaCc6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwWydsZW4nXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgJ3YnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NoaXBzKCkge1xyXG4gICAgbGV0IHN1bTtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLnNoaXBzLnJlZHVjZSgoc3VtLCBzaGlwKSA9PiB7XHJcbiAgICAgcmV0dXJuIHN1bSArIChzaGlwLmlzU3VuaygpID8gMCA6IDEpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcclxuIiwiY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFpIGV4dGVuZHMgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICBzdXBlcihuYW1lKTtcclxuICAgIHRoaXMucHJldlNob3RzID0gW107XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdChib2FyZCkge1xyXG4gICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2VuQ29vcmRzKCk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMucHJldlNob3RzLmluY2x1ZGVzKGNvb3Jkcy5qb2luKFwiXCIpKSkge1xyXG4gICAgICBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldlNob3RzLnB1c2goY29vcmRzLmpvaW4oXCJcIikpO1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gIH1cclxuXHJcbiAgZ2VuQ29vcmRzKCkge1xyXG4gICAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgUGxheWVyLCBBaSB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW4pIHtcclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2JztcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMubGVuLS07XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5sZW4gPiAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgR2FtZUJvYXJkID0gcmVxdWlyZSgnLi9nYW1lYm9hcmQnKTtcbmNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAnKTtcbmNvbnN0IHsgUGxheWVyLCBBaSB9ID0gcmVxdWlyZSgnLi9wbGF5ZXInKTtcblxuLy8gR2V0IERvbSBlbGVtZW50cy5cbmNvbnN0IFBsYXllck9uZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAubmFtZScpO1xuY29uc3QgUGxheWVyT25lTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLm1zZycpO1xuY29uc3QgUGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAuYm9hcmQnKTtcblxuY29uc3QgUGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubXNnJyk7XG5jb25zdCBQbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5ib2FyZCcpO1xuXG4vLyBHbG9iYWwgVmFyaWFibGVzLlxubGV0IGN1cnJlbnRQbGF5ZXI7XG5cbi8vIENyZWF0ZSBQbGF5ZXIgYW5kIEFpLlxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FwdGFpbicpO1xuUGxheWVyT25lTmFtZS50ZXh0Q29udGVudCA9IHBsYXllck9uZS5uYW1lO1xuXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgQWkoJ0JvdCcpO1xuUGxheWVyVHdvTmFtZS50ZXh0Q29udGVudCA9IHBsYXllclR3by5uYW1lO1xuXG4vLyBDcmVhdGUgQm9hcmRzLlxucGxheWVyT25lLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xucGxheWVyVHdvLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuXG5kaXNwbGF5Qm9hcmRzKCk7XG5cblxuLy8gUGxheWVyIDEgcGxhY2Ugc2hpc3BzLlxuY29uc3QgcHNoaXBzID0gW1xuICBuZXcgU2hpcCg1KSxcbiAgbmV3IFNoaXAoNCksXG4gIG5ldyBTaGlwKDMpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMiksXG5dO1xuXG5cblBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzISBcbiAgICBwcmVzcyAoc3BhY2UpIHRvIGNoYW5nZSBvcmllbnRhdGlvbmBcblxuXG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoc2hpcHMsIGUpIHtcbiAgaWYgKHNoaXBzID09PSBbXSkgcmV0dXJuO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgc2hpcDtcbiAgd2hpbGUgKGluZGV4IDwgc2hpcHMubGVuZ3RoKSB7XG4gICAgc2hpcCA9IHNoaXBzW2luZGV4XTtcbiAgICBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciBzaGlwcyEgXG4gICAgcHJlc3MgKHNwYWNlKSB0byBjaGFuZ2Ugb3JpZW50YXRpb25gXG4gICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJykge1xuICAgICAgc2hpcC5vcmllbnRhdGlvbiA9IHNoaXAub3JpZW50YXRpb24gPT09ICd2JyA/ICdoJyA6ICd2JztcbiAgICAgIHVwZGF0ZUJvYXJkKCk7XG4gICAgfVxuXG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkgcmV0dXJuO1xuXG4gICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgbGV0IHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgbGV0IGVsO1xuICAgIGNvbnN0IGNvbG9yID0gZS50eXBlID09PSAnbW91c2VvdXQnID8gJyNmZmYnIDogJ3JlZCc7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzaGlwLmxlbikge1xuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5wbGF5ZXIxIC5ib2FyZCBbZGF0YS14PScke3h9J11bZGF0YS15PScke3krK30nXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gJ3YnKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLnBsYXllcjEgLmJvYXJkIFtkYXRhLXg9JyR7eCsrfSddW2RhdGEteT0nJHt5fSddYFxuICAgICAgICApO1xuICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmICghZWwpIGFsZXJ0KCdPZmYgQm9hcmQhIScpO1xuICAgICAgaWYgKCFlbCkgY29uc29sZS5sb2coJ291dHNpZGUhIScpO1xuICAgICAgaWYgKGVsLmlkID09PSAnc2hpcCcpIHJldHVybjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIHBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgIHNoaXAsXG4gICAgICAgIFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV0sXG4gICAgICAgIHNoaXAub3JpZW50YXRpb25cbiAgICAgICk7XG4gICAgICBzaGlwcy5zaGlmdCgpO1xuICAgICAgdXBkYXRlQm9hcmQoKTtcbiAgICB9XG4gICAgYnJlYWs7XG4gIH1cbn1cblxuUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlUGxhY2VtZW50LmJpbmQoZSwgcHNoaXBzKSk7XG5QbGF5ZXJPbmVCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcblxuLy8gUGxheWVyIDIgQWkgcGxhY2Ugc2hpcHMuXG5cbmNvbnN0IGFzaGlwcyA9IFtcbiAgbmV3IFNoaXAoNSksXG4gIG5ldyBTaGlwKDQpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDIpLFxuXTtcblxuY29uc3QgcmFuZG9tUGxhY2UgPSBmdW5jdGlvbiAoc2hpcCkge1xuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZC5ib2FyZDtcbiAgbGV0IFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcbiAgbGV0IG9yaWVudGF0aW9uID0gWyd2JywgJ2gnXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgZnVuY3Rpb24gaXNDbGVhcih4LCB5KSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAndicpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW47IGkrKykge1xuXG4gICAgICAgIGlmICghYm9hcmRbeF0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuICAgICAgICB4Kys7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW47IGkrKykge1xuICAgICAgICBpZiAoIWJvYXJkW3hdICYmICFib2FyZFt4XVt5XSkgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAoYm9hcmRbeF1beV0gIT09ICcnKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmICh0eXBlb2YgYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSByZXR1cm4gZmFsc2U7XG5cbiAgICAgICAgeSsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG5cbiAgd2hpbGUgKCFpc0NsZWFyKHgsIHkpKSB7XG4gICAgW3gsIHldID0gcGxheWVyVHdvLmdlbkNvb3JkcygpO1xuICB9XG5cbiAgcGxheWVyVHdvLmJvYXJkLnBsYWNlU2hpcChzaGlwLCBbeCwgeV0sIG9yaWVudGF0aW9uKTtcbiAgdXBkYXRlQm9hcmQoKTtcbn07XG5cbmFzaGlwcy5mb3JFYWNoKChzaGlwLCBpKSA9PiB7XG4gIHJhbmRvbVBsYWNlKHNoaXApO1xufSk7XG5cbi8vIERpc3BsYXkgdGhlIGJvYXJkc1xuZnVuY3Rpb24gZGlzcGxheUJvYXJkcygpIHtcbiAgbGV0IGJvYXJkID0gcGxheWVyT25lLmJvYXJkLmJvYXJkO1xuICBib2FyZC5mb3JFYWNoKChyb3csIHJJKSA9PiB7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGNJKSA9PiB7XG4gICAgICBsZXQgaWQgPVxuICAgICAgICB0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCdcbiAgICAgICAgICA/ICdzaGlwJ1xuICAgICAgICAgIDogY2VsbCA9PT0gJ2hpdCdcbiAgICAgICAgICA/ICdoaXQnXG4gICAgICAgICAgOiBjZWxsID09PSAnbWlzcydcbiAgICAgICAgICA/ICdtaXNzJ1xuICAgICAgICAgIDogJ2UnO1xuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09ICdoaXQnIHx8IGNlbGwgPT09ICdtaXNzJyA/IGNlbGwgOiAnJztcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGlkPVwiJHtpZH1cIiBkYXRhLXg9XCIke3JJfVwiIGRhdGEteT1cIiR7Y0l9XCI+JHtcbiAgICAgICAgdHlwZW9mIGNlbGwgPT09ICdvYmplY3QnID8gJycgOiBjb250ZW50XG4gICAgICB9PC9kaXY+XG4gICAgICBgO1xuXG4gICAgICBQbGF5ZXJPbmVCb2FyZC5pbnNlcnRBZGphY2VudEhUTUwoJ2JlZm9yZWVuZCcsIGh0bWwpO1xuICAgIH0pO1xuICB9KTtcblxuICBib2FyZCA9IHBsYXllclR3by5ib2FyZC5ib2FyZDtcbiAgYm9hcmQuZm9yRWFjaCgocm93LCBySSkgPT4ge1xuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xuICAgICAgbGV0IGlkID0gY2VsbCA9PT0gJ2hpdCcgPyAnaGl0JyA6IGNlbGwgPT09ICdtaXNzJyA/ICdtaXNzJyA6ICdlJztcbiAgICAgIGNvbnN0IGNvbnRlbnQgPSBjZWxsID09PSAnaGl0JyB8fCBjZWxsID09PSAnbWlzcycgPyBjZWxsIDogJyc7XG4gICAgICBjb25zdCBodG1sID0gYCAgPGRpdiBjbGFzcz1cImNlbGxcIiBpZD1cIiR7aWR9XCIgZGF0YS14PVwiJHtySX1cIiBkYXRhLXk9XCIke2NJfVwiPiR7Y29udGVudH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllclR3b0JvYXJkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZCgpIHtcbiAgUGxheWVyT25lQm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gIFBsYXllclR3b0JvYXJkLmlubmVySFRNTCA9ICcnO1xuICBkaXNwbGF5Qm9hcmRzKCk7XG59XG5cbnVwZGF0ZUJvYXJkKCk7XG4vLyBjaGVjayBpZiBnYW1lIGlzIG92ZXJcbmNvbnN0IElzT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHBsYXllck9uZS5ib2FyZC5hY3RpdmVTaGlwcyA9PT0gMCB8fCBwbGF5ZXJUd28uYm9hcmQuYWN0aXZlU2hpcHMgPT09IDApIHtcbiAgICBpZiAocGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID4gMClcbiAgICAgIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9ICdDb25ncmF0cyB5b3Ugd2luJztcbiAgICBpZiAocGxheWVyVHdvLmJvYXJkLmFjdGl2ZVNoaXBzID4gMClcbiAgICAgIFBsYXllclR3b01zZy50ZXh0Q29udGVudCA9ICdDb25ncmF0cyB5b3Ugd2luJztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8vIFBMYXllciBtb3Zlcy5cblBsYXllclR3b0JvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKElzT3ZlcigpKSByZXR1cm47XG4gIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXJUd28pIHJldHVybjtcbiAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ICE9PSAnJykgcmV0dXJuO1xuICBjb25zdCBbeCwgeV0gPSBbZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnldO1xuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZDtcbiAgYm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICB1cGRhdGVCb2FyZCgpO1xuICBjdXJyZW50UGxheWVyID0gcGxheWVyVHdvO1xuICBzZXRUaW1lb3V0KCgpID0+IGJvdE1vdmUoKSwgMCk7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn0pO1xuXG4vLyBBaSBTaG90L1xuY29uc3QgYm90TW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKElzT3ZlcigpKSByZXR1cm47XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyT25lLmJvYXJkO1xuICBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgQWN0aXZlIFNoaXBzOiAke2JvYXJkLmFjdGl2ZVNoaXBzfWBcbiAgLy8gY29uc29sZS5sb2coYm9hcmQpO1xuICBwbGF5ZXJUd28udGFrZVNob3QoYm9hcmQpO1xuICB1cGRhdGVCb2FyZCgpO1xuICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xuICBjb25zb2xlLmxvZyhib2FyZCk7XG59O1xuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9