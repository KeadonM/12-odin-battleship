import './css/reset.css';
import './css/style.scss';
import { createShip } from './ts/ship.ts';
import { createGameBoard } from './ts/gameBoard.ts';

const board = createGameBoard();

board.addShip(4, [0, 0], true);

console.log(board.squares);

board.receiveAttack(0, 0);
console.log(board.shipsRemaining());
board.receiveAttack(0, 1);
console.log(board.shipsRemaining());
board.receiveAttack(0, 2);
console.log(board.shipsRemaining());
board.receiveAttack(0, 3);
console.log(board.shipsRemaining());
board.receiveAttack(4, 3);

console.log(board.shipsRemaining() === 0);
