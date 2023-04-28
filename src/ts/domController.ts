import { Player } from './player';
import { startGame } from './game';
import { createGameBoardComponent } from './uiComponents/gameBoardComponent';
import { createShips } from './uiComponents/draggableShipComponent';

export const setUpGameUi = (player1: Player, player2: Player) => {
  const app = document.getElementById('app');
  if (!app) return console.error('App element not found');

  const player1UI = document.createElement('div');
  player1UI.className = `${player1.name}-UI`;
  app.appendChild(player1UI);

  const player1GameBoard = document.createElement('div');
  player1GameBoard.className = `game-board ${player1.name}`;
  player1GameBoard.appendChild(createGameBoardComponent(player1));
  player1UI.appendChild(player1GameBoard);
  player1UI.appendChild(createShips());

  const player2UI = document.createElement('div');
  player2UI.className = `${player2.name}-UI`;
  app.appendChild(player2UI);

  const player2GameBoard = document.createElement('div');
  player2GameBoard.className = `game-board ${player2.name}`;
  player2GameBoard.appendChild(createGameBoardComponent(player2));
  app.appendChild(player2GameBoard);

  app.appendChild(buildControls());
};

function buildControls() {
  const wrapper = document.createElement('div');
  wrapper.className = 'controls-wrapper';

  const startButton = document.createElement('button');
  startButton.className = 'start-button';
  startButton.textContent = 'Start';
  startButton.disabled = true;
  startButton.onclick = startGame;
  wrapper.appendChild(startButton);

  return wrapper;
}

export const updateGameBoard = (player: Player) => {
  console.log(`.game-board .${player.name}`);
  const board = document.querySelector(`.game-board.${player.name}`);
  if (!board) return console.error('Board element not found');

  board.innerHTML = '';
  board.appendChild(createGameBoardComponent(player));
};

export const highlightCurrentPlayer = (player: Player) => {
  const gameBoardElements = document.querySelectorAll('.game-board');

  gameBoardElements.forEach((element) => {
    element.classList.remove('active');
  });

  const currPlayerBoard = document.querySelector(`.game-board.${player.name}`);

  currPlayerBoard?.classList.add('active');
};
