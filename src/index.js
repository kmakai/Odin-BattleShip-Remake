const GameBoard = require("./gameboard");
// const Ship = require('./ship');
import Ship from "./ship.js";
const { Player, Ai } = require("./player");

// Get Dom elements.
const PlayerOneName = document.querySelector(".player1 .name");
const PlayerOneMsg = document.querySelector(".player1 .msg");
const PlayerOneBoard = document.querySelector(".player1 .board");
const PlayerOneships = document.querySelector(".player1 .ships");

const PlayerTwoName = document.querySelector(".player2 .name");
const PlayerTwoMsg = document.querySelector(".player2 .msg");
const PlayerTwoBoard = document.querySelector(".player2 .board");
const PlayerTwoships = document.querySelector(".player2 .ships");

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
  new Ship(5),
  new Ship(4),
  new Ship(3),
  new Ship(3),
  new Ship(2),
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
    if (playerOne.board.activeShips > 0)
      PlayerOneMsg.textContent = "Congrats you win";
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
