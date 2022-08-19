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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ship.js */ "./src/ship.js");
/* harmony import */ var _ship_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_ship_js__WEBPACK_IMPORTED_MODULE_0__);
const GameBoard = __webpack_require__(/*! ./gameboard */ "./src/gameboard.js");
// const Ship = require('./ship');

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
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(5),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(4),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(3),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(3),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(2),
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
  if (ships.length === 0) PlayerOneMsg.textContent = ``;
}

PlayerOneBoard.addEventListener('mouseover', handlePlacement.bind(e, pships));
PlayerOneBoard.addEventListener('mouseout', handlePlacement.bind(e, pships));
document.addEventListener('keydown', handlePlacement.bind(e, pships));
document.addEventListener('click', handlePlacement.bind(e, pships));

// Player 2 Ai place ships.

const aships = [
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(5),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(4),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(3),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(3),
  new (_ship_js__WEBPACK_IMPORTED_MODULE_0___default())(2),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixpQkFBaUI7QUFDekM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7OztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsbUJBQW1COzs7Ozs7Ozs7OztBQzdCbkI7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O1VDbkJBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7Ozs7O1dDdEJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQSxpQ0FBaUMsV0FBVztXQUM1QztXQUNBOzs7OztXQ1BBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7Ozs7Ozs7Ozs7OztBQ05BLGtCQUFrQixtQkFBTyxDQUFDLHVDQUFhO0FBQ3ZDO0FBQzZCO0FBQzdCLFFBQVEsYUFBYSxFQUFFLG1CQUFPLENBQUMsaUNBQVU7O0FBRXpDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBLE1BQU0saURBQUk7QUFDVixNQUFNLGlEQUFJO0FBQ1YsTUFBTSxpREFBSTtBQUNWLE1BQU0saURBQUk7QUFDVixNQUFNLGlEQUFJO0FBQ1Y7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0NBQXNDLEVBQUUsYUFBYSxJQUFJO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0NBQXNDLElBQUksYUFBYSxFQUFFO0FBQ3pEO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0EsTUFBTSxpREFBSTtBQUNWLE1BQU0saURBQUk7QUFDVixNQUFNLGlEQUFJO0FBQ1YsTUFBTSxpREFBSTtBQUNWLE1BQU0saURBQUk7QUFDVjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0Esc0JBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRztBQUMvRTtBQUNBLE9BQU87QUFDUDs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHLElBQUksUUFBUTtBQUMzRjs7QUFFQTtBQUNBLEtBQUs7QUFDTCxHQUFHOztBQUVIO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsbURBQW1ELDRCQUE0QjtBQUMvRTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQzs7QUFFRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvZ2FtZWJvYXJkLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvcGxheWVyLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vLi9zcmMvc2hpcC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ydW50aW1lL2NvbXBhdCBnZXQgZGVmYXVsdCBleHBvcnQiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IFNoaXAgPSByZXF1aXJlKCcuL3NoaXAuanMnKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgICBbJycsICcnLCAnJywgJycsICcnLCAnJywgJycsICcnLCAnJywgJyddLFxyXG4gICAgXTtcclxuICB9XHJcblxyXG4gIHJlY2VpdmVBdHRhY2soY29vcmRzKSB7XHJcbiAgICBjb25zdCBbeCwgeV0gPSBjb29yZHM7XHJcbiAgICBpZiAodHlwZW9mIHRoaXMuYm9hcmRbeF1beV0gPT09ICdvYmplY3QnKSB7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0uaGl0KCk7XHJcbiAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSAnaGl0JztcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gJycpIHtcclxuICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9ICdtaXNzJztcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHBsYWNlU2hpcChzaGlwLCBjb3JkcywgZGlyZWN0aW9uKSB7XHJcbiAgICBsZXQgW3gsIHldID0gY29yZHM7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlICdoJzpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbJ2xlbiddOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSAndic6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwWydsZW4nXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHgrKztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICB0aGlzLnNoaXBzLnB1c2goc2hpcCk7XHJcbiAgICB0aGlzLmNhbGNTaGlwcygpO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NoaXBzKCkge1xyXG4gICAgbGV0IHN1bTtcclxuICAgIHRoaXMuYWN0aXZlU2hpcHMgPSB0aGlzLnNoaXBzLnJlZHVjZSgoc3VtLCBzaGlwKSA9PiB7XHJcbiAgICAgIHJldHVybiBzdW0gKyAoc2hpcC5pc1N1bmsoKSA/IDAgOiAxKTtcclxuICAgIH0sIDApO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBHYW1lYm9hcmQ7XHJcbiIsImNsYXNzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgdGhpcy5uYW1lID0gbmFtZTtcclxuICAgIHRoaXMuYm9hcmQ7XHJcbiAgfVxyXG59XHJcblxyXG5jbGFzcyBBaSBleHRlbmRzIFBsYXllciB7XHJcbiAgY29uc3RydWN0b3IobmFtZSkge1xyXG4gICAgc3VwZXIobmFtZSk7XHJcbiAgICB0aGlzLnByZXZTaG90cyA9IFtdO1xyXG4gIH1cclxuXHJcbiAgdGFrZVNob3QoYm9hcmQpIHtcclxuICAgIGxldCBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG5cclxuICAgIHdoaWxlICh0aGlzLnByZXZTaG90cy5pbmNsdWRlcyhjb29yZHMuam9pbihcIlwiKSkpIHtcclxuICAgICAgY29vcmRzID0gdGhpcy5nZW5Db29yZHMoKTtcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLnByZXZTaG90cy5wdXNoKGNvb3Jkcy5qb2luKFwiXCIpKTtcclxuICAgIGJvYXJkLnJlY2VpdmVBdHRhY2soY29vcmRzKTtcclxuICB9XHJcblxyXG4gIGdlbkNvb3JkcygpIHtcclxuICAgIHJldHVybiBbTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogMTApLCBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCldO1xyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7IFBsYXllciwgQWkgfTtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuKSB7XHJcbiAgICB0aGlzLmxlbiA9IGxlbjtcclxuICAgIHRoaXMub3JpZW50YXRpb24gPSAndic7XHJcbiAgfVxyXG5cclxuICBoaXQoKSB7XHJcbiAgICB0aGlzLmxlbi0tO1xyXG4gIH1cclxuXHJcbiAgaXNTdW5rKCkge1xyXG4gICAgaWYgKHRoaXMubGVuID4gMCkge1xyXG4gICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICB9XHJcbn1cclxuXHJcbm1vZHVsZS5leHBvcnRzID0gU2hpcDtcclxuIiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbiIsIi8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSAobW9kdWxlKSA9PiB7XG5cdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuXHRcdCgpID0+IChtb2R1bGVbJ2RlZmF1bHQnXSkgOlxuXHRcdCgpID0+IChtb2R1bGUpO1xuXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCB7IGE6IGdldHRlciB9KTtcblx0cmV0dXJuIGdldHRlcjtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImNvbnN0IEdhbWVCb2FyZCA9IHJlcXVpcmUoJy4vZ2FtZWJvYXJkJyk7XG4vLyBjb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwJyk7XG5pbXBvcnQgU2hpcCBmcm9tICcuL3NoaXAuanMnO1xuY29uc3QgeyBQbGF5ZXIsIEFpIH0gPSByZXF1aXJlKCcuL3BsYXllcicpO1xuXG4vLyBHZXQgRG9tIGVsZW1lbnRzLlxuY29uc3QgUGxheWVyT25lTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJPbmVNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAubXNnJyk7XG5jb25zdCBQbGF5ZXJPbmVCb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIxIC5ib2FyZCcpO1xuY29uc3QgUGxheWVyT25lc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMSAuc2hpcHMnKTtcblxuY29uc3QgUGxheWVyVHdvTmFtZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5uYW1lJyk7XG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAubXNnJyk7XG5jb25zdCBQbGF5ZXJUd29Cb2FyZCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5ZXIyIC5ib2FyZCcpO1xuY29uc3QgUGxheWVyVHdvc2hpcHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheWVyMiAuc2hpcHMnKTtcblxuLy8gR2xvYmFsIFZhcmlhYmxlcy5cbmxldCBjdXJyZW50UGxheWVyO1xuXG4vLyBDcmVhdGUgUGxheWVyIGFuZCBBaS5cbmNvbnN0IHBsYXllck9uZSA9IG5ldyBQbGF5ZXIoJ0NhcHRhaW4nKTtcblBsYXllck9uZU5hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJPbmUubmFtZTtcblxuY29uc3QgcGxheWVyVHdvID0gbmV3IEFpKCdCb3QnKTtcblBsYXllclR3b05hbWUudGV4dENvbnRlbnQgPSBwbGF5ZXJUd28ubmFtZTtcblxuLy8gQ3JlYXRlIEJvYXJkcy5cbnBsYXllck9uZS5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcbnBsYXllclR3by5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcblxuZGlzcGxheUJvYXJkcygpO1xuXG4vLyBQbGF5ZXIgMSBwbGFjZSBzaGlzcHMuXG5jb25zdCBwc2hpcHMgPSBbXG4gIG5ldyBTaGlwKDUpLFxuICBuZXcgU2hpcCg0KSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDMpLFxuICBuZXcgU2hpcCgyKSxcbl07XG5cbi8vIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzIVxuLy8gICAgIHByZXNzIChzcGFjZSkgdG8gY2hhbmdlIG9yaWVudGF0aW9uYDtcblBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzISBcbiAgICBwcmVzcyAoc3BhY2UpIHRvIGNoYW5nZSBvcmllbnRhdGlvbmA7XG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoc2hpcHMsIGUpIHtcbiAgaWYgKHNoaXBzID09PSBbXSkgcmV0dXJuO1xuICBsZXQgaW5kZXggPSAwO1xuICBsZXQgc2hpcDtcbiAgd2hpbGUgKGluZGV4IDwgc2hpcHMubGVuZ3RoKSB7XG4gICAgc2hpcCA9IHNoaXBzW2luZGV4XTtcblxuICAgIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9IGBQbGFjZSB5b3VyIHNoaXBzISBcbiAgICBwcmVzcyAoc3BhY2UpIHRvIGNoYW5nZSBvcmllbnRhdGlvbmA7XG4gICAgaWYgKGUuY29kZSA9PT0gJ1NwYWNlJykge1xuICAgICAgc2hpcC5vcmllbnRhdGlvbiA9IHNoaXAub3JpZW50YXRpb24gPT09ICd2JyA/ICdoJyA6ICd2JztcbiAgICAgIHVwZGF0ZUJvYXJkKCk7XG4gICAgfVxuXG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2NlbGwnKSkgcmV0dXJuO1xuXG4gICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XG4gICAgbGV0IHkgPSBlLnRhcmdldC5kYXRhc2V0Lnk7XG4gICAgbGV0IGVsO1xuICAgIGNvbnN0IGNvbG9yID0gZS50eXBlID09PSAnbW91c2VvdXQnID8gJyNmZmYnIDogJ3JlZCc7XG5cbiAgICBsZXQgaSA9IDA7XG4gICAgd2hpbGUgKGkgPCBzaGlwLmxlbikge1xuICAgICAgaWYgKHNoaXAub3JpZW50YXRpb24gPT09ICdoJykge1xuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgICAgYC5wbGF5ZXIxIC5ib2FyZCBbZGF0YS14PScke3h9J11bZGF0YS15PScke3krK30nXWBcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gJ3YnKSB7XG4gICAgICAgIGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcbiAgICAgICAgICBgLnBsYXllcjEgLmJvYXJkIFtkYXRhLXg9JyR7eCsrfSddW2RhdGEteT0nJHt5fSddYFxuICAgICAgICApO1xuICAgICAgICBpZiAoIWVsKSByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIGlmICghZWwpIGFsZXJ0KCdPZmYgQm9hcmQhIScpO1xuICAgICAgaWYgKCFlbCkgY29uc29sZS5sb2coJ291dHNpZGUhIScpO1xuICAgICAgaWYgKGVsLmlkID09PSAnc2hpcCcpIHJldHVybjtcbiAgICAgIGVsLnN0eWxlLmJhY2tncm91bmRDb2xvciA9IGNvbG9yO1xuICAgICAgaSsrO1xuICAgIH1cblxuICAgIGlmIChlLnR5cGUgPT09ICdjbGljaycpIHtcbiAgICAgIHBsYXllck9uZS5ib2FyZC5wbGFjZVNoaXAoXG4gICAgICAgIHNoaXAsXG4gICAgICAgIFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV0sXG4gICAgICAgIHNoaXAub3JpZW50YXRpb25cbiAgICAgICk7XG4gICAgICBzaGlwcy5zaGlmdCgpO1xuICAgICAgdXBkYXRlQm9hcmQoKTtcbiAgICB9XG5cbiAgICBicmVhaztcbiAgfVxuICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgYDtcbn1cblxuUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VvdmVyJywgaGFuZGxlUGxhY2VtZW50LmJpbmQoZSwgcHNoaXBzKSk7XG5QbGF5ZXJPbmVCb2FyZC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW91dCcsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcblxuLy8gUGxheWVyIDIgQWkgcGxhY2Ugc2hpcHMuXG5cbmNvbnN0IGFzaGlwcyA9IFtcbiAgbmV3IFNoaXAoNSksXG4gIG5ldyBTaGlwKDQpLFxuICBuZXcgU2hpcCgzKSxcbiAgbmV3IFNoaXAoMyksXG4gIG5ldyBTaGlwKDIpLFxuXTtcblxuY29uc3QgcmFuZG9tUGxhY2UgPSBmdW5jdGlvbiAoc2hpcCkge1xuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZC5ib2FyZDtcbiAgbGV0IFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcbiAgbGV0IG9yaWVudGF0aW9uID0gWyd2JywgJ2gnXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XG5cbiAgZnVuY3Rpb24gaXNDbGVhcih4LCB5KSB7XG4gICAgaWYgKG9yaWVudGF0aW9uID09PSAndicpIHtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcC5sZW47IGkrKykge1xuICAgICAgICBpZiAoIWJvYXJkW3hdKSByZXR1cm4gZmFsc2U7XG4gICAgICAgIGlmIChib2FyZFt4XVt5XSAhPT0gJycpIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gJ29iamVjdCcpIHJldHVybiBmYWxzZTtcbiAgICAgICAgeCsrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gJ2gnKSB7XG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuOyBpKyspIHtcbiAgICAgICAgaWYgKCFib2FyZFt4XSAmJiAhYm9hcmRbeF1beV0pIHJldHVybiBmYWxzZTtcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSAnJykgcmV0dXJuIGZhbHNlO1xuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSAnb2JqZWN0JykgcmV0dXJuIGZhbHNlO1xuXG4gICAgICAgIHkrKztcbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICB3aGlsZSAoIWlzQ2xlYXIoeCwgeSkpIHtcbiAgICBbeCwgeV0gPSBwbGF5ZXJUd28uZ2VuQ29vcmRzKCk7XG4gIH1cblxuICBwbGF5ZXJUd28uYm9hcmQucGxhY2VTaGlwKHNoaXAsIFt4LCB5XSwgb3JpZW50YXRpb24pO1xuICB1cGRhdGVCb2FyZCgpO1xufTtcblxuYXNoaXBzLmZvckVhY2goKHNoaXAsIGkpID0+IHtcbiAgcmFuZG9tUGxhY2Uoc2hpcCk7XG59KTtcblxuLy8gRGlzcGxheSB0aGUgYm9hcmRzXG5mdW5jdGlvbiBkaXNwbGF5Qm9hcmRzKCkge1xuICBsZXQgYm9hcmQgPSBwbGF5ZXJPbmUuYm9hcmQuYm9hcmQ7XG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcbiAgICByb3cuZm9yRWFjaCgoY2VsbCwgY0kpID0+IHtcbiAgICAgIGxldCBpZCA9XG4gICAgICAgIHR5cGVvZiBjZWxsID09PSAnb2JqZWN0J1xuICAgICAgICAgID8gJ3NoaXAnXG4gICAgICAgICAgOiBjZWxsID09PSAnaGl0J1xuICAgICAgICAgID8gJ2hpdCdcbiAgICAgICAgICA6IGNlbGwgPT09ICdtaXNzJ1xuICAgICAgICAgID8gJ21pc3MnXG4gICAgICAgICAgOiAnZSc7XG4gICAgICBjb25zdCBjb250ZW50ID0gY2VsbCA9PT0gJ2hpdCcgfHwgY2VsbCA9PT0gJ21pc3MnID8gY2VsbCA6ICcnO1xuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke1xuICAgICAgICB0eXBlb2YgY2VsbCA9PT0gJ29iamVjdCcgPyAnJyA6IGNvbnRlbnRcbiAgICAgIH08L2Rpdj5cbiAgICAgIGA7XG5cbiAgICAgIFBsYXllck9uZUJvYXJkLmluc2VydEFkamFjZW50SFRNTCgnYmVmb3JlZW5kJywgaHRtbCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGJvYXJkID0gcGxheWVyVHdvLmJvYXJkLmJvYXJkO1xuICBib2FyZC5mb3JFYWNoKChyb3csIHJJKSA9PiB7XG4gICAgcm93LmZvckVhY2goKGNlbGwsIGNJKSA9PiB7XG4gICAgICBsZXQgaWQgPSBjZWxsID09PSAnaGl0JyA/ICdoaXQnIDogY2VsbCA9PT0gJ21pc3MnID8gJ21pc3MnIDogJ2UnO1xuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09ICdoaXQnIHx8IGNlbGwgPT09ICdtaXNzJyA/IGNlbGwgOiAnJztcbiAgICAgIGNvbnN0IGh0bWwgPSBgICA8ZGl2IGNsYXNzPVwiY2VsbFwiIGlkPVwiJHtpZH1cIiBkYXRhLXg9XCIke3JJfVwiIGRhdGEteT1cIiR7Y0l9XCI+JHtjb250ZW50fTwvZGl2PlxuICAgICAgYDtcblxuICAgICAgUGxheWVyVHdvQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKCdiZWZvcmVlbmQnLCBodG1sKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgUGxheWVyT25lc2hpcHMudGV4dENvbnRlbnQgPSBgQXZhaWxhYmxlIFNoaXBzOiAke1xuICAgIHBsYXllck9uZS5ib2FyZC5hY3RpdmVTaGlwcyA+PSAxID8gcGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzIDogMFxuICB9YDtcbiAgUGxheWVyVHdvc2hpcHMudGV4dENvbnRlbnQgPSBgQXZhaWxhYmxlIFNoaXBzOiAke3BsYXllclR3by5ib2FyZC5hY3RpdmVTaGlwc31gO1xufVxuXG5mdW5jdGlvbiB1cGRhdGVCb2FyZCgpIHtcbiAgUGxheWVyT25lQm9hcmQuaW5uZXJIVE1MID0gJyc7XG4gIFBsYXllclR3b0JvYXJkLmlubmVySFRNTCA9ICcnO1xuICBkaXNwbGF5Qm9hcmRzKCk7XG59XG5cbnVwZGF0ZUJvYXJkKCk7XG4vLyBjaGVjayBpZiBnYW1lIGlzIG92ZXJcbmNvbnN0IElzT3ZlciA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKHBsYXllck9uZS5ib2FyZC5hY3RpdmVTaGlwcyA9PT0gMCB8fCBwbGF5ZXJUd28uYm9hcmQuYWN0aXZlU2hpcHMgPT09IDApIHtcbiAgICBpZiAocGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID4gMClcbiAgICAgIFBsYXllck9uZU1zZy50ZXh0Q29udGVudCA9ICdDb25ncmF0cyB5b3Ugd2luJztcbiAgICBpZiAocGxheWVyVHdvLmJvYXJkLmFjdGl2ZVNoaXBzID4gMClcbiAgICAgIFBsYXllclR3b01zZy50ZXh0Q29udGVudCA9ICdDb25ncmF0cyB5b3Ugd2luJztcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbn07XG5cbi8vIFBMYXllciBtb3Zlcy5cblBsYXllclR3b0JvYXJkLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcbiAgaWYgKElzT3ZlcigpKSByZXR1cm47XG4gIGlmIChjdXJyZW50UGxheWVyID09PSBwbGF5ZXJUd28pIHJldHVybjtcbiAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ICE9PSAnJykgcmV0dXJuO1xuICBjb25zdCBbeCwgeV0gPSBbZS50YXJnZXQuZGF0YXNldC54LCBlLnRhcmdldC5kYXRhc2V0LnldO1xuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZDtcbiAgYm9hcmQucmVjZWl2ZUF0dGFjayhbeCwgeV0pO1xuICB1cGRhdGVCb2FyZCgpO1xuICBjdXJyZW50UGxheWVyID0gcGxheWVyVHdvO1xuICBzZXRUaW1lb3V0KCgpID0+IGJvdE1vdmUoKSwgMCk7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn0pO1xuXG4vLyBBaSBTaG90L1xuY29uc3QgYm90TW92ZSA9IGZ1bmN0aW9uICgpIHtcbiAgaWYgKElzT3ZlcigpKSByZXR1cm47XG4gIGNvbnN0IGJvYXJkID0gcGxheWVyT25lLmJvYXJkO1xuICAvLyBjb25zb2xlLmxvZyhib2FyZCk7XG4gIHBsYXllclR3by50YWtlU2hvdChib2FyZCk7XG4gIHVwZGF0ZUJvYXJkKCk7XG4gIGN1cnJlbnRQbGF5ZXIgPSBwbGF5ZXJPbmU7XG4gIGNvbnNvbGUubG9nKGJvYXJkKTtcbn07XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=