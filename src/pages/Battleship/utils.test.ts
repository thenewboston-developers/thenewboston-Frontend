import {Ship} from 'types/battleship';

import {canPlaceShip, cellLabel, FLEET, randomFleet, shipCells} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

describe('fleet placement', () => {
  const carrier: Ship = {id: 'carrier', row: 0, column: 0, orientation: 'horizontal'};

  it('rejects overlap and ships outside the grid, but allows touching ships', () => {
    expect(canPlaceShip({...carrier, column: 6}, [])).toBe(false);
    expect(canPlaceShip({...carrier, row: 6, orientation: 'vertical'}, [])).toBe(false);
    expect(canPlaceShip({id: 'destroyer', row: 0, column: 4, orientation: 'vertical'}, [carrier])).toBe(false);
    expect(canPlaceShip({id: 'destroyer', row: 1, column: 0, orientation: 'horizontal'}, [carrier])).toBe(true);
  });

  it('allows moving an existing ship without colliding with its old position', () => {
    expect(canPlaceShip({...carrier, column: 1}, [carrier])).toBe(true);
  });

  it('always produces a complete, in-bounds fleet with seventeen distinct squares', () => {
    for (let attempt = 0; attempt < 100; attempt += 1) {
      const fleet = randomFleet();
      expect(fleet.map(({id}) => id)).toEqual(FLEET.map(({id}) => id));
      fleet.forEach((ship) => expect(canPlaceShip(ship, fleet)).toBe(true));
      expect(new Set(fleet.flatMap(shipCells).map(cellLabel)).size).toBe(17);
    }
  });
});
