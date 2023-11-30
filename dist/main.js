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
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
      ["", "", "", "", "", "", "", "", "", ""],
    ];
  }

  receiveAttack(coords) {
    const [x, y] = coords;
    if (typeof this.board[x][y] === "object") {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
      this.calcShips();
    } else if (this.board[x][y] === "") {
      this.board[x][y] = "miss";
    }
  }

  placeShip(ship, coords, direction) {
    let [x, y] = coords;
    switch (direction) {
      case "h":
        for (let i = 0; i < ship["len"]; i++) {
          this.board[x][y] = ship;
          y++;
        }
        break;
      case "v":
        for (let i = 0; i < ship["len"]; i++) {
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
const PlayerOneName = document.querySelector(".player1 .name");
const PlayerOneMsg = document.querySelector(".player1 .msg");
const PlayerOneBoard = document.querySelector(".player1 .board");
const PlayerOneships = document.querySelector(".player1 .ships");

const PlayerTwoName = document.querySelector(".player2 .name");
const PlayerTwoMsg = document.querySelector(".player2 .msg");
const PlayerTwoBoard = document.querySelector(".player2 .board");
const PlayerTwoships = document.querySelector(".player2 .ships");

let currentPlayer;

// Create Player and Ai.
const playerOne = new Player("Captain");
PlayerOneName.textContent = playerOne.name;

const playerTwo = new Ai("Bot");
PlayerTwoName.textContent = playerTwo.name;

// Create Boards.
playerOne.board = new GameBoard();
playerTwo.board = new GameBoard();

displayBoards();

// Player 1 place ships.
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
  if (ships.length === 0) return;
  let index = 0;
  let ship;
  while (index < ships.length) {
    ship = ships[index];

    PlayerOneMsg.textContent = `Place your ships! 
    press (space) to change orientation`;
    if (e.code === "Space") {
      ship.orientation = ship.orientation === "v" ? "h" : "v";
      updateBoard();
    }

    if (!e.target.classList.contains("cell")) return;

    let x = e.target.dataset.x;
    let y = e.target.dataset.y;
    let el;
    const color = e.type === "mouseout" ? "#fff" : "red";

    let i = 0;
    while (i < ship.len) {
      if (ship.orientation === "h") {
        el = document.querySelector(
          `.player1 .board [data-x='${x}'][data-y='${y++}']`
        );
        if (!el) return;
      }

      if (ship.orientation === "v") {
        el = document.querySelector(
          `.player1 .board [data-x='${x++}'][data-y='${y}']`
        );
        if (!el) return;
      }

      // if (!el) alert('Off Board!!');
      if (!el) console.log("outside!!");
      if (el.id === "ship") return;
      el.style.backgroundColor = color;
      i++;
    }

    if (e.type === "click") {
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

PlayerOneBoard.addEventListener("mouseover", handlePlacement.bind(e, pships));
PlayerOneBoard.addEventListener("mouseout", handlePlacement.bind(e, pships));
document.addEventListener("keydown", handlePlacement.bind(e, pships));
document.addEventListener("click", handlePlacement.bind(e, pships));

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
  let orientation = ["v", "h"][Math.floor(Math.random() * 2)];

  function isClear(x, y) {
    if (orientation === "v") {
      for (let i = 0; i < ship.len; i++) {
        if (!board[x]) return false;
        if (board[x][y] !== "") return false;
        if (typeof board[x][y] === "object") return false;
        x++;
      }
    }

    if (orientation === "h") {
      for (let i = 0; i < ship.len; i++) {
        if (!board[x] && !board[x][y]) return false;
        if (board[x][y] !== "") return false;
        if (typeof board[x][y] === "object") return false;

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
        typeof cell === "object"
          ? "ship"
          : cell === "hit"
          ? "hit"
          : cell === "miss"
          ? "miss"
          : "e";
      const content = cell === "hit" || cell === "miss" ? cell : "";
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${
        typeof cell === "object" ? "" : content
      }</div>
      `;

      PlayerOneBoard.insertAdjacentHTML("beforeend", html);
    });
  });

  board = playerTwo.board.board;
  board.forEach((row, rI) => {
    row.forEach((cell, cI) => {
      let id = cell === "hit" ? "hit" : cell === "miss" ? "miss" : "e";
      const content = cell === "hit" || cell === "miss" ? cell : "";
      const html = `  <div class="cell" id="${id}" data-x="${rI}" data-y="${cI}">${content}</div>
      `;

      PlayerTwoBoard.insertAdjacentHTML("beforeend", html);
    });
  });

  PlayerOneships.textContent = `Available Ships: ${
    playerOne.board.activeShips >= 1 ? playerOne.board.activeShips : 0
  }`;
  PlayerTwoships.textContent = `Available Ships: ${playerTwo.board.activeShips}`;
}

function updateBoard() {
  PlayerOneBoard.innerHTML = "";
  PlayerTwoBoard.innerHTML = "";
  displayBoards();
}

updateBoard();
// check if game is over
const IsOver = function () {
  if (playerOne.board.activeShips === 0 || playerTwo.board.activeShips === 0) {
    if (playerOne.board.activeShips > 0) {
      PlayerOneMsg.textContent = "Congrats you win";
      resetBtn.style.display = "block";
    }
    if (playerTwo.board.activeShips > 0)
      PlayerTwoMsg.textContent = "Congrats you win";
    return true;
  } else {
    return false;
  }
};

// PLayer moves.
PlayerTwoBoard.addEventListener("click", (e) => {
  if (IsOver()) return;
  if (currentPlayer === playerTwo) return;
  if (e.target.textContent !== "") return;
  const [x, y] = [e.target.dataset.x, e.target.dataset.y];
  const board = playerTwo.board;
  board.receiveAttack([x, y]);
  updateBoard();
  currentPlayer = playerTwo;
  setTimeout(() => botMove(), 0);
});

// Ai Shot/
const botMove = function () {
  if (IsOver()) return;
  const board = playerOne.board;
  playerTwo.takeShot(board);
  updateBoard();
  currentPlayer = playerOne;
};

function reset() {
  window.location.reload();
}
const resetBtn = document.querySelector(".rset");

resetBtn.addEventListener("click", reset);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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aURBQUk7QUFDVjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzQkFBc0IsY0FBYztBQUNwQztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGNBQWM7QUFDcEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSw4Q0FBOEMsR0FBRyxZQUFZLEdBQUcsWUFBWSxHQUFHO0FBQy9FO0FBQ0EsT0FBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTCxHQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDLEdBQUcsWUFBWSxHQUFHLFlBQVksR0FBRyxJQUFJLFFBQVE7QUFDM0Y7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMLEdBQUc7QUFDSDtBQUNBO0FBQ0E7QUFDQSxHQUFHO0FBQ0gsbURBQW1ELDRCQUE0QjtBQUMvRTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUk7QUFDSjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL2dhbWVib2FyZC5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3BsYXllci5qcyIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uLy4vc3JjL3NoaXAuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uL3dlYnBhY2svcnVudGltZS9jb21wYXQgZ2V0IGRlZmF1bHQgZXhwb3J0Iiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly9nZXR0aW5nLXN0YXJ0ZWQtdXNpbmctYS1jb25maWd1cmF0aW9uL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcC5qc1wiKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gdGhpcy5jYWxjU2hpcHM7XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcclxuICAgICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcclxuICAgICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcclxuICAgICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcmVjZWl2ZUF0dGFjayhjb29yZHMpIHtcclxuICAgIGNvbnN0IFt4LCB5XSA9IGNvb3JkcztcclxuICAgIGlmICh0eXBlb2YgdGhpcy5ib2FyZFt4XVt5XSA9PT0gXCJvYmplY3RcIikge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJoaXRcIjtcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSBpZiAodGhpcy5ib2FyZFt4XVt5XSA9PT0gXCJcIikge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJtaXNzXCI7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBwbGFjZVNoaXAoc2hpcCwgY29vcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb29yZHM7XHJcbiAgICBzd2l0Y2ggKGRpcmVjdGlvbikge1xyXG4gICAgICBjYXNlIFwiaFwiOlxyXG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgc2hpcFtcImxlblwiXTsgaSsrKSB7XHJcbiAgICAgICAgICB0aGlzLmJvYXJkW3hdW3ldID0gc2hpcDtcclxuICAgICAgICAgIHkrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgYnJlYWs7XHJcbiAgICAgIGNhc2UgXCJ2XCI6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwW1wibGVuXCJdOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeCsrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHRoaXMuc2hpcHMucHVzaChzaGlwKTtcclxuICAgIHRoaXMuY2FsY1NoaXBzKCk7XHJcbiAgfVxyXG5cclxuICBjYWxjU2hpcHMoKSB7XHJcbiAgICBsZXQgc3VtO1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuc2hpcHMucmVkdWNlKChzdW0sIHNoaXApID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIChzaGlwLmlzU3VuaygpID8gMCA6IDEpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcclxuIiwiY2xhc3MgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICB0aGlzLm5hbWUgPSBuYW1lO1xyXG4gICAgdGhpcy5ib2FyZDtcclxuICB9XHJcbn1cclxuXHJcbmNsYXNzIEFpIGV4dGVuZHMgUGxheWVyIHtcclxuICBjb25zdHJ1Y3RvcihuYW1lKSB7XHJcbiAgICBzdXBlcihuYW1lKTtcclxuICAgIHRoaXMucHJldlNob3RzID0gW107XHJcbiAgfVxyXG5cclxuICB0YWtlU2hvdChib2FyZCkge1xyXG4gICAgbGV0IGNvb3JkcyA9IHRoaXMuZ2VuQ29vcmRzKCk7XHJcblxyXG4gICAgd2hpbGUgKHRoaXMucHJldlNob3RzLmluY2x1ZGVzKGNvb3Jkcy5qb2luKFwiXCIpKSkge1xyXG4gICAgICBjb29yZHMgPSB0aGlzLmdlbkNvb3JkcygpO1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMucHJldlNob3RzLnB1c2goY29vcmRzLmpvaW4oXCJcIikpO1xyXG4gICAgYm9hcmQucmVjZWl2ZUF0dGFjayhjb29yZHMpO1xyXG4gIH1cclxuXHJcbiAgZ2VuQ29vcmRzKCkge1xyXG4gICAgcmV0dXJuIFtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAxMCksIE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIDEwKV07XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHsgUGxheWVyLCBBaSB9O1xyXG4iLCJjbGFzcyBTaGlwIHtcclxuICBjb25zdHJ1Y3RvcihsZW4pIHtcclxuICAgIHRoaXMubGVuID0gbGVuO1xyXG4gICAgdGhpcy5vcmllbnRhdGlvbiA9ICd2JztcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMubGVuLS07XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5sZW4gPiAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbl9fd2VicGFja19yZXF1aXJlX18ubiA9IChtb2R1bGUpID0+IHtcblx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG5cdFx0KCkgPT4gKG1vZHVsZVsnZGVmYXVsdCddKSA6XG5cdFx0KCkgPT4gKG1vZHVsZSk7XG5cdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsIHsgYTogZ2V0dGVyIH0pO1xuXHRyZXR1cm4gZ2V0dGVyO1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiY29uc3QgR2FtZUJvYXJkID0gcmVxdWlyZShcIi4vZ2FtZWJvYXJkXCIpO1xyXG4vLyBjb25zdCBTaGlwID0gcmVxdWlyZSgnLi9zaGlwJyk7XHJcbmltcG9ydCBTaGlwIGZyb20gXCIuL3NoaXAuanNcIjtcclxuY29uc3QgeyBQbGF5ZXIsIEFpIH0gPSByZXF1aXJlKFwiLi9wbGF5ZXJcIik7XHJcblxyXG4vLyBHZXQgRG9tIGVsZW1lbnRzLlxyXG5jb25zdCBQbGF5ZXJPbmVOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIxIC5uYW1lXCIpO1xyXG5jb25zdCBQbGF5ZXJPbmVNc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEgLm1zZ1wiKTtcclxuY29uc3QgUGxheWVyT25lQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjEgLmJvYXJkXCIpO1xyXG5jb25zdCBQbGF5ZXJPbmVzaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMSAuc2hpcHNcIik7XHJcblxyXG5jb25zdCBQbGF5ZXJUd29OYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5wbGF5ZXIyIC5uYW1lXCIpO1xyXG5jb25zdCBQbGF5ZXJUd29Nc2cgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjIgLm1zZ1wiKTtcclxuY29uc3QgUGxheWVyVHdvQm9hcmQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnBsYXllcjIgLmJvYXJkXCIpO1xyXG5jb25zdCBQbGF5ZXJUd29zaGlwcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIucGxheWVyMiAuc2hpcHNcIik7XHJcblxyXG5sZXQgY3VycmVudFBsYXllcjtcclxuXHJcbi8vIENyZWF0ZSBQbGF5ZXIgYW5kIEFpLlxyXG5jb25zdCBwbGF5ZXJPbmUgPSBuZXcgUGxheWVyKFwiQ2FwdGFpblwiKTtcclxuUGxheWVyT25lTmFtZS50ZXh0Q29udGVudCA9IHBsYXllck9uZS5uYW1lO1xyXG5cclxuY29uc3QgcGxheWVyVHdvID0gbmV3IEFpKFwiQm90XCIpO1xyXG5QbGF5ZXJUd29OYW1lLnRleHRDb250ZW50ID0gcGxheWVyVHdvLm5hbWU7XHJcblxyXG4vLyBDcmVhdGUgQm9hcmRzLlxyXG5wbGF5ZXJPbmUuYm9hcmQgPSBuZXcgR2FtZUJvYXJkKCk7XHJcbnBsYXllclR3by5ib2FyZCA9IG5ldyBHYW1lQm9hcmQoKTtcclxuXHJcbmRpc3BsYXlCb2FyZHMoKTtcclxuXHJcbi8vIFBsYXllciAxIHBsYWNlIHNoaXBzLlxyXG5jb25zdCBwc2hpcHMgPSBbXHJcbiAgbmV3IFNoaXAoNSksXHJcbiAgbmV3IFNoaXAoNCksXHJcbiAgbmV3IFNoaXAoMyksXHJcbiAgbmV3IFNoaXAoMyksXHJcbiAgbmV3IFNoaXAoMiksXHJcbl07XHJcblxyXG4vLyBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgUGxhY2UgeW91ciBzaGlwcyFcclxuLy8gICAgIHByZXNzIChzcGFjZSkgdG8gY2hhbmdlIG9yaWVudGF0aW9uYDtcclxuUGxheWVyT25lTXNnLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMhIFxyXG4gICAgcHJlc3MgKHNwYWNlKSB0byBjaGFuZ2Ugb3JpZW50YXRpb25gO1xyXG5mdW5jdGlvbiBoYW5kbGVQbGFjZW1lbnQoc2hpcHMsIGUpIHtcclxuICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcbiAgbGV0IGluZGV4ID0gMDtcclxuICBsZXQgc2hpcDtcclxuICB3aGlsZSAoaW5kZXggPCBzaGlwcy5sZW5ndGgpIHtcclxuICAgIHNoaXAgPSBzaGlwc1tpbmRleF07XHJcblxyXG4gICAgUGxheWVyT25lTXNnLnRleHRDb250ZW50ID0gYFBsYWNlIHlvdXIgc2hpcHMhIFxyXG4gICAgcHJlc3MgKHNwYWNlKSB0byBjaGFuZ2Ugb3JpZW50YXRpb25gO1xyXG4gICAgaWYgKGUuY29kZSA9PT0gXCJTcGFjZVwiKSB7XHJcbiAgICAgIHNoaXAub3JpZW50YXRpb24gPSBzaGlwLm9yaWVudGF0aW9uID09PSBcInZcIiA/IFwiaFwiIDogXCJ2XCI7XHJcbiAgICAgIHVwZGF0ZUJvYXJkKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoXCJjZWxsXCIpKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHggPSBlLnRhcmdldC5kYXRhc2V0Lng7XHJcbiAgICBsZXQgeSA9IGUudGFyZ2V0LmRhdGFzZXQueTtcclxuICAgIGxldCBlbDtcclxuICAgIGNvbnN0IGNvbG9yID0gZS50eXBlID09PSBcIm1vdXNlb3V0XCIgPyBcIiNmZmZcIiA6IFwicmVkXCI7XHJcblxyXG4gICAgbGV0IGkgPSAwO1xyXG4gICAgd2hpbGUgKGkgPCBzaGlwLmxlbikge1xyXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJoXCIpIHtcclxuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICBgLnBsYXllcjEgLmJvYXJkIFtkYXRhLXg9JyR7eH0nXVtkYXRhLXk9JyR7eSsrfSddYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICBpZiAoc2hpcC5vcmllbnRhdGlvbiA9PT0gXCJ2XCIpIHtcclxuICAgICAgICBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXHJcbiAgICAgICAgICBgLnBsYXllcjEgLmJvYXJkIFtkYXRhLXg9JyR7eCsrfSddW2RhdGEteT0nJHt5fSddYFxyXG4gICAgICAgICk7XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgICB9XHJcblxyXG4gICAgICAvLyBpZiAoIWVsKSBhbGVydCgnT2ZmIEJvYXJkISEnKTtcclxuICAgICAgaWYgKCFlbCkgY29uc29sZS5sb2coXCJvdXRzaWRlISFcIik7XHJcbiAgICAgIGlmIChlbC5pZCA9PT0gXCJzaGlwXCIpIHJldHVybjtcclxuICAgICAgZWwuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gY29sb3I7XHJcbiAgICAgIGkrKztcclxuICAgIH1cclxuXHJcbiAgICBpZiAoZS50eXBlID09PSBcImNsaWNrXCIpIHtcclxuICAgICAgcGxheWVyT25lLmJvYXJkLnBsYWNlU2hpcChcclxuICAgICAgICBzaGlwLFxyXG4gICAgICAgIFtlLnRhcmdldC5kYXRhc2V0LngsIGUudGFyZ2V0LmRhdGFzZXQueV0sXHJcbiAgICAgICAgc2hpcC5vcmllbnRhdGlvblxyXG4gICAgICApO1xyXG4gICAgICBzaGlwcy5zaGlmdCgpO1xyXG4gICAgICB1cGRhdGVCb2FyZCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGJyZWFrO1xyXG4gIH1cclxuICBpZiAoc2hpcHMubGVuZ3RoID09PSAwKSBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBgYDtcclxufVxyXG5cclxuUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3ZlclwiLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcclxuUGxheWVyT25lQm9hcmQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBoYW5kbGVQbGFjZW1lbnQuYmluZChlLCBwc2hpcHMpKTtcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGhhbmRsZVBsYWNlbWVudC5iaW5kKGUsIHBzaGlwcykpO1xyXG5cclxuLy8gUGxheWVyIDIgQWkgcGxhY2Ugc2hpcHMuXHJcblxyXG5jb25zdCBhc2hpcHMgPSBbXHJcbiAgbmV3IFNoaXAoNSksXHJcbiAgbmV3IFNoaXAoNCksXHJcbiAgbmV3IFNoaXAoMyksXHJcbiAgbmV3IFNoaXAoMyksXHJcbiAgbmV3IFNoaXAoMiksXHJcbl07XHJcblxyXG5jb25zdCByYW5kb21QbGFjZSA9IGZ1bmN0aW9uIChzaGlwKSB7XHJcbiAgY29uc3QgYm9hcmQgPSBwbGF5ZXJUd28uYm9hcmQuYm9hcmQ7XHJcbiAgbGV0IFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcclxuICBsZXQgb3JpZW50YXRpb24gPSBbXCJ2XCIsIFwiaFwiXVtNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAyKV07XHJcblxyXG4gIGZ1bmN0aW9uIGlzQ2xlYXIoeCwgeSkge1xyXG4gICAgaWYgKG9yaWVudGF0aW9uID09PSBcInZcIikge1xyXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXAubGVuOyBpKyspIHtcclxuICAgICAgICBpZiAoIWJvYXJkW3hdKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKGJvYXJkW3hdW3ldICE9PSBcIlwiKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBib2FyZFt4XVt5XSA9PT0gXCJvYmplY3RcIikgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHgrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChvcmllbnRhdGlvbiA9PT0gXCJoXCIpIHtcclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwLmxlbjsgaSsrKSB7XHJcbiAgICAgICAgaWYgKCFib2FyZFt4XSAmJiAhYm9hcmRbeF1beV0pIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAoYm9hcmRbeF1beV0gIT09IFwiXCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAodHlwZW9mIGJvYXJkW3hdW3ldID09PSBcIm9iamVjdFwiKSByZXR1cm4gZmFsc2U7XHJcblxyXG4gICAgICAgIHkrKztcclxuICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIHRydWU7XHJcbiAgfVxyXG5cclxuICB3aGlsZSAoIWlzQ2xlYXIoeCwgeSkpIHtcclxuICAgIFt4LCB5XSA9IHBsYXllclR3by5nZW5Db29yZHMoKTtcclxuICB9XHJcblxyXG4gIHBsYXllclR3by5ib2FyZC5wbGFjZVNoaXAoc2hpcCwgW3gsIHldLCBvcmllbnRhdGlvbik7XHJcbiAgdXBkYXRlQm9hcmQoKTtcclxufTtcclxuXHJcbmFzaGlwcy5mb3JFYWNoKChzaGlwLCBpKSA9PiB7XHJcbiAgcmFuZG9tUGxhY2Uoc2hpcCk7XHJcbn0pO1xyXG5cclxuLy8gRGlzcGxheSB0aGUgYm9hcmRzXHJcbmZ1bmN0aW9uIGRpc3BsYXlCb2FyZHMoKSB7XHJcbiAgbGV0IGJvYXJkID0gcGxheWVyT25lLmJvYXJkLmJvYXJkO1xyXG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xyXG4gICAgICBsZXQgaWQgPVxyXG4gICAgICAgIHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiXHJcbiAgICAgICAgICA/IFwic2hpcFwiXHJcbiAgICAgICAgICA6IGNlbGwgPT09IFwiaGl0XCJcclxuICAgICAgICAgID8gXCJoaXRcIlxyXG4gICAgICAgICAgOiBjZWxsID09PSBcIm1pc3NcIlxyXG4gICAgICAgICAgPyBcIm1pc3NcIlxyXG4gICAgICAgICAgOiBcImVcIjtcclxuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09IFwiaGl0XCIgfHwgY2VsbCA9PT0gXCJtaXNzXCIgPyBjZWxsIDogXCJcIjtcclxuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke1xyXG4gICAgICAgIHR5cGVvZiBjZWxsID09PSBcIm9iamVjdFwiID8gXCJcIiA6IGNvbnRlbnRcclxuICAgICAgfTwvZGl2PlxyXG4gICAgICBgO1xyXG5cclxuICAgICAgUGxheWVyT25lQm9hcmQuaW5zZXJ0QWRqYWNlbnRIVE1MKFwiYmVmb3JlZW5kXCIsIGh0bWwpO1xyXG4gICAgfSk7XHJcbiAgfSk7XHJcblxyXG4gIGJvYXJkID0gcGxheWVyVHdvLmJvYXJkLmJvYXJkO1xyXG4gIGJvYXJkLmZvckVhY2goKHJvdywgckkpID0+IHtcclxuICAgIHJvdy5mb3JFYWNoKChjZWxsLCBjSSkgPT4ge1xyXG4gICAgICBsZXQgaWQgPSBjZWxsID09PSBcImhpdFwiID8gXCJoaXRcIiA6IGNlbGwgPT09IFwibWlzc1wiID8gXCJtaXNzXCIgOiBcImVcIjtcclxuICAgICAgY29uc3QgY29udGVudCA9IGNlbGwgPT09IFwiaGl0XCIgfHwgY2VsbCA9PT0gXCJtaXNzXCIgPyBjZWxsIDogXCJcIjtcclxuICAgICAgY29uc3QgaHRtbCA9IGAgIDxkaXYgY2xhc3M9XCJjZWxsXCIgaWQ9XCIke2lkfVwiIGRhdGEteD1cIiR7ckl9XCIgZGF0YS15PVwiJHtjSX1cIj4ke2NvbnRlbnR9PC9kaXY+XHJcbiAgICAgIGA7XHJcblxyXG4gICAgICBQbGF5ZXJUd29Cb2FyZC5pbnNlcnRBZGphY2VudEhUTUwoXCJiZWZvcmVlbmRcIiwgaHRtbCk7XHJcbiAgICB9KTtcclxuICB9KTtcclxuXHJcbiAgUGxheWVyT25lc2hpcHMudGV4dENvbnRlbnQgPSBgQXZhaWxhYmxlIFNoaXBzOiAke1xyXG4gICAgcGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID49IDEgPyBwbGF5ZXJPbmUuYm9hcmQuYWN0aXZlU2hpcHMgOiAwXHJcbiAgfWA7XHJcbiAgUGxheWVyVHdvc2hpcHMudGV4dENvbnRlbnQgPSBgQXZhaWxhYmxlIFNoaXBzOiAke3BsYXllclR3by5ib2FyZC5hY3RpdmVTaGlwc31gO1xyXG59XHJcblxyXG5mdW5jdGlvbiB1cGRhdGVCb2FyZCgpIHtcclxuICBQbGF5ZXJPbmVCb2FyZC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gIFBsYXllclR3b0JvYXJkLmlubmVySFRNTCA9IFwiXCI7XHJcbiAgZGlzcGxheUJvYXJkcygpO1xyXG59XHJcblxyXG51cGRhdGVCb2FyZCgpO1xyXG4vLyBjaGVjayBpZiBnYW1lIGlzIG92ZXJcclxuY29uc3QgSXNPdmVyID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmIChwbGF5ZXJPbmUuYm9hcmQuYWN0aXZlU2hpcHMgPT09IDAgfHwgcGxheWVyVHdvLmJvYXJkLmFjdGl2ZVNoaXBzID09PSAwKSB7XHJcbiAgICBpZiAocGxheWVyT25lLmJvYXJkLmFjdGl2ZVNoaXBzID4gMCkge1xyXG4gICAgICBQbGF5ZXJPbmVNc2cudGV4dENvbnRlbnQgPSBcIkNvbmdyYXRzIHlvdSB3aW5cIjtcclxuICAgICAgcmVzZXRCdG4uc3R5bGUuZGlzcGxheSA9IFwiYmxvY2tcIjtcclxuICAgIH1cclxuICAgIGlmIChwbGF5ZXJUd28uYm9hcmQuYWN0aXZlU2hpcHMgPiAwKVxyXG4gICAgICBQbGF5ZXJUd29Nc2cudGV4dENvbnRlbnQgPSBcIkNvbmdyYXRzIHlvdSB3aW5cIjtcclxuICAgIHJldHVybiB0cnVlO1xyXG4gIH0gZWxzZSB7XHJcbiAgICByZXR1cm4gZmFsc2U7XHJcbiAgfVxyXG59O1xyXG5cclxuLy8gUExheWVyIG1vdmVzLlxyXG5QbGF5ZXJUd29Cb2FyZC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKGUpID0+IHtcclxuICBpZiAoSXNPdmVyKCkpIHJldHVybjtcclxuICBpZiAoY3VycmVudFBsYXllciA9PT0gcGxheWVyVHdvKSByZXR1cm47XHJcbiAgaWYgKGUudGFyZ2V0LnRleHRDb250ZW50ICE9PSBcIlwiKSByZXR1cm47XHJcbiAgY29uc3QgW3gsIHldID0gW2UudGFyZ2V0LmRhdGFzZXQueCwgZS50YXJnZXQuZGF0YXNldC55XTtcclxuICBjb25zdCBib2FyZCA9IHBsYXllclR3by5ib2FyZDtcclxuICBib2FyZC5yZWNlaXZlQXR0YWNrKFt4LCB5XSk7XHJcbiAgdXBkYXRlQm9hcmQoKTtcclxuICBjdXJyZW50UGxheWVyID0gcGxheWVyVHdvO1xyXG4gIHNldFRpbWVvdXQoKCkgPT4gYm90TW92ZSgpLCAwKTtcclxufSk7XHJcblxyXG4vLyBBaSBTaG90L1xyXG5jb25zdCBib3RNb3ZlID0gZnVuY3Rpb24gKCkge1xyXG4gIGlmIChJc092ZXIoKSkgcmV0dXJuO1xyXG4gIGNvbnN0IGJvYXJkID0gcGxheWVyT25lLmJvYXJkO1xyXG4gIHBsYXllclR3by50YWtlU2hvdChib2FyZCk7XHJcbiAgdXBkYXRlQm9hcmQoKTtcclxuICBjdXJyZW50UGxheWVyID0gcGxheWVyT25lO1xyXG59O1xyXG5cclxuZnVuY3Rpb24gcmVzZXQoKSB7XHJcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG59XHJcbmNvbnN0IHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5yc2V0XCIpO1xyXG5cclxucmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHJlc2V0KTtcclxuIl0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9