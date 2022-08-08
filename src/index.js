const GameBoard = require('./gameboard');
const Ship = require('./ship');
const { Player, Ai } = require('./player');

// Get Dom elements.
const PlayerOneName = document.querySelector('.player1 .name');
const PlayerOneMsg = document.querySelector('.player1 .msg');
const PlayerOneBoard = document.querySelector('.player1 .board');

const PlayerTwoName = document.querySelector('.player2 .name');
const PlayerTwoMsg = document.querySelector('.player2 .msg');
const PlayerTwoBoard = document.querySelector('.player2 .board');

// Create Player and Ai.
const playerOne = new Player('Player');
const playerTwo = new Ai('Bot');

// Create Boards.
playerOne.board = new GameBoard()
