import { createPlayer, Player } from './player';
import { setUpGameUi, updateGameBoard } from './domController.ts';

export function gameLoop() {
  let [humanPlayer, computerPlayer] = setUpPlayers();

  addPresetShips(humanPlayer);
  addPresetShips(computerPlayer);

  setUpGameUi(humanPlayer, computerPlayer);
}

function setUpPlayers() {
  const humanPlayer = createPlayer('Human');
  const computerPlayer = createPlayer('Comp');
  humanPlayer.enemy = computerPlayer;
  computerPlayer.enemy = humanPlayer;

  const coinFlip = Math.round(Math.random());
  if (coinFlip === 0) humanPlayer.turn = true;
  else computerPlayer.turn = true;

  return [humanPlayer, computerPlayer];
}

function addPresetShips(player: Player) {
  player.gameBoard.addShip(4, [0, 0], false);
  player.gameBoard.addShip(4, [0, 2], false);
  player.gameBoard.addShip(4, [0, 4], false);
}
