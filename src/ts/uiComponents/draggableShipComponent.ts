import { shipTypes } from '../ship';

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

    for (let j = 0; j < shipTypes[i][0]; j++) {
      const shipSquare = document.createElement('div');
      ship.appendChild(shipSquare);
    }
  }

  return wrapper;
};

function onPickUp(shipType: [number, string], dir: boolean, event: DragEvent) {
  if (event.dataTransfer != null) {
    event.dataTransfer.setData('length', shipType[0].toString());
    event.dataTransfer.setData('name', shipType[1]);
    event.dataTransfer.setData('dir', `${dir}`);
  }
}
