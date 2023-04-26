import { Player } from '../player';
import { updateGameBoard } from '../domController';

export const createGameBoardComponent = (player: Player) => {
  const board = player.gameBoard;

  const wrapper = document.createElement('div');
  wrapper.className = `squares-wrapper`;

  for (let y = 0; y < board.squares.length; y++) {
    for (let x = 0; x < board.squares.length; x++) {
      const squareElement = document.createElement('div');
      wrapper.appendChild(squareElement);

      squareElement.className = `${player.name} square`;
      squareElement.setAttribute('data-xy', `${x},${y}`);
      squareElement.addEventListener('click', () =>
        squareOnClick(squareElement, player, x, y)
      );
      if (player.name != 'Comp') makeDropTarget(squareElement, x, y, player);

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

function makeDropTarget(
  element: HTMLDivElement,
  x: number,
  y: number,
  player: Player
) {
  element.addEventListener('drop', (e) => {
    dropped(x, y, player, e);
    element.classList.toggle('drop-hover');
  });

  element.addEventListener('dragenter', () => {
    element.classList.toggle('drop-hover');
  });

  element.addEventListener('dragleave', () => {
    element.classList.toggle('drop-hover');
  });

  element.addEventListener('dragover', (e) => {
    e.preventDefault();
  });

  // element.addEventListener("dragleave", dragLeave);
}

function dropped(x: number, y: number, player: Player, event: DragEvent) {
  if (event.dataTransfer != null) {
    const length = parseInt(event.dataTransfer.getData('length'));
    const dir = event.dataTransfer.getData('dir') === 'true' ? true : false;
    const result = player.placeShip(length, [x, y], dir);
    if (result) {
      const name = event.dataTransfer.getData('name');
      console.log(name);
      const ship = document.querySelector(`#${name}`);
      document.querySelector('.ships-wrapper')?.removeChild(ship);
      updateGameBoard(player);
    }
  } else console.warn('No data transfer');
}
