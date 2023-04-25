import { splitVendorChunk } from 'vite';
import { Ship, createShip } from './ship';

export interface GameBoard {
  squares: (string | Ship)[][];
  ships: Ship[];
  addShip: (
    length: number,
    position: number[],
    dirVertical: boolean
  ) => boolean;
  placeShip: (ship: Ship) => void;
  checkBounds: (
    length: number,
    position: number[],
    dirVertical: boolean
  ) => boolean;
  checkAreaAroundShip: (
    length: number,
    position: number[],
    dirVertical: boolean,
    callBack: (square: number[]) => boolean
  ) => boolean;
  checkConflictAroundSquare: (currentSquare: number[]) => boolean;
  receiveAttack: (x: number, y: number) => boolean | string;
  revealAreaAfterSunk: (currentSquare: number[]) => boolean;
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
      if (
        !this.checkAreaAroundShip(
          length,
          position,
          dirVertical,
          this.checkConflictAroundSquare.bind(this)
        )
      ) {
        console.warn('Invalid placement conflict');
        return false;
      }

      if (!this.checkBounds(length, position, dirVertical)) {
        console.warn('Invalid placement out of bounds');
        return false;
      }

      const ship = createShip(length, position, dirVertical);
      this.ships.push(ship);
      this.placeShip(ship);
      return true;
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

    checkBounds(length: number, position: number[], dirVertical: boolean) {
      if (!dirVertical) {
        if (position[0] + length - 1 > 9) return false;
      } else {
        if (position[1] + length - 1 > 9) return false;
      }

      return true;
    },

    checkAreaAroundShip(
      length: number,
      position: number[],
      dirVertical: boolean,
      callBack: (square: number[]) => boolean
    ) {
      let x = position[0];
      let y = position[1];

      if (x < 0 || x > 9) return false;
      if (y < 0 || y > 9) return false;

      for (let i = 0; i < length; i++) {
        if (!callBack([x, y])) return false;

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
        if (square === 'm' || square === 'h' || square === 'sunk') return false;
        else {
          this.squares[y][x] = 'm';
          return 'm';
        }
      }

      if (typeof square === 'object') {
        this.squares[y][x] = 'h';
        square.hit();

        if (square.sunk) {
          this.checkAreaAroundShip(
            square.length,
            square.position,
            square.dirVertical,
            this.revealAreaAfterSunk.bind(this)
          );
          return 'sunk';
        }

        return 'h';
      }

      return false;
    },

    revealAreaAfterSunk(currentSquare: number[]) {
      const x = currentSquare[0];
      const y = currentSquare[1];

      this.squares[y][x] = 'sunk';

      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (x - i < 0 || x - i > 9) continue;
          if (y - j < 0 || y - j > 9) continue;

          if (this.squares[y - j][x - i] === '') {
            this.squares[y - j][x - i] = 'm';
          }
        }
      }

      return true;
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
