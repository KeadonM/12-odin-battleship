export interface Ship {
  length: number;
  position: number[];
  dirVertical: boolean;
  hits: number;
  sunk: boolean;
  hit: (this: Ship) => void; // Add type annotation for 'this'
  isSunk: (this: Ship) => void; // Add type annotation for 'this'
}

export const createShip = (l: number, p: number[], d: boolean): Ship => {
  const ship = {
    length: l,
    position: p,
    dirVertical: d,
    hits: 0,
    sunk: false,
    hit() {
      this.hits += 1;
      this.isSunk();
    },

    isSunk() {
      if (this.hits === this.length) this.sunk = true;
    },
  };

  return ship;
};
