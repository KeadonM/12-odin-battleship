import { createPlayer, createComputerPlayer, Player } from './player';
import { setUpGameUi, highlightCurrentPlayer } from './domController.ts';

let [humanPlayer, computerPlayer] = setUpPlayers();
let currPlayer: Player | null = null;
let gameover = true;

function setUpPlayers() {
  const humanPlayer = createPlayer('Human');
  const computerPlayer = createComputerPlayer();
  humanPlayer.enemy = computerPlayer;
  computerPlayer.enemy = humanPlayer;

  setUpGameUi(humanPlayer, computerPlayer);

  return [humanPlayer, computerPlayer];
}

export function startGame() {
  console.log('game started');

  const coinFlip = Math.round(Math.random());
  if (coinFlip === 0) humanPlayer.turn = true;
  else computerPlayer.turn = true;

  currPlayer = humanPlayer.turn === true ? humanPlayer : computerPlayer;

  console.log('First move: ' + currPlayer.name);

  highlightCurrentPlayer(currPlayer);

  gameover = false;
}

export function gameLoop() {
  setInterval(() => {
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
    console.log('Game Over');
    return true;
  }
  return false;
}
