import { createPlayer, createComputerPlayer, Player } from './player';
import {
  setUpGameUi,
  highlightCurrentPlayer,
  displayWinner,
} from './domController.ts';

let [humanPlayer, computerPlayer] = setUpPlayers();
let currPlayer: Player | null = null;
let gameover = true;
let interval: NodeJS.Timer;

function setUpPlayers() {
  const humanPlayer = createPlayer('Human');
  const computerPlayer = createComputerPlayer();
  humanPlayer.enemy = computerPlayer;
  computerPlayer.enemy = humanPlayer;

  setUpGameUi(humanPlayer, computerPlayer);

  return [humanPlayer, computerPlayer];
}

export function startGame() {
  const coinFlip = Math.round(Math.random());
  if (coinFlip === 0) humanPlayer.turn = true;
  else computerPlayer.turn = true;

  currPlayer = humanPlayer.turn === true ? humanPlayer : computerPlayer;

  highlightCurrentPlayer(currPlayer);

  gameover = false;
}

export function resetGame() {
  [humanPlayer, computerPlayer] = setUpPlayers();
  currPlayer = null;
  gameover = true;

  gameLoop();
  clearInterval(interval);
}

export function gameLoop() {
  interval = setInterval(() => {
    if (currPlayer?.turn === true || gameover) return;

    if (currPlayer === humanPlayer) currPlayer = computerPlayer;
    else currPlayer = humanPlayer;
    currPlayer.turn = true;

    highlightCurrentPlayer(currPlayer);

    gameover = checkGameOver(currPlayer);
  }, 30);
}

function checkGameOver(player: Player) {
  if (player.gameBoard.shipsRemaining() === 0) {
    displayWinner(player, player.enemy);
    return true;
  }
  return false;
}
