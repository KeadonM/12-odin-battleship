import { createPlayer, createComputerPlayer, Player } from './player';
import { setUpGameUi, updateGameBoard } from './domController.ts';

let [humanPlayer, computerPlayer, currPlayer] = setUpPlayers();

let gameover = false;
setInterval(() => {
  if (!gameover) gameLoop();
}, 30);

export function gameLoop() {
  if (currPlayer.turn === true) return;

  if (currPlayer === humanPlayer) currPlayer = computerPlayer;
  else currPlayer = humanPlayer;
  currPlayer.turn = true;

  gameover = checkGameOver(currPlayer);
}

function setUpPlayers() {
  const humanPlayer = createPlayer('Human');
  const computerPlayer = createComputerPlayer();
  humanPlayer.enemy = computerPlayer;
  computerPlayer.enemy = humanPlayer;

  // const coinFlip = Math.round(Math.random());
  // if (coinFlip === 0) humanPlayer.turn = true;
  computerPlayer.turn = true;

  let currPlayer = humanPlayer.turn === true ? humanPlayer : computerPlayer;

  addPresetShips(humanPlayer);
  addPresetShips(computerPlayer);
  setUpGameUi(humanPlayer, computerPlayer);

  return [humanPlayer, computerPlayer, currPlayer];
}

function addPresetShips(player: Player) {
  player.gameBoard.addShip(4, [0, 9], false);
  player.gameBoard.addShip(4, [9, 5], true);

  player.gameBoard.addShip(4, [0, 0], false);

  player.gameBoard.addShip(4, [6, 0], false);
  player.gameBoard.addShip(1, [5, 5], false);
}

function checkGameOver(player: Player) {
  if (player.gameBoard.shipsRemaining() === 0) {
    console.log('Game Over');
    return true;
  }
  return false;
}
