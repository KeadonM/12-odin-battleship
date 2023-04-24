import { createGameBoard, GameBoard } from './gameBoard.ts';

interface Player {
  gameBoard: GameBoard;
  turn: boolean;
  enemy: Player;
  placeShip: (length: number, position: number[], dirVertical: boolean) => void;
  takeTurn: (position: number[]) => void;
}

const createPlayer = (): Player => {
  const player: Player = {
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

export const humanPlayer = createPlayer();
export const computerPlayer = createPlayer();
humanPlayer.enemy = computerPlayer;
computerPlayer.enemy = humanPlayer;

(function determineStartingPlayer() {
  const coinFlip = Math.round(Math.random());

  if (coinFlip === 0) humanPlayer.turn = true;
  else computerPlayer.turn = true;
})();
