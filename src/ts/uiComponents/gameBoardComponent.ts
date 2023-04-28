import { Player } from '../player';
import { updateGameBoard } from '../domController';
import { currentShip } from './draggableShipComponent';

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
      if (player.name !== 'Comp') makeDropTarget(squareElement, x, y, player);

      const square = board.squares[y][x];
      if (typeof square === 'object' && player.name !== 'Comp')
        squareElement.textContent = `${x},${y}`;

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
    element.classList.remove('drop-hover');
  });

  element.addEventListener('dragleave', () => {
    for (let i = 0; i < currentShip.length; i++) {
      const next =
        currentShip.dir === false ? { x: x + i, y } : { x, y: y + i };

      const square = document.querySelector(
        `.${player.name}[data-xy="${next.x},${next.y}"]`
      );

      square?.classList.remove('drop-hover');
      square?.classList.remove('invalid');
    }
  });

  element.addEventListener('dragover', (e) => {
    e.preventDefault();

    const isValidPlacement = player.gameBoard.checkValidPlacement(
      currentShip.length,
      [x, y],
      currentShip.dir
    );

    for (let i = 0; i < currentShip.length; i++) {
      const next =
        currentShip.dir === false ? { x: x + i, y } : { x, y: y + i };

      const square = document.querySelector(
        `.${player.name}[data-xy="${next.x},${next.y}"]`
      );

      setTimeout(() => {
        square?.classList.add('drop-hover');
      }, 0);

      if (!isValidPlacement) square?.classList.add('invalid');
    }
  });
}

function dropped(x: number, y: number, player: Player, event: DragEvent) {
  if (event.dataTransfer != null) {
    const placementResult = player.placeShip(
      currentShip.length,
      [x, y],
      currentShip.dir
    );
    if (placementResult) {
      const ship = document.querySelector(`#${currentShip.name}`);
      if (ship !== null)
        document.querySelector('.ships-wrapper')?.removeChild(ship);

      if (player.gameBoard.shipsRemaining() === 5) {
        const startButton = document.querySelector(
          '.start-button'
        ) as HTMLButtonElement;
        startButton.disabled = false;
      }
    }
    updateGameBoard(player);
  } else console.warn('No data transfer');
}
