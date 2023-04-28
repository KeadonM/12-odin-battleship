import { shipTypes } from '../ship';
const mockShip = document.querySelector('.mock.ship');
let dirToggleable = true;

interface Ship {
  dir: boolean;
  length: number;
  name: string;
}

export let currentShip: Ship = {
  dir: false,
  length: 0,
  name: 'default',
};

export const createShips = () => {
  const wrapper = document.createElement('div');
  wrapper.className = `ships-wrapper`;

  for (let i = 0; i < 5; i++) {
    const ship = document.createElement('div');
    wrapper.appendChild(ship);
    ship.className = 'ship';
    ship.id = shipTypes[i][1];
    ship.setAttribute('draggable', 'true');
    let dirVertical = true;

    ship.addEventListener('click', () => {
      dirVertical = !dirVertical;
      ship.classList.toggle('horizontal');
    });

    ship.addEventListener('dragstart', (e) => {
      onPickUp(shipTypes[i], dirVertical, e);
    });

    ship.addEventListener('drag', (e) => {
      switchDirection(e);
    });

    for (let j = 0; j < shipTypes[i][0]; j++) {
      const shipSquare = document.createElement('div');
      ship.appendChild(shipSquare);
    }
  }

  return wrapper;
};

function onPickUp(shipType: [number, string], dir: boolean, event: DragEvent) {
  currentShip.dir = dir;
  currentShip.length = shipType[0];
  currentShip.name = shipType[1];

  if (event.dataTransfer !== null && mockShip !== null)
    event.dataTransfer.setDragImage(mockShip, 20, 20);
}

function switchDirection(event: DragEvent) {
  if ((event.shiftKey || event.buttons === 3) && dirToggleable) {
    currentShip.dir = !currentShip.dir;
    dirToggleable = false;

    const hoveredElements = document.querySelectorAll('.drop-hover');

    hoveredElements.forEach((element) => {
      element.classList.remove('drop-hover');
      element.classList.remove('invalid');
    });
  }

  if (!event.shiftKey && event.buttons !== 3) dirToggleable = true;
}
