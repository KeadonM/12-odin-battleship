import './css/reset.css';
import './css/style.scss';
import { createShip } from './ts/ship.ts';
import { createGameBoard } from './ts/gameBoard.ts';

const board = createGameBoard();

board.addShip(4, [0, 0], true);

console.log(board.squares);

board.receiveAttack(0, 0);
board.receiveAttack(0, 0);
board.receiveAttack(0, 0);
board.receiveAttack(0, 0);
board.receiveAttack(0, 0);
