import axios from 'axios';

import {BattleshipMatch, BattleshipSide, Cell, Ship, ShipId} from 'types/battleship';

export const FLEET: {id: ShipId; name: string; length: number}[] = [
  {id: 'carrier', name: 'Carrier', length: 5},
  {id: 'battleship', name: 'Battleship', length: 4},
  {id: 'cruiser', name: 'Cruiser', length: 3},
  {id: 'submarine', name: 'Submarine', length: 3},
  {id: 'destroyer', name: 'Destroyer', length: 2},
];

export const cellLabel = ({row, column}: Cell): string => `${String.fromCharCode(65 + row)}${column + 1}`;

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) return 'The match changed. The board has been refreshed; please try again.';
    if (error.response?.status === 404) return 'This match is unavailable. Only its players can open the board.';
    const data = error.response?.data;
    if (data && typeof data === 'object') {
      const messages = Object.values(data)
        .flat()
        .filter((value) => typeof value === 'string');
      if (messages.length) return messages.join(' ');
    }
  }
  return 'We could not reach the game. Please try again.';
};

export const getPlayerName = (match: BattleshipMatch, side: BattleshipSide): string =>
  side === 'host' ? match.host.username : (match.guest?.username ?? 'Computer');

export const shipCells = (ship: Ship): Cell[] =>
  Array.from({length: FLEET.find(({id}) => id === ship.id)!.length}, (_, index) => ({
    row: ship.row + (ship.orientation === 'vertical' ? index : 0),
    column: ship.column + (ship.orientation === 'horizontal' ? index : 0),
  }));

export const canPlaceShip = (ship: Ship, fleet: Ship[]): boolean => {
  const occupied = new Set(
    fleet
      .filter(({id}) => id !== ship.id)
      .flatMap(shipCells)
      .map(cellLabel),
  );
  return shipCells(ship).every(
    ({row, column}) => row >= 0 && row < 10 && column >= 0 && column < 10 && !occupied.has(cellLabel({row, column})),
  );
};

export const randomFleet = (): Ship[] => {
  const ships: Ship[] = [];
  FLEET.forEach(({id}) => {
    const candidates: Ship[] = [];
    (['horizontal', 'vertical'] as const).forEach((orientation) => {
      for (let row = 0; row < 10; row += 1) {
        for (let column = 0; column < 10; column += 1) {
          const ship = {id, row, column, orientation};
          if (canPlaceShip(ship, ships)) candidates.push(ship);
        }
      }
    });
    ships.push(candidates[Math.floor(Math.random() * candidates.length)]);
  });
  return ships;
};
