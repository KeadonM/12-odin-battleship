import { createShip } from '../ts/ship.ts';

test('New ship', () => {
  const ship = createShip(4, [0, 0], false);
  expect(ship).toBe(ship);
});

test('Ship hit', () => {
  const ship = createShip(4, [0, 0], false);
  ship.hit();
  expect(ship.hits).toBe(1);
});

test('Ship not sunk', () => {
  const ship = createShip(4, [0, 0], false);
  expect(ship.sunk).toBe(false);
});

test('Ship is sunk', () => {
  const ship = createShip(4, [0, 0], false);
  for (let i = 0; i < ship.length; i++) {
    ship.hit();
  }

  expect(ship.sunk).toBe(true);
});

test('Ship has position', () => {
  const ship = createShip(4, [4, 4], false);

  expect(ship.position).toStrictEqual([4, 4]);
});
