import { Player } from './player';
import { createGameBoardComponent } from './uiComponents/gameBoardComponent';

export const setUpGameUi = (player1: Player, player2: Player) => {
  const app = document.getElementById('app');
  if (!app) return console.error('App element not found');

  const player1GameBoard = document.createElement('div');
  app.appendChild(player1GameBoard);
  player1GameBoard.className = `game-board ${player1.name}`;
  player1GameBoard.appendChild(createGameBoardComponent(player1.gameBoard));

  const player2GameBoard = document.createElement('div');
  app.appendChild(player2GameBoard);
  player2GameBoard.className = `game-board ${player2.name}`;
  player2GameBoard.appendChild(createGameBoardComponent(player2.gameBoard));
};

export const updateGameBoard = (player: Player) => {
  const board = document.querySelector(`.gameBoard .${player.name}`);
  if (!board) return console.error('Board element not found');

  board.innerHTML = '';
  board.appendChild(createGameBoardComponent(player.gameBoard));
};
