import { Player } from '../player';
import { updateGameBoard } from '../domController';

export const createGameBoardComponent = (player: Player) => {
  const board = player.gameBoard;

  const wrapper = document.createElement('div');
  wrapper.className = `squares-wrapper`;

  console.log(board);

  for (let y = 0; y < board.squares.length; y++) {
    for (let x = 0; x < board.squares.length; x++) {
      const squareElement = document.createElement('div');
      wrapper.appendChild(squareElement);

      squareElement.className = `${player.name} square`;
      squareElement.setAttribute('data-xy', `${x},${y}`);
      squareElement.addEventListener('click', () =>
        squareOnClick(squareElement, player, x, y)
      );

      const square = board.squares[y][x];
      if (typeof square === 'object') squareElement.textContent = `${x},${y}`;

      switch (square) {
        case 'm':
          squareElement.classList.add('miss');
          // squareElement.textContent = 'm';
          break;
        case 'h':
          squareElement.classList.add('hit');
          // squareElement.textContent = 'h';
          break;
        case 'sunk':
          squareElement.classList.add('sunk');
          // squareElement.textContent = 'h';
          break;
      }
    }
  }

  return wrapper;
};

function squareOnClick(
  element: HTMLDivElement,
  player: Player,
  x: number,
  y: number
) {
  if (player.enemy.turn === false) return;

  const result = player.enemy.takeTurn(x, y);

  switch (result) {
    case 'm':
      element.classList.add('miss');
      // element.textContent = 'm';
      break;
    case 'h':
      element.classList.add('hit');
      // element.textContent = 'h';
      break;
    case 'sunk':
      updateGameBoard(player);
      break;
  }
}
