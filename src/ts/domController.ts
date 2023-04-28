import { Player } from './player';
import { startGame, resetGame } from './game';
import { createGameBoardComponent } from './uiComponents/gameBoardComponent';
import { createShips } from './uiComponents/draggableShipComponent';

export const setUpGameUi = (player1: Player, player2: Player) => {
  const app = document.getElementById('app');
  if (!app) return console.error('App element not found');

  app.appendChild(buildControls());

  const gameWrapper = document.createElement('div');
  gameWrapper.className = 'game';
  app.appendChild(gameWrapper);

  const player1Ui = buildPlayerUi(player1);
  player1Ui.appendChild(createShips());
  gameWrapper.appendChild(player1Ui);

  const player2Ui = buildPlayerUi(player2);
  gameWrapper.appendChild(player2Ui);
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

  const resetButton = document.createElement('button');
  resetButton.className = 'reset-button';
  resetButton.textContent = 'Reset';
  resetButton.onclick = () => {
    const app = document.getElementById('app');
    app!.innerHTML = '';
    resetGame();
  };
  wrapper.appendChild(resetButton);

  return wrapper;
}

function buildPlayerUi(player: Player) {
  const playerUi = document.createElement('div');
  playerUi.className = `${player.name} game-ui`;

  const name = document.createElement('p');
  name.className = 'player-name';
  name.textContent = player.name;
  playerUi.appendChild(name);

  const gameBoard = document.createElement('div');
  gameBoard.className = `game-board ${player.name}`;
  gameBoard.appendChild(createGameBoardComponent(player));
  playerUi.appendChild(gameBoard);

  return playerUi;
}

export const updateGameBoard = (player: Player) => {
  console.log(`.game-board .${player.name}`);
  const board = document.querySelector(`.game-board.${player.name}`);
  if (!board) return console.error('Board element not found');

  board.innerHTML = '';
  board.appendChild(createGameBoardComponent(player));
};

export const highlightCurrentPlayer = (player: Player) => {
  const gameBoardElements = document.querySelectorAll('.game-ui');

  gameBoardElements.forEach((element) => {
    element.classList.remove('active');
  });

  const currPlayerBoard = document.querySelector(`.${player.name}.game-ui`);

  currPlayerBoard?.classList.add('active');
};

export const displayWinner = (loser: Player, winner: Player) => {
  const loserUi = document.querySelector(`.game-ui.${loser.name}`);
  const winnerUi = document.querySelector(`.game-ui.${winner.name}`);

  loserUi!.firstChild!.textContent = loser.name + ' Loser';
  winnerUi!.firstChild!.textContent = winner.name + ' Winner';
};
