import { createGameBoard } from '../ts/gameBoard.ts';

test('New gameboard', () => {
  const board = createGameBoard();
  expect(board).toBe(board);
});

test('Gameboard has ships', () => {
  const board = createGameBoard();
  board.addShip(4, [0, 0], false);
  expect(board.shipsRemaining() > 0).toBeTruthy();
});

test('Gameboard has no ships', () => {
  const board = createGameBoard();
  expect(board.shipsRemaining() === 0).toBeTruthy();
});

test('Gameboard all ships sunk', () => {
  const board = createGameBoard();
  board.addShip(4, [0, 0], true);

  board.receiveAttack(0, 0);
  board.receiveAttack(0, 1);
  board.receiveAttack(0, 2);
  board.receiveAttack(0, 3);

  expect(board.shipsRemaining() === 0).toBeTruthy();
});

test('Out of bound placement', () => {
  const board = createGameBoard();
  board.addShip(4, [-5, 0], false);
  expect(board.ships.length === 0).toBeTruthy();
});

test('Multi ship valid placement', () => {
  const board = createGameBoard();
  board.addShip(4, [0, 0], false);
  board.addShip(4, [0, 2], false);
  board.addShip(4, [0, 4], false);

  expect(board.ships.length === 3).toBeTruthy();
});

test('Multi ship invalid placement', () => {
  const board = createGameBoard();
  board.addShip(4, [0, 0], false);
  board.addShip(4, [0, 1], false);
  board.addShip(4, [0, 4], false);

  expect(board.ships.length === 2).toBeTruthy();
});

test('Multi ship valid placement vertical', () => {
  const board = createGameBoard();
  board.addShip(4, [0, 0], true);
  board.addShip(4, [2, 0], true);
  board.addShip(4, [4, 0], true);

  expect(board.ships.length === 3).toBeTruthy();
});

test('Multi ship invalid placement vertical', () => {
  const board = createGameBoard();
  board.addShip(4, [0, 0], true);
  board.addShip(4, [1, 0], true);
  board.addShip(4, [4, 0], true);

  expect(board.ships.length === 2).toBeTruthy();
});

test('Gameboard has been attacked', () => {
  const board = createGameBoard();
  board.receiveAttack(0, 0);
  expect(board.squares[0][0] != '').toBeTruthy();
});
