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

// PlayerOneMsg.textContent = `Place your ships!
//     press (space) to change orientation`;

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQzdCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7Ozs7OztBQ3RCQSxrQkFBa0IsbUJBQU8sQ0FBQyx1Q0FBYTtBQUN2QyxhQUFhLG1CQUFPLENBQUMsNkJBQVE7QUFDN0IsUUFBUSxhQUFhLEVBQUUsbUJBQU8sQ0FBQyxpQ0FBVTs7QUFFekM7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQ0FBc0MsRUFBRSxhQUFhLElBQUk7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQ0FBc0MsSUFBSSxhQUFhLEVBQUU7QUFDekQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHO0FBQy9FO0FBQ0EsT0FBTztBQUNQOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDhDQUE4QyxHQUFHLFlBQVksR0FBRyxZQUFZLEdBQUcsSUFBSSxRQUFRO0FBQzNGOztBQUVBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgU2hpcCA9IHJlcXVpcmUoJy4vc2hpcC5qcycpO1xyXG5cclxuY2xhc3MgR2FtZWJvYXJkIHtcclxuICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIHRoaXMuc2hpcHMgPSBbXTtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLmNhbGNTaGlwcztcclxuICAgIHRoaXMuYm9hcmQgPSBbXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICAgIFsnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJ10sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcclxuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcclxuICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XS5oaXQoKTtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdoaXQnO1xyXG4gICAgICB0aGlzLmNhbGNTaGlwcygpO1xyXG4gICAgfSBlbHNlIGlmICh0aGlzLmJvYXJkW3hdW3ldID09PSAnJykge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gJ21pc3MnO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIGNvcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb3JkcztcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgJ2gnOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFsnbGVuJ107IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB5Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGJyZWFrO1xyXG4gICAgICBjYXNlICd2JzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcclxuICAgIHRoaXMuY2FsY1NoaXBzKCk7XHJcbiAgfVxyXG5cclxuICBjYWxjU2hpcHMoKSB7XHJcbiAgICBsZXQgc3VtO1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuc2hpcHMucmVkdWNlKChzdW0sIHNoaXApID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIChzaGlwLmlzU3VuaygpID8gMCA6IDEpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcclxuIiwiY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFpIGV4dGVuZHMgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICBzdXBlcihuYW1lKTtcclxuICAgIHRoaXMucHJldlNob3RzID0gW107XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdChib2FyZCkge1xyXG4gICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2VuQ29vcmRzKCk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMucHJldlNob3RzLmluY2x1ZGVzKGNvb3Jkcy5qb2luKFwiXCIpKSkge1xyXG4gICAgICBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldlNob3RzLnB1c2goY29vcmRzLmpvaW4oXCJcIikpO1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gIH1cclxuXHJcbiAgZ2VuQ29vcmRzKCkge1xyXG4gICAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgUGxheWVyLCBBaSB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW4pIHtcclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2JztcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMubGVuLS07XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5sZW4gPiAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgR2FtZUJvYXJkID0gcmVxdWlyZSgnLi9nYW1lYm9hcmQnKTtcbmNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAnKTtcbmNvbnN0IHsgUGxheWVyLCBBaSB9ID0gcmVxdWlyZSgnLi9wbGF5ZXInKTtcblxuLy8gR2V0IERvbSBlbGVtZW50cy5cbmNvbnN0IFBsYXllck9uZU5hbWUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAubmFtZScpO1xuY29uc3QgUGxheWVyT25lTXNnID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnBsYXllcjEgLm1zZycpO1xuY29uc3QgUGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAuYm9hcmQnKTtcblxuY29uc3QgUGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubXNnJyk7XG5jb25zdCBQbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5ib2FyZCcpO1xuXG4vLyBHbG9iYWwgVmFyaWFibGVzLlxubGV0IGN1cnJlbnRQbGF5ZXI7XG5cbi8vIENyZWF0ZSBQbGF5ZXIgYW5kIEFpLlxuY29uc3QgcGxheWVyT25lID0gbmV3IFBsYXllcignQ2FwdGFpbicpO1xuUGxheWVyT25lTmFtZS50ZXh0Q29udGVudCA9IHBsYXllck9uZS5uYW1lO1xuXG5jb25zdCBwbGF5ZXJUd28gPSBuZXcgQWkoJ0JvdCcpO1xuUGxheWVyVHdvTmFtZS50ZXh0Q29udGVudCA9IHBsYXllclR3by5uYW1lO1xuXG4vLyBDcmVhdGUgQm9hcmRzLlxucGxheWVyT25lLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xucGxheWVyVHdvLmJvYXJkID0gbmV3IEdhbWVCb2FyZCgpO1xuXG5kaXNwbGF5Qm9hcmRzKCk7XG5cbi8vIFBsYXllciAxIHBsYWNlIHNoaXNwcy5cbmNvbnN0IHBzaGlwcyA9IFtcbiAgbmV3IFNoaXAoNSksXG4gIG5ldyBTaGlwKDQpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDIpLFxuXTtcblxuLy8gUGxheWVyT25lTXNnLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMhXG4vLyAgICAgcHJlc3MgKHNwYWNlKSB0byBjaGFuZ2Ugb3JpZW50YXRpb25gO1xuXG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoc2hpcHMsIGUpIHtcbiAgaWYgKHNoaXBzID09PSBbXSkgcmV0dXJuO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgc2hpcDtcbiAgd2hpbGUgKGluZGV4IDwgc2hpcHMubGVuZ3RoKSB7XG4gICAgc2hpcCA9IHNoaXBzW2luZGV4XTtcbiAgICBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciBzaGlwcyEgXG4gICAgcHJlc3MgKHNwYWNlKSB0byBjaGFuZ2Ugb3JpZW50YXRpb25gO1xuICAgIGlmIChlLmNvZGUgPT09ICdTcGFjZScpIHtcbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uID09PSAndicgPyAnaCcgOiAndic7XG4gICAgICB1cGRhdGVCb2FyZCgpO1xuICAgIH1cblxuICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdjZWxsJykpIHJldHVybjtcblxuICAgIGxldCB4ID0gZS50YXJnZXQuZGF0YXNldC54O1xuICAgIGxldCB5ID0gZS50YXJnZXQuZGF0YXNldC55O1xuICAgIGxldCBlbDtcbiAgICBjb25zdCBjb2xvciA9IGUudHlwZSA9PT0gJ21vdXNlb3V0JyA/ICcjZmZmJyA6ICdyZWQnO1xuXG4gICAgbGV0IGkgPSAwO1xuICAgIHdoaWxlIChpIDwgc2hpcC5sZW4pIHtcbiAgICAgIGlmIChzaGlwLm9yaWVudGF0aW9uID09PSAnaCcpIHtcbiAgICAgICAgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFxuICAgICAgICAgIGAucGxheWVyMSAuYm9hcmQgW2RhdGEteD0nJHt4fSddW2RhdGEteT0nJHt5Kyt9J11gXG4gICAgICAgICk7XG4gICAgICAgIGlmICghZWwpIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09ICd2Jykge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5wbGF5ZXIxIC5ib2FyZCBbZGF0YS14PScke3grK30nXVtkYXRhLXk9JyR7eX0nXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBpZiAoIWVsKSBhbGVydCgnT2ZmIEJvYXJkISEnKTtcbiAgICAgIGlmICghZWwpIGNvbnNvbGUubG9nKCdvdXRzaWRlISEnKTtcbiAgICAgIGlmIChlbC5pZCA9PT0gJ3NoaXAnKSByZXR1cm47XG4gICAgICBlbC5zdHlsZS5iYWNrZ3JvdW5kQ29sb3IgPSBjb2xvcjtcbiAgICAgIGkrKztcbiAgICB9XG5cbiAgICBpZiAoZS50eXBlID09PSAnY2xpY2snKSB7XG4gICAgICBwbGF5ZXJPbmUuYm9hcmQucGxhY2VTaGlwKFxuICAgICAgICBzaGlwLFxuICAgICAgICBbZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnldLFxuICAgICAgICBzaGlwLm9yaWVudGF0aW9uXG4gICAgICApO1xuICAgICAgc2hpcHMuc2hpZnQoKTtcbiAgICAgIHVwZGF0ZUJvYXJkKCk7XG4gICAgfVxuXG4gICAgYnJlYWs7XG4gIH1cbn1cblxuUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlUGxhY2VtZW50LmJpbmQoZSwgcHNoaXBzKSk7XG5QbGF5ZXJPbmVCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcblxuLy8gUGxheWVyIDIgQWkgcGxhY2Ugc2hpcHMuXG5cbmNvbnN0IGFzaGlwcyA9IFtcbiAgbmV3IFNoaXAoNSksXG4gIG5ldyBTaGlwKDQpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDIpLFxuXTtcblxuY29uc3QgcmFuZG9tUGxhY2UgPSBmdW5jdGlvbiAoc2hpcCkge1xuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZC5ib2FyZDtcbiAgbGV0IFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcbiAgbGV0IG9yaWVudGF0aW9uID0gWyd2JywgJ2gnXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgZnVuY3Rpb24gaXNDbGVhcih4LCB5KSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAndicpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW47IGkrKykge1xuICAgICAgICBpZiAoIWJvYXJkW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChib2FyZFt4XVt5XSAhPT0gJycpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgeCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCFib2FyZFt4XSAmJiAhYm9hcmRbeF1beV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHkrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB3aGlsZSAoIWlzQ2xlYXIoeCwgeSkpIHtcbiAgICBbeCwgeV0gPSBwbGF5ZXJUd28uZ2VuQ29vcmRzKCk7XG4gIH1cblxuICBwbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKHNoaXAsIFt4LCB5XSwgb3JpZW50YXRpb24pO1xuICB1cGRhdGVCb2FyZCgpO1xufTtcblxuYXNoaXBzLmZvckVhY2goKHNoaXAsIGkpID0+IHtcbiAgcmFuZG9tUGxhY2Uoc2hpcCk7XG59KTtcblxuLy8gRGlzcGxheSB0aGUgYm9hcmRzXG5mdW5jdGlvbiBkaXNwbGF5Qm9hcmRzKCkge1xuICBsZXQgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9XG4gICAgICAgIHR5cGVvZiBjZWxsID09PSAnb2JqZWN0J1xuICAgICAgICAgID8gJ3NoaXAnXG4gICAgICAgICAgOiBjZWxsID09PSAnaGl0J1xuICAgICAgICAgID8gJ2hpdCdcbiAgICAgICAgICA6IGNlbGwgPT09ICdtaXNzJ1xuICAgICAgICAgID8gJ21pc3MnXG4gICAgICAgICAgOiAnZSc7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gJ2hpdCcgfHwgY2VsbCA9PT0gJ21pc3MnID8gY2VsbCA6ICcnO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke1xuICAgICAgICB0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcgPyAnJyA6IGNvbnRlbnRcbiAgICAgIH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllck9uZUJvYXJkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGJvYXJkID0gcGxheWVyVHdvLmJvYXJkLmJvYXJkO1xuICBib2FyZC5mb3JFYWNoKChyb3csIHJJKSA9PiB7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGNJKSA9PiB7XG4gICAgICBsZXQgaWQgPSBjZWxsID09PSAnaGl0JyA/ICdoaXQnIDogY2VsbCA9PT0gJ21pc3MnID8gJ21pc3MnIDogJ2UnO1xuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09ICdoaXQnIHx8IGNlbGwgPT09ICdtaXNzJyA/IGNlbGwgOiAnJztcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGlkPVwiJHtpZH1cIiBkYXRhLXg9XCIke3JJfVwiIGRhdGEteT1cIiR7Y0l9XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyVHdvQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUJvYXJkKCkge1xuICBQbGF5ZXJPbmVCb2FyZC5pbm5lckhUTUwgPSAnJztcbiAgUGxheWVyVHdvQm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gIGRpc3BsYXlCb2FyZHMoKTtcbn1cblxudXBkYXRlQm9hcmQoKTtcbi8vIGNoZWNrIGlmIGdhbWUgaXMgb3ZlclxuY29uc3QgSXNPdmVyID0gZnVuY3Rpb24gKCkge1xuICBpZiAocGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID09PSAwIHx8IHBsYXllclR3by5ib2FyZC5hY3RpdmVTaGlwcyA9PT0gMCkge1xuICAgIGlmIChwbGF5ZXJPbmUuYm9hcmQuYWN0aXZlU2hpcHMgPiAwKVxuICAgICAgUGxheWVyT25lTXNnLnRleHRDb250ZW50ID0gJ0NvbmdyYXRzIHlvdSB3aW4nO1xuICAgIGlmIChwbGF5ZXJUd28uYm9hcmQuYWN0aXZlU2hpcHMgPiAwKVxuICAgICAgUGxheWVyVHdvTXNnLnRleHRDb250ZW50ID0gJ0NvbmdyYXRzIHlvdSB3aW4nO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufTtcblxuLy8gUExheWVyIG1vdmVzLlxuUGxheWVyVHdvQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xuICBpZiAoSXNPdmVyKCkpIHJldHVybjtcbiAgaWYgKGN1cnJlbnRQbGF5ZXIgPT09IHBsYXllclR3bykgcmV0dXJuO1xuICBpZiAoZS50YXJnZXQudGV4dENvbnRlbnQgIT09ICcnKSByZXR1cm47XG4gIGNvbnN0IFt4LCB5XSA9IFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV07XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyVHdvLmJvYXJkO1xuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XG4gIHVwZGF0ZUJvYXJkKCk7XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJUd287XG4gIHNldFRpbWVvdXQoKCkgPT4gYm90TW92ZSgpLCAwKTtcbiAgY29uc29sZS5sb2coYm9hcmQpO1xufSk7XG5cbi8vIEFpIFNob3QvXG5jb25zdCBib3RNb3ZlID0gZnVuY3Rpb24gKCkge1xuICBpZiAoSXNPdmVyKCkpIHJldHVybjtcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQ7XG4gIC8vIGNvbnNvbGUubG9nKGJvYXJkKTtcbiAgcGxheWVyVHdvLnRha2VTaG90KGJvYXJkKTtcbiAgdXBkYXRlQm9hcmQoKTtcbiAgY3VycmVudFBsYXllciA9IHBsYXllck9uZTtcbiAgY29uc29sZS5sb2coYm9hcmQpO1xufTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==