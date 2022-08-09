const GameBoard = require("./gameboard");
const Ship = require("./ship");
const { Player, Ai } = require("./player");

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
