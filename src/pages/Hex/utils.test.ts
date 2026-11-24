import {HexMatch} from 'types/hex';

import {cellLabel, formatClock, getBoardLayout, getHexPoints, getPlayerName, mirrorCell, stepCell} from './utils';

jest.mock('axios', () => ({isAxiosError: jest.fn(() => false)}));

const distance = (first: {x: number; y: number}, second: {x: number; y: number}) =>
  Math.hypot(first.x - second.x, first.y - second.y);

describe('Hex board geometry', () => {
  it.each([7, 9, 11, 13])('draws every touching pair of cells the same distance apart on a %i board', (size) => {
    [false, true].forEach((portrait) => {
      const {cells} = getBoardLayout(size, portrait);
      expect(cells).toHaveLength(size * size);
      const spacing = distance(cells[0], cells[1]);
      // The six cells the server treats as next to a cell in the middle of the board.
      const middle = Math.floor(size / 2) * size + Math.floor(size / 2);
      [-size, -size + 1, -1, 1, size - 1, size].forEach((offset) => {
        expect(distance(cells[middle], cells[middle + offset])).toBeCloseTo(spacing, 5);
      });
      // Down and to the right is not a touching cell.
      expect(distance(cells[middle], cells[middle + size + 1])).toBeGreaterThan(spacing * 1.5);
    });
  });

  it('lays the board out wide on large screens and upright on narrow ones', () => {
    const wide = getBoardLayout(11);
    const upright = getBoardLayout(11, true);
    expect(wide.aspectRatio).toBeGreaterThan(1.5);
    expect(upright.aspectRatio).toBeCloseTo(1 / wide.aspectRatio, 1);
    expect(upright.cells[1]).toEqual({x: wide.cells[1].y, y: wide.cells[1].x});
    expect(wide.edges.map(({side}) => side)).toEqual(['red', 'red', 'blue', 'blue']);
    expect(wide.labels.map(({text}) => text)).toEqual(expect.arrayContaining(['a', 'k', '1', '11']));
    expect(getBoardLayout(11)).toBe(wide);
  });

  it.each([7, 11, 13])('colours the edges each side has to join on a %i board', (size) => {
    [false, true].forEach((portrait) => {
      const {cells, edges} = getBoardLayout(size, portrait);
      // Every coloured band is a triangle from two corners of the board to its centre: its outer side
      // runs along one edge of the board. Find the row or column of cells that lies along that side.
      const lines: Record<string, number[]> = {
        'column a': Array.from({length: size}, (_, row) => row * size),
        'last column': Array.from({length: size}, (_, row) => row * size + size - 1),
        'last row': Array.from({length: size}, (_, column) => (size - 1) * size + column),
        'row 1': Array.from({length: size}, (_, column) => column),
      };
      const along = edges.map(({points, side}) => {
        const [first, second] = points
          .split(' ')
          .slice(0, 2)
          .map((point) => point.split(',').map(Number));
        const gap = (name: string) =>
          lines[name].reduce((total, cell) => {
            const {x, y} = cells[cell];
            const length = Math.hypot(second[0] - first[0], second[1] - first[1]);
            // Distance from the cell to the line through the band's outer side.
            return (
              total +
              Math.abs((second[0] - first[0]) * (first[1] - y) - (first[0] - x) * (second[1] - first[1])) / length
            );
          }, 0);
        return `${side}: ${Object.keys(lines).sort((a, b) => gap(a) - gap(b))[0]}`;
      });
      expect(along.sort()).toEqual(['blue: column a', 'blue: last column', 'red: last row', 'red: row 1']);
    });
  });

  it('puts each letter beside its column and each number beside its row', () => {
    [false, true].forEach((portrait) => {
      const size = 11;
      const {cells, labels} = getBoardLayout(size, portrait);
      const nearest = (label: {x: number; y: number}) =>
        cells.reduce((best, cell, index) => (distance(cell, label) < distance(cells[best], label) ? index : best), 0);
      // Letters name columns and sit beside row 1; numbers name rows and sit beside column a.
      const beside = labels.map((label) => {
        const cell = nearest(label);
        return {column: cell % size, row: Math.floor(cell / size), text: label.text};
      });
      const expected = labels.map(({text}) =>
        /[a-z]/.test(text) ? {column: text.charCodeAt(0) - 97, row: 0, text} : {column: 0, row: Number(text) - 1, text},
      );
      expect(beside).toEqual(expected);
    });
  });

  it('keeps every cell and label inside the drawing', () => {
    [false, true].forEach((portrait) => {
      const {cells, labels, viewBox} = getBoardLayout(13, portrait);
      const [x, y, width, height] = viewBox.split(' ').map(Number);
      const corners = cells.flatMap((cell) =>
        getHexPoints(cell, portrait)
          .split(' ')
          .map((point) => point.split(',').map(Number))
          .map(([cornerX, cornerY]) => ({x: cornerX, y: cornerY})),
      );
      expect(corners).toHaveLength(169 * 6);
      [...corners, ...labels].forEach((point) => {
        expect(point.x).toBeGreaterThan(x);
        expect(point.x).toBeLessThan(x + width);
        expect(point.y).toBeGreaterThan(y);
        expect(point.y).toBeLessThan(y + height);
      });
    });
  });

  it('draws six-cornered cells, pointed up when wide and flat on top when upright', () => {
    const wide = getHexPoints({x: 0, y: 0}).split(' ');
    const upright = getHexPoints({x: 0, y: 0}, true).split(' ');
    expect(wide).toHaveLength(6);
    expect(wide).toContain('0,-20');
    expect(upright).toContain('20,0');
  });
});

describe('Hex helpers', () => {
  it('names cells by column letter and row number', () => {
    expect(cellLabel(0, 11)).toBe('a1');
    expect(cellLabel(10, 11)).toBe('k1');
    expect(cellLabel(11, 11)).toBe('a2');
    expect(cellLabel(168, 13)).toBe('m13');
  });

  it('mirrors a cell by exchanging its row and column', () => {
    expect(mirrorCell(2 * 11 + 7, 11)).toBe(7 * 11 + 2);
    expect(mirrorCell(60, 11)).toBe(60);
    expect(mirrorCell(mirrorCell(37, 9), 9)).toBe(37);
  });

  it('moves one cell per arrow key and stops at the edges', () => {
    expect(stepCell(60, 11, 'ArrowRight')).toBe(61);
    expect(stepCell(60, 11, 'ArrowLeft')).toBe(59);
    expect(stepCell(60, 11, 'ArrowUp')).toBe(49);
    expect(stepCell(60, 11, 'ArrowDown')).toBe(71);
    expect(stepCell(0, 11, 'ArrowLeft')).toBe(0);
    expect(stepCell(10, 11, 'ArrowRight')).toBe(10);
    expect(stepCell(120, 11, 'ArrowDown')).toBe(120);
    expect(stepCell(60, 11, 'Enter')).toBe(60);
    // On an upright board the next row is to the right and the next column is below.
    expect(stepCell(60, 11, 'ArrowRight', true)).toBe(71);
    expect(stepCell(60, 11, 'ArrowDown', true)).toBe(61);
  });

  it('formats clocks and names the computer', () => {
    expect(formatClock(899001)).toBe('15:00');
    expect(formatClock(61000)).toBe('1:01');
    expect(formatClock(-5)).toBe('0:00');
    const match = {red: {username: 'Alice'}, blue: null, computer_name: 'Computer'} as HexMatch;
    expect(getPlayerName(match, 'red')).toBe('Alice');
    expect(getPlayerName(match, 'blue')).toBe('Computer');
  });
});
