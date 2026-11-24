import axios from 'axios';

import {DotsAndBoxesMatch, DotsAndBoxesOwner, DotsAndBoxesSide} from 'types/dotsAndBoxes';

export const SIDE_NUMBERS: Record<DotsAndBoxesSide, DotsAndBoxesOwner> = {blue: 1, red: 2};
export const SIDES: DotsAndBoxesSide[] = ['blue', 'red'];

/**
 * The board is `size` by `size` boxes. Lines are numbered the way the API numbers them: every
 * horizontal line row by row from the top edge down, then every vertical line, left to right
 * within each row of boxes. Boxes are numbered row by row from the top left.
 */
export const lineCount = (size: number): number => 2 * size * (size + 1);

export const horizontalLine = (size: number, row: number, column: number): number => row * size + column;

export const verticalLine = (size: number, row: number, column: number): number =>
  size * (size + 1) + row * (size + 1) + column;

/** The four lines around a box: top, bottom, left, right. */
export const boxLines = (size: number, box: number): number[] => {
  const row = Math.floor(box / size);
  const column = box % size;
  return [
    horizontalLine(size, row, column),
    horizontalLine(size, row + 1, column),
    verticalLine(size, row, column),
    verticalLine(size, row, column + 1),
  ];
};

/** The one or two boxes that a line borders. */
export const lineBoxes = (size: number, line: number): number[] => {
  const horizontals = size * (size + 1);
  if (line < horizontals) {
    const row = Math.floor(line / size);
    const column = line % size;
    return [row - 1, row].filter((boxRow) => boxRow >= 0 && boxRow < size).map((boxRow) => boxRow * size + column);
  }
  const row = Math.floor((line - horizontals) / (size + 1));
  const column = (line - horizontals) % (size + 1);
  return [column - 1, column]
    .filter((boxColumn) => boxColumn >= 0 && boxColumn < size)
    .map((boxColumn) => row * size + boxColumn);
};

/** Dots are named like spreadsheet cells: columns A, B, C… and rows 1, 2, 3… from the top. */
export const dotLabel = (row: number, column: number): string => `${String.fromCharCode(65 + column)}${row + 1}`;

export const lineLabel = (size: number, line: number): string => {
  const horizontals = size * (size + 1);
  if (line < horizontals) {
    const row = Math.floor(line / size);
    const column = line % size;
    return `${dotLabel(row, column)} to ${dotLabel(row, column + 1)}`;
  }
  const row = Math.floor((line - horizontals) / (size + 1));
  const column = (line - horizontals) % (size + 1);
  return `${dotLabel(row, column)} to ${dotLabel(row + 1, column)}`;
};

export const formatClock = (milliseconds: number): string => {
  const seconds = Math.max(0, Math.ceil(milliseconds / 1000));
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, '0')}`;
};

export const getErrorMessage = (error: unknown): string => {
  if (axios.isAxiosError(error)) {
    if (error.response?.status === 409) return 'The match changed. The board has been refreshed; please try again.';
    if (error.response?.status === 404)
      return 'This match is unavailable. Pending challenges are visible only to their players.';
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

export const getPlayerName = (match: DotsAndBoxesMatch, side: DotsAndBoxesSide): string =>
  match[side]?.username ?? match.computer_name ?? 'Computer';

/** The final score with the winner's boxes first, such as "6–3". */
export const getScoreLine = (match: Pick<DotsAndBoxesMatch, 'score_blue' | 'score_red'>): string =>
  `${Math.max(match.score_blue, match.score_red)}–${Math.min(match.score_blue, match.score_red)}`;

export const getScore = (match: Pick<DotsAndBoxesMatch, 'boxes'>, side: DotsAndBoxesSide): number =>
  match.boxes.filter((owner) => owner === SIDE_NUMBERS[side]).length;

export interface BoardPosition {
  boxes: DotsAndBoxesOwner[];
  lines: DotsAndBoxesOwner[];
}

/**
 * The board as it stood after the first `count` lines of the match. A whole computer turn, or
 * several of an opponent's lines, can arrive in one response; this lets the page draw them one
 * at a time. Each line keeps the colour of the player who drew it.
 */
export const positionAfter = (
  match: Pick<DotsAndBoxesMatch, 'board_size' | 'lines' | 'moves'>,
  count: number,
): BoardPosition => {
  const size = match.board_size;
  const lines: DotsAndBoxesOwner[] = Array(lineCount(size)).fill(0);
  const boxes: DotsAndBoxesOwner[] = Array(size * size).fill(0);
  match.moves.slice(0, count).forEach((line) => {
    lines[line] = match.lines[line];
    lineBoxes(size, line).forEach((box) => {
      if (boxLines(size, box).every((edge) => lines[edge])) boxes[box] = match.lines[line];
    });
  });
  return {boxes, lines};
};

/** The lines of the most recent turn among the first `count` lines: the last line and any box-completing lines before it. */
export const lastTurnLines = (match: Pick<DotsAndBoxesMatch, 'lines' | 'moves'>, count: number): number[] => {
  const shown = match.moves.slice(0, count);
  if (!shown.length) return [];
  const owner = match.lines[shown[shown.length - 1]];
  const turn: number[] = [];
  for (let index = shown.length - 1; index >= 0 && match.lines[shown[index]] === owner; index -= 1)
    turn.push(shown[index]);
  return turn;
};
