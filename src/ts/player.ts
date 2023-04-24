import { createGameBoard, GameBoard } from './gameBoard.ts';

export interface Player {
  name: string;
  gameBoard: GameBoard;
  turn: boolean;
  enemy: Player;
  placeShip: (length: number, position: number[], dirVertical: boolean) => void;
  takeTurn: (position: number[]) => void;
}

export const createPlayer = (n: string): Player => {
  const player: Player = {
    name: n,
    gameBoard: createGameBoard(),
    turn: false,
    enemy: null as unknown as Player,

    placeShip(length: number, position: number[], dirVertical: boolean) {
      this.gameBoard.addShip(length, position, dirVertical);
    },

    takeTurn(position: number[]) {
      if (this.turn === false) return;
      this.enemy.gameBoard.receiveAttack(position[0], position[1]);
    },
  };

  return player;
};
