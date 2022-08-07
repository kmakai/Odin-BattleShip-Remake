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
    this.activeShips = 0;
    this.missed = [];
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

  receiveAttack(cords) {
    const [x, y] = cords;
    if (this.board[x][y] !== "") {
      this.board[x][y].hit();
      this.board[x][y] = "hit";
      this.calcShips();
    } else {
      this.missed.push(cords);
    }
  }

  placeShip(ship, cords, direction) {
    let [x, y] = cords;
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
  }

  calcShips() {
    this.activeShips = this.ships.reduce((sum, ship) => {
      return sum + (ship.isSunk() ? 0 : 1);
    }, 0);
  }
}

module.exports = Gameboard;


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

const b = new GameBoard();

b.placeShip(new Ship(3), [0, 1], "h");
b.placeShip(new Ship(2), [2, 3], "v");

b.receiveAttack([2, 3]);
console.log(b);

b.receiveAttack([5, 3]);
b.receiveAttack([5, 4]);
b.receiveAttack([5, 5]);
b.receiveAttack([5, 6]);
b.receiveAttack([5, 7]);

b.receiveAttack([3, 3]);
console.log(b);

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxhQUFhLG1CQUFPLENBQUMsZ0NBQVc7QUFDaEM7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0JBQXdCLGlCQUFpQjtBQUN6QztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTs7Ozs7Ozs7Ozs7QUN6REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7OztVQ2xCQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBOztVQUVBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBOzs7Ozs7Ozs7QUN0QkEsa0JBQWtCLG1CQUFPLENBQUMsdUNBQWE7QUFDdkMsYUFBYSxtQkFBTyxDQUFDLDZCQUFROztBQUU3Qjs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9nYW1lYm9hcmQuanMiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9zaGlwLmpzIiwid2VicGFjazovL2dldHRpbmctc3RhcnRlZC11c2luZy1hLWNvbmZpZ3VyYXRpb24vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vZ2V0dGluZy1zdGFydGVkLXVzaW5nLWEtY29uZmlndXJhdGlvbi8uL3NyYy9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJjb25zdCBTaGlwID0gcmVxdWlyZShcIi4vc2hpcC5qc1wiKTtcclxuXHJcbmNsYXNzIEdhbWVib2FyZCB7XHJcbiAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB0aGlzLnNoaXBzID0gW107XHJcbiAgICB0aGlzLmFjdGl2ZVNoaXBzID0gMDtcclxuICAgIHRoaXMubWlzc2VkID0gW107XHJcbiAgICB0aGlzLmJvYXJkID0gW1xyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcclxuICAgICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcclxuICAgICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICAgIFtcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiLCBcIlwiXSxcclxuICAgICAgW1wiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCIsIFwiXCJdLFxyXG4gICAgICBbXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIiwgXCJcIl0sXHJcbiAgICBdO1xyXG4gIH1cclxuXHJcbiAgcmVjZWl2ZUF0dGFjayhjb3Jkcykge1xyXG4gICAgY29uc3QgW3gsIHldID0gY29yZHM7XHJcbiAgICBpZiAodGhpcy5ib2FyZFt4XVt5XSAhPT0gXCJcIikge1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldLmhpdCgpO1xyXG4gICAgICB0aGlzLmJvYXJkW3hdW3ldID0gXCJoaXRcIjtcclxuICAgICAgdGhpcy5jYWxjU2hpcHMoKTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHRoaXMubWlzc2VkLnB1c2goY29yZHMpO1xyXG4gICAgfVxyXG4gIH1cclxuXHJcbiAgcGxhY2VTaGlwKHNoaXAsIGNvcmRzLCBkaXJlY3Rpb24pIHtcclxuICAgIGxldCBbeCwgeV0gPSBjb3JkcztcclxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XHJcbiAgICAgIGNhc2UgXCJoXCI6XHJcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBzaGlwW1wibGVuXCJdOyBpKyspIHtcclxuICAgICAgICAgIHRoaXMuYm9hcmRbeF1beV0gPSBzaGlwO1xyXG4gICAgICAgICAgeSsrO1xyXG4gICAgICAgIH1cclxuICAgICAgICBicmVhaztcclxuICAgICAgY2FzZSBcInZcIjpcclxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IHNoaXBbXCJsZW5cIl07IGkrKykge1xyXG4gICAgICAgICAgdGhpcy5ib2FyZFt4XVt5XSA9IHNoaXA7XHJcbiAgICAgICAgICB4Kys7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgdGhpcy5zaGlwcy5wdXNoKHNoaXApO1xyXG4gIH1cclxuXHJcbiAgY2FsY1NoaXBzKCkge1xyXG4gICAgdGhpcy5hY3RpdmVTaGlwcyA9IHRoaXMuc2hpcHMucmVkdWNlKChzdW0sIHNoaXApID0+IHtcclxuICAgICAgcmV0dXJuIHN1bSArIChzaGlwLmlzU3VuaygpID8gMCA6IDEpO1xyXG4gICAgfSwgMCk7XHJcbiAgfVxyXG59XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IEdhbWVib2FyZDtcclxuIiwiY2xhc3MgU2hpcCB7XHJcbiAgY29uc3RydWN0b3IobGVuKSB7XHJcbiAgICB0aGlzLmxlbiA9IGxlbjtcclxuICB9XHJcblxyXG4gIGhpdCgpIHtcclxuICAgIHRoaXMubGVuLS07XHJcbiAgfVxyXG5cclxuICBpc1N1bmsoKSB7XHJcbiAgICBpZiAodGhpcy5sZW4gPiAwKSB7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gIH1cclxufVxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBTaGlwO1xyXG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiY29uc3QgR2FtZUJvYXJkID0gcmVxdWlyZShcIi4vZ2FtZWJvYXJkXCIpO1xuY29uc3QgU2hpcCA9IHJlcXVpcmUoXCIuL3NoaXBcIik7XG5cbmNvbnN0IGIgPSBuZXcgR2FtZUJvYXJkKCk7XG5cbmIucGxhY2VTaGlwKG5ldyBTaGlwKDMpLCBbMCwgMV0sIFwiaFwiKTtcbmIucGxhY2VTaGlwKG5ldyBTaGlwKDIpLCBbMiwgM10sIFwidlwiKTtcblxuYi5yZWNlaXZlQXR0YWNrKFsyLCAzXSk7XG5jb25zb2xlLmxvZyhiKTtcblxuYi5yZWNlaXZlQXR0YWNrKFs1LCAzXSk7XG5iLnJlY2VpdmVBdHRhY2soWzUsIDRdKTtcbmIucmVjZWl2ZUF0dGFjayhbNSwgNV0pO1xuYi5yZWNlaXZlQXR0YWNrKFs1LCA2XSk7XG5iLnJlY2VpdmVBdHRhY2soWzUsIDddKTtcblxuYi5yZWNlaXZlQXR0YWNrKFszLCAzXSk7XG5jb25zb2xlLmxvZyhiKTtcbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==