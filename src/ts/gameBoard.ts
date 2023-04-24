import { Ship, createShip } from './ship';

export interface GameBoard {
  squares: (string | Ship)[][];
  ships: Ship[];
  addShip: (length: number, position: number[], dirVertical: boolean) => void;
  placeShip: (ship: Ship) => void;
  ensureValidPlacement: (
    length: number,
    position: number[],
    dirVertical: boolean
  ) => boolean;
  checkConflictAroundSquare: (currentSquare: number[]) => boolean;
  receiveAttack: (x: number, y: number) => void;
  shipsRemaining: () => number;
}

export const createGameBoard = (): GameBoard => {
  const gameBoard: GameBoard = {
    squares: [
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
      ['', '', '', '', '', '', '', '', '', ''],
    ] as (string | Ship)[][],
    ships: [] as Ship[],

    addShip(length: number, position: number[], dirVertical: boolean) {
      if (!this.ensureValidPlacement(length, position, dirVertical)) {
        console.warn('Invalid placement');
        return;
      }

      const ship = createShip(length, position, dirVertical);
      this.ships.push(ship);
      this.placeShip(ship);
    },

    placeShip(ship: Ship) {
      let x = ship.position[0];
      let y = ship.position[1];

      for (let i = 0; i < ship.length; i++) {
        this.squares[y][x] = ship;

        if (ship.dirVertical === false) x += 1;
        else y += 1;
      }
    },

    ensureValidPlacement(
      length: number,
      position: number[],
      dirVertical: boolean
    ) {
      let x = position[0];
      let y = position[1];

      if (x < 0 || x > 9) return false;
      if (y < 0 || y > 9) return false;

      for (let i = 0; i < length; i++) {
        if (this.checkConflictAroundSquare([x, y]) === false) return false;

        if (dirVertical === false) x += 1;
        else y += 1;
      }

      return true;
    },

    checkConflictAroundSquare(currentSquare: number[]) {
      const x = currentSquare[0];
      const y = currentSquare[1];

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x - i < 0 || x - i > 9) continue;
          if (y - j < 0 || y - j > 9) continue;

          if (this.squares[y - j][x - i] !== '') {
            console.error({ x: x - i, y: y - j });
            console.warn('Conflict around square');
            return false;
          }
        }
      }

      return true;
    },

    receiveAttack(x: number, y: number) {
      const square = this.squares[y][x];

      if (typeof square === 'string') {
        if (square === 'm' || square === 'h') return;
        else this.squares[y][x] = 'm';
      }

      if (typeof square === 'object') {
        if (square.sunk === false) {
          this.squares[y][x] = 'h';
          square.hit();
        }
      }
    },

    shipsRemaining() {
      let shipCount = this.ships.length;

      this.ships.forEach((ship) => {
        if (ship.sunk === true) shipCount -= 1;
      });

      return shipCount;
    },
  };

  return gameBoard;
};
