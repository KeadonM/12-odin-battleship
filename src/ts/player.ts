import { createGameBoard, GameBoard } from './gameBoard.ts';

export interface Player {
  name: string;
  gameBoard: GameBoard;
  turn: boolean;
  enemy: Player;
  placeShip: (length: number, position: number[], dirVertical: boolean) => void;
  takeTurn: (x: number, y: number) => string | boolean;
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

    takeTurn(x: number, y: number) {
      if (this.turn === false) return false;

      const result = this.enemy.gameBoard.receiveAttack(x, y);

      if (result) this.turn = false;
      return result;
    },
  };

  return player;
};

export const createComputerPlayer = () => {
  const player = createPlayer('Comp');

  setInterval(() => {
    compLoop();
    console.warn('comp loop');
  }, 50);

  function compLoop() {
    if (!player.turn) return;

    const [x, y] = chooseMove();

    const square = document.querySelector(
      `.${player.enemy.name}[data-xy="${x},${y}"]`
    );

    if (square !== null) (square as HTMLElement).click();
  }

  function chooseMove() {
    const intelligentMove = checkForIntelligentMove();

    if (intelligentMove !== false) return intelligentMove;

    const x = Math.round(Math.random() * 10);
    const y = Math.round(Math.random() * 10);

    return [x, y];
  }

  function checkForIntelligentMove() {
    const squares = player.enemy.gameBoard.squares;
    for (let y = 0; y < squares.length; y++) {
      for (let x = 0; x < squares.length; x++) {
        if (squares[y][x] === 'h') {
          const results = getEndIndex([x, y], squares);

          if (results !== false) {
            const possibleMoves = getPossibleMoves(
              [x, y],
              results.endIndex,
              results.direction,
              squares
            );

            if (possibleMoves !== false) {
              const rnd = Math.floor(Math.random() * possibleMoves.length);
              return possibleMoves[rnd];
            }
          }
        }
      }
    }

    return false;
  }

  function getPossibleMoves(
    startIndex: number[],
    endIndex: number[],
    direction: string | null,
    squares: any
  ) {
    if (getLength(startIndex, endIndex) >= 4) return false;

    const xStart = startIndex[0];
    const yStart = startIndex[1];

    const xEnd = endIndex[0];
    const yEnd = endIndex[1];

    const possibleMoves: any = [];

    if (direction === 'x' || direction === null) {
      if (squares[yStart][xStart - 1] !== 'm') {
        possibleMoves.push([xStart - 1, yStart]);
      }
      if (squares[yEnd][xEnd + 1] !== 'm') {
        possibleMoves.push([xEnd + 1, yEnd]);
      }
    }

    if (direction === 'y' || direction === null) {
      if (
        yStart - 1 !== -1 &&
        squares[yStart - 1][xStart] !== 'm' &&
        squares[yStart - 1][xStart] !== 'h'
      ) {
        possibleMoves.push([xStart, yStart - 1]);
      }

      if (
        yEnd + 1 !== 10 &&
        squares[yEnd + 1][xEnd] !== 'm' &&
        squares[yEnd + 1][xEnd] !== 'h'
      ) {
        possibleMoves.push([xEnd, yEnd + 1]);
      }
    }

    if (possibleMoves.length === 0) return false;
    return possibleMoves;
  }

  function getEndIndex(currentSquare: number[], squares: any) {
    const x = currentSquare[0];
    const y = currentSquare[1];

    if (!isStartIndex(x, y, squares)) return false;

    let endX: number[] = [];
    let endY: number[] = [];

    for (let i = 0; i < 4; i++) {
      if (x + i <= 9)
        if (
          squares[y][x + i] === 'h' &&
          (i === 0 || squares[y][x + i - 1] === 'h')
        )
          endX = [x + i, y];

      if (y + i <= 9)
        if (
          squares[y + i][x] === 'h' &&
          (i === 0 || squares[y + i - 1][x] === 'h')
        )
          endY = [x, y + i];
    }

    const direction = getDirection(x, y, endX, endY);

    switch (direction) {
      case 'x':
        return { endIndex: endX, direction };
      case 'y':
        return { endIndex: endY, direction };
      default:
        return { endIndex: currentSquare, direction };
    }
  }

  function isStartIndex(x: number, y: number, squares: any) {
    if (y === 0) return true;
    if (squares[y][x - 1] === 'h' || squares[y - 1][x] === 'h') return false;

    return true;
  }

  function getDirection(x: number, y: number, endX: number[], endY: number[]) {
    const startSum = x + y;
    const endXSum = endX[0] + endX[1];
    const endYSum = endY[0] + endY[1];

    if (endXSum - endYSum === 0) return null;
    else if (startSum - endYSum === 0) return 'x';
    else if (startSum - endXSum === 0) return 'y';

    return null;
  }

  function getLength(startIndex: number[], endIndex: number[]) {
    const xStart = startIndex[0];
    const yStart = startIndex[1];

    const xEnd = endIndex[0];
    const yEnd = endIndex[1];

    return xEnd + yEnd - (xStart + yStart);
  }

  return Object.assign(player, { chooseMove });
};
