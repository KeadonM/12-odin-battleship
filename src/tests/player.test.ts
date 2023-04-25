import { createComputerPlayer, createPlayer } from '../ts/player.ts';

const humanPlayer = createPlayer('human');
const computerPlayer = createComputerPlayer();
humanPlayer.enemy = computerPlayer;
computerPlayer.enemy = humanPlayer;

test('Player can place ship', () => {
  humanPlayer.placeShip(4, [0, 0], true);
  expect(humanPlayer.gameBoard.ships.length).toBe(1);
});

test('Player cannot attack out of turn', () => {
  humanPlayer.turn = false;
  humanPlayer.takeTurn(0, 0);

  expect(computerPlayer.gameBoard.squares[0][0]).toBe('');
});

test('Player can take turn', () => {
  humanPlayer.turn = true;
  humanPlayer.takeTurn(0, 0);

  expect(computerPlayer.gameBoard.squares[0][0]).toBe('m');
});
