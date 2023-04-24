import { GameBoard } from '../gameBoard';

export const createGameBoardComponent = (board: GameBoard) => {
  const wrapper = document.createElement('div');
  wrapper.className = `game-board-wrapper`;

  for (let i = 0; i < board.squares.length; i++) {
    for (let j = 0; j < board.squares.length; j++) {
      const boardSquare = document.createElement('div');
      wrapper.appendChild(boardSquare);
      boardSquare.className = 'square';

      const square = board.squares[i][j];

      if (typeof square === 'string') boardSquare.textContent = square;
      else boardSquare.textContent = 's';
    }
  }

  return wrapper;
};
